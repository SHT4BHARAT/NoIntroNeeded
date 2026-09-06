import { SITE_URL } from "@/lib/constants";
import { productTools } from "@/lib/mcp/product-handler";

export function GET() {
  return Response.json(
    {
      serverInfo: { name: "shivanshutiwari-product-mcp", version: "1.0.0" },
      name: "Shivanshu Tiwari Product MCP",
      id: "shivanshutiwari-product-mcp",
      description: "Read-only product MCP server for portfolio — list projects, inspect architectures, and compare tradeoffs. Streamable HTTP at /mcp.",
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
      documentationServer: `${SITE_URL}/mcp/docs`,
      docsCard: `${SITE_URL}/.well-known/mcp/docs/server-card.json`,
      registryUrl: "https://www.npmjs.com/package/sht-portfolio-v2",
      registries: [
        { name: "npm", url: "https://www.npmjs.com/package/sht-portfolio-v2" },
        { name: "domain", url: `${SITE_URL}/mcp` },
        {
          name: "smithery",
          url: "https://smithery.ai/server/@SHT4BHARAT/shivanshutiwari",
        },
        {
          name: "mcp.so",
          url: "https://mcp.so/server/shivanshutiwari-product-server",
        },
      ],
      repository: "https://github.com/SHT4BHARAT/NoIntroNeeded",
      icon: `${SITE_URL}/favicon.ico`,
      logo: `${SITE_URL}/favicon.ico`,
      icons: [
        { src: `${SITE_URL}/favicon.ico`, sizes: "64x64", type: "image/x-icon" },
      ],
      instructions: "Use list_projects to enumerate projects, get_project for deep dives, and compare_projects for tradeoffs. Read-only.",
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
