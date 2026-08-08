# Progress

Last updated: 2026-08-08

## Done

**Foundation**
- [x] Project on `D:\ktenor`, npm cache on `D:\npm-cache`, remote `gwstge/Ktenor`
- [x] Next.js 16.3 + React 19.2 + TypeScript + Tailwind v4
- [x] Clash Display + Satoshi self-hosted (~133 KB, zero third-party requests)
- [x] Token system: both themes as designed counterparts, glass tiers with
      degradation, fluid type scale, motion and z-index scales, WCAG AA floor
- [x] Logo rebuilt as SVG from measured geometry; `icon.svg`, `favicon.ico`
      (16/32/48), compact cut for small sizes

**Structure**
- [x] `/sk` and `/en`, bare domain redirects to the remembered language
- [x] Typed dictionaries — a missing translation is a type error
- [x] Theme applied before first paint; choice persisted for a year
- [x] Weak-device probe drops the glass blur before anything renders
- [x] Header with focus-trapped mobile menu; extended footer

**Content**
- [x] Hero — dark in both themes, video attaches after mount
- [x] Work, Services (+ add-ons), Process, Principles, Advantages, FAQ,
      final CTA, Contact form
- [x] Testimonials built but gated behind `site.features.testimonials`
- [x] Intro screen — bars track real readiness, mark flies to the header

**Motion**
- [x] Lenis smooth scroll; scroll locking goes through it, never body overflow
- [x] Scroll reveals with an observer plus three independent fallbacks, so
      content can never be left permanently invisible
- [x] Quiet custom cursor: dot + lagging ring, real pointers only

**Edges**
- [x] Privacy Policy describing only what the site actually does
- [x] Branded 404 and 500, dependency-free global error page
- [x] sitemap.xml with per-locale alternates, robots.txt
- [x] OG image generated from the dictionary at build time

- [x] `favicon.ico` verified (200, correct geometry)
- [x] Responsive pass at 375 / 768 / 1440: no horizontal overflow, grids
      reflow 1/2/3 columns, headline scales 44 → 96px, mobile menu toggles
      `aria-expanded`, `aria-hidden` and `inert` correctly
- [x] Touch targets brought to the 44px floor
- [x] Pushed to GitHub — `origin/main` is in sync

## Resume here (next session)

1. **Re-encode the hero video** — still the 5 MB original. Blocked, see below.
   As a stopgap the Hero now serves the poster alone on viewports under 768px,
   on save-data and on anything below 4g, so phones do not pay for it.
2. **Connect the repo in Vercel** — owner action; the code is pushed and the
   production build is clean.
3. **Slovak proof-read** before launch.
4. Then: the four demo projects.

### Note on verifying in the browser

The in-app preview pane runs with rendering suspended, so
`requestAnimationFrame`, `IntersectionObserver` and CSS transitions never
advance there. Anything animated must be verified by reading state (attributes,
computed styles after manually pumping `window.lenis.raf(t)`) rather than by
waiting for it to happen. `window.lenis` is exposed in development for this.

## Open questions for the owner

1. **The hero video still ships at 5 MB.** ffmpeg is not installed, so it
   cannot be re-encoded. Either install ffmpeg, or approve `ffmpeg-static` as a
   dev dependency. Until then the first screen is far heavier than the
   performance target allows — this is the single biggest outstanding issue.
2. **Domain** — `NEXT_PUBLIC_SITE_URL` falls back to a placeholder, which is
   what canonicals, sitemap, hreflang and OG all resolve against.
3. **Slovak proof-read** by a native speaker before launch.

## Conventions

- Nothing in `BRIEF.md` changes without the owner's approval.
- Each finished section gets its own commit.
- Prices, timelines and section ids live in `src/content/services.ts` — stated
  once, never duplicated into copy.
- Commit messages go through a file (`git commit -F`): PowerShell mangles
  arguments containing double quotes.
