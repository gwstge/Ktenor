import { site } from "@/content/demo-cafe/site";

export function Contact() {
  return (
    <section id="contact" className="bg-[var(--cream-deep)] py-20 md:py-28">
      <div className="container-page">
        <header data-reveal className="mx-auto max-w-xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-terracotta">
            Find us
          </p>
          <h2 className="mt-3 font-display text-[clamp(2.2rem,4vw,3rem)] leading-tight text-ink">
            Zámocká 11, Staré Mesto.
          </h2>
        </header>

        <div data-reveal className="mt-14 grid grid-cols-1 gap-8 overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--paper)] md:grid-cols-2">
          <div className="p-8 sm:p-10">
            <dl className="grid gap-6">
              <div>
                <dt className="text-sm font-semibold uppercase tracking-[0.14em] text-ink-muted">
                  Address
                </dt>
                <dd className="mt-1.5 text-[1.05rem] text-ink">{site.address}</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold uppercase tracking-[0.14em] text-ink-muted">
                  Phone
                </dt>
                <dd className="mt-1.5 text-[1.05rem] text-ink">
                  <a href={`tel:${site.phone}`} className="hover:text-terracotta">
                    {site.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-semibold uppercase tracking-[0.14em] text-ink-muted">
                  Instagram
                </dt>
                <dd className="mt-1.5 text-[1.05rem] text-ink">
                  <a href={site.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-terracotta">
                    {site.instagram}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-semibold uppercase tracking-[0.14em] text-ink-muted">
                  Hours
                </dt>
                <dd className="mt-1.5 grid gap-1 text-[1.05rem] text-ink">
                  {site.hours.map((h) => (
                    <div key={h.day} className="flex justify-between gap-4 text-[0.98rem]">
                      <span className="text-ink-soft">{h.day}</span>
                      <span>{h.time}</span>
                    </div>
                  ))}
                </dd>
              </div>
            </dl>
          </div>

          <div className="min-h-[320px]">
            <iframe
              title="Ember & Oak location"
              src={site.mapEmbedSrc}
              loading="lazy"
              className="h-full w-full grayscale-[15%] contrast-[1.05]"
              style={{ border: 0, minHeight: 320 }}
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
