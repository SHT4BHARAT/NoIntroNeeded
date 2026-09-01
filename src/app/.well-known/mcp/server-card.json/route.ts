import { SITE_URL, SITE_NAME } from "@/lib/constants";

export function GET() {
  return Response.json(
    {
      name: `${SITE_NAME} Portfolio MCP`,
      description: "Read-only MCP server for portfolio docs — projects, blog, achievements. Streamable HTTP at /mcp. No auth.",
      version: "1.0.0",
      serverUrl: `${SITE_URL}/mcp`,
      instructions: "Use list_projects to enumerate 19 projects, get_project for deep dive, query_portfolio for RAG.",
      tools: [
        { name: "list_projects", description: "List all portfolio projects for Shivanshu Tiwari — 19 projects with stack and highlights", inputSchema: { type: "object", properties: {} }, annotations: { readOnlyHint: true } },
        { name: "get_project", description: "Get portfolio project by slug identifier for Shivanshu Tiwari — e.g. daitfo, samvad", inputSchema: { type: "object", properties: { slug: { type: "string" } }, required: ["slug"] }, annotations: { readOnlyHint: true } },
        { name: "query_portfolio", description: "Query Shivanshu Tiwari portfolio via llms.txt and markdown twins for RAG", inputSchema: { type: "object", properties: { query: { type: "string" } } }, annotations: { readOnlyHint: true } },
        { name: "contact", description: "Send contact message to Shivanshu Tiwari — triggers email via contact API", inputSchema: { type: "object", properties: { name: { type: "string" }, email: { type: "string" }, message: { type: "string" } }, required: ["name", "email", "message"] }, annotations: { readOnlyHint: false } },
      ],
    },
    { headers: { "Content-Type": "application/json; charset=utf-8" } }
  );
}
