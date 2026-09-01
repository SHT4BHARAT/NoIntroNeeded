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
  const accept = req.headers.get("accept") ?? "";
  const wantsSSE = accept.includes("text/event-stream");
  const body = await req.json().catch(() => ({}));
  const method = (body as { method?: string }).method;
  const id = (body as { id?: unknown }).id ?? 1;

  let result: unknown;
  if (method === "initialize") {
    result = { protocolVersion: "2024-11-05", capabilities: { tools: {} }, serverInfo: { name: "shivanshutiwari-mcp", version: "1.0.0" } };
  } else if (method === "tools/list") {
    result = { tools };
  } else if (method === "tools/call") {
    const params = (body as { params?: { name?: string } }).params;
    result = { content: [{ type: "text", text: `Called ${params?.name} — see ${SITE_URL}/llms.txt` }] };
  } else if (method === "notifications/initialized") {
    // No response for notification
    return new Response(null, { status: 202 });
  } else if ((body as { jsonrpc?: string }).jsonrpc) {
    return Response.json({ jsonrpc: "2.0", id, error: { code: -32601, message: "Method not found" } }, { headers: { "MCP-Protocol-Version": "2024-11-05" } });
  } else {
    return Response.json({ tools }, { headers: { "Content-Type": "application/json" } });
  }

  const payload = { jsonrpc: "2.0", id, result };

  if (wantsSSE) {
    const stream = new ReadableStream({
      start(controller) {
        const enc = new TextEncoder();
        controller.enqueue(enc.encode(`data: ${JSON.stringify(payload)}\n\n`));
        controller.close();
      },
    });
    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache",
        "MCP-Protocol-Version": "2024-11-05",
      },
    });
  }

  return Response.json(payload, { headers: { "MCP-Protocol-Version": "2024-11-05", "Content-Type": "application/json" } });
}

export function OPTIONS() {
  return new Response(null, { status: 204, headers: { Allow: "GET, POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type, Accept, MCP-Protocol-Version" } });
}
