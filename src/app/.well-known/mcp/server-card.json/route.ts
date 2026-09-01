import { SITE_URL, SITE_NAME } from "@/lib/constants";

export function GET() {
  return Response.json(
    {
      name: `${SITE_NAME} Portfolio MCP`,
      description: "Read-only MCP server for portfolio docs — projects, blog, achievements. No auth.",
      version: "1.0.0",
      serverUrl: `${SITE_URL}/.well-known/mcp`,
      tools: [
        { name: "query_portfolio", description: "Query projects/blog via llms.txt" },
        { name: "get_project", description: "Fetch project markdown twin" },
      ],
    },
    { headers: { "Content-Type": "application/json; charset=utf-8" } }
  );
}
