import Image from "next/image";
import { gallery } from "@/content/demo-cafe/gallery";

export function Gallery() {
  return (
    <section id="gallery" className="relative isolate bg-[var(--cream-deep)] py-20 md:py-28">
      <div className="section-wash" data-tone="gold" aria-hidden />
      <div className="container-page relative z-[1]">
        <header data-reveal className="mx-auto max-w-xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-terracotta">
            Inside
          </p>
          <h2 className="mt-3 font-display text-[clamp(2.2rem,4vw,3rem)] leading-tight text-ink">
            Warm wood, low light, no rush.
          </h2>
        </header>

        <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          {gallery.map((photo, i) => (
            <div
              key={photo.src}
              data-reveal
              className={`relative overflow-hidden rounded-xl ${
                i === 0 || i === 5 ? "col-span-2 row-span-2" : ""
              }`}
              style={{ aspectRatio: i === 0 || i === 5 ? "4 / 3" : "3 / 4" }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
