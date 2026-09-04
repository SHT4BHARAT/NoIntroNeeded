# AGENTS.md — AI Coding Agent Instructions for shivanshutiwari.in

> Official site: https://shivanshutiwari.in — Developer Portal: https://shivanshutiwari.in/developers — llms.txt: https://shivanshutiwari.in/llms.txt

## Stack & Conventions

* Next.js 16.2 App Router (`src/app/`), React 19, Tailwind v4, MDX blog (`src/content/blog/`), `src/lib/projects/config.ts` is single source of truth for projects.
* Path alias `@/*` → `src/*` (`tsconfig.json:1`, `vitest.config.mjs:1`). Tests: `vitest run` (`src/**/*.test.{ts,tsx}`), env `node`.
* Content negotiation: `src/proxy.ts:1` + `src/lib/markdown/negotiation.ts:1` serves `text/markdown` via `Accept` and `/.md` sibling; markdown generation reuses same data source as React pages.
* Do not hand-duplicate project descriptions — reuse `getProjectBySlug`/`projects` and `getPostBySlug`.

## What to Change Safely

* Brand constants `src/lib/constants.ts:1` (`SITE_NAME`, `SITE_URL`, `SITE_TITLE`, `SOCIAL`) are canonical NAP — keep identical across `layout.tsx:1`, `PersonSchema.tsx:1`, `WebSiteSchema.tsx:1`, `public/llms.txt:1`, `src/app/manifest.ts:1`.
* JSON-LD `Person` + `WebSite` are emitted from `src/app/layout.tsx:1` — extend same object, don't add competing nodes.
* `/llms.txt` follows `https://llmstxt.org` v2: H1 `Shivanshu Tiwari`, blockquote summary, H2 link sections, `## When to use this`/`## When not to use this`.
* Honesty requirement: flag unverifiable claims as draft awaiting approval (see `/about`, `/privacy`).

## Discovery for Agents

* Entry points: `https://shivanshutiwari.in/` → `https://shivanshutiwari.in/llms.txt`, `https://shivanshutiwari.in/sitemap.xml`, `https://shivanshutiwari.in/.well-known/agent-skills/index.json`, `https://shivanshutiwari.in/.well-known/ard.json`.
* Well-known catalogs: `/.well-known/agent-card.json` (A2A), `/.well-known/mcp/server-card.json` (MCP), `/.well-known/api-catalog` (RFC 9727).
* Developer portal: `https://shivanshutiwari.in/developers`.

## Guardrails

* Zero visual regression for human browsers; additive only; no network calls in `proxy`/`middleware`.
* Never invent claims about data handling, title, or role-fit — verify from codebase or mark draft.
* No secrets beyond public social links.

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
