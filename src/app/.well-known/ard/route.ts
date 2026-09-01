import { SITE_URL } from "@/lib/constants";

export function GET() {
  const catalog = {
    specVersion: "1.0",
    entries: [
      {
        identifier: "urn:air:shivanshutiwari.in:mcp:portfolio-docs",
        displayName: "Shivanshu Tiwari Portfolio Docs MCP",
        type: "application/mcp-server-card+json",
        url: `${SITE_URL}/.well-known/mcp/server-card.json`,
        description: "Read-only MCP server for portfolio docs",
        representativeQueries: ["show Shivanshu Tiwari portfolio projects", "list blog posts"],
        trustManifest: { identity: "https://shivanshutiwari.in", identityType: "https" },
      },
      {
        identifier: "urn:air:shivanshutiwari.in:skill:portfolio-query",
        displayName: "Shivanshu Tiwari Portfolio Query Skill",
        type: "application/ai-skill+md",
        url: "https://github.com/SHT4BHARAT/NoIntroNeeded/blob/main/SKILL.md",
        description: "Query 19 projects via llms.txt",
        representativeQueries: ["compare DAITFO vs heuristic", "what is Agentic Honeypot"],
        trustManifest: { identity: "https://shivanshutiwari.in" },
      },
      {
        identifier: "urn:air:shivanshutiwari.in:api:portfolio",
        displayName: "Shivanshu Tiwari Portfolio API",
        type: "application/openapi+json",
        url: `${SITE_URL}/openapi.json`,
        description: "Portfolio API",
        representativeQueries: ["fetch shivanshutiwari.in sitemap", "get OpenAPI spec"],
        trustManifest: { identity: "https://shivanshutiwari.in" },
      },
      {
        identifier: "urn:air:shivanshutiwari.in:agent:shivanshu-tiwari",
        displayName: "Shivanshu Tiwari Agent",
        type: "application/a2a-agent-card+json",
        url: `${SITE_URL}/.well-known/agent-card.json`,
        description: "A2A agent",
        representativeQueries: ["contact Shivanshu Tiwari", "what is Shivanshu's tech stack"],
        trustManifest: { identity: "https://shivanshutiwari.in" },
      },
    ],
  };

  return Response.json(catalog, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
