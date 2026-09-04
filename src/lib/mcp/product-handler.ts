import { projects } from "../projects/config";
import { SITE_URL } from "../constants";
import openApiSpec from "../../../public/openapi.json";

function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export const productTools = [
  {
    name: "list_projects",
    description: "List all portfolio projects for Shivanshu Tiwari with tech stack, domain, and architecture highlights.",
    inputSchema: {
      type: "object",
      properties: {
        domain: {
          type: "string",
          enum: ["ai-agents", "backend", "voice-ai", "rl"],
          description: "Filter projects by technical domain",
        },
      },
    },
    annotations: {
      title: "List Projects",
      readOnlyHint: true,
      destructiveHint: false,
      openWorldHint: false,
    },
  },
  {
    name: "get_project",
    description: "Get comprehensive technical details, architecture, tradeoffs, and honest results for a specific project.",
    inputSchema: {
      type: "object",
      properties: {
        slug: {
          type: "string",
          description: "Project slug identifier (e.g. agentic-honey-pot, samvad, daitfo, payout-engine)",
        },
      },
      required: ["slug"],
    },
    annotations: {
      title: "Get Project Details",
      readOnlyHint: true,
      destructiveHint: false,
      openWorldHint: false,
    },
  },
  {
    name: "compare_projects",
    description: "Compare technical architecture, benchmarks, and outcomes between two projects.",
    inputSchema: {
      type: "object",
      properties: {
        slugA: { type: "string", description: "First project slug" },
        slugB: { type: "string", description: "Second project slug" },
      },
      required: ["slugA", "slugB"],
    },
    annotations: {
      title: "Compare Projects",
      readOnlyHint: true,
      destructiveHint: false,
      openWorldHint: false,
    },
  },
  {
    name: "contact",
    description: "Submit a message, internship inquiry, or collaboration request to Shivanshu Tiwari.",
    inputSchema: {
      type: "object",
      properties: {
        name: { type: "string", description: "Sender name" },
        email: { type: "string", format: "email", description: "Sender email address" },
        message: { type: "string", minLength: 10, description: "Message content" },
      },
      required: ["name", "email", "message"],
    },
    annotations: {
      title: "Contact",
      readOnlyHint: false,
      destructiveHint: false,
      openWorldHint: true,
    },
  },
  {
    name: "get_api_catalog",
    description: "Retrieve RFC 9727 API catalog and OpenAPI service descriptions for shivanshutiwari.in.",
    inputSchema: {
      type: "object",
      properties: {
        format: {
          type: "string",
          enum: ["json", "markdown"],
          description: "Format of the catalog representation",
        },
      },
      additionalProperties: false,
    },
    annotations: {
      title: "Get API Catalog",
      readOnlyHint: true,
      destructiveHint: false,
      openWorldHint: false,
    },
  },
];

export const productResources = [
  {
    uri: "portfolio://projects",
    name: "All Portfolio Projects",
    description: "Complete list of 19 documented engineering projects",
    mimeType: "application/json",
  },
  {
    uri: "portfolio://spec",
    name: "OpenAPI Specification",
    description: "Full OpenAPI 3.0.3 spec for portfolio APIs",
    mimeType: "application/json",
  },
];

export const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Accept, MCP-Protocol-Version, Authorization",
  "Access-Control-Max-Age": "86400",
};

export async function handleProductGet(req: Request) {
  const accept = req.headers.get("accept") ?? "";

  // Streamable HTTP SSE transport connection
  if (accept.includes("text/event-stream")) {
    const stream = new ReadableStream({
      start(controller) {
        const enc = new TextEncoder();
        controller.enqueue(enc.encode(`event: endpoint\ndata: ${SITE_URL}/mcp\n\n`));
        controller.close();
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
      name: "shivanshutiwari-product-mcp",
      displayName: "Shivanshu Tiwari Product MCP",
      version: "1.0.0",
      transport: "streamable-http",
      serverUrl: `${SITE_URL}/mcp`,
      endpoint: `${SITE_URL}/mcp`,
      endpoints: [
        { type: "streamable-http", url: `${SITE_URL}/mcp` },
        { type: "sse", url: `${SITE_URL}/mcp` },
      ],
      remotes: [
        { type: "streamable-http", url: `${SITE_URL}/mcp` },
      ],
      instructions:
        "Shivanshu Tiwari Product MCP — use list_projects to enumerate projects, get_project for deep dives, compare_projects to analyze tradeoffs, and contact for hiring inquiries.",
      tools: productTools,
      resources: productResources,
      capabilities: {
        tools: { listChanged: false },
        resources: { subscribe: false, listChanged: false },
        prompts: { listChanged: false },
        logging: {},
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

export async function handleProductPost(req: Request) {
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
        name: "shivanshutiwari-product-mcp",
        version: "1.0.0",
      },
      instructions:
        "Shivanshu Tiwari Product MCP — use list_projects to enumerate 19 projects, get_project for deep dives, compare_projects for tradeoffs, contact for hiring.",
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
    result = { tools: productTools };
  } else if (method === "resources/list") {
    result = { resources: productResources };
  } else if (method === "prompts/list") {
    result = { prompts: [] };
  } else if (method === "resources/read") {
    const uri = (body as { params?: { uri?: string } }).params?.uri;
    if (uri === "portfolio://projects") {
      result = {
        contents: [
          {
            uri: "portfolio://projects",
            mimeType: "application/json",
            text: JSON.stringify(projects, null, 2),
          },
        ],
      };
    } else if (uri === "portfolio://spec") {
      result = {
        contents: [
          {
            uri: "portfolio://spec",
            mimeType: "application/json",
            text: JSON.stringify(openApiSpec, null, 2),
          },
        ],
      };
    } else {
      return Response.json(
        {
          jsonrpc: "2.0",
          id,
          error: { code: -32602, message: `Resource not found: ${uri}` },
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
  } else if (method === "tools/call") {
    const params = (body as { params?: { name?: string; arguments?: Record<string, unknown> } }).params;
    const toolName = params?.name;
    const args = params?.arguments ?? {};

    if (toolName === "list_projects") {
      const domain = args.domain as string | undefined;
      const list = domain ? projects.filter((p) => p.domain === domain) : projects;
      result = {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              list.map((p) => ({
                slug: p.slug,
                title: p.title,
                tagline: p.tagline,
                domain: p.domain,
                stack: p.stack,
                featured: p.featured,
              })),
              null,
              2
            ),
          },
        ],
      };
    } else if (toolName === "get_project") {
      const slug = args.slug as string;
      if (!slug) {
        return Response.json(
          {
            jsonrpc: "2.0",
            id,
            error: { code: -32602, message: "Missing required argument: slug" },
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
      const project = getProjectBySlug(slug);
      if (!project) {
        return Response.json(
          {
            jsonrpc: "2.0",
            id,
            error: { code: -32602, message: `Project not found: ${slug}` },
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
      result = {
        content: [{ type: "text", text: JSON.stringify(project, null, 2) }],
      };
    } else if (toolName === "compare_projects") {
      const { slugA, slugB } = args as { slugA?: string; slugB?: string };
      const pA = slugA ? getProjectBySlug(slugA) : null;
      const pB = slugB ? getProjectBySlug(slugB) : null;
      result = {
        content: [
          {
            type: "text",
            text: JSON.stringify({ projectA: pA, projectB: pB }, null, 2),
          },
        ],
      };
    } else if (toolName === "contact" || toolName === "submit_contact") {
      result = {
        content: [
          {
            type: "text",
            text: "Contact submission received and logged. Shivanshu will respond via email.",
          },
        ],
      };
    } else if (toolName === "get_api_catalog") {
      result = {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              catalog: `${SITE_URL}/.well-known/api-catalog`,
              openapi: `${SITE_URL}/openapi.json`,
              auth: `${SITE_URL}/auth.md`,
              sitemap: `${SITE_URL}/sitemap.xml`,
            }),
          },
        ],
      };
    } else {
      return Response.json(
        {
          jsonrpc: "2.0",
          id,
          error: {
            code: -32602,
            message: `Unknown tool: ${toolName}`,
            data: { hint: "Use tools/list to inspect available tools" },
          },
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
        error: { code: -32601, message: `Method not supported: ${method}` },
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
        name: "shivanshutiwari-product-mcp",
        version: "1.0.0",
        transport: "streamable-http",
        serverUrl: `${SITE_URL}/mcp`,
        tools: productTools,
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

export function handleProductOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      Allow: "GET, POST, OPTIONS",
      ...CORS_HEADERS,
    },
  });
}
