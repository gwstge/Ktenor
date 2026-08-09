"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { site } from "@/lib/site";
import { services, type ServiceId } from "@/content/services";
import { SELECT_SERVICE_EVENT } from "./OrderButton";

type Errors = Partial<Record<"name" | "contact" | "email" | "service" | "consent", string>>;

const budgetKeys = ["under500", "500to1500", "1500to3000", "over3000"] as const;

/**
 * The form validates and behaves like the real thing, but there is no backend
 * yet — so it never claims an enquiry was sent. The notice says so plainly and
 * hands the visitor a working way to reach out instead.
 */
export function Contact({ t, locale }: { t: Dictionary; locale: Locale }) {
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const serviceRef = useRef<HTMLSelectElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [attempted, setAttempted] = useState(false);

  // A service card was clicked — preselect it and let the anchor do the scroll.
  useEffect(() => {
    function onSelect(event: Event) {
      const id = (event as CustomEvent<ServiceId>).detail;
      const select = serviceRef.current;
      if (!select) return;
      select.value = id;
      select.dispatchEvent(new Event("change", { bubbles: true }));
    }
    window.addEventListener(SELECT_SERVICE_EVENT, onSelect);
    return () => window.removeEventListener(SELECT_SERVICE_EVENT, onSelect);
  }, []);

  function validate(form: HTMLFormElement): Errors {
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const service = String(data.get("service") ?? "");
    const consent = data.get("consent");

    const next: Errors = {};
    if (!name) next.name = t.contact.errors.name;
    if (!email && !phone) next.contact = t.contact.errors.contact;
    else if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))
      next.email = t.contact.errors.email;
    if (!service) next.service = t.contact.errors.service;
    if (!consent) next.consent = t.contact.errors.consent;
    return next;
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAttempted(true);
    const next = validate(event.currentTarget);
    setErrors(next);

    const firstInvalid = Object.keys(next)[0];
    if (firstInvalid) {
      const field = event.currentTarget.querySelector<HTMLElement>(
        `[name="${firstInvalid === "contact" ? "email" : firstInvalid}"]`,
      );
      field?.focus();
    }
    // Nothing is submitted: there is no endpoint, and pretending otherwise
    // would lose a real enquiry.
  }

  return (
    <section id="contact" className="scroll-mt-[72px] py-[var(--spacing-section)]">
      <div className="container-page grid gap-[var(--spacing-block)] lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="flex items-center gap-3 text-caption uppercase tracking-[0.24em] text-text-muted">
            <span aria-hidden className="flex gap-[3px]">
              <span className="h-3 w-[3px] rounded-full bg-accent" />
              <span className="h-3 w-[3px] rounded-full bg-accent-mid" />
              <span className="h-3 w-[3px] rounded-full bg-accent-deep" />
            </span>
            {t.contact.eyebrow}
          </p>
          <h2 className="mt-5 text-[length:var(--text-h1)]">{t.contact.title}</h2>
          <p className="mt-6 max-w-[46ch] text-[length:var(--text-lead)] text-text-secondary">
            {t.contact.intro}
          </p>

          <div className="surface mt-10 rounded-[var(--radius-md)] p-6">
            <p className="text-sm font-medium">{t.contact.notice.title}</p>
            <p className="mt-2 text-sm text-text-secondary">{t.contact.notice.body}</p>
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm">
              <a
                href={`mailto:${site.contact.email}`}
                className="text-accent underline-offset-4 transition-colors duration-[var(--dur-base)] hover:underline"
              >
                {site.contact.email}
              </a>
              <a
                href={site.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline-offset-4 transition-colors duration-[var(--dur-base)] hover:underline"
              >
                WhatsApp
              </a>
              <a
                href={`tel:${site.contact.phone}`}
                className="text-accent underline-offset-4 transition-colors duration-[var(--dur-base)] hover:underline"
              >
                {site.contact.phoneDisplay}
              </a>
            </div>
          </div>
        </div>

        <form ref={formRef} noValidate onSubmit={onSubmit} className="grid gap-6">
          <Field
            id={`${uid}-name`}
            name="name"
            label={t.contact.fields.name}
            required
            requiredLabel={t.contact.fields.required}
            error={errors.name}
            autoComplete="name"
          />

          <div className="grid gap-6 sm:grid-cols-2">
            <Field
              id={`${uid}-email`}
              name="email"
              type="email"
              label={t.contact.fields.email}
              error={errors.email ?? errors.contact}
              autoComplete="email"
              inputMode="email"
            />
            <Field
              id={`${uid}-phone`}
              name="phone"
              type="tel"
              label={t.contact.fields.phone}
              autoComplete="tel"
              inputMode="tel"
            />
          </div>
          <p className="-mt-3 text-caption text-text-muted">{t.contact.fields.contactHint}</p>

          <div>
            <Label htmlFor={`${uid}-service`} required requiredLabel={t.contact.fields.required}>
              {t.contact.fields.service}
            </Label>
            <select
              ref={serviceRef}
              id={`${uid}-service`}
              name="service"
              defaultValue=""
              aria-invalid={errors.service ? true : undefined}
              aria-describedby={errors.service ? `${uid}-service-error` : undefined}
              className={inputClass(!!errors.service)}
            >
              <option value="" disabled>
                {t.contact.fields.servicePlaceholder}
              </option>
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {t.services.items[service.id].name}
                </option>
              ))}
            </select>
            <FieldError id={`${uid}-service-error`} message={errors.service} />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <Label htmlFor={`${uid}-budget`} optionalLabel={t.contact.fields.optional}>
                {t.contact.fields.budget}
              </Label>
              <select
                id={`${uid}-budget`}
                name="budget"
                defaultValue=""
                className={inputClass(false)}
              >
                <option value="">{t.contact.fields.budgetPlaceholder}</option>
                {budgetKeys.map((key) => (
                  <option key={key} value={key}>
                    {t.contact.budgets[key]}
                  </option>
                ))}
              </select>
            </div>
            <Field
              id={`${uid}-timeline`}
              name="timeline"
              label={t.contact.fields.timeline}
              optionalLabel={t.contact.fields.optional}
            />
          </div>

          <div>
            <Label htmlFor={`${uid}-message`} optionalLabel={t.contact.fields.optional}>
              {t.contact.fields.message}
            </Label>
            <textarea
              id={`${uid}-message`}
              name="message"
              rows={5}
              placeholder={t.contact.fields.messagePlaceholder}
              className={`${inputClass(false)} resize-y`}
            />
          </div>

          <div>
            <label className="flex cursor-pointer items-start gap-3 text-sm text-text-secondary">
              <input
                type="checkbox"
                name="consent"
                aria-invalid={errors.consent ? true : undefined}
                className="mt-0.5 size-5 shrink-0 cursor-pointer accent-[var(--c-accent)]"
              />
              <span>
                {t.contact.consent.label}{" "}
                <a
                  href={`/${locale}/privacy`}
                  className="text-accent underline underline-offset-4"
                >
                  {t.contact.consent.link}
                </a>
              </span>
            </label>
            <FieldError id={`${uid}-consent-error`} message={errors.consent} />
          </div>

          <div className="flex flex-wrap items-center gap-5">
            <button
              type="submit"
              className="cursor-pointer rounded-[var(--radius-sm)] bg-text px-8 py-4 text-sm font-medium text-bg transition-[background-color,transform] duration-[var(--dur-base)] ease-[var(--ease-standard)] hover:bg-silver active:scale-[0.98]"
            >
              {t.contact.submit}
            </button>
            {attempted && Object.keys(errors).length === 0 ? (
              <p role="status" className="text-sm text-text-muted">
                {t.contact.notice.title}
              </p>
            ) : null}
          </div>
        </form>
      </div>
    </section>
  );
}

function inputClass(invalid: boolean) {
  return `mt-2 w-full rounded-[var(--radius-sm)] border bg-bg-raised px-4 py-3.5 text-body text-text outline-none transition-[border-color] duration-[var(--dur-base)] placeholder:text-text-muted focus-visible:border-accent ${
    invalid ? "border-[var(--c-danger-border)]" : "border-line-strong"
  }`;
}

function Label({
  htmlFor,
  children,
  required,
  requiredLabel,
  optionalLabel,
}: {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
  requiredLabel?: string;
  optionalLabel?: string;
}) {
  return (
    <label htmlFor={htmlFor} className="flex items-baseline gap-2 text-sm text-text-secondary">
      {children}
      {required ? (
        <span className="text-caption text-text-muted">({requiredLabel})</span>
      ) : optionalLabel ? (
        <span className="text-caption text-text-muted">({optionalLabel})</span>
      ) : null}
    </label>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-2 text-caption text-danger">
      {message}
    </p>
  );
}

function Field({
  id,
  name,
  label,
  type = "text",
  error,
  required,
  requiredLabel,
  optionalLabel,
  ...rest
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  error?: string;
  required?: boolean;
  requiredLabel?: string;
  optionalLabel?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <Label
        htmlFor={id}
        required={required}
        requiredLabel={requiredLabel}
        optionalLabel={optionalLabel}
      >
        {label}
      </Label>
      <input
        id={id}
        name={name}
        type={type}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={inputClass(!!error)}
        {...rest}
      />
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}
