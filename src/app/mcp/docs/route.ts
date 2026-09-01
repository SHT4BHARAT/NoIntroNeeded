import { SITE_URL } from "@/lib/constants";

const docsTools = [
  {
    name: "search_docs",
    description: "Search Shivanshu Tiwari docs via llms.txt and sitemap for RAG — 19 projects, blog",
    inputSchema: { type: "object", properties: { query: { type: "string", description: "Query" } } },
    annotations: { title: "Search Docs", readOnlyHint: true, destructiveHint: false, openWorldHint: false },
  },
  {
    name: "get_page",
    description: "Get page markdown twin for Shivanshu Tiwari by path — e.g. /about, /projects/daitfo",
    inputSchema: { type: "object", properties: { path: { type: "string", description: "Path like /about" } }, required: ["path"] },
    annotations: { title: "Get Page", readOnlyHint: true, destructiveHint: false, openWorldHint: false },
  },
];

export function GET() {
  return Response.json(
    { name: "Shivanshu Tiwari Docs MCP", version: "1.0.0", transport: "streamable-http", serverUrl: `${SITE_URL}/mcp/docs`, instructions: "Search Shivanshu Tiwari docs — llms.txt, sitemap, blog markdown. Read-only.", tools: docsTools },
    { headers: { "Content-Type": "application/json" } }
  );
}
export async function POST(req: Request) {
  const accept = req.headers.get("accept") ?? "";
  const wantsSSE = accept.includes("text/event-stream");
  const body = await req.json().catch(() => ({}));
  const method = (body as { method?: string }).method;
  const id = (body as { id?: unknown }).id ?? 1;
  let result: unknown;
  if (method === "initialize") {
    result = {
      protocolVersion: "2024-11-05",
      capabilities: { tools: {} },
      serverInfo: { name: "shivanshutiwari-docs-mcp", version: "1.0.0" },
      instructions: "Shivanshu Tiwari Docs MCP — search docs via llms.txt, sitemap, blog markdown.",
    };
  } else if (method === "tools/list") {
    result = { tools: docsTools };
  } else if (method === "tools/call") {
    const params = (body as { params?: { name?: string } }).params;
    const tool = docsTools.find((t) => t.name === params?.name);
    if (!tool) {
      return Response.json({ jsonrpc: "2.0", id, error: { code: -32602, message: `Unknown tool: ${params?.name}`, data: { hint: "Use tools/list" } } }, { headers: { "MCP-Protocol-Version": "2024-11-05" } });
    }
    result = { content: [{ type: "text", text: `Called ${params?.name} — see ${SITE_URL}/llms.txt` }] };
  } else if (method === "notifications/initialized") {
    return new Response(null, { status: 202 });
  } else if ((body as { jsonrpc?: string }).jsonrpc) {
    return Response.json({ jsonrpc: "2.0", id, error: { code: -32601, message: "Method not found" } }, { headers: { "MCP-Protocol-Version": "2024-11-05" } });
  } else {
    return Response.json({ tools: docsTools }, { headers: { "Content-Type": "application/json" } });
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
    return new Response(stream, { headers: { "Content-Type": "text/event-stream; charset=utf-8", "MCP-Protocol-Version": "2024-11-05" } });
  }
  return Response.json(payload, { headers: { "MCP-Protocol-Version": "2024-11-05" } });
}
export function OPTIONS() {
  return new Response(null, { status: 204, headers: { Allow: "GET, POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type, Accept, MCP-Protocol-Version" } });
}
