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
 * Built and ready, but switched off until there is a real review to show.
 * An empty "coming soon" testimonials block on a studio site announces that
 * there have been no clients yet — worse than not having the section at all.
 * Flip `site.features.testimonials` when the first one arrives.
 */
export const testimonials: Testimonial[] = [];

export function Testimonials({ t }: { t: Dictionary }) {
  if (!site.features.testimonials || testimonials.length === 0) return null;

  return (
    <Section eyebrow={t.testimonials.eyebrow} title={t.testimonials.title}>
      <ul className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {testimonials.map((item) => (
          <li key={item.id}>
            <figure className="glass flex h-full flex-col rounded-[var(--radius-lg)] p-7">
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
