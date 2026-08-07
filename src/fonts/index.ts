import localFont from "next/font/local";

/**
 * Self-hosted so the site makes zero third-party font requests.
 * Weights are trimmed to what the design actually uses — every extra
 * weight is dead payload on the critical path.
 */
export const clashDisplay = localFont({
  variable: "--font-display",
  display: "swap",
  preload: true,
  fallback: ["Segoe UI", "system-ui", "sans-serif"],
  src: [
    { path: "./ClashDisplay-400.woff2", weight: "400", style: "normal" },
    { path: "./ClashDisplay-500.woff2", weight: "500", style: "normal" },
    { path: "./ClashDisplay-600.woff2", weight: "600", style: "normal" },
    { path: "./ClashDisplay-700.woff2", weight: "700", style: "normal" },
  ],
});

export const satoshi = localFont({
  variable: "--font-body",
  display: "swap",
  preload: true,
  fallback: ["Segoe UI", "system-ui", "sans-serif"],
  src: [
    { path: "./Satoshi-400.woff2", weight: "400", style: "normal" },
    { path: "./Satoshi-500.woff2", weight: "500", style: "normal" },
    { path: "./Satoshi-700.woff2", weight: "700", style: "normal" },
  ],
});
