import { SITE_URL } from "../../../lib/constants";

export function GET() {
  const body = `---
title: "Pricing & Service Tiers — Shivanshu Tiwari"
description: "Comprehensive transparent pricing, access tiers, rate limits, feature comparison matrix, and machine-readable pricing specifications for Shivanshu Tiwari APIs and developer services."
canonical: "${SITE_URL}/pricing"
lastUpdated: "2026-09-04"
version: "2.0.0"
---

# Pricing & Service Tiers — Shivanshu Tiwari

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

---
*Canonical Reference: [${SITE_URL}/pricing](${SITE_URL}/pricing) | Machine Twin: [${SITE_URL}/pricing.md](${SITE_URL}/pricing.md)*
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
      Vary: "Accept",
    },
  });
}
