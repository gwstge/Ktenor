import { BladeMark } from "./BladeMark";
import { PipeAccent } from "./PipeAccent";

export function Hero() {
  return (
    <section id="top" className="pt-8 md:pt-12">
      <div className="container-page">
        <div className="brick-slab relative overflow-hidden rounded-[20px] px-7 py-20 text-center sm:px-14 sm:py-28">
          <PipeAccent className="pointer-events-none absolute -left-4 -top-2 h-28 w-44 opacity-70 sm:h-36 sm:w-56" />
          <PipeAccent className="pointer-events-none absolute -bottom-6 -right-6 h-28 w-44 rotate-180 opacity-50 sm:h-36 sm:w-56" />

          <div className="relative mx-auto flex max-w-2xl flex-col items-center">
            <BladeMark className="size-10 text-copper" />
            <h1 className="mt-6 font-display text-[clamp(2.6rem,6vw,4.6rem)] leading-[1.05] text-ivory">
              Forge &amp; Blade
            </h1>
            <p className="mt-5 max-w-md text-balance text-[1.05rem] leading-relaxed text-ivory-soft">
              Precision fades, straight razor shaves and a chair that isn&apos;t
              rushing you out. Staré Mesto, Bratislava.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#booking"
                className="rounded-sm bg-copper px-7 py-3.5 text-sm font-semibold text-charcoal-deep transition-transform duration-300 hover:-translate-y-0.5"
              >
                Book an appointment
              </a>
              <a
                href="#services"
                className="rounded-sm border border-ivory/25 px-7 py-3.5 text-sm font-semibold text-ivory transition-colors duration-300 hover:bg-ivory/10"
              >
                See services
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
