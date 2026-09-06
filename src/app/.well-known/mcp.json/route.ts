import { SITE_URL } from "@/lib/constants";
import { productTools } from "@/lib/mcp/product-handler";

export function GET() {
  return Response.json(
    {
      name: "Shivanshu Tiwari Product MCP",
      id: "shivanshutiwari-product-mcp",
      description: "Read-only product MCP server for portfolio — list projects, inspect architectures, and compare tradeoffs. Streamable HTTP at /mcp.",
      version: "1.0.0",
      transport: "streamable-http",
      serverUrl: `${SITE_URL}/mcp`,
      remotes: [
        { type: "streamable-http", url: `${SITE_URL}/mcp` },
      ],
      endpoints: [
        { type: "streamable-http", url: `${SITE_URL}/mcp` },
        { type: "sse", url: `${SITE_URL}/mcp` },
      ],
      documentationServer: `${SITE_URL}/mcp/docs`,
      servers: [
        {
          name: "product",
          type: "product",
          url: `${SITE_URL}/mcp`,
          card: `${SITE_URL}/.well-known/mcp/server-card.json`,
        },
        {
          name: "docs",
          type: "docs",
          url: `${SITE_URL}/mcp/docs`,
          card: `${SITE_URL}/.well-known/mcp/docs/server-card.json`,
        },
      ],
      tools: productTools,
    },
    {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
}

export function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      Allow: "GET, OPTIONS",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
