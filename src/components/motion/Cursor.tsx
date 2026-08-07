"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Deliberately quiet: a dot that tracks exactly and a ring that lags a little
 * and opens over anything interactive. No trail, no magnetism, no labels —
 * an over-eager cursor is the fastest way to make a premium page feel cheap.
 *
 * Only on devices with a real pointer, and never under reduced motion.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    setEnabled(true);
    document.documentElement.dataset.cursor = "custom";

    const pointer = { x: innerWidth / 2, y: innerHeight / 2 };
    const ring = { ...pointer };
    let frame = 0;
    let visible = false;

    const onMove = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;

      if (!visible) {
        visible = true;
        dotRef.current?.style.setProperty("opacity", "1");
        ringRef.current?.style.setProperty("opacity", "1");
      }

      const interactive = (event.target as HTMLElement | null)?.closest?.(
        'a, button, input, select, textarea, summary, [tabindex]:not([tabindex="-1"])',
      );
      ringRef.current?.toggleAttribute("data-open", Boolean(interactive));
    };

    const onLeave = () => {
      visible = false;
      dotRef.current?.style.setProperty("opacity", "0");
      ringRef.current?.style.setProperty("opacity", "0");
    };

    const onDown = () => ringRef.current?.toggleAttribute("data-press", true);
    const onUp = () => ringRef.current?.toggleAttribute("data-press", false);

    const tick = () => {
      // Light easing — enough to feel physical, not enough to feel laggy.
      ring.x += (pointer.x - ring.x) * 0.18;
      ring.y += (pointer.y - ring.y) * 0.18;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pointer.x}px, ${pointer.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      delete document.documentElement.dataset.cursor;
    };
  }, []);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[var(--z-cursor)]">
      <div
        ref={dotRef}
        className="fixed left-0 top-0 size-[5px] rounded-full bg-text opacity-0 transition-opacity duration-[var(--dur-base)]"
      />
      <div
        ref={ringRef}
        data-cursor-ring
        className="fixed left-0 top-0 size-8 rounded-full border border-line-strong opacity-0"
      />
    </div>
  );
}
