import { SITE_URL } from "@/lib/constants";

export function GET() {
  return Response.json(
    {
      name: "Shivanshu Tiwari Product MCP",
      id: "shivanshutiwari-product-mcp",
      description: "Product action MCP server for portfolio — list projects, compare architectures, submit contact, and query APIs. Streamable HTTP at /mcp.",
      version: "1.0.0",
      transport: "streamable-http",
      serverUrl: `${SITE_URL}/mcp`,
      endpoint: `${SITE_URL}/mcp`,
      endpoints: [
        { type: "streamable-http", url: `${SITE_URL}/mcp` },
        { type: "sse", url: `${SITE_URL}/mcp` },
      ],
      remotes: [
        { type: "streamable-http", url: `${SITE_URL}/mcp` },
      ],
      documentationServer: `${SITE_URL}/mcp/docs`,
      docsCard: `${SITE_URL}/.well-known/mcp/docs/server-card.json`,
      instructions: "Use list_projects to enumerate projects, get_project for deep dives, compare_projects for tradeoffs, contact for hiring.",
      tools: [
        {
          name: "list_projects",
          description: "List all portfolio projects for Shivanshu Tiwari with tech stack, domain, and highlights.",
          inputSchema: {
            type: "object",
            properties: {
              domain: { type: "string", enum: ["ai-agents", "backend", "voice-ai", "rl"] },
            },
          },
          annotations: { title: "List Projects", readOnlyHint: true, destructiveHint: false },
        },
        {
          name: "get_project",
          description: "Get comprehensive technical details, architecture, tradeoffs, and honest results for a specific project.",
          inputSchema: {
            type: "object",
            properties: { slug: { type: "string", description: "Project slug" } },
            required: ["slug"],
          },
          annotations: { title: "Get Project Details", readOnlyHint: true, destructiveHint: false },
        },
        {
          name: "compare_projects",
          description: "Compare technical architecture, benchmarks, and outcomes between two projects.",
          inputSchema: {
            type: "object",
            properties: {
              slugA: { type: "string", description: "First project slug" },
              slugB: { type: "string", description: "Second project slug" },
            },
            required: ["slugA", "slugB"],
          },
          annotations: { title: "Compare Projects", readOnlyHint: true, destructiveHint: false },
        },
        {
          name: "contact",
          description: "Submit a message, internship inquiry, or collaboration request to Shivanshu Tiwari.",
          inputSchema: {
            type: "object",
            properties: {
              name: { type: "string" },
              email: { type: "string", format: "email" },
              message: { type: "string", minLength: 10 },
            },
            required: ["name", "email", "message"],
          },
          annotations: { title: "Contact", readOnlyHint: false, destructiveHint: false },
        },
        {
          name: "get_api_catalog",
          description: "Retrieve RFC 9727 API catalog and OpenAPI service descriptions for shivanshutiwari.in.",
          inputSchema: {
            type: "object",
            properties: {
              format: { type: "string", enum: ["json", "markdown"], description: "Format of the catalog representation" },
            },
            additionalProperties: false,
          },
          annotations: { title: "Get API Catalog", readOnlyHint: true, destructiveHint: false },
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
