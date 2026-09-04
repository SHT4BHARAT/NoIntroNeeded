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

Developer portal for **Shivanshu Tiwari** — programmatic access, OpenAPI 3.0.3 specifications, Model Context Protocol (MCP) servers, WorkOS auth.md guide, and sandbox testing.

## Quickstart

- **Agent Guide:** ${SITE_URL}/llms.txt
- **XML Sitemap:** ${SITE_URL}/sitemap.xml
- **OpenAPI Specification (JSON):** ${SITE_URL}/openapi.json
- **OpenAPI Specification (YAML):** ${SITE_URL}/openapi.yaml
- **Authentication Guide (auth.md):** ${SITE_URL}/auth.md
- **API Deprecation Policy:** ${SITE_URL}/developers/deprecation

## REST API Endpoints

- \`GET /api/v1/projects\` — List projects (cursor pagination)
- \`GET /api/v1/projects/{slug}\` — Project details & architecture
- \`POST /api/v1/contact\` — Idempotent contact submission (Idempotency-Key)
- \`POST /api/v1/jobs\` — Asynchronous job execution (202 Accepted + Location)
- \`GET /api/v1/jobs/{jobId}\` — Poll async job status & results
- \`GET /api/v1/sandbox/ping\` — Sandbox environment verification (X-Sandbox header)
- \`POST /api/v1/keys\` — Self-serve test API key generation

## Model Context Protocol (MCP)

- **Product Actions MCP Server:** \`POST ${SITE_URL}/mcp\` (Server card: \`${SITE_URL}/.well-known/mcp/server-card.json\`)
- **Documentation MCP Server:** \`POST ${SITE_URL}/mcp/docs\` (Server card: \`${SITE_URL}/.well-known/mcp/docs/server-card.json\`)
`;
      return fm(`Shivanshu Tiwari Developer Portal & API Documentation`, "Developer portal for Shivanshu Tiwari — API docs, OpenAPI, auth, MCP.", `${SITE_URL}/developers`) + body;
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
    case "pricing":
    case ".well-known/pricing": {
      const body = `# Pricing & Service Tiers — Shivanshu Tiwari

Transparent pricing and access tiers for portfolio resources, APIs, and engineering collaboration.

## Service Tiers

| Tier | Price | Rate Limit | Target Audience | Core Features |
| :--- | :--- | :--- | :--- | :--- |
| **Open Source / Community** | **$0 / Free** | 60 req/min | Developers, Researchers | Access to all 19 public GitHub repositories, OpenAPI 3.0.3 specs, markdown twins, and architecture diagrams |
| **Agent Sandbox / Testing** | **$0 / Free** | 120 req/min | AI Agents, Automated Testers | Instant test API keys via \`POST /api/v1/keys\`, sandbox endpoints (\`/api/v1/sandbox/ping\`, \`/api/v1/sandbox/contact\`), mock execution |
| **Streamable MCP Servers** | **$0 / Free** | 60 req/min | Claude Desktop, ChatGPT, Cursor | Dual MCP servers at \`/mcp\` (product actions) and \`/mcp/docs\` (documentation search & page retrieval) via Streamable HTTP SSE |
| **Engineering Internship / Contract** | **Negotiable / Standard Stipend** | Unlimited | Engineering Teams, Recruiters | Full-time or contract software engineering: autonomous LLM agent pipelines, concurrent backend systems, FastAPI/Node.js development |
| **Open Source Advising & Mentorship** | **$0 / Free** | N/A | Students, Hackathons, Non-profits | Architecture review, agentic system design, and hackathon mentoring |

## Machine-Readable Pricing Specification

\`\`\`json
{
  "$schema": "https://schemas.agent-pricing.org/v1/pricing.json",
  "currency": "USD",
  "tiers": [
    {
      "id": "free_community",
      "name": "Open Source & Community",
      "price": 0,
      "billingPeriod": "perpetual",
      "rateLimit": { "requests": 60, "period": "minute" },
      "features": ["19 public repositories", "OpenAPI specs", "Markdown twins", "No API key required"]
    },
    {
      "id": "sandbox_testing",
      "name": "Agent Sandbox & Testing",
      "price": 0,
      "billingPeriod": "perpetual",
      "rateLimit": { "requests": 120, "period": "minute" },
      "features": ["Instant key generation", "POST /api/v1/keys", "X-Sandbox isolation", "202 async jobs"]
    },
    {
      "id": "mcp_integration",
      "name": "Model Context Protocol (MCP)",
      "price": 0,
      "billingPeriod": "perpetual",
      "rateLimit": { "requests": 60, "period": "minute" },
      "features": ["Product MCP at /mcp", "Docs MCP at /mcp/docs", "Streamable HTTP SSE", "JSON-RPC 2.0"]
    }
  ]
}
\`\`\`

## Payment Protocols

For autonomous machine transactions and micropayments, shivanshutiwari.in implements:
- **Agentic Commerce Protocol (ACP) Delegate Payment:** \`POST ${SITE_URL}/agentic_commerce/delegate_payment\`
- **Zero-Cost Access:** All discovery, documentation, and portfolio API services are free of charge.
`;
      return fm("Pricing & Service Tiers — Shivanshu Tiwari", "Transparent pricing, service tiers, and API access limits for Shivanshu Tiwari portfolio, APIs, and engineering engagements.", `${SITE_URL}/.well-known/pricing`) + body;
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
