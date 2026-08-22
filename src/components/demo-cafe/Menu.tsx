import Image from "next/image";
import { menu } from "@/content/demo-cafe/menu";

export function Menu() {
  return (
    <section id="menu" className="relative isolate py-20 md:py-28">
      <div className="section-wash" data-tone="terracotta" aria-hidden />
      <div className="container-page relative z-[1]">
        <header data-reveal className="mx-auto max-w-xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-terracotta">
            The menu
          </p>
          <h2 className="mt-3 font-display text-[clamp(2.2rem,4vw,3rem)] leading-tight text-ink">
            Made in small batches, every morning.
          </h2>
        </header>

        <div className="mt-16 flex flex-col gap-20">
          {menu.map((group) => (
            <div key={group.category}>
              <h3 data-reveal className="font-display text-[1.6rem] text-ink">
                {group.category}
              </h3>
              <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((item) => (
                  <article
                    key={item.name}
                    data-reveal
                    className="card-hover overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--paper)]"
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden">
                      <Image
                        src={item.photo}
                        alt={item.name}
                        fill
                        sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 90vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="p-5">
                      <div className="flex items-baseline justify-between gap-3">
                        <h4 className="font-display text-[1.1rem] leading-snug text-ink">
                          {item.name}
                        </h4>
                        <span className="shrink-0 text-sm font-semibold text-terracotta-deep">
                          {item.price}
                        </span>
                      </div>
                      <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{item.desc}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
