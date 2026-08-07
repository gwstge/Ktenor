import type { Dictionary } from "@/i18n";
import { site } from "@/lib/site";
import { projectIds } from "@/content/services";
import { Section } from "@/components/ui/Section";

/**
 * The demos do not exist yet, so the cards are honest about it: no dead links
 * dressed up as live ones. Each is labelled a concept so nothing here can be
 * mistaken for client work.
 */
export function Work({ t }: { t: Dictionary }) {
  return (
    <Section id="work" eyebrow={t.work.eyebrow} title={t.work.title} intro={t.work.intro}>
      <ul data-reveal-group className="grid gap-5 sm:grid-cols-2">
        {projectIds.map((id, index) => {
          const project = t.work.projects[id];
          return (
            <li key={id}>
              <article className="group glass relative h-full overflow-hidden rounded-[var(--radius-lg)] p-7 transition-[background-color,transform] duration-[var(--dur-slow)] ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:bg-[var(--glass-bg-hover)] sm:p-9">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-[var(--dur-slow)] group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(120% 90% at 12% 0%, var(--c-accent-deep), transparent 62%)",
                  }}
                />

                <div className="relative flex items-start justify-between gap-4">
                  <span className="rounded-full border border-line-strong px-3 py-1 text-caption uppercase tracking-[0.16em] text-text-muted">
                    {t.work.badge}
                  </span>
                  <span className="text-caption tabular text-text-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="relative mt-14 text-[length:var(--text-h2)]">
                  {project.name}
                </h3>
                <p className="relative mt-3 max-w-[38ch] text-text-secondary">
                  {project.description}
                </p>

                <p className="relative mt-8 flex items-center gap-2.5 text-caption text-text-muted">
                  <span aria-hidden className="size-1.5 rounded-full bg-accent" />
                  {site.features.portfolioLinks ? project.name : t.work.comingSoon}
                </p>
              </article>
            </li>
          );
        })}
      </ul>

      <p className="mt-8 text-caption text-text-muted">{t.work.note}</p>
    </Section>
  );
}
