/**
 * English copy. This file is the shape the Slovak dictionary must satisfy,
 * so a missing translation is a type error rather than a silent fallback.
 */
const en = {
  meta: {
    title: "Ktenor — Premium websites, designed and built end to end",
    description:
      "Ktenor designs and builds premium websites from scratch: landing pages, business sites and online stores. One person from the first sketch to launch.",
    ogAlt: "Ktenor — web studio",
  },

  nav: {
    work: "Work",
    services: "Services",
    process: "Process",
    about: "About",
    contact: "Contact",
    menu: "Menu",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    skipToContent: "Skip to content",
  },

  actions: {
    startProject: "Start a project",
    seeWork: "See the work",
    order: "Order",
    tellMeMore: "Tell me about your project",
    backHome: "Back home",
  },

  theme: {
    toggle: "Switch theme",
    toDark: "Switch to dark theme",
    toLight: "Switch to light theme",
  },

  language: {
    label: "Language",
    switchTo: "Switch to Slovak",
  },

  hero: {
    eyebrow: "Web studio",
    headline: "Premium websites, designed and built end to end.",
    sub: "One person behind every project — from the first sketch to the live site. No templates, no handovers, no compromise on the details.",
  },

  footer: {
    tagline: "Premium websites, designed and built end to end.",
    navTitle: "Navigate",
    contactTitle: "Contact",
    settingsTitle: "Preferences",
    social: "Social",
    rights: "All rights reserved.",
    privacy: "Privacy Policy",
    location: "Bratislava, Slovakia — working remotely across the country",
  },
};

export default en;
export type Dictionary = typeof en;
