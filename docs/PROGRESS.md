# Progress

Last updated: 2026-08-08

## Done

- [x] Environment: project on `D:\ktenor`, npm cache moved to `D:\npm-cache`
- [x] Next.js 16.3 + React 19.2 + TypeScript + Tailwind v4 scaffolded
- [x] Git initialised, remote → https://github.com/gwstge/Ktenor
- [x] Fonts self-hosted: Clash Display 400/500/600/700, Satoshi 400/500/700
      (`src/fonts/`, ~133 KB) wired through `next/font/local`
- [x] `src/lib/site.ts` — contacts, region, feature flags, `NEXT_PUBLIC_SITE_URL`
- [x] `src/app/globals.css` — full token system: both themes, glass tiers with
      degradation, fluid type scale, spacing rhythm, motion tokens, z-index
      scale, focus rings, reduced-motion
- [x] `docs/BRIEF.md` — the agreed brief in full
- [x] `.claude/launch.json` — dev server config

## Next

- [ ] Logo → hand-built SVG + favicon set (**show to owner before it spreads**)
- [ ] Theme provider: dark default, choice remembered, no flash on first paint
- [ ] Glass capability probe → `data-glass="lite"` on weak devices
- [ ] i18n: `[locale]` routing, typed dictionaries, root redirect to `/sk`,
      hreflang + canonicals
- [ ] Re-encode hero video (AV1/VP9 + H.264 fallback, mobile variants) and
      poster → AVIF/WebP. **Needs ffmpeg, not installed — ask the owner first**
- [ ] Intro screen + Hero → show for approval
- [ ] Then section by section: Portfolio → Services → Process → Principles →
      Advantages → Testimonials (flagged off) → FAQ → Final CTA → Contact → Footer
- [ ] Polish phase: 404 + 500

## Open questions for the owner

1. **ffmpeg is not installed** and is needed to re-encode the hero video.
   Install it, or ship a temporarily heavier video until it is available?
2. Domain name — still pending; `NEXT_PUBLIC_SITE_URL` is a placeholder.
3. Intro-screen assets, if any beyond the logo.

## Conventions

- Nothing in the brief changes without the owner's approval.
- Each finished section gets its own commit.
- The owner reviews after every major section, locally, before we move on.
