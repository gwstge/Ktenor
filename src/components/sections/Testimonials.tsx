import type { Dictionary } from "@/i18n";
import { site } from "@/lib/site";
import { Section } from "@/components/ui/Section";

export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  role?: string;
};

/**
 * No reviews yet, and the owner would rather say so plainly than hide the
 * section — the same call made for Work: one deliberate placeholder reads as
 * "this is coming," a missing section reads as nothing at all.
 *
 * `site.features.testimonials` still gates the real grid below; flip it once
 * `testimonials` holds actual quotes and this placeholder steps aside.
 */
export const testimonials: Testimonial[] = [];

export function Testimonials({ t }: { t: Dictionary }) {
  if (site.features.testimonials && testimonials.length > 0) {
    return (
      <Section eyebrow={t.testimonials.eyebrow} title={t.testimonials.title}>
        <ul className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((item) => (
            <li key={item.id}>
              <figure className="surface flex h-full flex-col rounded-[var(--radius-lg)] p-7">
                <span aria-hidden className="flex gap-1">
                  <span className="h-4 w-[3px] rounded-full bg-accent" />
                  <span className="h-4 w-[3px] rounded-full bg-accent-mid" />
                  <span className="h-4 w-[3px] rounded-full bg-accent-deep" />
                </span>
                <blockquote className="mt-6 flex-1 text-[length:var(--text-lead)]">
                  {item.quote}
                </blockquote>
                <figcaption className="mt-6 border-t border-line pt-5 text-sm">
                  <span className="text-text">{item.author}</span>
                  {item.role ? (
                    <span className="block text-caption text-text-muted">{item.role}</span>
                  ) : null}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Section>
    );
  }

  return (
    <Section eyebrow={t.testimonials.eyebrow} title={t.testimonials.title}>
      <article className="surface relative overflow-hidden rounded-[var(--radius-lg)] px-7 py-14 text-center sm:px-14 sm:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(70% 100% at 50% 0%, var(--c-accent-deep), transparent 62%)",
          }}
        />
        <span aria-hidden className="relative mx-auto flex w-fit items-end gap-1.5">
          <span className="h-7 w-[5px] rounded-full bg-line-strong" />
          <span className="h-7 w-[5px] rounded-full bg-line-strong" />
          <span className="h-7 w-[5px] rounded-full bg-line-strong" />
        </span>
        <p className="relative mt-8 text-[length:var(--text-h2)]">{t.testimonials.comingSoon}</p>
        <p className="relative mx-auto mt-4 max-w-[46ch] text-text-secondary">
          {t.testimonials.empty}
        </p>
      </article>
    </Section>
  );
}
