import Image from "next/image";
import type { Dictionary } from "@/i18n";
import { Section } from "@/components/ui/Section";

const CAFE_THUMB =
  "https://images.unsplash.com/photo-1605088576635-db443afdcab5?q=80&w=1200&auto=format&fit=crop";

/**
 * There is no client work yet, so the first real thing to show is a demo
 * build — Ember & Oak, a fictional café at /demo/cafe. It's a genuinely
 * separate brand (own layout, fonts, palette; see that route's own files)
 * rather than a screenshot glued onto this page.
 */
export function Work({ t }: { t: Dictionary }) {
  const cafe = t.work.projects.cafe;

  return (
    <Section id="work" eyebrow={t.work.eyebrow} title={t.work.title} intro={t.work.intro}>
      <a
        href="/demo/cafe"
        target="_blank"
        rel="noopener noreferrer"
        data-reveal
        className="surface surface-hover group grid overflow-hidden rounded-[var(--radius-lg)] sm:grid-cols-[1.1fr_1fr]"
      >
        <div className="relative aspect-[16/10] sm:aspect-auto">
          <Image
            src={CAFE_THUMB}
            alt={cafe.name}
            fill
            sizes="(min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-[var(--dur-slower)] ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
          />
        </div>

        <div className="flex flex-col justify-center p-7 sm:p-10">
          <span className="text-caption uppercase tracking-[0.2em] text-text-muted">
            Demo project
          </span>
          <h3 className="mt-3 font-display text-[length:var(--text-h2)]">{cafe.name}</h3>
          <p className="mt-4 text-text-secondary">{cafe.description}</p>
          <span className="link-rule mt-6 inline-flex w-fit items-center gap-2 text-sm font-medium text-accent">
            {cafe.cta}
            <svg aria-hidden viewBox="0 0 16 16" width="14" height="14" fill="none">
              <path
                d="M3.5 8h9M8.5 3.5 13 8l-4.5 4.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </a>

      <p data-reveal className="mt-6 text-center text-sm text-text-muted">
        {t.work.comingSoon}
      </p>
    </Section>
  );
}
