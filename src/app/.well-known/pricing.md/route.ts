import { SITE_URL } from "../../../lib/constants";

export function GET() {
  const body = `---
title: "Pricing & Service Tiers — Shivanshu Tiwari"
description: "Transparent pricing, service tiers, and API access limits for Shivanshu Tiwari portfolio, APIs, and engineering engagements."
canonical: "${SITE_URL}/.well-known/pricing"
lastUpdated: "2026-09-04"
---

# Pricing & Service Tiers — Shivanshu Tiwari

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

---
*Source: ${SITE_URL}/.well-known/pricing*
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
      Vary: "Accept",
    },
  });
}
