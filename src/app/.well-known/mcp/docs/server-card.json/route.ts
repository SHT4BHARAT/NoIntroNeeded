import { SITE_URL } from "../../../../../lib/constants";
import { docsTools } from "../../../../../lib/mcp/docs-handler";

export function GET() {
  return Response.json(
    {
      name: "Shivanshu Tiwari Portfolio Docs MCP",
      description: "Read-only MCP server for portfolio documentation — projects, markdown twins, blog, and sitemap. Streamable HTTP at /mcp/docs.",
      version: "1.0.0",
      serverUrl: `${SITE_URL}/mcp/docs`,
      registryUrl: "https://www.npmjs.com/package/sht-portfolio-v2",
      registries: [
        { name: "npm", url: "https://www.npmjs.com/package/sht-portfolio-v2" },
        { name: "domain", url: `${SITE_URL}/mcp/docs` },
        {
          name: "smithery",
          url: "https://smithery.ai/server/@SHT4BHARAT/shivanshutiwari-docs",
        },
        {
          name: "mcp.so",
          url: "https://mcp.so/server/shivanshutiwari-docs-server",
        },
      ],
      repository: "https://github.com/SHT4BHARAT/portfolio",
      icon: `${SITE_URL}/favicon.ico`,
      logo: `${SITE_URL}/favicon.ico`,
      icons: [
        { src: `${SITE_URL}/favicon.ico`, sizes: "64x64", type: "image/x-icon" },
      ],
      instructions: "Use search_docs to query documentation, get_doc to retrieve page markdown, and list_docs to inspect available guides.",
      tools: docsTools,
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
