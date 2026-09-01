import { SITE_URL } from "@/lib/constants";

export function GET() {
  const catalog = {
    version: "1.0",
    publisher: SITE_URL,
    // Agentic Resource Discovery catalog — lists actual portfolio resources honestly
    resources: [
      {
        type: "llms-txt",
        url: `${SITE_URL}/llms.txt`,
        description: "Curated entry point for AI agents — projects, case studies, when-to-use",
      },
      {
        type: "api-catalog",
        url: `${SITE_URL}/.well-known/api-catalog`,
        description: "RFC 9727 API catalog (linkset) for sitemap and markdown twins",
      },
      {
        type: "agent-skills",
        url: `${SITE_URL}/.well-known/agent-skills/index.json`,
        description: "Portfolio query skills",
      },
      {
        type: "mcp-server",
        url: `${SITE_URL}/.well-known/mcp/server-card.json`,
        description: "Read-only MCP server for portfolio docs",
      },
      {
        type: "a2a-agent-card",
        url: `${SITE_URL}/.well-known/agent-card.json`,
        description: "A2A agent card",
      },
      {
        type: "markdown-alternate",
        url: `${SITE_URL}/`,
        description: "Every page serves markdown via Accept: text/markdown or ?mode=agent or .md twin",
        alternate: { type: "text/markdown", href: `${SITE_URL}/.md` },
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
