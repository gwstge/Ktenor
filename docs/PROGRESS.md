# Progress

Last updated: 2026-08-08

## Done

**Foundation**
- [x] Project on `D:\ktenor`, npm cache on `D:\npm-cache`, repo `gwstge/Ktenor`
- [x] Next.js 16.3 + React 19.2 + TypeScript + Tailwind v4
- [x] Clash Display + Satoshi self-hosted (~133 KB, zero third-party requests)
- [x] Token system: both themes as designed counterparts, glass tiers with
      degradation, fluid type scale, motion and z-index scales, WCAG AA floor
- [x] Logo rebuilt as SVG from measured geometry; favicon set; compact cut for
      small sizes

**Structure**
- [x] `/sk` and `/en`, bare domain redirects to the remembered language
- [x] Typed dictionaries — a missing translation is a type error
- [x] Theme applied before first paint; choice persisted for a year
- [x] Weak-device probe drops the glass blur before anything renders
- [x] Header with focus-trapped mobile menu; extended footer

**Content**
- [x] Hero — stays dark in both themes, video attaches after mount
- [x] Work, Services (+ add-ons), Process, Principles, Advantages, FAQ,
      final CTA, Contact form
- [x] Testimonials built but gated behind `site.features.testimonials`
- [x] Intro screen — bars track real readiness, mark flies to the header,
      once per session, suppressed before first paint on repeat visits

**Edges**
- [x] Privacy Policy describing only what the site actually does
- [x] Branded 404 and 500, plus a dependency-free global error page
- [x] sitemap.xml with per-locale alternates, robots.txt
- [x] OG image generated from the dictionary at build time

## Next

- [ ] Re-encode the hero video — **blocked, see below**
- [ ] `favicon.ico` for legacy browsers (currently a harmless 404)
- [ ] Scroll choreography: section reveals, Lenis smooth scroll, restrained
      custom cursor
- [ ] Full pass on 375px and landscape, real-device check
- [ ] Push to GitHub and first Vercel deploy
- [ ] Then: the four demo projects

## Open questions for the owner

1. **The hero video still ships at 5 MB.** ffmpeg is not installed, so it
   cannot be re-encoded yet. Either install ffmpeg, or approve `ffmpeg-static`
   as a dev dependency. Until then the first screen is far heavier than the
   performance target allows.
2. **Domain** — `NEXT_PUBLIC_SITE_URL` currently falls back to a placeholder,
   which is what canonicals, sitemap, hreflang and OG all resolve against.
3. **Slovak proof-read** by a native speaker before launch.

## Conventions

- Nothing in `BRIEF.md` changes without the owner's approval.
- Each finished section gets its own commit.
- Prices, timelines and section ids live in `src/content/services.ts` — stated
  once, never duplicated into copy.
