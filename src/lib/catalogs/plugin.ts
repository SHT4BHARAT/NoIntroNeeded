import { SITE_URL } from "../constants";

export function getPluginManifest() {
  return {
    $schema: "https://agent-plugins.org/schema/plugin.json",
    name: "shivanshutiwari-portfolio",
    version: "1.0.0",
    description: "Portfolio plugin for Shivanshu Tiwari — AI Agent & Backend Systems Developer",
    homepage: SITE_URL,
    repository: "https://github.com/SHT4BHARAT",
    author: {
      name: "Shivanshu Tiwari",
      url: SITE_URL,
      email: "sht4bharat@gmail.com",
    },
    skills: [
      {
        name: "portfolio-query",
        description: "Query 19 projects, blog, achievements via llms.txt and markdown twins",
        entry: "SKILL.md",
      },
      {
        name: "project-compare",
        description: "Compare project architectures, results, and limitations",
        entry: "SKILL.md",
      },
      {
        name: "portfolio-cli-sdk",
        description: "Programmatic CLI (npx shivanshu) and multi-language SDKs (TypeScript, Python, Go)",
        entry: "sdk/",
      },
    ],
    mcpServers: [
      {
        name: "portfolio",
        description: "Action-capable MCP server for portfolio (projects, contact, comparison)",
        url: `${SITE_URL}/.well-known/mcp/server-card.json`,
        transport: "streamable-http",
      },
      {
        name: "portfolio-docs",
        description: "Read-only MCP surface for portfolio docs (markdown twins, sitemap, blog)",
        url: `${SITE_URL}/.well-known/mcp/docs/server-card.json`,
        transport: "streamable-http",
      },
    ],
    capabilities: ["markdown-negotiation", "sitemap-discovery", "llms-txt", "mcp", "agent-auth"],
  };
}

export function handlePluginGet() {
  return Response.json(getPluginManifest(), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
      "Access-Control-Allow-Origin": "*",
    },
  });
}

export function handlePluginOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      Allow: "GET, OPTIONS",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
