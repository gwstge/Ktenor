import type { Dictionary } from "@/i18n";
import { Section } from "@/components/ui/Section";

/**
 * There is no client work yet and the section says so plainly. A single
 * deliberate card reads as a decision; a grid of empty slots or invented
 * placeholders would read as an unfinished site.
 *
 * The three-bar mark is the same motif used in the logo and the intro loader,
 * so the placeholder still belongs to the brand rather than sitting outside it.
 */
export function Work({ t }: { t: Dictionary }) {
  return (
    <Section id="work" eyebrow={t.work.eyebrow} title={t.work.title}>
      <article
        data-reveal
        className="surface surface-hover group relative overflow-hidden rounded-[var(--radius-lg)] px-7 py-14 sm:px-14 sm:py-20"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-70 transition-opacity duration-[var(--dur-slow)] group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(90% 120% at 8% 0%, var(--c-accent-deep), transparent 58%)",
          }}
        />

        <div className="relative max-w-[52ch]">
          {/* The brand's three bars, held mid-sequence: the third is still dim
              because the work it stands for has not happened yet. */}
          <span aria-hidden className="flex items-end gap-1.5">
            <span className="h-7 w-[5px] rounded-full bg-accent" />
            <span className="h-7 w-[5px] rounded-full bg-accent-mid" />
            <span className="h-7 w-[5px] rounded-full bg-line-strong" />
          </span>

          <h3 className="mt-9 text-[length:var(--text-h2)]">
            {t.work.placeholder.label}
          </h3>

          <p className="mt-5 text-[length:var(--text-lead)] text-text-secondary">
            {t.work.placeholder.description}
          </p>
        </div>
      </article>
    </Section>
  );
}
