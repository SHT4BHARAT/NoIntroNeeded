import { SITE_URL } from "@/lib/constants";

const tools = [
  { name: "list_projects", description: "List portfolio projects", inputSchema: { type: "object", properties: {} } },
  { name: "get_project", description: "Get project by slug", inputSchema: { type: "object", properties: { slug: { type: "string" } }, required: ["slug"] } },
  { name: "query_portfolio", description: "Query portfolio via llms.txt", inputSchema: { type: "object", properties: { query: { type: "string" } } } },
  { name: "contact", description: "Send contact message", inputSchema: { type: "object", properties: { name: { type: "string" }, email: { type: "string" }, message: { type: "string" } }, required: ["name", "email", "message"] } },
];

export async function GET() {
  // Manifest for streamable HTTP discovery
  return Response.json({ name: "shivanshutiwari-mcp", version: "1.0.0", transport: "streamable-http", serverUrl: `${SITE_URL}/mcp`, tools }, { headers: { "Content-Type": "application/json" } });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const method = (body as { method?: string }).method;
  const id = (body as { id?: unknown }).id ?? 1;

  // MCP JSON-RPC
  if (method === "initialize") {
    return Response.json({ jsonrpc: "2.0", id, result: { protocolVersion: "2024-11-05", capabilities: { tools: {} }, serverInfo: { name: "shivanshutiwari-mcp", version: "1.0.0" } } });
  }
  if (method === "tools/list") {
    return Response.json({ jsonrpc: "2.0", id, result: { tools } });
  }
  if (method === "tools/call") {
    const params = (body as { params?: { name?: string } }).params;
    return Response.json({ jsonrpc: "2.0", id, result: { content: [{ type: "text", text: `Called ${params?.name} — see ${SITE_URL}/llms.txt` }] } });
  }

  // Fallback: treat as generic tool call via streamable
  if (body.jsonrpc) {
    return Response.json({ jsonrpc: "2.0", id, error: { code: -32601, message: "Method not found" } });
  }

  // Simple docs MCP variant
  return Response.json({ tools }, { headers: { "Content-Type": "application/json" } });
}

export function OPTIONS() {
  return new Response(null, { status: 204, headers: { Allow: "GET, POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type, Accept, MCP-Protocol-Version" } });
}
