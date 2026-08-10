/**
 * Language-independent facts about each service. Names and descriptions live
 * in the dictionaries; prices and timelines live here so they are stated once.
 *
 * Order is display order: ascending by price and complexity.
 */
export const serviceIds = [
  "mini",
  "landing",
  "portfolio",
  "business",
  "store",
  "custom",
] as const;

export type ServiceId = (typeof serviceIds)[number];

export type Service = {
  id: ServiceId;
  /** EUR. `null` means quoted per project. */
  priceFrom: number | null;
};

export const services: Service[] = [
  { id: "mini", priceFrom: 200 },
  { id: "landing", priceFrom: 400 },
  { id: "portfolio", priceFrom: 700 },
  { id: "business", priceFrom: 900 },
  { id: "store", priceFrom: 2200 },
  { id: "custom", priceFrom: null },
];

export const addonIds = [
  "multilingual",
  "support",
  "copywriting",
  "content",
  "hosting",
  "integrations",
] as const;

export type AddonId = (typeof addonIds)[number];

/** `null` = quoted per project. */
export const addonPrices: Record<AddonId, number | null> = {
  multilingual: 150,
  support: 50,
  copywriting: null,
  content: null,
  hosting: null,
  integrations: null,
};

export const processIds = [
  "analysis",
  "planning",
  "design",
  "development",
  "testing",
  "launch",
] as const;

export type ProcessId = (typeof processIds)[number];

export const principleIds = [
  "honesty",
  "deadlines",
  "details",
  "quality",
  "result",
  "transparency",
] as const;

export const advantageIds = [
  "direct",
  "stack",
  "performance",
  "responsive",
  "seo",
  "bespoke",
] as const;

/**
 * Kept, though nothing renders it right now: the Work section shows a single
 * placeholder until real client projects exist. These are the four demo builds
 * that were planned, so bringing them back is a matter of wiring, not research.
 */
export const projectIds = ["cafe", "store", "dental", "realestate"] as const;

export type ProjectId = (typeof projectIds)[number];

export const faqIds = [
  "timeline",
  "price",
  "content",
  "revisions",
  "payment",
  "after",
] as const;
