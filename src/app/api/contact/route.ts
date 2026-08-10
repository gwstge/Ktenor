import { NextResponse } from "next/server";
import { site } from "@/lib/site";
import { getDictionary } from "@/i18n";
import type { ServiceId } from "@/content/services";
import {
  clean,
  isBudgetKey,
  LIMITS,
  validateEnquiry,
  type Enquiry,
} from "@/lib/enquiry";

export const runtime = "nodejs";
/** Nothing here may be cached or prerendered. */
export const dynamic = "force-dynamic";

/**
 * The enquiry endpoint.
 *
 * Two independent destinations: an email so the enquiry is noticed, and a
 * spreadsheet row so it survives. Either one succeeding counts as delivered —
 * losing a genuine enquiry because one provider had a bad minute is the worst
 * outcome available here.
 *
 * No new dependencies: both destinations are plain HTTPS calls.
 */

const RATE_LIMIT = { max: 5, windowMs: 10 * 60 * 1000 };
const MIN_FILL_MS = 2500;

/**
 * In-memory and therefore per-instance: a serverless deployment can run several
 * at once and they reset on cold start. That is fine here — it exists to blunt
 * a crude flood, and the honeypot and timing checks do the real filtering.
 * Anything stronger would mean adding infrastructure this site does not need.
 */
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT.windowMs);
  recent.push(now);
  hits.set(ip, recent);

  if (hits.size > 500) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= RATE_LIMIT.windowMs)) hits.delete(key);
    }
  }
  return recent.length > RATE_LIMIT.max;
}

export async function POST(request: Request) {
  let body: Partial<Enquiry>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, reason: "malformed" }, { status: 400 });
  }

  // A bot filled the hidden field, or filled the whole form faster than anyone
  // reads it. Answer exactly like a success: telling a bot why it failed only
  // helps it try again. Logged (not surfaced to the visitor) because this can
  // also catch a genuine visitor whose browser autofilled the honeypot or who
  // double-submitted before the page settled — worth being able to tell apart
  // from an actual delivery failure after the fact.
  const honeypotFilled = Boolean(clean(body.company, 100));
  const tooFast =
    typeof body.startedAt === "number" && Date.now() - body.startedAt < MIN_FILL_MS;
  if (honeypotFilled || tooFast) {
    console.warn("[contact] trapped", {
      honeypotFilled,
      tooFast,
      elapsedMs: typeof body.startedAt === "number" ? Date.now() - body.startedAt : null,
      email: clean(body.email, LIMITS.email) || undefined,
    });
    return NextResponse.json({ ok: true });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    console.warn("[contact] rate-limited", { ip });
    return NextResponse.json({ ok: false, reason: "rate-limited" }, { status: 429 });
  }

  const enquiry: CleanEnquiry = {
    name: clean(body.name, LIMITS.name),
    email: clean(body.email, LIMITS.email),
    phone: clean(body.phone, LIMITS.phone),
    service: clean(body.service, 40),
    budget: clean(body.budget, 40),
    timeline: clean(body.timeline, LIMITS.timeline),
    message: clean(body.message, LIMITS.message),
    consent: body.consent === true,
    locale: body.locale === "en" ? "en" : "sk",
  };

  const errors = validateEnquiry(enquiry);
  if (errors.length > 0) {
    return NextResponse.json({ ok: false, reason: "invalid", errors }, { status: 400 });
  }
  if (enquiry.budget && !isBudgetKey(enquiry.budget)) enquiry.budget = "";

  // Both run regardless of each other's outcome. Errors are logged with the
  // enquirer's email so a failure can be traced back to a specific
  // conversation rather than left as an unexplained gap.
  const [notified, recorded] = await Promise.all([
    notifyOwner(enquiry).catch((err) => {
      console.error("[contact] notifyOwner failed", { email: enquiry.email, err });
      return false;
    }),
    recordToSheet(enquiry).catch((err) => {
      console.error("[contact] recordToSheet failed", { email: enquiry.email, err });
      return false;
    }),
  ]);

  if (!notified && !recorded) {
    console.error("[contact] both destinations failed", { email: enquiry.email });
    return NextResponse.json({ ok: false, reason: "delivery" }, { status: 502 });
  }

  // Secondary: a failed acknowledgement must never turn a received enquiry
  // into an error the visitor sees.
  void acknowledge(enquiry).catch(() => {});

  return NextResponse.json({ ok: true, notified, recorded });
}

type CleanEnquiry = {
  name: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  timeline: string;
  message: string;
  consent: boolean;
  locale: "sk" | "en";
};

async function sendEmail(payload: Record<string, unknown>): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!key || !from) {
    console.error("[contact] Resend not configured: missing RESEND_API_KEY or CONTACT_FROM_EMAIL");
    return false;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, ...payload }),
  });

  // Surface Resend's own explanation (invalid address, unverified domain,
  // etc.) rather than just the fact that something failed.
  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    console.error("[contact] Resend rejected the email", {
      status: response.status,
      to: payload.to,
      detail,
    });
  }

  return response.ok;
}

function rows(pairs: [string, string][]) {
  return pairs
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 16px 6px 0;color:#767e8f;font-size:13px;white-space:nowrap">${label}</td><td style="padding:6px 0;color:#eeeff4;font-size:14px">${escapeHtml(value)}</td></tr>`,
    )
    .join("");
}

/**
 * The lead notification. Every field the visitor could have filled in is
 * shown — the point of this email is that the owner never has to log in
 * anywhere to see the full picture. Service and budget are resolved to their
 * display names via the same dictionary the site itself uses, so the owner
 * reads "Landing Page" and "€500 – 1 500" rather than the raw ids the form
 * submits ("landing", "500to1500").
 */
async function notifyOwner(enquiry: CleanEnquiry) {
  const to = process.env.CONTACT_TO_EMAIL || site.contact.email;
  const replyTo = enquiry.email || undefined;
  const message = enquiry.message;

  const t = await getDictionary(enquiry.locale);
  const serviceLabel = t.services.items[enquiry.service as ServiceId]?.name ?? enquiry.service;
  const budgetLabel = enquiry.budget
    ? (t.contact.budgets as Record<string, string>)[enquiry.budget] ?? enquiry.budget
    : "—";

  const html = `
<div style="background:#0b0c11;padding:32px;font-family:-apple-system,Segoe UI,sans-serif">
  <div style="max-width:560px;margin:0 auto;background:#101319;border:1px solid rgba(238,239,244,.1);border-radius:14px;padding:28px">
    <div style="display:flex;gap:5px;margin-bottom:20px">
      <span style="display:inline-block;width:5px;height:20px;border-radius:99px;background:#6e8fc4"></span>
      <span style="display:inline-block;width:5px;height:20px;border-radius:99px;background:#46618f"></span>
      <span style="display:inline-block;width:5px;height:20px;border-radius:99px;background:#2a3a55"></span>
    </div>
    <p style="margin:0 0 4px;color:#6e8fc4;font-size:12px;letter-spacing:.18em;text-transform:uppercase">New enquiry</p>
    <h1 style="margin:0 0 24px;color:#eeeff4;font-size:22px;font-weight:600">${escapeHtml(enquiry.name)}</h1>
    <table style="border-collapse:collapse;width:100%">${rows([
      ["Email", enquiry.email || "—"],
      ["Phone", enquiry.phone || "—"],
      ["Service", serviceLabel],
      ["Budget", budgetLabel],
      ["Timeline", enquiry.timeline || "—"],
      ["Language", enquiry.locale.toUpperCase()],
    ])}</table>
    ${
      message
        ? `<div style="margin-top:24px;padding-top:20px;border-top:1px solid rgba(238,239,244,.1)">
             <p style="margin:0 0 8px;color:#767e8f;font-size:13px">Message</p>
             <p style="margin:0;color:#eeeff4;font-size:14px;line-height:1.6;white-space:pre-wrap">${escapeHtml(message)}</p>
           </div>`
        : ""
    }
  </div>
</div>`;

  return sendEmail({
    to,
    subject: `Enquiry — ${enquiry.name} · ${serviceLabel}`,
    html,
    ...(replyTo ? { reply_to: replyTo } : {}),
  });
}

const ACK = {
  sk: {
    subject: "Ďakujem, že ste oslovili Ktenor",
    heading: "Ďakujem, že ste oslovili Ktenor.",
    body: "Vaša požiadavka bola prijatá. Pozriem sa na ňu a ozvem sa vám do jedného pracovného dňa.",
    signoff: "Ktenor",
  },
  en: {
    subject: "Thanks for reaching out to Ktenor",
    heading: "Thanks for reaching out to Ktenor.",
    body: "Your request has been received. I'll review it and get back to you within 1 business day.",
    signoff: "Ktenor",
  },
} as const;

async function acknowledge(enquiry: CleanEnquiry) {
  const email = enquiry.email;
  if (!email) return false;

  const copy = ACK[enquiry.locale];
  const html = `
<div style="background:#0b0c11;padding:32px;font-family:-apple-system,Segoe UI,sans-serif">
  <div style="max-width:520px;margin:0 auto;background:#101319;border:1px solid rgba(238,239,244,.1);border-radius:14px;padding:32px">
    <div style="display:flex;gap:5px;margin-bottom:24px">
      <span style="display:inline-block;width:5px;height:22px;border-radius:99px;background:#6e8fc4"></span>
      <span style="display:inline-block;width:5px;height:22px;border-radius:99px;background:#46618f"></span>
      <span style="display:inline-block;width:5px;height:22px;border-radius:99px;background:#2a3a55"></span>
    </div>
    <h1 style="margin:0 0 16px;color:#eeeff4;font-size:22px;font-weight:600">${copy.heading}</h1>
    <p style="margin:0 0 28px;color:#a2a8b6;font-size:15px;line-height:1.65">${copy.body}</p>
    <p style="margin:0;color:#767e8f;font-size:13px">
      ${copy.signoff} · <a href="${site.url}" style="color:#6e8fc4;text-decoration:none">${site.url.replace("https://", "")}</a>
    </p>
  </div>
</div>`;

  return sendEmail({ to: email, subject: copy.subject, html });
}

/**
 * Appends a row through a Google Apps Script web app. Chosen over a service
 * account because it needs no key file and no extra package — one URL, one
 * shared secret, and the data lands in a spreadsheet the owner already knows
 * how to read.
 */
async function recordToSheet(enquiry: CleanEnquiry) {
  const url = process.env.SHEET_WEBHOOK_URL;
  if (!url) return false;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      secret: process.env.SHEET_WEBHOOK_SECRET ?? "",
      receivedAt: new Date().toISOString(),
      ...enquiry,
    }),
  });
  return response.ok;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
