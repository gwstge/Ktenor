"use client";

import { useEffect, useState } from "react";
import { Logo, Wordmark } from "@/components/brand/Logo";

/**
 * TEMPORARY — design token preview.
 * Exists so the foundation can be reviewed in both themes before any
 * section is built. Replaced by the real home page.
 */

const swatches = [
  { name: "bg", var: "--c-bg" },
  { name: "bg-raised", var: "--c-bg-raised" },
  { name: "bg-overlay", var: "--c-bg-overlay" },
  { name: "text", var: "--c-text" },
  { name: "text-secondary", var: "--c-text-secondary" },
  { name: "text-muted", var: "--c-text-muted" },
  { name: "accent", var: "--c-accent" },
  { name: "accent-strong", var: "--c-accent-strong" },
  { name: "accent-deep", var: "--c-accent-deep" },
  { name: "silver", var: "--c-silver" },
];

const scale = [
  { label: "display", cls: "text-display" },
  { label: "h1", cls: "text-h1" },
  { label: "h2", cls: "text-h2" },
  { label: "h3", cls: "text-h3" },
];

export default function TokenPreview() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <main className="container-page py-[var(--spacing-block)]">
      <header className="flex flex-wrap items-center justify-between gap-4 pb-[var(--spacing-block)]">
        <div>
          <p className="text-caption uppercase tracking-[0.22em] text-text-muted">
            Foundation preview
          </p>
          <h1 className="text-h2 mt-2">Design tokens</h1>
        </div>

        <button
          type="button"
          onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
          className="glass cursor-pointer rounded-[var(--radius-sm)] px-5 py-3 text-sm font-medium transition-colors duration-[var(--dur-base)] ease-[var(--ease-standard)] hover:bg-[var(--glass-bg-hover)]"
        >
          {theme === "dark" ? "Switch to light" : "Switch to dark"}
        </button>
      </header>

      <section className="border-t border-line pt-[var(--spacing-block)]">
        <h2 className="text-h3 mb-6">Logo</h2>
        <div className="flex flex-wrap items-end gap-x-16 gap-y-10">
          <div>
            <Logo title="Ktenor" className="h-40 w-auto" />
            <p className="mt-4 text-caption text-text-muted">mark</p>
          </div>
          <div>
            <Logo variant="compact" className="h-40 w-auto" />
            <p className="mt-4 text-caption text-text-muted">compact — favicon</p>
          </div>
          <div>
            <Wordmark className="text-[2.5rem]" />
            <p className="mt-4 text-caption text-text-muted">lockup</p>
          </div>
        </div>

        <div className="mt-10 flex items-end gap-8">
          {[16, 24, 32, 48].map((px) => (
            <div key={px} className="text-center">
              <Logo variant="compact" style={{ height: px }} className="w-auto" />
              <p className="mt-3 text-caption text-text-muted tabular">{px}px</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-[var(--spacing-block)] border-t border-line pt-[var(--spacing-block)]">
        <h2 className="text-h3 mb-6">Palette</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {swatches.map((s) => (
            <div key={s.name}>
              <div
                className="h-20 w-full rounded-[var(--radius-sm)] border border-line-strong"
                style={{ background: `var(${s.var})` }}
              />
              <p className="mt-2 text-caption text-text-secondary">{s.name}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-[var(--spacing-block)] border-t border-line pt-[var(--spacing-block)]">
        <h2 className="text-h3 mb-6">Type scale — Clash Display</h2>
        <div className="space-y-4">
          {scale.map((s) => (
            <div key={s.label} className="flex items-baseline gap-6">
              <span className="w-20 shrink-0 text-caption text-text-muted tabular">
                {s.label}
              </span>
              <span
                className="font-display"
                style={{ fontSize: `var(--${s.cls})`, lineHeight: 1.08 }}
              >
                Ktenor
              </span>
            </div>
          ))}
        </div>

        <div className="mt-10 max-w-[65ch] space-y-3">
          <p className="text-lead">
            Satoshi at lead size — the register used for hero sub-headlines and
            section intros.
          </p>
          <p className="text-text-secondary">
            Body copy in Satoshi. Every colour pair on this page clears WCAG AA
            in both themes, including the muted tone below.
          </p>
          <p className="text-text-muted text-sm">
            Muted text — the lowest contrast allowed anywhere on the site.
          </p>
        </div>
      </section>

      <section className="mt-[var(--spacing-block)] border-t border-line pt-[var(--spacing-block)] pb-[var(--spacing-section)]">
        <h2 className="text-h3 mb-6">Liquid glass</h2>
        <div className="relative overflow-hidden rounded-[var(--radius-lg)] p-8 sm:p-14">
          <div
            aria-hidden
            className="absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(60% 80% at 25% 40%, var(--c-accent-deep), transparent 70%), radial-gradient(50% 70% at 75% 60%, var(--c-accent), transparent 75%)",
              opacity: 0.55,
            }}
          />
          <div className="glass max-w-md rounded-[var(--radius-md)] p-6">
            <p className="font-display text-h3">Glass surface</p>
            <p className="mt-2 text-sm text-text-secondary">
              Blur, saturation and hairline edge all come from tokens. On a weak
              device the blur drops to zero and the fill carries the surface.
            </p>
            <button
              type="button"
              className="mt-5 cursor-pointer rounded-[var(--radius-sm)] bg-accent px-5 py-2.5 text-sm font-medium text-accent-contrast transition-colors duration-[var(--dur-base)] ease-[var(--ease-standard)] hover:bg-accent-strong"
            >
              Accent button
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
