import { SITE_URL } from "@/lib/constants";
export function GET() {
  return Response.json({ name: "portfolio-docs-mcp", serverUrl: `${SITE_URL}/mcp/docs`, description: "Docs MCP — read llms.txt, sitemap, blog markdown", tools: [{ name: "search_docs", description: "Search docs" }] });
}
export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const id = (body as { id?: unknown }).id ?? 1;
  if ((body as { method?: string }).method === "tools/list") {
    return Response.json({ jsonrpc: "2.0", id, result: { tools: [{ name: "search_docs", description: "Search docs" }] } });
  }
  return Response.json({ jsonrpc: "2.0", id, result: { content: [{ type: "text", text: "docs MCP" }] } });
}
