"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n";
import { site } from "@/lib/site";
import { Logo } from "@/components/brand/Logo";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";

type Props = { locale: Locale; t: Dictionary };

export function Header({ locale, t }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const links = [
    { href: "#work", label: t.nav.work },
    { href: "#services", label: t.nav.services },
    { href: "#process", label: t.nav.process },
    { href: "#about", label: t.nav.about },
    { href: "#contact", label: t.nav.contact },
  ];

  // Glass only once there is something behind it to refract.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock the page, trap focus and honour Escape while the menu is open.
  useEffect(() => {
    if (!open) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-[var(--z-header)] transition-[background-color,border-color,backdrop-filter] duration-[var(--dur-slow)] ease-[var(--ease-standard)] ${
        scrolled || open ? "glass border-x-0 border-t-0" : "border-b border-transparent"
      }`}
    >
      <div className="container-page flex h-[72px] items-center justify-between gap-6">
        <Link
          href={`/${locale}`}
          aria-label={site.name}
          className="flex items-center gap-3 rounded-[var(--radius-xs)]"
        >
          <Logo data-logo-target className="h-7 w-auto" />
          <span
            className="font-display text-[0.95rem] font-medium uppercase leading-none"
            style={{ letterSpacing: "0.18em" }}
          >
            Ktenor
          </span>
        </Link>

        <nav aria-label={t.nav.menu} className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-[var(--radius-xs)] px-3.5 py-2 text-sm text-text-secondary transition-colors duration-[var(--dur-base)] ease-[var(--ease-standard)] hover:text-text"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <LanguageSwitcher current={locale} label={t.language.label} />
          <span aria-hidden className="mx-1 h-5 w-px bg-line-strong" />
          <ThemeToggle labels={{ toDark: t.theme.toDark, toLight: t.theme.toLight }} />

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            className="ml-1 grid size-11 cursor-pointer place-items-center rounded-[var(--radius-sm)] text-text-secondary transition-colors duration-[var(--dur-base)] hover:bg-[var(--glass-bg-hover)] hover:text-text lg:hidden"
          >
            <Hamburger open={open} />
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        ref={panelRef}
        role="dialog"
        aria-modal={open}
        aria-label={t.nav.menu}
        aria-hidden={!open}
        inert={!open}
        className={`overflow-hidden border-t border-line transition-[max-height,opacity] duration-[var(--dur-slower)] ease-[var(--ease-out-expo)] lg:hidden ${
          open ? "max-h-[70vh] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="container-page flex flex-col py-4">
          {links.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${70 * i}ms` : "0ms" }}
              className={`border-b border-line py-4 font-display text-h3 transition-[opacity,transform] duration-[var(--dur-slow)] ease-[var(--ease-out-expo)] last:border-b-0 ${
                open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

/** Bars morph into a cross rather than swapping icons. */
function Hamburger({ open }: { open: boolean }) {
  const base =
    "absolute left-0 h-px w-full bg-current transition-[transform,opacity] duration-[var(--dur-slow)] ease-[var(--ease-out-expo)]";
  return (
    <span aria-hidden className="relative block h-[10px] w-[18px]">
      <span
        className={base}
        style={{ top: 0, transform: open ? "translateY(5px) rotate(45deg)" : "none" }}
      />
      <span
        className={base}
        style={{ bottom: 0, transform: open ? "translateY(-5px) rotate(-45deg)" : "none" }}
      />
    </span>
  );
}
