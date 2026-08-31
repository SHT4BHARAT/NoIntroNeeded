# Task List — UI Redesign Pass (30 August 2026)

Extracted from `30Augustimplementationplan.md`. Work top-down; each item is independently revertable.

## W1 — Font swap: unify on Geist
- [x] T1.1 `src/app/layout.tsx`: remove `Inter` import + config; keep `--font-display` (utility depends on it); update `<html>` className
- [x] T1.2 `src/app/globals.css`: `--font-sans` → `var(--font-display), …`
- [x] T1.3 Guard: no `font-inter` / `Inter(` under `src/`

## W2 — Hero display presence
- [x] T2.1 `src/components/role/RoleHero.tsx`: H1 → `text-[clamp(2.75rem,6.5vw,4.5rem)] leading-[1.05] tracking-[-0.03em]`
- [x] T2.2 `src/components/home/HomeContent.tsx` (ShowEverything H1): same classes

## W3 — Neutral card borders + tinted hover shadow
- [x] T3.1 `src/components/role/RoleProjectCard.tsx`: `border-accent/10` → `border-border` + `hover:shadow-xl hover:shadow-accent/15`
- [x] T3.2 `src/components/blog/PostCard.tsx`: same border + shadow
- [x] T3.3 `src/app/contact/ContactForm.tsx`: 3× border swap
- [x] T3.4 `src/components/home/FaqAccordion.tsx`: border swap
- [x] T3.5 `src/app/{achievements,education,experience,volunteer}/page.tsx`: border swap
- [x] T3.6 Guard: `border-accent/10` count under `src/` = 0

## W4 — Section heading hierarchy
- [x] T4.1 `src/components/home/HomeContent.tsx`: 5 section H2s → `font-display text-lg font-semibold tracking-tight text-foreground` (sentence case)
- [x] T4.2 `src/components/role/RoleProjectList.tsx`: same H2 treatment

## W5 — De-duplicate generic patterns
- [x] T5.1 `src/components/home/HomeContent.tsx`: remove `TechMarquee` import + 2 usages
- [x] T5.2 Delete `src/components/home/TechMarquee.tsx`
- [x] T5.3 `src/app/globals.css`: add `--accent-signal-rgb` per theme; `.cursor-spotlight` uses the var
- [x] T5.4 `src/components/background/NodePulse.tsx`: color from `--accent-signal-rgb`, refreshed ~every 30 frames

## W6 — Bug fixes
- [x] T6.1 `src/app/globals.css`: remove `.blog-content-wrapper em, i { display: block }`
- [x] T6.2 `src/app/layout.tsx`: drop `other["theme-color"]`; add `viewport` export with media-scoped theme colors (`#0B0D11` dark / `#F4F5F7` light)

## W7 — Missing-state polish
- [x] T7.1 `src/components/layout/Header.tsx`: mobile menu → grid-rows accordion (stays mounted, `motion-reduce:transition-none`)
- [x] T7.2 `src/app/blog/page.tsx`: designed empty state + "View all posts" link when filtered

## Verification
- [x] V1 `npm run build`
- [x] V2 `npm run test`
- [x] V3 `npm run lint`
- [x] V4 Grep guards: `font-inter`, `Inter(`, `border-accent/10`, `TechMarquee` → 0 hits
