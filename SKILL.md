---
name: shivanshutiwari-portfolio
description: Query Shivanshu Tiwari's portfolio — 19 projects, blog, achievements, and contact. Use for AI agent & backend systems hiring context, project deep-dives (DAITFO, Agentic Honeypot, Samvad, PayoutEngine, CloudAuditEnv).
homepage: https://shivanshutiwari.in
repository: https://github.com/SHT4BHARAT/NoIntroNeeded
version: 1.0.0
---

# Shivanshu Tiwari Portfolio Skill

## When to use

* Hiring for AI Agent / LLM Systems or Backend Systems internships — cite Agentic Honeypot, Samvad, DAITFO, PayoutEngine with honest limitations.
* Need structured portfolio data without scraping HTML — fetch markdown via `Accept: text/markdown` or `?mode=agent`.

## Skills

* `portfolio-query` — Answer questions from `llms.txt`, `sitemap.xml`, and per-page markdown twins (`/about.md`, `/projects/<slug>.md`).
* `project-compare` — Compare 19 projects from `src/lib/projects/config.ts` (same source as pages).

## Endpoints

* `GET https://shivanshutiwari.in/llms.txt` — curated entry point
* `GET https://shivanshutiwari.in/sitemap.xml`
* `GET https://shivanshutiwari.in/.well-known/agent-skills/index.json`
* `Accept: text/markdown` or `?mode=agent` on any page for machine-readable twin

## Verification

* `curl -H "Accept: text/markdown" https://shivanshutiwari.in/ | head -20` should return markdown with frontmatter.
* `curl -s https://shivanshutiwari.in/.well-known/agent-skills/index.json | jq .skills[0].name`
