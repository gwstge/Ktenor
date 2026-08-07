"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { registerLenis } from "@/lib/scroll";

/**
 * The one animation dependency that earns its place: inertial scrolling is
 * genuinely hard to hand-roll well, and it is what makes a long page feel
 * expensive rather than merely long.
 *
 * Disabled outright under reduced motion — hijacking the scroll is exactly
 * what that preference exists to prevent.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.05,
      // Same expo-out curve as every other transition on the site.
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.6,
    });
    registerLenis(lenis);
    if (process.env.NODE_ENV === "development") {
      (window as unknown as { lenis?: Lenis }).lenis = lenis;
    }

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    // In-page anchors have to go through Lenis or they fight it.
    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement | null)?.closest?.('a[href^="#"]');
      if (!anchor) return;
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      event.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -72 });
    };

    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(frame);
      registerLenis(null);
      lenis.destroy();
    };
  }, []);

  return null;
}
