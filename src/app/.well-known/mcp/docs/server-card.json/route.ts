import { SITE_URL } from "../../../../../lib/constants";

export function GET() {
  return Response.json(
    {
      name: "Shivanshu Tiwari Portfolio Docs MCP",
      description: "Read-only MCP server for portfolio documentation — projects, markdown twins, blog, and sitemap. Streamable HTTP at /mcp/docs.",
      version: "1.0.0",
      serverUrl: `${SITE_URL}/mcp/docs`,
      instructions: "Use search_docs to query documentation, get_doc to retrieve page markdown, and list_docs to inspect available guides.",
      tools: [
        {
          name: "search_docs",
          description: "Search Shivanshu Tiwari portfolio documentation, project writeups, and technical blog posts.",
          inputSchema: {
            type: "object",
            properties: {
              query: { type: "string", description: "Search query" },
            },
            required: ["query"],
          },
          annotations: { title: "Search Docs", readOnlyHint: true },
        },
        {
          name: "get_doc",
          description: "Retrieve complete markdown documentation for any path (e.g. /about, /developers, /developers/deprecation, /projects/agentic-honey-pot).",
          inputSchema: {
            type: "object",
            properties: {
              path: { type: "string", description: "Documentation path" },
            },
            required: ["path"],
          },
          annotations: { title: "Get Document", readOnlyHint: true },
        },
        {
          name: "list_docs",
          description: "List all available documentation topics, markdown pages, and project writeups.",
          inputSchema: {
            type: "object",
            properties: {
              category: {
                type: "string",
                enum: ["all", "projects", "guides", "policies"],
                description: "Optional category to filter documentation topics",
              },
            },
            additionalProperties: false,
          },
          annotations: { title: "List Docs", readOnlyHint: true },
        },
      ],
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
