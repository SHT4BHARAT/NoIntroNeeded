import { SITE_URL } from "@/lib/constants";

export function GET() {
  const catalog = {
    specVersion: "1.0",
    entries: [
      {
        identifier: "urn:air:shivanshutiwari.in:mcp:portfolio",
        displayName: "Shivanshu Tiwari Portfolio Actions MCP",
        type: "application/mcp-server-card+json",
        url: `${SITE_URL}/.well-known/mcp/server-card.json`,
        description: "Action-capable MCP server for portfolio — list projects, compare architectures, contact",
        representativeQueries: [
          "show Shivanshu Tiwari portfolio projects",
          "what did Shivanshu build for AI agents",
          "compare DAITFO vs heuristic benchmark",
        ],
        capabilities: ["portfolio-query", "project-compare", "contact-submission"],
        trustManifest: {
          identity: "https://shivanshutiwari.in",
          identityType: "https",
          trustSchema: { identifier: "https", governanceUri: SITE_URL },
        },
      },
      {
        identifier: "urn:air:shivanshutiwari.in:mcp:docs",
        displayName: "Shivanshu Tiwari Portfolio Docs MCP",
        type: "application/mcp-server-card+json",
        url: `${SITE_URL}/.well-known/mcp/docs/server-card.json`,
        description: "Read-only MCP server for portfolio docs — search documentation, retrieve markdown pages, blog posts",
        representativeQueries: [
          "search Shivanshu Tiwari documentation",
          "get markdown twin for /about",
          "list blog posts from shivanshutiwari.in",
        ],
        capabilities: ["docs-search", "page-retrieval"],
        trustManifest: {
          identity: "https://shivanshutiwari.in",
          identityType: "https",
          trustSchema: { identifier: "https", governanceUri: SITE_URL },
        },
      },
      {
        identifier: "urn:air:shivanshutiwari.in:skill:portfolio-query",
        displayName: "Shivanshu Tiwari Portfolio Query Skill",
        type: "application/ai-skill+md",
        url: "https://github.com/SHT4BHARAT/NoIntroNeeded/blob/main/SKILL.md",
        description: "Query 19 projects, blog, achievements via llms.txt and markdown twins",
        representativeQueries: [
          "compare DAITFO vs heuristic",
          "what is Agentic Honeypot accuracy",
        ],
        trustManifest: {
          identity: "https://shivanshutiwari.in",
          identityType: "https",
          trustSchema: { identifier: "https", governanceUri: SITE_URL },
        },
      },
      {
        identifier: "urn:air:shivanshutiwari.in:api:portfolio",
        displayName: "Shivanshu Tiwari Portfolio API",
        type: "application/openapi+json",
        url: `${SITE_URL}/openapi.json`,
        description: "Versioned portfolio REST API — projects, async jobs, contact, sandbox",
        representativeQueries: [
          "fetch shivanshutiwari.in sitemap",
          "get OpenAPI spec for shivanshutiwari portfolio",
        ],
        trustManifest: {
          identity: "https://shivanshutiwari.in",
          identityType: "https",
          trustSchema: { identifier: "https", governanceUri: SITE_URL },
        },
      },
      {
        identifier: "urn:air:shivanshutiwari.in:agent:shivanshu-tiwari",
        displayName: "Shivanshu Tiwari Agent",
        type: "application/a2a-agent-card+json",
        url: `${SITE_URL}/.well-known/agent-card.json`,
        description: "A2A agent card for Shivanshu Tiwari portfolio",
        representativeQueries: [
          "contact Shivanshu Tiwari for internship",
          "what is Shivanshu's tech stack",
        ],
        trustManifest: {
          identity: "https://shivanshutiwari.in",
          identityType: "https",
          trustSchema: { identifier: "https", governanceUri: SITE_URL },
        },
      },
    ],
  };

  return Response.json(catalog, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
      "Access-Control-Allow-Origin": "*",
    },
  });
}

export function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      Allow: "GET, OPTIONS",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
