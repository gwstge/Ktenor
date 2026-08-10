import { serviceIds, type ServiceId } from "@/content/services";

export const budgetKeys = ["under500", "500to1500", "1500to3000", "over3000"] as const;
export type BudgetKey = (typeof budgetKeys)[number];

export type EnquiryErrorKey = "name" | "contact" | "email" | "service" | "consent";

export type Enquiry = {
  name: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  timeline: string;
  message: string;
  consent: boolean;
  locale: string;
  /** Bot trap. A human never sees this field, so anything in it is a bot. */
  company?: string;
  /** When the form was first rendered, used to catch instant submissions. */
  startedAt?: number;
};

/** Deliberately permissive — the goal is to catch typos, not to police addresses. */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const LIMITS = {
  name: 120,
  email: 160,
  phone: 40,
  timeline: 120,
  message: 4000,
} as const;

/**
 * One set of rules for both sides. The browser runs it for instant feedback and
 * the server runs it again because anything arriving over the network is
 * untrusted — client-side validation is a convenience, never a guarantee.
 *
 * Returns keys rather than sentences so each side can render them in the
 * visitor's language.
 */
export function validateEnquiry(input: Partial<Enquiry>): EnquiryErrorKey[] {
  const errors: EnquiryErrorKey[] = [];

  const name = (input.name ?? "").trim();
  const email = (input.email ?? "").trim();
  const phone = (input.phone ?? "").trim();

  if (!name) errors.push("name");
  // Email is the one channel guaranteed to reach the visitor with the
  // confirmation and, later, a reply — phone is a nice-to-have on top of it.
  if (!email) errors.push("contact");
  else if (!EMAIL.test(email)) errors.push("email");
  if (!input.service || !isServiceId(input.service)) errors.push("service");
  if (!input.consent) errors.push("consent");

  return errors;
}

export function isServiceId(value: string): value is ServiceId {
  return (serviceIds as readonly string[]).includes(value);
}

export function isBudgetKey(value: string): value is BudgetKey {
  return (budgetKeys as readonly string[]).includes(value);
}

/** Trim and cap, so an oversized field cannot bloat an email or a spreadsheet row. */
export function clean(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}
