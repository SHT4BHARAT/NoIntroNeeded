import { SITE_URL } from "@/lib/constants";
export function GET() {
  return Response.json({ serverUrl: `${SITE_URL}/.well-known/mcp`, description: "Portfolio docs MCP (read-only)" }, { headers: { "Content-Type": "application/json" } });
}
