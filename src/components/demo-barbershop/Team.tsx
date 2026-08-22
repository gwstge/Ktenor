import Image from "next/image";
import { team } from "@/content/demo-barbershop/team";

export function Team() {
  return (
    <section id="team" className="relative isolate py-20 md:py-28">
      <div className="section-wash" data-tone="copper" aria-hidden />
      <div className="container-page relative z-[1]">
        <header data-reveal className="mx-auto max-w-xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-copper">The barbers</p>
          <h2 className="mt-3 font-display text-[clamp(2.2rem,4vw,3rem)] leading-tight text-ivory">
            Four chairs, four specialties.
          </h2>
        </header>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((b) => (
            <article
              key={b.name}
              data-reveal
              className="card-hover overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--charcoal-raised)]"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <Image
                  src={b.photo}
                  alt={b.name}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 90vw"
                  className="gallery-photo object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="font-display text-[1.1rem] text-ivory">{b.name}</h3>
                <p className="mt-0.5 text-xs uppercase tracking-[0.1em] text-copper">{b.role}</p>
                <p className="mt-3 text-sm text-ivory-muted">
                  {b.specialty} · {b.years} yrs
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ivory-soft">{b.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
