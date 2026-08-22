import { BeanMark } from "./BeanMark";

export function Hero() {
  return (
    <section id="top" className="pt-8 md:pt-12">
      <div className="container-page">
        <div className="stone-slab grain relative overflow-hidden rounded-[28px] px-7 py-20 text-center sm:px-14 sm:py-28">
          <div className="relative mx-auto flex max-w-2xl flex-col items-center">
            <BeanMark className="size-10 text-[var(--cream)]/85" />
            <h1 className="mt-6 font-display text-[clamp(2.6rem,6vw,4.6rem)] leading-[1.05] text-[var(--cream)]">
              Ember &amp; Oak
            </h1>
            <p className="mt-5 max-w-md text-balance text-[1.05rem] leading-relaxed text-[var(--cream)]/80">
              A quiet corner of Staré Mesto for slow mornings, honest coffee and
              pastry worth crossing town for.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#menu"
                className="rounded-full bg-[var(--cream)] px-7 py-3.5 text-sm font-semibold text-ink transition-transform duration-300 hover:-translate-y-0.5"
              >
                View the menu
              </a>
              <a
                href="#contact"
                className="rounded-full border border-[var(--cream)]/35 px-7 py-3.5 text-sm font-semibold text-[var(--cream)] transition-colors duration-300 hover:bg-[var(--cream)]/10"
              >
                Find us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
