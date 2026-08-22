import { serviceGroups } from "@/content/demo-barbershop/services";

export function Services() {
  return (
    <section id="services" className="relative isolate py-20 md:py-28">
      <div className="section-wash" data-tone="copper" aria-hidden />
      <div className="container-page relative z-[1]">
        <header data-reveal className="mx-auto max-w-xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-copper">Services</p>
          <h2 className="mt-3 font-display text-[clamp(2.2rem,4vw,3rem)] leading-tight text-ivory">
            Every cut, priced up front.
          </h2>
        </header>

        <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-2">
          {serviceGroups.map((group) => (
            <div key={group.category}>
              <h3 data-reveal className="font-display text-[1.5rem] text-copper">
                {group.category}
              </h3>
              <ul className="mt-6 flex flex-col divide-y divide-[var(--line)]">
                {group.items.map((item) => (
                  <li key={item.name} data-reveal className="flex items-start justify-between gap-4 py-4">
                    <div>
                      <p className="font-display text-[1.05rem] text-ivory">{item.name}</p>
                      <p className="mt-1 text-sm leading-relaxed text-ivory-muted">{item.desc}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.1em] text-ivory-muted/70">
                        {item.duration}
                      </p>
                    </div>
                    <span className="shrink-0 whitespace-nowrap font-display text-[1.05rem] text-copper">
                      {item.price}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
