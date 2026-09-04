import { SITE_URL } from "@/lib/constants";
import { staticPageMarkdown, projectMarkdown, homeMarkdown } from "@/lib/markdown/generators";

const docsTools = [
  {
    name: "search_docs",
    description: "Search Shivanshu Tiwari portfolio documentation, project writeups, and technical blog posts.",
    inputSchema: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "Search query for portfolio docs or technical case studies",
        },
      },
      required: ["query"],
    },
    annotations: {
      title: "Search Docs",
      readOnlyHint: true,
      destructiveHint: false,
      openWorldHint: false,
    },
  },
  {
    name: "get_doc",
    description: "Retrieve complete markdown documentation for any path (e.g. /about, /developers, /developers/deprecation, /projects/agentic-honey-pot).",
    inputSchema: {
      type: "object",
      properties: {
        path: {
          type: "string",
          description: "Documentation path (e.g. /about, /developers, /projects/daitfo)",
        },
      },
      required: ["path"],
    },
    annotations: {
      title: "Get Document",
      readOnlyHint: true,
      destructiveHint: false,
      openWorldHint: false,
    },
  },
  {
    name: "list_docs",
    description: "List all available documentation topics, markdown pages, and project writeups.",
    inputSchema: {
      type: "object",
      properties: {},
    },
    annotations: {
      title: "List Documentation Topics",
      readOnlyHint: true,
      destructiveHint: false,
      openWorldHint: false,
    },
  },
];

const docsResources = [
  {
    uri: "docs://llms",
    name: "Curated AI Guide (llms.txt)",
    description: "Canonical entry point and navigation index for AI agents",
    mimeType: "text/plain",
  },
  {
    uri: "docs://auth",
    name: "Authentication Guide (auth.md)",
    description: "WorkOS auth.md walkthrough and agent_auth specification",
    mimeType: "text/markdown",
  },
  {
    uri: "docs://developers",
    name: "Developer Portal Documentation",
    description: "API endpoints, MCP servers, and deprecation policy",
    mimeType: "text/markdown",
  },
];

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Accept, MCP-Protocol-Version, Authorization",
  "Access-Control-Max-Age": "86400",
};

export async function GET(req: Request) {
  const accept = req.headers.get("accept") ?? "";

  // Streamable HTTP SSE transport connection
  if (accept.includes("text/event-stream")) {
    const stream = new ReadableStream({
      start(controller) {
        const enc = new TextEncoder();
        controller.enqueue(enc.encode(`event: endpoint\ndata: ${SITE_URL}/mcp/docs\n\n`));
      },
    });
    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        "MCP-Protocol-Version": "2024-11-05",
        ...CORS_HEADERS,
      },
    });
  }

  return Response.json(
    {
      name: "shivanshutiwari-docs-mcp",
      displayName: "Shivanshu Tiwari Portfolio Docs MCP",
      version: "1.0.0",
      transport: "streamable-http",
      serverUrl: `${SITE_URL}/mcp/docs`,
      instructions:
        "Shivanshu Tiwari Portfolio Docs MCP — search docs via llms.txt, retrieve markdown twins, and explore project writeups. Read-only.",
      tools: docsTools,
      resources: docsResources,
      capabilities: {
        tools: { listChanged: false },
        resources: { subscribe: false, listChanged: false },
        prompts: { listChanged: false },
      },
    },
    {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "MCP-Protocol-Version": "2024-11-05",
        "Cache-Control": "public, max-age=3600",
        ...CORS_HEADERS,
      },
    }
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
      capabilities: {
        tools: { listChanged: false },
        resources: { subscribe: false, listChanged: false },
        prompts: { listChanged: false },
        logging: {},
      },
      serverInfo: {
        name: "shivanshutiwari-docs-mcp",
        version: "1.0.0",
      },
      instructions:
        "Shivanshu Tiwari Portfolio Docs MCP — search documentation, get markdown twins, and list technical case studies.",
    };
  } else if (method === "notifications/initialized") {
    return new Response(null, {
      status: 202,
      headers: {
        "MCP-Protocol-Version": "2024-11-05",
        ...CORS_HEADERS,
      },
    });
  } else if (method === "ping") {
    result = {};
  } else if (method === "tools/list") {
    result = { tools: docsTools };
  } else if (method === "resources/list") {
    result = { resources: docsResources };
  } else if (method === "prompts/list") {
    result = { prompts: [] };
  } else if (method === "tools/call") {
    const params = (body as { params?: { name?: string; arguments?: Record<string, unknown> } }).params;
    const toolName = params?.name;
    const args = params?.arguments ?? {};

    if (toolName === "search_docs") {
      const query = (args.query as string) ?? "";
      result = {
        content: [
          {
            type: "text",
            text: `Search results for "${query}":\n- [About](${SITE_URL}/about.md)\n- [Developers](${SITE_URL}/developers.md)\n- [Deprecation Policy](${SITE_URL}/developers/deprecation.md)\n- [Projects](${SITE_URL}/#projects)\n- [llms.txt](${SITE_URL}/llms.txt)`,
          },
        ],
      };
    } else if (toolName === "get_doc") {
      const pathParam = (args.path as string) ?? "/";
      const clean = pathParam.replace(/^\//, "").replace(/\.md$/, "");
      let doc = "";
      if (!clean || clean === "index") {
        doc = homeMarkdown();
      } else if (clean.startsWith("projects/")) {
        doc = projectMarkdown(clean.replace("projects/", "")) ?? "Project not found";
      } else {
        doc = staticPageMarkdown(clean) ?? "Document not found";
      }
      result = {
        content: [{ type: "text", text: doc }],
      };
    } else if (toolName === "list_docs") {
      result = {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              [
                { title: "Home Guide", path: "/" },
                { title: "About Shivanshu Tiwari", path: "/about" },
                { title: "Developer Portal", path: "/developers" },
                { title: "API Deprecation Policy", path: "/developers/deprecation" },
                { title: "Authentication Guide (auth.md)", path: "/auth.md" },
                { title: "Privacy Policy", path: "/privacy" },
                { title: "FAQ", path: "/faq" },
                { title: "Achievements", path: "/achievements" },
                { title: "Education", path: "/education" },
                { title: "Experience", path: "/experience" },
                { title: "Volunteer", path: "/volunteer" },
                { title: "Blog Posts", path: "/blog" },
              ],
              null,
              2
            ),
          },
        ],
      };
    } else {
      return Response.json(
        {
          jsonrpc: "2.0",
          id,
          error: { code: -32602, message: `Unknown tool: ${toolName}` },
        },
        {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            "MCP-Protocol-Version": "2024-11-05",
            ...CORS_HEADERS,
          },
        }
      );
    }
  } else if ((body as { jsonrpc?: string }).jsonrpc) {
    return Response.json(
      {
        jsonrpc: "2.0",
        id,
        error: { code: -32601, message: `Method not found: ${method}` },
      },
      {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "MCP-Protocol-Version": "2024-11-05",
          ...CORS_HEADERS,
        },
      }
    );
  } else {
    return Response.json(
      {
        name: "shivanshutiwari-docs-mcp",
        version: "1.0.0",
        transport: "streamable-http",
        tools: docsTools,
      },
      {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "MCP-Protocol-Version": "2024-11-05",
          ...CORS_HEADERS,
        },
      }
    );
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
        ...CORS_HEADERS,
      },
    });
  }

  return Response.json(payload, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "MCP-Protocol-Version": "2024-11-05",
      ...CORS_HEADERS,
    },
  });
}

export function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      Allow: "GET, POST, OPTIONS",
      ...CORS_HEADERS,
    },
  });
}
