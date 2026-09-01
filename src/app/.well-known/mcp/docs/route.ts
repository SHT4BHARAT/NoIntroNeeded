import { SITE_URL } from "@/lib/constants";
export function GET() {
  return Response.json(
    {
      name: "Shivanshu Tiwari Docs MCP",
      description: "Docs MCP for shivanshutiwari.in — llms.txt, sitemap, blog markdown",
      version: "1.0.0",
      serverUrl: `${SITE_URL}/mcp/docs`,
      tools: [{ name: "search_docs", description: "Search Shivanshu Tiwari docs via llms.txt and sitemap" }],
    },
    { headers: { "Content-Type": "application/json" } }
  );
}
