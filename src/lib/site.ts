/**
 * Single source of truth for anything that is not copy.
 * Domain is intentionally an env var — swapping it later is a one-line change.
 */
export const site = {
  name: "Ktenor",
  legalName: "KTENOR",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://ktenor.sk",

  contact: {
    email: "ktenorstudios@gmail.com",
    /** E.164, used for tel: and wa.me */
    phone: "+421911608486",
    phoneDisplay: "+421 911 608 486",
    instagram: "kamoshitaya",
    instagramUrl: "https://instagram.com/kamoshitaya",
    get whatsappUrl() {
      return `https://wa.me/${this.phone.replace(/\D/g, "")}`;
    },
  },

  /** Meta/footer only — never in the hero headline. */
  region: { city: "Bratislava", country: "Slovakia" },

  features: {
    /** Flip to true once the first real client testimonial exists. */
    testimonials: false,
    /** Flip per project as each demo becomes reachable. */
    portfolioLinks: false,
    /** No backend yet — the form must not pretend a submission succeeded. */
    contactFormBackend: false,
    analytics: false,
  },
} as const;

export type Site = typeof site;
