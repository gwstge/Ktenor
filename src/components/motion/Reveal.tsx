"use client";

import { useEffect } from "react";

/**
 * Scroll reveals with an IntersectionObserver and two CSS custom properties —
 * no animation library for something the platform already does well.
 *
 * The hidden state lives in CSS, which means a reveal that never fires leaves
 * content permanently invisible. That is far worse than no animation, so this
 * never relies on the observer alone: an immediate pass catches whatever is
 * already on screen, a scroll listener acts as a second trigger, and a timeout
 * reveals anything still hidden in view. Any one of them is enough.
 */
export function Reveal() {
  useEffect(() => {
    const selector = "[data-reveal], [data-reveal-group] > *";

    // Group items are already hidden by CSS; JS only gives them their stagger.
    document.querySelectorAll<HTMLElement>("[data-reveal-group]").forEach((group) => {
      Array.from(group.children).forEach((child, index) => {
        (child as HTMLElement).style.setProperty("--reveal-delay", `${index * 60}ms`);
      });
    });

    const targets = Array.from(document.querySelectorAll<HTMLElement>(selector));
    const reveal = (el: Element) => el.setAttribute("data-revealed", "");

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || typeof IntersectionObserver === "undefined") {
      targets.forEach(reveal);
      return;
    }

    const pending = new Set(targets);

    const sweep = () => {
      if (pending.size === 0) return;
      const viewport = window.innerHeight;
      pending.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < viewport * 0.92 && rect.bottom > 0) {
          reveal(el);
          observer.unobserve(el);
          pending.delete(el);
        }
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          reveal(entry.target);
          // One-shot: re-animating on the way back up reads as a glitch.
          observer.unobserve(entry.target);
          pending.delete(entry.target as HTMLElement);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );

    targets.forEach((el) => observer.observe(el));
    sweep();

    window.addEventListener("scroll", sweep, { passive: true });
    window.addEventListener("resize", sweep, { passive: true });
    // Last resort: if neither the observer nor a scroll ever arrives, nothing
    // on screen should still be invisible.
    const failsafe = window.setTimeout(sweep, 2500);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", sweep);
      window.removeEventListener("resize", sweep);
      window.clearTimeout(failsafe);
    };
  }, []);

  return null;
}
