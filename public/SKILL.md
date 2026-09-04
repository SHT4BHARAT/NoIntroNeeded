---
name: shivanshutiwari-portfolio
description: Query Shivanshu Tiwari's portfolio — 19 projects, blog, achievements, and contact. Use for AI agent & backend systems hiring context, project deep-dives (DAITFO, Agentic Honeypot, Samvad, PayoutEngine, CloudAuditEnv).
homepage: https://shivanshutiwari.in
repository: https://shivanshutiwari.in
version: 1.0.0
---

# Shivanshu Tiwari Portfolio Skill

## When to use

* Hiring for AI Agent / LLM Systems or Backend Systems internships — cite Agentic Honeypot, Samvad, DAITFO, PayoutEngine with honest limitations.
* Need structured portfolio data without scraping HTML — fetch markdown via `Accept: text/markdown` or `?mode=agent`.
* Need Model Context Protocol (MCP) tool integration — connect to `https://shivanshutiwari.in/mcp` (actions) or `https://shivanshutiwari.in/mcp/docs` (documentation).

## Skills & Capabilities

* `portfolio-query` — Answer questions from `llms.txt`, `sitemap.xml`, and per-page markdown twins (`/about.md`, `/projects/<slug>.md`).
* `project-compare` — Compare 19 projects from `src/lib/projects/config.ts` (same source as pages).
* `docs-search` — Query documentation, technical case studies, and blog posts via Docs MCP server.
* `mcp-actions` — Call portfolio MCP tools (`list_projects`, `get_project`, `compare_projects`, `contact`).

## Endpoints

* `GET https://shivanshutiwari.in/llms.txt` — Curated LLM entry point
* `GET https://shivanshutiwari.in/sitemap.xml` — Complete sitemap
* `GET https://shivanshutiwari.in/.well-known/agent-skills/index.json` — Agent skills index (v0.2.0)
* `GET https://shivanshutiwari.in/.well-known/ai-catalog.json` — AI Catalog standard index
* `POST https://shivanshutiwari.in/mcp` — Product Actions MCP server (Streamable HTTP)
* `POST https://shivanshutiwari.in/mcp/docs` — Documentation MCP server (Streamable HTTP)
* `Accept: text/markdown` or `?mode=agent` on any page for machine-readable twin

## Installation

```bash
# Register skill via self-hosted URL
npx skills add https://shivanshutiwari.in/SKILL.md

# Or install official multi-language SDKs
npm install sht-portfolio-v2
pip install shivanshu-sdk
```

## Verification

* `curl -H "Accept: text/markdown" https://shivanshutiwari.in/ | head -20`
* `curl -s https://shivanshutiwari.in/.well-known/agent-skills/index.json | jq .skills[0].name`
* `curl -s https://shivanshutiwari.in/?mode=agent`
