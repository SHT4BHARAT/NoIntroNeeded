import { SITE_URL } from "@/lib/constants";

const tools = [
  {
    name: "list_projects",
    description: "List all portfolio projects for Shivanshu Tiwari — 19 projects with stack and highlights",
    inputSchema: { type: "object", properties: {} },
    annotations: { title: "List Projects", readOnlyHint: true, destructiveHint: false, openWorldHint: false },
  },
  {
    name: "get_project",
    description: "Get portfolio project by slug identifier for Shivanshu Tiwari — e.g. daitfo, samvad",
    inputSchema: { type: "object", properties: { slug: { type: "string", description: "Project slug" } }, required: ["slug"] },
    annotations: { title: "Get Project", readOnlyHint: true, destructiveHint: false, openWorldHint: false },
  },
  {
    name: "query_portfolio",
    description: "Query Shivanshu Tiwari portfolio via llms.txt and markdown twins for RAG",
    inputSchema: { type: "object", properties: { query: { type: "string", description: "Natural language query" } } },
    annotations: { title: "Query Portfolio", readOnlyHint: true, destructiveHint: false, openWorldHint: false },
  },
  {
    name: "contact",
    description: "Send contact message to Shivanshu Tiwari — triggers email via contact API",
    inputSchema: {
      type: "object",
      properties: { name: { type: "string" }, email: { type: "string", format: "email" }, message: { type: "string", minLength: 10 } },
      required: ["name", "email", "message"],
    },
    annotations: { title: "Contact", readOnlyHint: false, destructiveHint: false, openWorldHint: true },
  },
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
    result = {
      protocolVersion: "2024-11-05",
      capabilities: { tools: {} },
      serverInfo: { name: "shivanshutiwari-mcp", version: "1.0.0" },
      instructions: "Shivanshu Tiwari Portfolio MCP — use list_projects to enumerate 19 projects, get_project for deep dive, query_portfolio for RAG, contact for hiring. Read-only except contact.",
    };
  } else if (method === "tools/list") {
    result = { tools };
  } else if (method === "tools/call") {
    const params = (body as { params?: { name?: string; arguments?: unknown } }).params;
    const tool = tools.find((t) => t.name === params?.name);
    if (!tool) {
      return Response.json({ jsonrpc: "2.0", id, error: { code: -32602, message: `Unknown tool: ${params?.name}`, data: { hint: "Use tools/list to see available tools" } } }, { headers: { "MCP-Protocol-Version": "2024-11-05" } });
    }
    // Validate required args for get_project/contact
    if (tool.name === "get_project" && !(params?.arguments as { slug?: string })?.slug) {
      return Response.json({ jsonrpc: "2.0", id, error: { code: -32602, message: "Missing required argument: slug", data: { hint: "Provide {slug: 'daitfo'}" } } }, { headers: { "MCP-Protocol-Version": "2024-11-05" } });
    }
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
