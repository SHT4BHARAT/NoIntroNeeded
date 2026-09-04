import { SITE_URL } from "../../../lib/constants";

export function GET() {
  const body = `---
title: "Pricing & Service Tiers — Shivanshu Tiwari"
description: "Comprehensive transparent pricing, access tiers, rate limits, feature comparison matrix, enterprise custom agreements, and machine-readable pricing specifications for Shivanshu Tiwari APIs and developer services."
canonical: "${SITE_URL}/pricing"
lastUpdated: "2026-09-04"
version: "2.1.0"
---

# Pricing & Service Tiers — Shivanshu Tiwari

Transparent, zero-surprise access tiers and pricing specifications for developers, autonomous AI agents, technical researchers, and engineering recruiters.

## 1. Service Tiers & Plan Overview

| Tier | Price | Billing Period | Rate Limit | Target Audience | Core Capabilities |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Community Free** | **$0.00** | Perpetual | 60 req/min | Developers, AI Agents | Public portfolio REST API, RFC 9727 catalog, markdown twins, OpenAPI 3.0.3 spec, and full project documentation. |
| **Agent Sandbox** | **$0.00** | Perpetual | 120 req/min | Automated Agents, CI/CD | Ephemeral test key generation via \`POST /api/v1/keys\`, isolated test endpoints (\`/api/v1/sandbox/ping\`, \`/api/v1/sandbox/contact\`), and mock 202 async jobs. |
| **Dual MCP Streamable** | **$0.00** | Perpetual | 60 req/min | Claude, ChatGPT, Cursor | Full Model Context Protocol (MCP) Streamable HTTP SSE support across two dedicated servers: \`/mcp\` (action tools) and \`/mcp/docs\` (documentation search & page retrieval). |
| **Developer Pro (API Partner)** | **$0.00** | Perpetual | 300 req/min | Research Labs, Integrators | High-throughput batch operations via \`POST /api/v1/batch\`, priority async job execution, and webhook status notifications. |
| **Enterprise / Custom SLA** | **Negotiable** | Annual / Monthly | 1000+ req/min | Enterprise Teams | Dedicated tenant isolation, custom webhooks, guaranteed 99.99% uptime SLA, and direct engineer-to-engineer communication channels. |
| **Engineering Contract / Hire** | **Negotiable** | Hourly / Milestone | Dedicated SLA | Recruiters, Tech Companies | Full-stack software engineering: autonomous multi-agent pipelines, concurrent distributed systems, voice AI engines, and production TypeScript/Python development. |

---

## 2. Detailed Feature Comparison Matrix

| Feature / Capability | Community Free | Agent Sandbox | Dual MCP Streamable | Developer Pro | Enterprise SLA | Contract / Hire |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Base Price** | $0 | $0 | $0 | $0 | Custom | Custom Quote |
| **Overage Charges** | None ($0) | None ($0) | None ($0) | None ($0) | None | N/A |
| **Rate Limit (req/min)** | 60 | 120 | 60 | 300 | 1,000+ | Unlimited |
| **Concurrent Connections** | 10 | 25 | 15 | 100 | Dedicated | Dedicated |
| **OpenAPI 3.0.3 Specification** | Included | Included | Included | Included | Included | Included |
| **RFC 9727 API Catalog** | Included | Included | Included | Included | Included | Included |
| **Markdown Twins (\`.md\` routes)** | Included | Included | Included | Included | Included | Included |
| **Product MCP Tools (5 tools)** | Included | Included | Included | Included | Included | Included |
| **Docs MCP Server (3 tools)** | Included | Included | Included | Included | Included | Included |
| **Instant Self-Serve API Keys** | Anonymous | Included | Anonymous | Included | Dedicated Key | Custom Auth |
| **Batch Endpoint (\`/api/v1/batch\`)** | Included | Included | Included | Included | Dedicated Rail | Dedicated Rail |
| **Async Jobs Pattern (202 Accepted)** | Included | Included | Included | Included | Priority Queue | Custom Queue |
| **Sandbox Environment (\`X-Sandbox\`)** | N/A | Included | N/A | Included | Isolated Staging | Custom Env |
| **WorkOS \`auth.md\` Walkthrough** | Included | Included | Included | Included | Custom SSO / SAML | Custom Auth |
| **Official NPM SDK (\`sht-portfolio-v2\`)** | Included | Included | Included | Included | Included | Included |
| **Official PyPI SDK (\`shivanshu-sdk\`)** | Included | Included | Included | Included | Included | Included |
| **Official CLI Tool (\`npx shivanshu\`)** | Included | Included | Included | Included | Included | Included |
| **Direct Engineering Availability** | Email/Form | Email/Form | Email/Form | Priority Email | Dedicated Slack | Dedicated Slack/Meet |

---

## 3. Rate Limits & Quotas Breakdown

| Endpoint Category | Standard Limit | Burst Allowance | Response Header Code | Action on Exceeded |
| :--- | :--- | :--- | :--- | :--- |
| **Public Project Read** (\`/api/v1/projects\`) | 60 req / min | 15 req burst | \`429 Too Many Requests\` | Back off using \`Retry-After\` header |
| **Search Queries** (\`/api/search\`) | 60 req / min | 10 req burst | \`429 Too Many Requests\` | Cache client-side for 60 seconds |
| **Sandbox Ping** (\`/api/v1/sandbox/ping\`) | 120 req / min | 30 req burst | \`429 Too Many Requests\` | Automated agent retry loop |
| **Ephemeral Key Generation** (\`/api/v1/keys\`) | 30 req / min | 5 req burst | \`429 Too Many Requests\` | Reuse existing ephemeral key (valid 24h) |
| **Batch Operations** (\`/api/v1/batch\`) | 60 req / min | 10 req burst | \`429 Too Many Requests\` | Maximum 25 operations per batch call |
| **Asynchronous Jobs** (\`/api/v1/jobs\`) | 30 req / min | 5 req burst | \`429 Too Many Requests\` | Poll status endpoint with exponential backoff |
| **MCP SSE Connections** (\`/mcp\`) | 20 concurrent | 5 reconnects/min | \`503 Service Unavailable\` | Wait 5 seconds before reconnecting |

---

## 4. SLA & Uptime Commitments

1. **High Availability Target:** Portfolio services, MCP servers, and REST APIs are designed for 99.9% availability, deployed across Vercel Edge Network globally.
2. **Response Time SLA:** 95th percentile latency target is < 150ms for cached project endpoints and < 350ms for dynamic search and batch operations.
3. **Deprecation Policy:** All REST APIs follow RFC 8594 deprecation standards. Breaking changes are announced at least 90 days in advance via \`Deprecation\` and \`Sunset\` HTTP headers with link relations pointing to \`${SITE_URL}/developers/deprecation\`.
4. **Data Durability:** Sandbox submissions and test inquiries are strictly isolated in-memory and discarded without touching production persistence layers.

---

## 5. Machine-Readable Pricing Specification (JSON)

\`\`\`json
{
  "$schema": "https://schemas.agent-pricing.org/v1/pricing.json",
  "version": "2.1.0",
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
        "RFC 9727 catalog at /.well-known/api-catalog",
        "Dual MCP servers (/mcp and /mcp/docs)"
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
    },
    {
      "id": "enterprise_custom",
      "name": "Enterprise & Custom SLA",
      "price": "custom",
      "billingPeriod": "monthly",
      "rateLimit": { "requests": 1000, "period": "minute" },
      "features": [
        "Dedicated tenant isolation",
        "Custom webhooks & integrations",
        "Guaranteed 99.99% uptime SLA",
        "Direct Slack channel support"
      ]
    }
  ]
}
\`\`\`

---

## 6. Machine Payment Protocols & Micropayments

For automated agentic payments, reservations, and contract transactions:
- **Agentic Commerce Protocol (ACP) Delegate Payment:** \`POST ${SITE_URL}/agentic_commerce/delegate_payment\`
- **Open Access Architecture:** Because all core services, documentation, and tools are offered under the Community Free tier, AI agents do not require payment credentials to crawl, discover, or query this site.
- **Refund & Cancellation Policy:** As all publicly accessible tiers are provided free of charge ($0.00), no billing disputes, chargebacks, or refund requests apply. Custom contract engagements adhere to milestone-based deliverables specified in written service agreements.

---

## 7. Frequently Asked Questions (FAQ)

### Are there any hidden fees or token costs?
No. All APIs, markdown twins, documentation indices, and MCP servers on ${SITE_URL} are 100% free and open to all automated agents and human developers.

### How do I generate an API key for automated testing?
Send an HTTP POST request to \`${SITE_URL}/api/v1/keys\`. The response will immediately deliver an ephemeral sandbox API key valid for 24 hours without requiring credit cards or manual approval.

### Can AI agents call the batch endpoint for multiple actions?
Yes. AI agents can send a single payload with an array of operations to \`${SITE_URL}/api/v1/batch\` or \`${SITE_URL}/batch\` to optimize round-trips and minimize latency.

### How do AI agents authenticate against protected endpoints?
Include the header \`Authorization: Bearer <token>\` or pass an ephemeral test key in the query string or header. Detailed instructions are available in [${SITE_URL}/auth.md](${SITE_URL}/auth.md).

### How do I hire Shivanshu Tiwari for contract or full-time roles?
Inquiries can be submitted programmatically via \`POST /api/v1/contact\`, interactively via the contact form on [${SITE_URL}/contact](${SITE_URL}/contact), or through direct email to [sht4bharat@gmail.com](mailto:sht4bharat@gmail.com).

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
