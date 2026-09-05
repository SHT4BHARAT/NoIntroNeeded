import { SITE_URL } from "@/lib/constants";

export interface DeveloperResourceItem {
  title: string;
  url: string;
  markdownUrl: string;
  description: string;
  tags: string[];
}

export const developerResources: DeveloperResourceItem[] = [
  {
    title: "Developer Portal & API Hub",
    url: `${SITE_URL}/developers`,
    markdownUrl: `${SITE_URL}/developers.md`,
    description: "Central developer portal for shivanshutiwari.in — REST APIs, OpenAPI 3.0.3, SDKs, CLI, MCP, and sandbox testing.",
    tags: ["developers", "developer", "api", "rest", "portal", "docs", "documentation", "hub", "quickstart"],
  },
  {
    title: "Multi-Language SDKs (TypeScript, Python, Go, Ruby)",
    url: `${SITE_URL}/developers/sdk`,
    markdownUrl: `${SITE_URL}/developers/sdk.md`,
    description: "Official zero-dependency SDK client packages for TypeScript (Node/Edge), Python (3.9+), Go (1.21+), and Ruby (3.0+).",
    tags: ["sdk", "sdks", "npm", "pypi", "python", "typescript", "javascript", "go", "golang", "ruby", "rubygems", "gem", "client", "library", "package"],
  },
  {
    title: "Dedicated CLI Tool (`npx shivanshu`)",
    url: `${SITE_URL}/developers/cli`,
    markdownUrl: `${SITE_URL}/developers/cli.md`,
    description: "Interactive command-line tool for project exploration, architecture inspection, ephemeral key generation, and JSON scripting.",
    tags: ["cli", "terminal", "command", "tool", "npx", "shivanshu", "scripting", "json", "batch", "interactive"],
  },
  {
    title: "OpenAPI 3.0.3 Specification (JSON)",
    url: `${SITE_URL}/openapi.json`,
    markdownUrl: `${SITE_URL}/openapi.json`,
    description: "Machine-readable OpenAPI 3.0.3 schema declaring all REST endpoints, parameters, error formats, and extension metadata.",
    tags: ["openapi", "swagger", "json", "spec", "specification", "schema", "api", "endpoints"],
  },
  {
    title: "OpenAPI 3.0.3 Specification (YAML)",
    url: `${SITE_URL}/openapi.yaml`,
    markdownUrl: `${SITE_URL}/openapi.yaml`,
    description: "YAML-formatted OpenAPI 3.0.3 specification for portfolio APIs and autonomous agents.",
    tags: ["openapi", "yaml", "spec", "specification", "schema"],
  },
  {
    title: "Authentication Guide (WorkOS auth.md)",
    url: `${SITE_URL}/auth.md`,
    markdownUrl: `${SITE_URL}/auth.md`,
    description: "WorkOS auth.md walkthrough detailing anonymous access, ephemeral test keys, and agent identity assertions.",
    tags: ["auth", "authentication", "credentials", "oauth", "token", "workos", "identity", "security"],
  },
  {
    title: "Pricing & Service Tiers (pricing.md)",
    url: `${SITE_URL}/pricing`,
    markdownUrl: `${SITE_URL}/pricing.md`,
    description: "Transparent zero-surprise service tiers, rate limits, feature comparison matrix, and ACP delegate payment specification.",
    tags: ["pricing", "price", "free", "tier", "limits", "ratelimit", "acp", "payments", "cost"],
  },
  {
    title: "API Deprecation Policy",
    url: `${SITE_URL}/developers/deprecation`,
    markdownUrl: `${SITE_URL}/developers/deprecation.md`,
    description: "RFC 8594 Sunset and Deprecation HTTP header commitments and 180-day notice guarantees.",
    tags: ["deprecation", "sunset", "versioning", "policy", "rfc8594", "stability"],
  },
  {
    title: "Dual Streamable MCP Servers",
    url: `${SITE_URL}/mcp`,
    markdownUrl: `${SITE_URL}/.well-known/mcp/server-card.json`,
    description: "Streamable HTTP Model Context Protocol servers for product actions (/mcp) and documentation retrieval (/mcp/docs).",
    tags: ["mcp", "model-context-protocol", "tools", "server", "claude", "cursor", "streamable-http", "ai-agents"],
  },
  {
    title: "Documentation MCP Server",
    url: `${SITE_URL}/mcp/docs`,
    markdownUrl: `${SITE_URL}/.well-known/mcp/docs/server-card.json`,
    description: "Dedicated MCP server for documentation search, markdown twin retrieval, and technical writeups.",
    tags: ["mcp", "docs", "documentation", "search", "markdown", "server"],
  },
  {
    title: "Sandbox Environment & Ephemeral Keys",
    url: `${SITE_URL}/api/v1/sandbox/ping`,
    markdownUrl: `${SITE_URL}/developers.md#sandbox`,
    description: "Isolated test environment returning X-Sandbox headers and self-serve 24-hour API keys via POST /api/v1/keys.",
    tags: ["sandbox", "testing", "test", "keys", "ping", "mock", "ephemeral"],
  },
  {
    title: "Curated AI Navigation Index (llms.txt)",
    url: `${SITE_URL}/llms.txt`,
    markdownUrl: `${SITE_URL}/llms.txt`,
    description: "llmstxt.org v2 index providing structured entry points for LLMs and autonomous coding assistants.",
    tags: ["llms.txt", "llms", "index", "ai", "guide", "navigation", "instructions"],
  },
];

export function searchDeveloperResources(query: string): DeveloperResourceItem[] {
  const tokens = query
    .toLowerCase()
    .replace(/[^\w\s-]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length >= 2);

  if (tokens.length === 0) return developerResources;

  return developerResources
    .map((item) => {
      let score = 0;
      const title = item.title.toLowerCase();
      const desc = item.description.toLowerCase();
      const tags = item.tags.join(" ").toLowerCase();

      for (const t of tokens) {
        if (tags.includes(t)) score += 6;
        if (title.includes(t)) score += 5;
        if (desc.includes(t)) score += 3;
      }
      return { item, score };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((s) => s.item);
}
