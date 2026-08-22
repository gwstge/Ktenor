import { site } from "@/content/demo-barbershop/site";

export function Contact() {
  return (
    <section id="contact" className="relative isolate py-20 md:py-28">
      <div className="section-wash" data-tone="copper" aria-hidden />
      <div className="container-page relative z-[1]">
        <header data-reveal className="mx-auto max-w-xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-copper">Find us</p>
          <h2 className="mt-3 font-display text-[clamp(2.2rem,4vw,3rem)] leading-tight text-ivory">
            Karpatská 8, Staré Mesto.
          </h2>
        </header>

        <div
          data-reveal
          className="mt-14 grid grid-cols-1 gap-8 overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--charcoal-raised)] md:grid-cols-2"
        >
          <div className="p-8 sm:p-10">
            <dl className="grid gap-6">
              <div>
                <dt className="text-sm font-semibold uppercase tracking-[0.14em] text-ivory-muted">
                  Address
                </dt>
                <dd className="mt-1.5 text-[1.05rem] text-ivory">{site.address}</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold uppercase tracking-[0.14em] text-ivory-muted">
                  Phone
                </dt>
                <dd className="mt-1.5 text-[1.05rem] text-ivory">
                  <a href={`tel:${site.phone}`} className="hover:text-copper">
                    {site.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-semibold uppercase tracking-[0.14em] text-ivory-muted">
                  Instagram
                </dt>
                <dd className="mt-1.5 text-[1.05rem] text-ivory">
                  <a
                    href={site.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-copper"
                  >
                    {site.instagram}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-semibold uppercase tracking-[0.14em] text-ivory-muted">
                  Hours
                </dt>
                <dd className="mt-1.5 grid gap-1 text-[1.05rem] text-ivory">
                  {site.hours.map((h) => (
                    <div key={h.day} className="flex justify-between gap-4 text-[0.98rem]">
                      <span className="text-ivory-soft">{h.day}</span>
                      <span>{h.time}</span>
                    </div>
                  ))}
                </dd>
              </div>
            </dl>
          </div>

          <div className="min-h-[320px]">
            <iframe
              title="Forge & Blade location"
              src={site.mapEmbedSrc}
              loading="lazy"
              className="h-full w-full grayscale contrast-[1.1] brightness-[0.85]"
              style={{ border: 0, minHeight: 320 }}
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
