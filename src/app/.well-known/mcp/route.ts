import { SITE_URL } from "@/lib/constants";

const tools = [
  { name: "list_projects", description: "List all portfolio projects for Shivanshu Tiwari — 19 projects with stack and highlights", inputSchema: { type: "object", properties: {} }, annotations: { readOnlyHint: true } },
  { name: "get_project", description: "Get portfolio project by slug identifier for Shivanshu Tiwari — e.g. daitfo", inputSchema: { type: "object", properties: { slug: { type: "string" } }, required: ["slug"] }, annotations: { readOnlyHint: true } },
  { name: "query_portfolio", description: "Query Shivanshu Tiwari portfolio via llms.txt and markdown twins for RAG", inputSchema: { type: "object", properties: { query: { type: "string" } } }, annotations: { readOnlyHint: true } },
  { name: "contact", description: "Send contact message to Shivanshu Tiwari — triggers email via contact API", inputSchema: { type: "object", properties: { name: { type: "string" }, email: { type: "string" }, message: { type: "string" } }, required: ["name", "email", "message"] }, annotations: { readOnlyHint: false } },
];

export function GET() {
  return Response.json({ name: "shivanshutiwari-mcp-well-known", version: "1.0.0", transport: "streamable-http", serverUrl: `${SITE_URL}/.well-known/mcp`, tools, instructions: "Shivanshu Tiwari Portfolio MCP — use list_projects, get_project, query_portfolio, contact. Streamable HTTP." }, { headers: { "Content-Type": "application/json" } });
}
export async function POST(req: Request) {
  const accept = req.headers.get("accept") ?? "";
  const wantsSSE = accept.includes("text/event-stream");
  const body = await req.json().catch(() => ({}));
  const method = (body as { method?: string }).method;
  const id = (body as { id?: unknown }).id ?? 1;
  let result: unknown;
  if (method === "initialize") {
    result = { protocolVersion: "2024-11-05", capabilities: { tools: {} }, serverInfo: { name: "shivanshutiwari-mcp", version: "1.0.0" }, instructions: "Shivanshu Tiwari Portfolio MCP — use list_projects, get_project, query_portfolio, contact." };
  } else if (method === "tools/list") {
    result = { tools };
  } else if (method === "tools/call") {
    const p = (body as { params?: { name?: string } }).params;
    const t = tools.find((x) => x.name === p?.name);
    if (!t) return Response.json({ jsonrpc: "2.0", id, error: { code: -32602, message: `Unknown tool: ${p?.name}` } }, { headers: { "MCP-Protocol-Version": "2024-11-05" } });
    result = { content: [{ type: "text", text: `Called ${p?.name} — see ${SITE_URL}/llms.txt` }] };
  } else if (method === "notifications/initialized") {
    return new Response(null, { status: 202 });
  } else if ((body as { jsonrpc?: string }).jsonrpc) {
    return Response.json({ jsonrpc: "2.0", id, error: { code: -32601, message: "Method not found" } }, { headers: { "MCP-Protocol-Version": "2024-11-05" } });
  } else {
    return Response.json({ tools }, { headers: { "Content-Type": "application/json" } });
  }
  const payload = { jsonrpc: "2.0", id, result };
  if (wantsSSE) {
    const stream = new ReadableStream({ start(c) { const enc = new TextEncoder(); c.enqueue(enc.encode(`data: ${JSON.stringify(payload)}\n\n`)); c.close(); } });
    return new Response(stream, { headers: { "Content-Type": "text/event-stream", "MCP-Protocol-Version": "2024-11-05" } });
  }
  return Response.json(payload, { headers: { "MCP-Protocol-Version": "2024-11-05" } });
}
export function OPTIONS() {
  return new Response(null, { status: 204, headers: { Allow: "GET, POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type, Accept, MCP-Protocol-Version" } });
}
