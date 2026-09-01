import { SITE_URL } from "@/lib/constants";
export function GET() {
  return Response.json(
    {
      name: "Shivanshu Tiwari Docs MCP",
      description: "Docs MCP for shivanshutiwari.in — llms.txt, sitemap, blog markdown. Read-only.",
      version: "1.0.0",
      serverUrl: `${SITE_URL}/mcp/docs`,
      instructions: "Use search_docs to query Shivanshu Tiwari docs — projects, blog, llms.txt.",
      tools: [
        { name: "search_docs", description: "Search Shivanshu Tiwari docs via llms.txt and sitemap for RAG", inputSchema: { type: "object", properties: { query: { type: "string" } } }, annotations: { readOnlyHint: true } },
        { name: "get_page", description: "Get page markdown twin for Shivanshu Tiwari by path", inputSchema: { type: "object", properties: { path: { type: "string" } }, required: ["path"] }, annotations: { readOnlyHint: true } },
      ],
    },
    { headers: { "Content-Type": "application/json" } }
  );
}
