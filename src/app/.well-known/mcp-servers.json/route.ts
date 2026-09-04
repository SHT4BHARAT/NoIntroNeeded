import { SITE_URL } from "@/lib/constants";

export function GET() {
  return Response.json(
    {
      version: "1.0.0",
      servers: [
        {
          id: "product",
          name: "Shivanshu Tiwari Product MCP",
          category: "product",
          type: "product",
          description: "Action-capable MCP server for portfolio operations, projects, and contact.",
          serverUrl: `${SITE_URL}/mcp`,
          serverCard: `${SITE_URL}/.well-known/mcp/server-card.json`,
          transport: "streamable-http",
        },
        {
          id: "docs",
          name: "Shivanshu Tiwari Documentation MCP",
          category: "documentation",
          type: "docs",
          description: "Documentation search and markdown twin retrieval MCP server.",
          serverUrl: `${SITE_URL}/mcp/docs`,
          serverCard: `${SITE_URL}/.well-known/mcp/docs/server-card.json`,
          transport: "streamable-http",
        },
      ],
      mcpServers: {
        product: {
          url: `${SITE_URL}/mcp`,
          card: `${SITE_URL}/.well-known/mcp/server-card.json`,
        },
        documentation: {
          url: `${SITE_URL}/mcp/docs`,
          card: `${SITE_URL}/.well-known/mcp/docs/server-card.json`,
        },
      },
    },
    {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
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
