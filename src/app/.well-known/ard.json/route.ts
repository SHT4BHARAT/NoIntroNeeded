import { SITE_URL } from "@/lib/constants";

export function GET() {
  const catalog = {
    version: "1.0",
    publisher: SITE_URL,
    resources: [
      {
        type: "llms-txt",
        url: `${SITE_URL}/llms.txt`,
        description: "Curated entry point for AI agents",
      },
      {
        type: "api-catalog",
        url: `${SITE_URL}/.well-known/api-catalog`,
        description: "RFC 9727 API catalog",
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
    ],
  };

  return Response.json(catalog, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
