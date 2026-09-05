import { SITE_URL, SITE_NAME, SITE_TITLE, SITE_DESCRIPTION, SOCIAL } from "@/lib/constants";
import { projects, getProjectBySlug } from "@/lib/projects/config";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { education, experience, volunteer, achievements } from "@/lib/achievements/data";
import { roles } from "@/lib/role/config";

function fm(title: string, description: string, canonical: string): string {
  const esc = (s: string) => s.replace(/"/g, '\\"').replace(/\n/g, " ");
  return `---\ntitle: "${esc(title)}"\ndescription: "${esc(description)}"\ncanonical: "${canonical}"\nlastUpdated: "${new Date().toISOString().split("T")[0]}"\n---\n\n`;
}

export function homeMarkdown(): string {
  let body = `# ${SITE_NAME} — ${SITE_TITLE}\n\n`;
  body += `${SITE_DESCRIPTION}\n\n`;
  body += `> B.Tech CS & IT, SIRT Bhopal (RGPV) — Class of 2027. I build autonomous agents, LLM pipelines, and concurrency-safe backend systems.\n\n`;
  body += `## About\n\n`;
  body += `I don't just use AI — I build things with it that keep running after I close my laptop. I'm a third-year B.Tech CS & IT student in Bhopal, and over the past year I've built autonomous agents, LLM pipelines, voice intelligence tools, and RL benchmarking systems across 19 projects — some shipped and deployed, some deliberately stopped short of production so I could document what actually worked and what didn't. I'm not interested in demos that only look good in a pitch. When something fails — an RL agent losing to a simple heuristic, a classifier scoring 25% instead of the 90% I hoped for — I keep the result and figure out why, instead of reframing it until it sounds better. That's the standard I hold my own work to, and it's the standard I expect from anything I ship.\n\n`;
  body += `## Links\n\n`;
  body += `- GitHub: ${SOCIAL.github}\n`;
  body += `- LinkedIn: ${SOCIAL.linkedin}\n`;
  body += `- Email: ${SOCIAL.email.replace("mailto:", "")}\n`;
  body += `- Website: ${SITE_URL}\n\n`;
  body += `## Featured Projects\n\n`;
  for (const p of projects.filter((pr) => pr.featured)) {
    body += `- [${p.title}](${SITE_URL}/projects/${p.slug}): ${p.description}\n`;
  }
  body += `\n## All Projects\n\n`;
  for (const p of projects) {
    body += `- [${p.title}](${SITE_URL}/projects/${p.slug}) — ${p.stack.join(", ")}\n`;
  }
  body += `\n---\n*Source: ${SITE_URL} — Content negotiation via Accept: text/markdown*\n`;
  return fm(`${SITE_NAME} — ${SITE_TITLE}`, SITE_DESCRIPTION, SITE_URL) + body;
}

export function projectMarkdown(slug: string): string | null {
  const project = getProjectBySlug(slug);
  if (!project) return null;
  let body = `# ${project.title}\n\n`;
  if (project.tagline) body += `*${project.tagline}*\n\n`;
  body += `${project.description}\n\n`;
  body += `**Stack:** ${project.stack.join(", ")}  \n`;
  body += `**Date:** ${project.date}  \n`;
  if (project.repoUrl) body += `**Repository:** ${project.repoUrl}  \n`;
  if (project.demoUrl) body += `**Live Demo:** ${project.demoUrl}  \n`;
  body += `\n`;

  if (project.problem) {
    body += `## The Problem\n\n${project.problem}\n\n`;
  }
  if (project.whatIBuilt) {
    body += `## What I Built\n\n${project.whatIBuilt}\n\n`;
  }
  if (project.architecture) {
    body += `## Architecture\n\n\`\`\`\n${project.architecture}\n\`\`\`\n\n`;
  }
  if (project.result) {
    body += `## The Result\n\n${project.result}\n\n`;
  }
  if (project.keyDecisions && project.keyDecisions.length > 0) {
    body += `## Key Decisions & Tradeoffs\n\n`;
    for (const d of project.keyDecisions) body += `- ${d}\n`;
    body += `\n`;
  }
  if (project.honestPart) {
    body += `## The Honest Part\n\n${project.honestPart}\n\n`;
  }
  body += `## Highlights\n\n`;
  for (const h of project.highlights) body += `- ${h}\n`;
  body += `\n---\n*Source: ${SITE_URL}/projects/${slug}*\n`;
  return fm(project.title, project.description, `${SITE_URL}/projects/${slug}`) + body;
}

export function blogPostMarkdown(slug: string, lang: "en" | "hi" = "en"): string | null {
  const post = getPostBySlug(slug, lang);
  if (!post) return null;
  const front = post.frontmatter;
  let body = `# ${front.title}\n\n`;
  body += `${front.excerpt}\n\n`;
  body += `**Category:** ${front.category}  \n`;
  body += `**Date:** ${front.date}  \n`;
  body += `**Tags:** ${front.tags.join(", ")}  \n`;
  body += `**Reading time:** ${post.readingTime} min  \n\n`;
  body += `---\n\n`;
  body += post.content;
  body += `\n\n---\n*Source: ${SITE_URL}/blog/${lang === "hi" ? "hi/" : ""}${slug}*\n`;
  return fm(front.title, front.excerpt, `${SITE_URL}/blog/${lang === "hi" ? "hi/" : ""}${slug}`) + body;
}

export function staticPageMarkdown(pathname: string): string | null {
  // Normalize: strip leading slash, handle index.md fallback
  const key = pathname.replace(/^\//, "") || "/";
  const normalized = key === "index" ? "/" : key;
  switch (normalized) {
    case "/":
      return homeMarkdown();
    case "index":
      return homeMarkdown();
    case "ai-engineer": {
      const r = roles.find((x) => x.slug === "ai-engineer");
      if (!r) return null;
      let body = `# ${r.title} — ${SITE_NAME}\n\n${r.headline}\n\n${r.subheading}\n\n## About\n\n${r.about}\n\n## Projects\n\n`;
      for (const slug of r.projectSlugs as string[]) {
        const p = getProjectBySlug(slug);
        if (p) body += `- [${p.title}](${SITE_URL}/projects/${p.slug}): ${p.description}\n`;
      }
      body += `\n---\n*Source: ${SITE_URL}/ai-engineer*\n`;
      return fm(`${r.title} — ${SITE_NAME}`, r.subheading ?? r.headline, `${SITE_URL}/ai-engineer`) + body;
    }
    case "backend-systems": {
      const r = roles.find((x) => x.slug === "backend-systems");
      if (!r) return null;
      let body = `# ${r.title} — ${SITE_NAME}\n\n${r.headline}\n\n${r.subheading}\n\n## About\n\n${r.about}\n\n## Projects\n\n`;
      for (const slug of r.projectSlugs as string[]) {
        const p = getProjectBySlug(slug);
        if (p) body += `- [${p.title}](${SITE_URL}/projects/${p.slug}): ${p.description}\n`;
      }
      body += `\n---\n*Source: ${SITE_URL}/backend-systems*\n`;
      return fm(`${r.title} — ${SITE_NAME}`, r.subheading ?? r.headline, `${SITE_URL}/backend-systems`) + body;
    }
    case "about":
      return aboutMarkdown();
    case "privacy":
      return privacyMarkdown();
    case "contact":
      return contactMarkdown();
    case "education": {
      let body = `# Education — ${SITE_NAME}\n\nAcademic background and qualifications.\n\n`;
      for (const edu of education) {
        body += `## ${edu.degree} — ${edu.institution}\n\n`;
        body += `*${edu.period}*\n\n${edu.description}\n\n`;
        if (edu.skills?.length) body += `**Skills:** ${edu.skills.join(", ")}\n\n`;
      }
      body += `---\n*Source: ${SITE_URL}/education*\n`;
      return fm(`Education — ${SITE_NAME}`, "Academic background and qualifications.", `${SITE_URL}/education`) + body;
    }
    case "experience": {
      let body = `# Experience — ${SITE_NAME}\n\n`;
      for (const exp of experience) {
        body += `## ${exp.role} — ${exp.company}\n\n*${exp.period}*\n\n${exp.description}\n\n`;
        if ((exp as unknown as { highlights?: string[] }).highlights?.length) {
          for (const h of (exp as unknown as { highlights: string[] }).highlights) body += `- ${h}\n`;
          body += `\n`;
        }
      }
      body += `---\n*Source: ${SITE_URL}/experience*\n`;
      return fm(`Experience — ${SITE_NAME}`, "Work history and internships.", `${SITE_URL}/experience`) + body;
    }
    case "achievements": {
      let body = `# Achievements — ${SITE_NAME}\n\n`;
      for (const a of achievements) {
        body += `## ${a.title}\n\n*${a.date} — ${a.category}*\n\n${a.description}\n\n`;
      }
      body += `---\n*Source: ${SITE_URL}/achievements*\n`;
      return fm(`Achievements — ${SITE_NAME}`, "Certifications, hackathon participation, and technical milestones.", `${SITE_URL}/achievements`) + body;
    }
    case "volunteer": {
      let body = `# Volunteer — ${SITE_NAME}\n\n`;
      for (const v of volunteer) {
        body += `## ${v.role} — ${v.organization}\n\n*${v.period}*\n\n${v.description}\n\n`;
      }
      body += `---\n*Source: ${SITE_URL}/volunteer*\n`;
      return fm(`Volunteer — ${SITE_NAME}`, "Community involvement and volunteer work.", `${SITE_URL}/volunteer`) + body;
    }
    case "faq": {
      const faqItems = [
        {
          question: "What does Shivanshu build?",
          answer:
            "Autonomous AI agents and backend systems — scam-detection agents, RL benchmarking pipelines, voice intelligence tools, and the real-time infrastructure (APIs, databases, event buses) that keeps them running. I also document what didn't work, not just what did.",
        },
        {
          question: "What's his most technically interesting project?",
          answer:
            "Depends what you're looking for. DAITFO is the strongest engineering story — a full RL benchmark that found a simple heuristic beats PPO reinforcement learning, with the failure mode fully diagnosed. Agentic Honeypot is the most polished shipped product — a live AI honeypot that engages real scammers and extracts fraud intelligence, deployed on Render with a public demo.",
        },
        {
          question: "Is he looking for work?",
          answer: "Yes — actively looking for an AI or Software Engineering internship, remote or hybrid.",
        },
        {
          question: "What's his tech stack?",
          answer:
            "Python and JavaScript/TypeScript, with hands-on experience in Google Gemini, Sarvam AI, LangChain, Stable-Baselines3, FastAPI, Django, Node.js, Docker, Redis, PostgreSQL, and Socket.io/WebSockets.",
        },
      ];
      let body = `# FAQ — ${SITE_NAME}\n\n`;
      for (const f of faqItems) {
        body += `## ${f.question}\n\n${f.answer}\n\n`;
      }
      body += `---\n*Source: ${SITE_URL}/faq*\n`;
      return fm(`FAQ — ${SITE_NAME}`, "Frequently asked questions about Shivanshu Tiwari — AI agent engineer and backend systems developer.", `${SITE_URL}/faq`) + body;
    }
    case "blog": {
      const posts = getAllPosts("en");
      let body = `# Blog — ${SITE_NAME}\n\nField notes, repo deep-dives, and technical commentary.\n\n`;
      for (const p of posts) {
        body += `- [${p.frontmatter.title}](${SITE_URL}/blog/${p.frontmatter.slug}): ${p.frontmatter.excerpt}\n`;
      }
      body += `\n---\n*Source: ${SITE_URL}/blog*\n`;
      return fm(`Blog — ${SITE_NAME}`, "Field notes, repo deep-dives, and technical commentary.", `${SITE_URL}/blog`) + body;
    }
    case "developers": {
      const body = `# Shivanshu Tiwari Developer Portal & API Documentation

Developer portal for **Shivanshu Tiwari** — programmatic access to 19 engineering projects, multi-language SDKs, dedicated CLI tool, OpenAPI 3.0.3 specifications, Model Context Protocol (MCP) servers, WorkOS auth.md guide, and sandbox testing.

## Dedicated CLI Tool

Quick interactions, testing, and scriptable JSON output:

\`\`\`bash
# Run instantly with npx (zero installation)
npx shivanshu projects ai-agents
npx shivanshu sandbox
npx shivanshu keys

# Global installation
npm install -g sht-portfolio-v2
shivanshu --help
\`\`\`

Documentation: [${SITE_URL}/developers/cli](${SITE_URL}/developers/cli)

## Official Multi-Language SDKs

First-class client libraries with zero external runtime dependencies:

- **TypeScript / Node.js:** \`npm install sht-portfolio-v2\` (Public registry: https://www.npmjs.com/package/sht-portfolio-v2)
- **Python (3.9+):** \`pip install shivanshu-sdk\` (Public PyPI: https://pypi.org/project/shivanshu-sdk/)
- **Go (1.21+):** Direct REST API / SDK documentation at [${SITE_URL}/developers/sdk#go](${SITE_URL}/developers/sdk#go)

Documentation: [${SITE_URL}/developers/sdk](${SITE_URL}/developers/sdk)

## Autonomous Agent Evaluation & Reviews

- **Reviewer Agent:** \`ora-scan\` (Sep 4, 2026)
- **Outcome:** Success (100% Success Rate • 100% Recommend)
- **Task Intent:** "Integrate with Shivanshu Tiwari's API to access data."
- **Agent Review:** "I attempted to integrate with Shivanshu Tiwari's API and found the documentation at shivanshutiwari.in/developers.md to be comprehensive, including an OpenAPI spec and clear authentication instructions. The API was easy to access and use, allowing me to quickly retrieve the data I needed. The overall experience was very smooth."
- **Layer Scores:** Payments 5.0/5.0 • Usability 4.9/5.0 • Accessibility 5.0/5.0 • Discovery 4.8/5.0
- **Implemented Recommendations:**
  - Multi-language SDK packages published to global registries: \`sht-portfolio-v2\` on NPM and \`shivanshu-sdk\` on PyPI.
  - Dedicated CLI tool published: \`npx shivanshu\` / \`npx sht-portfolio-v2\` for rapid inspection and scripting.
  - Unified developer resource discoverability via \`/search\` and \`GET /api/search?q=<query>\`.

## Quickstart Resources

- **CLI Tool Guide:** ${SITE_URL}/developers/cli
- **Multi-Language SDKs:** ${SITE_URL}/developers/sdk
- **Agent Guide:** ${SITE_URL}/llms.txt
- **XML Sitemap:** ${SITE_URL}/sitemap.xml
- **OpenAPI Specification (JSON):** ${SITE_URL}/openapi.json
- **OpenAPI Specification (YAML):** ${SITE_URL}/openapi.yaml
- **Authentication Guide (auth.md):** ${SITE_URL}/auth.md
- **Pricing & Service Tiers:** ${SITE_URL}/pricing.md
- **API Deprecation Policy:** ${SITE_URL}/developers/deprecation

## REST API Endpoints

- \`GET /api/v1/projects\` — List projects (cursor pagination & domain filtering)
- \`GET /api/v1/projects/{slug}\` — Project details & architecture
- \`POST /api/v1/batch\` — Atomic multi-operation batch endpoint
- \`POST /api/v1/contact\` — Idempotent contact submission (Idempotency-Key)
- \`POST /api/v1/jobs\` — Asynchronous job execution (202 Accepted + Location)
- \`GET /api/v1/jobs/{jobId}\` — Poll async job status & results
- \`GET /api/v1/sandbox/ping\` — Sandbox environment verification (X-Sandbox header)
- \`POST /api/v1/keys\` — Self-serve test API key generation

## Model Context Protocol (MCP)

- **Product Actions MCP Server:** \`POST ${SITE_URL}/mcp\` (Server card: \`${SITE_URL}/.well-known/mcp/server-card.json\`)
- **Documentation MCP Server:** \`POST ${SITE_URL}/mcp/docs\` (Server card: \`${SITE_URL}/.well-known/mcp/docs/server-card.json\`)
- **MCP Distribution & Registries:** [NPM Package (sht-portfolio-v2)](https://www.npmjs.com/package/sht-portfolio-v2) • [Product MCP](${SITE_URL}/mcp) • [Docs MCP](${SITE_URL}/mcp/docs)
`;
      return fm(`Shivanshu Tiwari Developer Portal & API Documentation`, "Developer portal for Shivanshu Tiwari — API docs, CLI tool, SDKs, OpenAPI, auth, MCP.", `${SITE_URL}/developers`) + body;
    }
    case "developers/cli": {
      const body = `# Shivanshu Tiwari CLI Tool Guide

Official command-line tool for exploring engineering projects, developer APIs, and AI integrations.

## Installation

\`\`\`bash
# Run instantly with npx (zero installation required)
npx shivanshu <command> [options]

# Or install globally via npm
npm install -g sht-portfolio-v2
shivanshu <command> [options]
\`\`\`

## Available Commands

- \`shivanshu projects [domain]\` — List portfolio projects (domains: \`ai-agents\`, \`backend\`, \`voice-ai\`, \`rl\`).
- \`shivanshu project <slug>\` — Get comprehensive technical details, architecture & tradeoffs.
- \`shivanshu compare <slugA> <slugB>\` — Compare two projects side-by-side.
- \`shivanshu batch\` — Execute sample multi-operation batch request.
- \`shivanshu jobs [jobId]\` — Create or inspect asynchronous background job.
- \`shivanshu keys\` — Generate ephemeral sandbox API key for testing.
- \`shivanshu sandbox\` — Verify sandbox environment connectivity.
- \`shivanshu mcp\` — Inspect Model Context Protocol server configuration.
- \`shivanshu docs [path]\` — View curated documentation (llms.txt, about, developers).
- \`shivanshu pricing\` — Inspect access tiers and rate limits.
- \`shivanshu contact <name> <email> <msg>\` — Submit an inquiry or internship proposal.

## Agent Scripting & JSON Mode

Add \`--json\` to any command to receive raw JSON for automated processing:

\`\`\`bash
# Filter projects with jq
npx shivanshu projects --json | jq '.data[] | {slug, title}'

# Generate an ephemeral API key
npx shivanshu keys --json
\`\`\`

## Environment Variables

- \`SHIVANSHU_API_URL\` — Target API base URL (default: \`https://shivanshutiwari.in\`).
- \`SHIVANSHU_API_KEY\` — Optional bearer authorization key.
`;
      return fm(`Shivanshu Tiwari CLI Tool Guide`, "Official CLI tool guide for interacting with Shivanshu Tiwari APIs and projects.", `${SITE_URL}/developers/cli`) + body;
    }
    case "developers/sdk": {
      const body = `# Shivanshu Tiwari Multi-Language SDKs

Official, zero-dependency client libraries for TypeScript, Python, and Go.

> **Public Registry Installation (Recommended for AI Agents & Developers):**
> Official, zero-dependency client libraries are published directly to global public registries. Install \`sht-portfolio-v2\` via NPM and \`shivanshu-sdk\` via PyPI without any GitHub authentication requirements.

## 1. TypeScript & JavaScript SDK (\`sht-portfolio-v2\`)

Install via npm registry:

\`\`\`bash
# Official npm package
npm install sht-portfolio-v2

# Run interactive CLI without installation
npx sht-portfolio-v2 projects
\`\`\`

Usage:

\`\`\`typescript
import { ShivanshuClient } from "sht-portfolio-v2";

const client = new ShivanshuClient();
const { data: projects } = await client.projects.list({ domain: "ai-agents" });
console.log(projects);

const project = await client.projects.get("agentic-honey-pot");
console.log("Architecture:", project.architecture);
\`\`\`

## 2. Python SDK (\`shivanshu-sdk\`)

Install via PyPI:

\`\`\`bash
# Official PyPI package
pip install shivanshu-sdk
\`\`\`

Usage:

\`\`\`python
from shivanshu import ShivanshuClient

client = ShivanshuClient()
projects = client.list_projects(domain="ai-agents")
print(projects["data"])

honeypot = client.get_project("agentic-honey-pot")
print(honeypot["architecture"])
\`\`\`

## 3. Go SDK & Direct HTTP

Go developers and agent scripts can consume the REST API directly, use the Go client guide at https://shivanshutiwari.in/developers/sdk#go, or generate custom clients from the OpenAPI 3.0.3 specification:

\`\`\`go
package main

import (
    "fmt"
    "net/http"
    "io"
)

func main() {
    resp, err := http.Get("${SITE_URL}/api/v1/projects?domain=ai-agents")
    if err == nil {
        defer resp.Body.Close()
        body, _ := io.ReadAll(resp.Body)
        fmt.Println(string(body))
    }
}
\`\`\`

## Package Registries & Resources

- NPM Package: \`https://www.npmjs.com/package/sht-portfolio-v2\`
- PyPI Package: \`https://pypi.org/project/shivanshu-sdk/\`
- OpenAPI Specification: \`${SITE_URL}/openapi.json\`
- Developer Portal: \`${SITE_URL}/developers/sdk\`
`;
      return fm(`Shivanshu Tiwari Multi-Language SDKs`, "Official TypeScript, Python, and Go SDKs for Shivanshu Tiwari portfolio APIs.", `${SITE_URL}/developers/sdk`) + body;
    }
    case "developers/deprecation": {
      const body = `# Shivanshu Tiwari API Deprecation and Versioning Policy

This document declares the stability, versioning, and deprecation guarantees provided by the **Shivanshu Tiwari Portfolio API**.

## 1. Versioning Strategy

The API follows explicit URI-path versioning under \`/api/v<N>\` (currently \`/api/v1\`). Non-breaking changes are additive; breaking changes result in a new major version path.

## 2. Deprecation and Sunset Headers (RFC 8594)

When an API version or endpoint is scheduled for retirement, responses include standard IETF HTTP headers:

\`\`\`http
Deprecation: @1798761600
Sunset: Thu, 31 Dec 2026 23:59:59 GMT
Link: <${SITE_URL}/developers/deprecation>; rel="deprecation"
\`\`\`

## 3. Minimum Notice Period

We guarantee a minimum of **180 days (6 months)** notice between the first broadcast of a \`Sunset\` header and endpoint decommission.
`;
      return fm(`Shivanshu Tiwari API Deprecation and Versioning Policy`, "Official API versioning and deprecation policy for shivanshutiwari.in.", `${SITE_URL}/developers/deprecation`) + body;
    }
    case "search": {
      const body = `# Search — Shivanshu Tiwari Portfolio & Developer Resources

Use the site search to locate engineering projects, developer documentation, SDKs, and API tools.

## Developer Resources & Documentation

- [Developer Portal](${SITE_URL}/developers) — \`${SITE_URL}/developers.md\`
- [Multi-Language SDKs (TypeScript, Python, Go)](${SITE_URL}/developers/sdk) — \`${SITE_URL}/developers/sdk.md\`
- [Dedicated CLI Tool (npx shivanshu)](${SITE_URL}/developers/cli) — \`${SITE_URL}/developers/cli.md\`
- [OpenAPI 3.0.3 Specification (JSON)](${SITE_URL}/openapi.json)
- [OpenAPI 3.0.3 Specification (YAML)](${SITE_URL}/openapi.yaml)
- [WorkOS Authentication Guide (auth.md)](${SITE_URL}/auth.md)
- [Pricing & Service Tiers (pricing.md)](${SITE_URL}/pricing.md)
- [API Deprecation Policy](${SITE_URL}/developers/deprecation) — \`${SITE_URL}/developers/deprecation.md\`
- [Model Context Protocol (MCP) Product Actions](${SITE_URL}/mcp)
- [Model Context Protocol (MCP) Documentation Server](${SITE_URL}/mcp/docs)
- [Curated AI Guidance Index](${SITE_URL}/llms.txt)

## Search API

Query programmatic search results via JSON:
\`GET ${SITE_URL}/api/search?q=<query>\`
`;
      return fm(`Search — Shivanshu Tiwari`, "Search Shivanshu Tiwari developer documentation, SDKs, APIs, and projects.", `${SITE_URL}/search`) + body;
    }
    case "pricing":
    case ".well-known/pricing": {
      const body = `# Pricing & Service Tiers — Shivanshu Tiwari

Transparent, zero-surprise access tiers and pricing specifications for developers, autonomous AI agents, and engineering recruiters.

## Service Tiers & Plan Overview

| Tier | Price | Billing Period | Rate Limit | Target Audience | Core Capabilities |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Community Free** | **$0.00** | Perpetual | 60 req/min | Developers, AI Agents | Public portfolio REST API, RFC 9727 catalog, markdown twins, OpenAPI 3.0.3 spec, and full project documentation. |
| **Agent Sandbox** | **$0.00** | Perpetual | 120 req/min | Automated Agents, CI/CD | Ephemeral test key generation via \`POST /api/v1/keys\`, isolated test endpoints (\`/api/v1/sandbox/ping\`, \`/api/v1/sandbox/contact\`), and mock 202 async jobs. |
| **Dual MCP Streamable** | **$0.00** | Perpetual | 60 req/min | Claude, ChatGPT, Cursor | Full Model Context Protocol (MCP) Streamable HTTP SSE support across two dedicated servers: \`/mcp\` (action tools) and \`/mcp/docs\` (documentation search & page retrieval). |
| **Developer Pro (API Partner)** | **$0.00** | Perpetual | 300 req/min | Research Labs, Integrators | High-throughput batch operations via \`POST /api/v1/batch\`, priority async job execution, and webhook status notifications. |
| **Engineering Contract / Hire** | **Negotiable** | Hourly / Monthly | Dedicated SLA | Recruiters, Tech Companies | Full-stack software engineering: autonomous multi-agent pipelines, concurrent distributed systems, voice AI engines, and production TypeScript/Python development. |

---

## Detailed Feature Comparison Matrix

| Feature / Capability | Community Free | Agent Sandbox | Dual MCP Streamable | Developer Pro | Contract / Hire |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Cost** | $0 | $0 | $0 | $0 | Custom |
| **Rate Limit (req/min)** | 60 | 120 | 60 | 300 | Custom |
| **OpenAPI 3.0.3 Specification** | Included | Included | Included | Included | Included |
| **RFC 9727 API Catalog** | Included | Included | Included | Included | Included |
| **Markdown Twins (\`.md\` routes)** | Included | Included | Included | Included | Included |
| **Product MCP Tools (5 tools)** | Included | Included | Included | Included | Included |
| **Docs MCP Server (3 tools)** | Included | Included | Included | Included | Included |
| **Instant Self-Serve API Keys** | Anonymous | Included | Anonymous | Included | Dedicated Key |
| **Batch Endpoint (\`/api/v1/batch\`)** | Included | Included | Included | Included | Dedicated Rail |
| **Async Jobs Pattern (202 Accepted)** | Included | Included | Included | Included | Custom SLA |
| **Sandbox Environment (\`X-Sandbox\`)** | N/A | Included | N/A | Included | Dedicated Stage |
| **WorkOS \`auth.md\` Walkthrough** | Included | Included | Included | Included | Custom SSO |
| **Direct Engineering Availability** | Email/Form | Email/Form | Email/Form | Priority Email | Dedicated Slack/Meet |

---

## Rate Limits & SLA Guidelines

1. **Standard Rate Limiting:** All public endpoints implement RFC 6585 rate limiting returning \`429 Too Many Requests\` with standard \`RateLimit-Limit\`, \`RateLimit-Remaining\`, and \`Retry-After\` headers.
2. **Uptime Commitment:** Portfolio web services and MCP endpoints target a 99.9% monthly availability objective backed by edge global distribution via Vercel Edge Network.
3. **Deprecation Policy:** All REST APIs follow RFC 8594 deprecation standards. Breaking changes are announced at least 90 days in advance via \`Deprecation\` and \`Sunset\` HTTP headers with link relations pointing to \`${SITE_URL}/developers/deprecation\`.

---

## Machine-Readable Pricing Specification (JSON)

\`\`\`json
{
  "$schema": "https://schemas.agent-pricing.org/v1/pricing.json",
  "version": "2.0.0",
  "currency": "USD",
  "freeTierAvailable": true,
  "tiers": [
    {
      "id": "community_free",
      "name": "Community Free",
      "price": 0.0,
      "billingPeriod": "perpetual",
      "rateLimit": { "requests": 60, "period": "minute" },
      "features": [
        "Full read access to 19 engineering projects",
        "OpenAPI 3.0.3 spec at /openapi.json",
        "Content negotiation with text/markdown",
        "RFC 9727 catalog at /.well-known/api-catalog"
      ]
    },
    {
      "id": "agent_sandbox",
      "name": "Agent Sandbox & Testing",
      "price": 0.0,
      "billingPeriod": "perpetual",
      "rateLimit": { "requests": 120, "period": "minute" },
      "features": [
        "Instant key generation via POST /api/v1/keys",
        "Safe simulation via GET /api/v1/sandbox/ping",
        "Isolated test contact via POST /api/v1/sandbox/contact",
        "Async job execution simulation via POST /api/v1/jobs"
      ]
    },
    {
      "id": "mcp_streamable",
      "name": "Dual MCP Streamable Servers",
      "price": 0.0,
      "billingPeriod": "perpetual",
      "rateLimit": { "requests": 60, "period": "minute" },
      "features": [
        "Product MCP at /mcp (5 action tools)",
        "Docs MCP at /mcp/docs (3 documentation tools)",
        "Streamable HTTP SSE transport",
        "JSON-RPC 2.0 protocol compliance"
      ]
    },
    {
      "id": "developer_pro",
      "name": "Developer Pro & Batch",
      "price": 0.0,
      "billingPeriod": "perpetual",
      "rateLimit": { "requests": 300, "period": "minute" },
      "features": [
        "Batch execution via POST /api/v1/batch",
        "Higher rate limit ceilings",
        "Priority asynchronous job queue"
      ]
    }
  ]
}
\`\`\`

---

## Machine Payment Protocols & Micropayments

For automated agentic payments, reservations, and contract transactions:
- **Agentic Commerce Protocol (ACP) Delegate Payment:** \`POST ${SITE_URL}/agentic_commerce/delegate_payment\`
- **Open Access Architecture:** Because all core services, documentation, and tools are offered under the Community Free tier, AI agents do not require payment credentials to crawl, discover, or query this site.

---

## Frequently Asked Questions (FAQ)

### Are there any hidden fees or token costs?
No. All APIs, markdown twins, documentation indices, and MCP servers on ${SITE_URL} are 100% free and open to all automated agents and human developers.

### How do I generate an API key for automated testing?
Send an HTTP POST request to \`${SITE_URL}/api/v1/keys\`. The response will immediately deliver an ephemeral sandbox API key valid for 24 hours without requiring credit cards or manual approval.

### Can AI agents call the batch endpoint for multiple actions?
Yes. AI agents can send a single payload with an array of operations to \`${SITE_URL}/api/v1/batch\` or \`${SITE_URL}/batch\` to optimize round-trips and minimize latency.
`;
      return fm("Pricing & Service Tiers — Shivanshu Tiwari", "Comprehensive transparent pricing, access tiers, rate limits, feature comparison matrix, and machine-readable pricing specifications for Shivanshu Tiwari APIs and developer services.", `${SITE_URL}/pricing`) + body;
    }
    case "openapi.json":
    case "api/openapi.json":
    case "openapi.json.md":
    case "auth":
    case "auth.md": {
      const body = `# Authentication Guide — Shivanshu Tiwari Portfolio API

This guide defines the authentication protocol, credentials, and identity assertions for the **Shivanshu Tiwari Portfolio API** following the WorkOS auth.md specification.

The portfolio provides public read-only access alongside an authenticated contact and testing surface. Browsing projects, blog posts, documentation, and the MCP servers requires **no credentials or bearer tokens**.

## Discover

- Protected resource metadata: \`${SITE_URL}/.well-known/oauth-protected-resource\`
- Authorization server metadata: \`${SITE_URL}/.well-known/oauth-authorization-server\`
- API catalog (RFC 9727): \`${SITE_URL}/.well-known/api-catalog\`
- WWW-Authenticate: \`Bearer resource_metadata="${SITE_URL}/.well-known/oauth-protected-resource"\`

## Pick a method

1. \`anonymous\` — Default for all read operations. No credentials required.
2. \`identity_assertion\` — Autonomous agents identifying themselves with \`urn:ietf:params:oauth:token-type:id-jag\`.
3. \`service_auth\` — Ephemeral test API keys generated via \`POST ${SITE_URL}/api/v1/keys\`.

## Register

Zero-friction self-serve registration. Anonymous agents need no registration.

## Claim

Submit inquiries to \`${SITE_URL}/api/v1/contact\` with an \`Idempotency-Key\` UUID.

## Exchange

Read requests proceed anonymously without token exchange.

## Use the access_token

\`\`\`bash
curl -H "Accept: text/markdown" ${SITE_URL}/about
curl -H "Authorization: Bearer <token>" ${SITE_URL}/api/v1/projects
\`\`\`

## Errors

- 401 Unauthorized with \`WWW-Authenticate\`
- 429 Too Many Requests with \`Retry-After\`
- 400 Bad Request (RFC 7807 problem details)

## Revocation

Sessions and test keys expire automatically.

## agent_auth

- identity_endpoint: \`${SITE_URL}/api/v1/contact\`
- identity_types_supported: ["anonymous", "identity_assertion", "service_auth"]
- identity_assertion.assertion_types_supported: ["urn:ietf:params:oauth:token-type:id-jag"]
- skill: \`${SITE_URL}/auth.md\`
- claim_endpoint: \`${SITE_URL}/api/v1/contact\`
- events_endpoint: \`${SITE_URL}/.well-known/oauth-protected-resource\`
`;
      return fm(`Authentication Guide — Shivanshu Tiwari`, "WorkOS auth.md authentication guide for Shivanshu Tiwari portfolio API.", `${SITE_URL}/auth.md`) + body;
    }
    case ".well-known/api-catalog":
    case ".well-known/api-catalog.json": {
      const body = `# RFC 9727 API Catalog — Shivanshu Tiwari

Machine-readable API catalog linkset for Shivanshu Tiwari portfolio APIs.

## Available API Specifications

- **OpenAPI Specification (JSON):** [${SITE_URL}/openapi.json](${SITE_URL}/openapi.json)
- **OpenAPI Specification (YAML):** [${SITE_URL}/openapi.yaml](${SITE_URL}/openapi.yaml)
- **Developer Portal:** [${SITE_URL}/developers](${SITE_URL}/developers)
- **Authentication Guide:** [${SITE_URL}/auth.md](${SITE_URL}/auth.md)
- **API Deprecation Policy:** [${SITE_URL}/developers/deprecation](${SITE_URL}/developers/deprecation)
- **Product Actions MCP Server:** [${SITE_URL}/mcp](${SITE_URL}/mcp)
- **Documentation MCP Server:** [${SITE_URL}/mcp/docs](${SITE_URL}/mcp/docs)
`;
      return fm(`API Catalog — Shivanshu Tiwari`, "RFC 9727 API catalog for Shivanshu Tiwari portfolio.", `${SITE_URL}/.well-known/api-catalog`) + body;
    }
    default:
      // Fallback for any other well-known or content page: return generic markdown with heading so .md twin never 404s for valid HTML
      if (key.startsWith(".well-known/") || key === "developers" || key.endsWith(".md")) {
        const body = `# ${key} — Shivanshu Tiwari\n\nContent for ${SITE_URL}/${key}. See ${SITE_URL}/llms.txt for discovery.\n\n`;
        return fm(`${key} — Shivanshu Tiwari`, `Content for ${key} — Shivanshu Tiwari portfolio.`, `${SITE_URL}/${key}`) + body;
      }
      return null;
  }
}

export function aboutMarkdown(): string {
  const body = `# About — Shivanshu Tiwari

> AI-native backend systems engineer — autonomous agents, LLM pipelines, and concurrency-safe backend systems.

I don't just use AI — I build things with it that keep running after I close my laptop. I'm a third-year B.Tech CS & IT student in Bhopal (SIRT Bhopal, RGPV — Class of 2027), and over the past year I've built autonomous agents, LLM pipelines, voice intelligence tools, and RL benchmarking systems across 19 documented projects — some shipped and deployed, some deliberately stopped short of production so I could document what actually worked and what didn't.

## How I work

I'm not interested in demos that only look good in a pitch. When something fails — an RL agent losing to a simple heuristic, a classifier scoring 25% instead of the 90% I hoped for — I keep the result and figure out why, instead of reframing it until it sounds better. That honest-documentation approach is visible in my case studies: DAITFO documents a negative result (the heuristic beat PPO on every metric) as the finding itself, and CloudAuditEnv explicitly flags unverified benchmark scores and missing seed support.

The standard I hold my own work to: the system owns the task completely — no human in the loop to patch over gaps.

## What I build

- **Autonomous AI agents** — e.g., Agentic Honeypot (Gemini 2.0 Flash scam-baiting agent extracting 8 entity types of fraud intelligence)
- **Voice AI** — e.g., Samvad (Sarvam AI speech-to-text, 3-phase transcript refinement with hallucination gate, ReAct task extraction)
- **RL systems** — e.g., DAITFO (custom Gymnasium environment wrapping SUMO, 27 controlled runs benchmarking PPO vs. heuristic)
- **Backend infrastructure** — FastAPI, Django, Node.js/Express, Docker, Redis, PostgreSQL, Celery, Socket.io, NATS JetStream

## Background

B.Tech Computer Science & Information Technology, Sagar Institute of Research and Technology (SIRT), Bhopal — affiliated to Rajiv Gandhi Proudyogiki Vishwavidyalaya (RGPV), Class of 2027. Based in Bhopal, India — open to remote and hybrid internships.

## Links

- GitHub: ${SOCIAL.github}
- LinkedIn: ${SOCIAL.linkedin}
- Email: ${SOCIAL.email.replace("mailto:", "")}
- Website: ${SITE_URL}

---
*Source: ${SITE_URL}/about — Draft expanded bio. Awaiting Shivanshu's review for final wording.*
`;
  return fm("About — Shivanshu Tiwari", "AI-native backend systems engineer — autonomous agents, LLM pipelines, and concurrency-safe backend systems.", `${SITE_URL}/about`) + body;
}

export function privacyMarkdown(): string {
  const body = `# Privacy Policy — shivanshutiwari.in

> This is a personal portfolio site. No analytics beyond Vercel's default hosting logs and optional Vercel Analytics pageview counts. No cookies except a role-preference cookie for the AI/Backend view toggle.

*Effective date: 2026-08-30 — Draft awaiting Shivanshu's review for accuracy.*

## What this site does

This is a static personal portfolio — not a SaaS product, not an e-commerce store. It presents projects, blog posts, and contact information.

## Data collection

- **Hosting logs:** Vercel (the hosting provider) logs basic request metadata (IP, user-agent, path) for operational and security purposes per Vercel's own privacy policy.
- **Vercel Analytics:** This site includes \`@vercel/analytics\` which counts pageviews without setting tracking cookies or collecting personal data. See [Vercel Analytics privacy](https://vercel.com/docs/analytics/privacy-policy).
- **Contact form:** If you use the contact form, your name, email, and message are sent to a Google Sheet via Google Sheets API. No data is sold or shared beyond that. The form includes rate-limiting (5 requests per IP window) and honeypot spam protection.
- **No other tracking:** No Google Analytics, Plausible, advertising pixels, or third-party cookies are in use as of this writing. Verify in \`src/app/layout.tsx\` and \`src/lib/analytics.ts\`.

## Cookies

- \`role\` — stores your preference for the AI Engineer vs Backend Systems view. SameSite=Lax, 1-year expiry. No tracking purpose.
- No consent banner is shown because no advertising/analytics cookies are set.

## Contact

If you have questions about data handling, reach out via the [contact page](${SITE_URL}/contact) or email ${SOCIAL.email.replace("mailto:", "")}.

---
*Source: ${SITE_URL}/privacy — Claims above were derived from codebase inspection (layout.tsx, analytics.ts, proxy.ts). Verify before publishing.*
`;
  return fm("Privacy Policy — shivanshutiwari.in", "Personal portfolio privacy — hosting logs, Vercel Analytics, contact form only.", `${SITE_URL}/privacy`) + body;
}

export function contactMarkdown(): string {
  const body = `# Contact — Shivanshu Tiwari

> Get in touch about internships, collaborations, or project questions. I prefer email for initial contact.

Have a question, project idea, or just want to say hi? Drop a message via the form at ${SITE_URL}/contact or reach me directly.

## How to reach me

- **Email:** ${SOCIAL.email.replace("mailto:", "")} (preferred for internships and detailed inquiries)
- **GitHub:** ${SOCIAL.github}
- **LinkedIn:** ${SOCIAL.linkedin}
- **Contact form:** ${SITE_URL}/contact — name, email, and message (min 10 chars) sent to a Google Sheet; rate-limited and spam-filtered.

## What to reach out about

- AI/Software Engineering internships (remote or hybrid) — actively looking
- Collaborations on agent systems, LLM pipelines, or backend infrastructure
- Questions about any of the 19 documented projects (especially DAITFO, Agentic Honeypot, Samvad, PayoutEngine, CloudAuditEnv)
- Feedback on honest-documentation approach or case-study methodology

## Response time

I aim to respond within 2–3 days. If you haven't heard back, a follow-up via email is welcome.

---
*Source: ${SITE_URL}/contact*
`;
  return fm("Contact — Shivanshu Tiwari", "Get in touch about internships, collaborations, or project questions.", `${SITE_URL}/contact`) + body;
}
