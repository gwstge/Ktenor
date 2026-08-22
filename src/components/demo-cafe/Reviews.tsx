import { reviews } from "@/content/demo-cafe/reviews";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1 text-terracotta" aria-label={`${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <svg key={n} viewBox="0 0 20 20" width={15} height={15} aria-hidden>
          <path
            d="M10 1.6l2.47 5.15 5.53.8-4 4.03.94 5.72L10 14.6l-4.94 2.7.94-5.72-4-4.03 5.53-.8L10 1.6z"
            fill={n <= rating ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>
      ))}
    </div>
  );
}

export function Reviews() {
  return (
    <section id="reviews" className="relative isolate py-20 md:py-28">
      <div className="section-wash" data-tone="terracotta" aria-hidden />
      <div className="container-page relative z-[1]">
        <header data-reveal className="mx-auto max-w-xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-terracotta">
            Regulars say
          </p>
          <h2 className="mt-3 font-display text-[clamp(2.2rem,4vw,3rem)] leading-tight text-ink">
            Word of mouth is our marketing.
          </h2>
        </header>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r) => (
            <figure
              key={r.name}
              data-reveal
              className="card-hover rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-6"
            >
              <Stars rating={r.rating} />
              <blockquote className="mt-4 text-[0.95rem] leading-relaxed text-ink-soft">
                “{r.text}”
              </blockquote>
              <figcaption className="mt-4 text-sm font-semibold text-ink">{r.name}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
