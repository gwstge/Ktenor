"use client";

import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/i18n";

type Props = { t: Dictionary };

/**
 * The Hero stays dark in both themes. The 3D render has no alpha channel and
 * its black is baked in, so a light variant would mean a second asset and a
 * seam; keeping the first screen dark is the agreed, deliberate choice.
 *
 * The video never blocks first paint: the poster carries the screen and the
 * source is attached only after mount, and not at all when the visitor asked
 * for reduced motion or is on a constrained device.
 */
export function Hero({ t }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lite = document.documentElement.dataset.glass === "lite";
    if (reduced || lite) return;

    const video = videoRef.current;
    if (!video) return;

    video.src = "/media/hero.mp4";
    video.load();

    const start = () => {
      setReady(true);
      // Muted + playsInline is permitted to autoplay; if a policy still says
      // no, the poster is a complete fallback rather than a broken frame.
      void video.play().catch(() => {});
    };

    if (video.readyState >= 3) start();
    else video.addEventListener("canplay", start, { once: true });

    return () => {
      video.removeEventListener("canplay", start);
      video.removeAttribute("src");
    };
  }, []);

  return (
    <section
      data-theme="dark"
      className="relative isolate flex min-h-[calc(100dvh-72px)] items-center overflow-hidden bg-bg text-text"
    >
      <div aria-hidden className="absolute inset-0 -z-10">
        <video
          ref={videoRef}
          poster="/media/hero-poster.png"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          className="size-full object-cover transition-opacity duration-[1200ms] ease-[var(--ease-out-expo)]"
          style={{ opacity: ready ? 1 : 0.999 }}
        />
        {/* Keeps the right-hand copy legible over the brightest part of the render */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgb(11 12 17 / 0.15) 0%, rgb(11 12 17 / 0.55) 45%, rgb(11 12 17 / 0.88) 78%)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-40"
          style={{ background: "linear-gradient(to bottom, transparent, var(--c-bg))" }}
        />
      </div>

      <div className="container-page grid w-full grid-cols-1 lg:grid-cols-2">
        <div className="lg:col-start-2">
          <p className="text-caption uppercase tracking-[0.24em] text-text-muted">
            {t.hero.eyebrow}
          </p>
          <h1 className="mt-6 max-w-[16ch] text-[length:var(--text-display)]">
            {t.hero.headline}
          </h1>
          <p className="mt-7 max-w-[46ch] text-[length:var(--text-lead)] text-text-secondary">
            {t.hero.sub}
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#contact"
              className="rounded-[var(--radius-sm)] bg-text px-7 py-4 text-sm font-medium text-bg transition-[background-color,transform] duration-[var(--dur-base)] ease-[var(--ease-standard)] hover:bg-silver active:scale-[0.98]"
            >
              {t.actions.startProject}
            </a>
            <a
              href="#work"
              className="glass rounded-[var(--radius-sm)] px-7 py-4 text-sm font-medium transition-[background-color,transform] duration-[var(--dur-base)] ease-[var(--ease-standard)] hover:bg-[var(--glass-bg-hover)] active:scale-[0.98]"
            >
              {t.actions.seeWork}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
