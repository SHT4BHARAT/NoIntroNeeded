# Implementation Plan — UI Redesign Pass (30 August 2026)

**Project:** `D:\Portfolio\PortfolioNew` (Next.js 16 App Router · React 19 · Tailwind CSS v4 · TypeScript)
**Source of findings:** Design audit run against the `redesign-existing-projects` skill (open-design repo, `skills/redesign-skill/SKILL.md`).
**Companion task list:** `30Augusttask.md`

---

## 1. Goal

Raise the portfolio's UI to premium quality by removing generic "AI-slop" patterns and tightening typographic hierarchy — **without breaking any functionality, route, or content structure.**

## 2. Non-goals (explicitly out of scope)

- No framework or styling-library migration (stays Tailwind v4 + CSS vars).
- No content rewrites (copy stays as-is except empty-state strings).
- No new dependencies — every change uses what `package.json` already has.
- No dark/light theme restructure — tokens stay, we only fix mismatches.
- Reveal-on-scroll animation system stays untouched.

## 3. Constraints & rules (from the skill)

- Work with the existing stack; improve in place, never rewrite.
- Preserve product structure, routes, and behavior; test after changes.
- Tailwind **v4** — config-less; theme lives in `globals.css` `@theme inline`.
- Fix priority: fonts → color cleanup → interactive states → layout/spacing → generic components → missing states → typographic polish.

---

## 4. Work items

### W1 — Font swap: drop Inter, unify on Geist *(highest impact, lowest risk)*

**Why:** Inter-everywhere is the #1 generic tell flagged by the audit. Geist is already loaded as the display face; reusing it for body removes one font download and gives the page a single, distinctive voice.

**Files & changes:**
- `src/app/layout.tsx`: remove the `Inter` import and config; keep the Geist variable named `--font-display` (Tailwind utility `font-display` depends on it); update `<html>` className.
- `src/app/globals.css`: `--font-sans: var(--font-inter), …` → `var(--font-display), …` (Renaming to `--font-geist` would break the `font-display` utility — deviated deliberately).

**Acceptance:** `--font-inter` / `Inter(` appear nowhere under `src/`; body renders Geist; build passes.

### W2 — Hero display presence

**Why:** `text-5xl/6xl leading-tight` reads safe and loose; display headlines need weight, tighter leading, tighter tracking.

**Files & changes:**
- `src/components/role/RoleHero.tsx` — H1 → fluid `text-[clamp(2.75rem,6.5vw,4.5rem)]`, `leading-[1.05]`, `tracking-[-0.03em]`.
- `src/components/home/HomeContent.tsx` (`ShowEverything` hero H1) — same treatment.

**Acceptance:** Both heroes use the identical fluid scale; no horizontal overflow at 360px viewport.

### W3 — Neutral card borders + tinted hover elevation

**Why:** `border-accent/10` tints every surface violet (accent over-distribution). Cards have zero elevation language. Neutral borders + an accent-tinted hover shadow reserve violet for interaction.

**Files & changes (replace `border-accent/10` → `border-border`):**
- `src/components/role/RoleProjectCard.tsx` — **also add** `hover:shadow-xl hover:shadow-accent/15`.
- `src/components/blog/PostCard.tsx` — same border + tinted hover shadow.
- `src/app/contact/ContactForm.tsx` (3 field styles) — border only.
- `src/components/home/FaqAccordion.tsx` — border only.
- `src/app/achievements/page.tsx`, `src/app/education/page.tsx`, `src/app/experience/page.tsx`, `src/app/volunteer/page.tsx` — border only (static surfaces).


### W4 — Section heading hierarchy

**Why:** Section H2s (`text-sm uppercase tracking-widest`) and group H3s (`text-xs uppercase`) are both uppercase and differ by only 2px — hierarchy is flattened.

**Files & changes:**
- `src/components/home/HomeContent.tsx` — About / Skills / Projects H2s (both `ShowEverything` and `RoleHome` variants) → `font-display text-lg font-semibold tracking-tight text-foreground` (sentence case). The accent rule beside each stays.
- `src/components/role/RoleProjectList.tsx` — same H2 treatment.

**Acceptance:** No `uppercase` on section-level H2s; H3 skill-group labels keep their small-caps look; three distinct heading levels (H1 → H2 → H3).

### W5 — De-duplicate generic patterns (marquee + background tint)

**Why:** (a) The infinite tech-pill marquee duplicates the Skills section on the same page and is a template cliché. (b) `NodePulse` and `CursorSpotlight` hardcode the dark accent `124,111,224`, which is wrong in light mode (`#5B4FC7` = `91,79,199`).

**Files & changes:**
- `src/components/home/HomeContent.tsx` — remove both `TechMarquee` usages + import.
- `src/components/home/TechMarquee.tsx` — **delete** (skills section remains the single source of truth).
- `src/app/globals.css` — add `--accent-signal-rgb: 91, 79, 199;` (light) / `124, 111, 224;` (dark); `.cursor-spotlight` gradient uses `var(--accent-signal-rgb)`.
- `src/components/background/NodePulse.tsx` — read the RGB triplet from `--accent-signal-rgb` on mount and refresh it every ~30 frames so a mid-session theme toggle doesn't leave a stale tint.

**Acceptance:** No marquee on home; spotlight/canvas tint matches the active theme's accent; canvas still fades out after ~30s.

### W6 — Bug fixes found during audit

1. **`globals.css` `.blog-content-wrapper em, i { display: block }`** — makes every inline italic in MDX posts break onto its own line. **Remove the rule.**
2. **`theme-color` mismatch** — meta says `#0A0C10`, token says `#0B0D11`. **Fix:** remove `other: { "theme-color": … }` from `layout.tsx` metadata and add a `viewport` export (Next 16 API, verified against bundled docs) with media-scoped colors: dark `#0B0D11`, light `#F4F5F7`.

**Acceptance:** Inline italics flow inside paragraphs in blog posts; emitted `<head>` has two `<meta name="theme-color">` tags with correct `media` attributes and no duplicate static tag.

### W7 — Missing-state polish

1. **Mobile menu transition** (`src/components/layout/Header.tsx`) — replace the abrupt `hidden`/`block` toggle with the accordion pattern: element stays mounted, wrapper `grid-rows-[0fr] ↔ grid-rows-[1fr]` with `transition-[grid-template-rows] duration-200 ease-out motion-reduce:transition-none`, inner wrapper `min-h-0 overflow-hidden`.
2. **Blog empty state** (`src/app/blog/page.tsx`) — replace the bare `<p>No posts yet.</p>` with a designed empty card (`rounded-lg border border-border bg-card`, centered, mono glyph, helpful copy) and — when a category filter is active — a "View all posts" link back to `/blog`.

**Acceptance:** Menu animates open/closed, `aria-expanded` behavior unchanged, reduced-motion users get an instant toggle; empty state looks intentional in both themes.

---

## 5. Verification

| Step | Command | Expectation |
|---|---|---|
| Build | `npm run build` | Compiles, no type errors |
| Unit tests | `npm run test` | All existing vitest suites pass |
| Lint | `npm run lint` | No new ESLint errors |
| Grep guards | search `src/` for `font-inter`, `Inter(`, `border-accent/10`, `TechMarquee` | 0 hits |

Manual spot-check (GUI machine): `npm run dev` → home (default + both role variants), blog, blog post with italics, contact form, FAQ, mobile nav at 390px, theme toggle.

## 6. Risks & rollback

- All changes are pure class/string/CSS edits in git — `git checkout -- <file>` reverts any item independently.
- Geist italic: Google-hosted Geist ships italics; fallback is system italic synthesis (cosmetic only).
- NodePulse RGB refresh worst case is the pre-existing hardcoded color.

## 7. Deferred (not in this pass)

- Featured project card spanning full grid width (layout rhythm change — needs visual review).
- NodePulse scope reduction to hero-only (content decision).
- `og-image.png` refresh.

