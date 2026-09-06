import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { ROLE_COOKIE_NAME, ROLE_COOKIE_MAX_AGE, isValidRole } from "@/lib/role/cookie";
import { preferredType, appendVaryAccept } from "@/lib/markdown/negotiation";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Role cookie handling for AI/backend views
  const roleCookie = request.cookies.get(ROLE_COOKIE_NAME)?.value;

  if (pathname.startsWith("/ai-engineer") || pathname.startsWith("/backend-systems")) {
    const role = pathname.split("/")[1];
    if (isValidRole(role) && roleCookie !== role) {
      const response = maybeNegotiate(request);
      // If negotiation didn't return a definitive response (i.e., HTML path), set cookie
      if (response === null) {
        const nextRes = NextResponse.next();
        appendVaryAccept(nextRes.headers);
        nextRes.cookies.set(ROLE_COOKIE_NAME, role, {
          maxAge: ROLE_COOKIE_MAX_AGE,
          path: "/",
          sameSite: "lax",
        });
        return nextRes;
      }
      // If negotiation rewrote to markdown (NextResponse) set cookie there too
      if (response instanceof NextResponse) {
        response.cookies.set(ROLE_COOKIE_NAME, role, {
          maxAge: ROLE_COOKIE_MAX_AGE,
          path: "/",
          sameSite: "lax",
        });
      }
      return response;
    }
  }

  const negotiated = maybeNegotiate(request);
  if (negotiated !== null) return negotiated;

  const res = NextResponse.next();
  appendVaryAccept(res.headers);
  return res;
}

const BOT_UA_RE = /(GPTBot|ClaudeBot|ChatGPT-User|PerplexityBot|Google-Extended|Applebot-Extended|ora-agent|DeepSeekBot)/i;

function maybeNegotiate(request: NextRequest): NextResponse | Response | null {
  const pathname = request.nextUrl.pathname;
  const search = request.nextUrl.searchParams;

  // Never negotiate API/MCP/OpenAPI/auth.md — they have direct route handlers
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/mcp") ||
    pathname.startsWith("/ask") ||
    pathname === "/openapi.json" ||
    pathname === "/openapi.yaml" ||
    pathname === "/auth.md" ||
    pathname === "/AGENTS.md" ||
    pathname === "/SKILL.md" ||
    pathname === "/pricing.md" ||
    pathname.startsWith("/agentic_commerce") ||
    pathname.startsWith("/agentic-commerce") ||
    (pathname.startsWith("/.well-known/") && !pathname.endsWith(".md"))
  ) {
    return null;
  }

  if (pathname === "/agents.md") {
    const url = request.nextUrl.clone();
    url.pathname = "/AGENTS.md";
    return NextResponse.rewrite(url);
  }
  if (pathname === "/skill.md") {
    const url = request.nextUrl.clone();
    url.pathname = "/SKILL.md";
    return NextResponse.rewrite(url);
  }

  // /sandbox with Accept: application/json → machine-readable JSON status (Access: Agent onboarding)
  if (pathname === "/sandbox" && (request.headers.get("accept") ?? "").includes("application/json")) {
    const origin = request.nextUrl.origin;
    return Response.json(
      {
        environment: "sandbox",
        status: "ready",
        sandbox: true,
        freeTier: true,
        free_tier: true,
        selfServeKeys: true,
        selfServeKeyGeneration: true,
        description: "Shivanshu Tiwari Portfolio API Sandbox Environment — live testing surface for autonomous AI agents and developers.",
        baseUrl: `${origin}/api/v1`,
        endpoints: {
          ping: `${origin}/api/v1/sandbox/ping`,
          keys: `${origin}/api/v1/keys`,
          contact: `${origin}/api/v1/sandbox/contact`,
          projects: `${origin}/api/v1/projects`,
        },
        documentation: `${origin}/developers`,
      },
      {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "X-Sandbox": "true",
          "Access-Control-Allow-Origin": "*",
          Vary: "Accept",
        },
      }
    );
  }

  // API probes that would otherwise return HTML 404 should return JSON+WWW-Authenticate
  // /api/* is excluded from matcher (handled by api routes), so this only needs to catch top-level /v2, /agent
  if (
    pathname === "/v2" ||
    pathname.startsWith("/v2/") ||
    (pathname.startsWith("/agent") && !pathname.startsWith("/agentic_commerce") && !pathname.startsWith("/agentic-commerce") && !pathname.startsWith("/agents"))
  ) {
    return new Response(JSON.stringify({ code: "not_found", message: "Not found — see /openapi.json", hint: "GET /openapi.json", requestId: `req_${Date.now()}` }), {
      status: 404,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "WWW-Authenticate": `Bearer resource_metadata="https://shivanshutiwari.in/.well-known/oauth-protected-resource"`,
        "RateLimit-Limit": "60",
      },
    });
  }

  // ?mode=agent -> structured JSON/markdown view with api, agent, sdk, mcp, openapi signals (Access: Agent mode view)
  if (search.get("mode") === "agent") {
    const origin = request.nextUrl.origin;
    const accept = request.headers.get("accept") ?? "";

    if (accept.includes("text/markdown")) {
      const md = `# Shivanshu Tiwari — Agent Mode View

- **Product:** Shivanshu Tiwari Portfolio & Developer Portal
- **API Base:** ${origin}
- **Site Search Engine:** ${origin}/search (API: ${origin}/api/search?q=<query>, Markdown: ${origin}/search.md)
- **Dedicated CLI Tool:** npx sht-portfolio-v2 (Guide: ${origin}/developers/cli)
- **TypeScript / Node SDK:** npm install sht-portfolio-v2 (Registry: https://www.npmjs.com/package/sht-portfolio-v2, Guide: ${origin}/developers/sdk#typescript)
- **Python SDK:** pip install shivanshu-sdk (Registry: https://pypi.org/project/shivanshu-sdk/, Guide: ${origin}/developers/sdk#python)
- **Go SDK:** go get github.com/SHT4BHARAT/Portfolio-Go-SDK (Module: https://pkg.go.dev/github.com/SHT4BHARAT/Portfolio-Go-SDK, Guide: ${origin}/developers/sdk#go)
- **Ruby SDK:** gem install shivanshu-sdk (RubyGems: https://rubygems.org/gems/shivanshu-sdk, Guide: ${origin}/developers/sdk#ruby)
- **OpenAPI Specification:** ${origin}/openapi.json
- **AI Agent Navigation Index:** ${origin}/llms.txt
- **Product Actions MCP Server:** ${origin}/mcp
- **Documentation MCP Server:** ${origin}/mcp/docs
- **Authentication Guide:** ${origin}/auth.md
- **Pricing & Free Tiers:** ${origin}/pricing.md
- **Sandbox Environment:** ${origin}/api/v1/sandbox/ping
- **Self-Serve Test API Keys:** ${origin}/api/v1/keys
- **Free Tier + Sandbox (no signup):** ${origin}/pricing.md — POST ${origin}/api/v1/keys generates an ephemeral test key; GET ${origin}/api/v1/sandbox/ping verifies the sandbox.
- **Batch Endpoint:** ${origin}/api/v1/batch
- **Async Jobs Dispatch:** ${origin}/api/v1/jobs
- **Public Source Repository:** https://github.com/SHT4BHARAT/NoIntroNeeded (AGENTS.md, .cursorrules, SKILL.md, plugin.json)
- **SDK Documentation:** ${origin}/developers/sdk
- **CLI Documentation:** ${origin}/developers/cli
`;
      return new Response(md, {
        headers: {
          "Content-Type": "text/markdown; charset=utf-8",
          Vary: "Accept",
          "Cache-Control": "public, max-age=3600",
        },
      });
    }

    const payload = {
      product: "Shivanshu Tiwari — AI Agent & Backend Systems Developer",
      title: "Shivanshu Tiwari Portfolio & Developer Portal",
      mode: "agent",
      openapi: `${origin}/openapi.json`,
      llmsTxt: `${origin}/llms.txt`,
      api: {
        base: origin,
        version: "v1",
        openapi: `${origin}/openapi.json`,
        openapiYaml: `${origin}/openapi.yaml`,
        catalog: `${origin}/.well-known/api-catalog`,
        sitemap: `${origin}/sitemap.xml`,
        deprecationPolicy: `${origin}/developers/deprecation`,
        endpoints: [
          { path: "/api/v1/projects", method: "GET", description: "List projects with cursor pagination" },
          { path: "/api/v1/projects/{slug}", method: "GET", description: "Get project technical details" },
          { path: "/api/v1/contact", method: "POST", description: "Submit contact message (Idempotency-Key)" },
          { path: "/api/v1/batch", method: "POST", description: "Batch operations" },
          { path: "/api/v1/jobs", method: "POST", description: "Async long-running job dispatch (202 Accepted)" },
          { path: "/api/v1/jobs/{jobId}", method: "GET", description: "Poll async job status & results" },
          { path: "/api/v1/sandbox/ping", method: "GET", description: "Sandbox environment ping" },
          { path: "/api/v1/sandbox/contact", method: "POST", description: "Sandbox test contact submission" },
          { path: "/api/v1/keys", method: "POST", description: "Self-serve test API key generation" },
        ],
      },
      endpoints: {
        projects: `${origin}/api/v1/projects`,
        contact: `${origin}/api/v1/contact`,
        batch: `${origin}/api/v1/batch`,
        jobs: `${origin}/api/v1/jobs`,
        sandbox: `${origin}/api/v1/sandbox/ping`,
        keys: `${origin}/api/v1/keys`,
      },
      authentication: {
        method: "anonymous",
        tokensRequired: false,
        docs: `${origin}/auth.md`,
        discovery: `${origin}/.well-known/oauth-protected-resource`,
        authorizationServer: `${origin}/.well-known/oauth-authorization-server`,
      },
      auth: {
        method: "anonymous",
        tokensRequired: false,
        docs: `${origin}/auth.md`,
        discovery: `${origin}/.well-known/oauth-protected-resource`,
        authorizationServer: `${origin}/.well-known/oauth-authorization-server`,
      },
      onboarding: {
        freeTier: true,
        cost: 0,
        selfServeKeyGeneration: `${origin}/api/v1/keys`,
        keyMethod: "POST /api/v1/keys",
        sandbox: `${origin}/api/v1/sandbox/ping`,
        noSignupRequired: true,
        docs: `${origin}/pricing.md`,
      },
      agent: {
        skills: `${origin}/.well-known/agent-skills/index.json`,
        card: `${origin}/.well-known/agent-card.json`,
        instructions: `${origin}/llms.txt`,
        plugin: `${origin}/.well-known/plugin.json`,
        agentsMd: `${origin}/AGENTS.md`,
        cursorrules: `${origin}/.cursorrules`,
        skillMd: `${origin}/SKILL.md`,
      },
      search: {
        web: `${origin}/search`,
        api: `${origin}/api/search`,
        markdown: `${origin}/search.md`,
        description: "Unified site search across developer resources, APIs, SDKs, CLI, projects, and posts",
      },
      cli: {
        command: "shivanshu",
        run: "npx shivanshu",
        runRegistry: "npx shivanshu",
        runAlt: "npx sht-portfolio-v2",
        install: "npm install -g shivanshu",
        registryInstall: "npm install -g shivanshu",
        registry: "https://www.npmjs.com/package/shivanshu",
        sdkPackage: "sht-portfolio-v2",
        documentation: `${origin}/developers/cli`,
        features: ["projects", "project", "compare", "batch", "jobs", "keys", "sandbox", "mcp", "pricing", "contact", "--json"],
      },
      sdk: {
        typescript: {
          package: "sht-portfolio-v2",
          install: "npm install sht-portfolio-v2",
          registryInstall: "npm install sht-portfolio-v2",
          registry: "https://www.npmjs.com/package/sht-portfolio-v2",
          documentation: `${origin}/developers/sdk#typescript`,
        },
        python: {
          package: "shivanshu-sdk",
          install: "pip install shivanshu-sdk",
          registryInstall: "pip install shivanshu-sdk",
          registry: "https://pypi.org/project/shivanshu-sdk/",
          documentation: `${origin}/developers/sdk#python`,
        },
        go: {
          package: "github.com/SHT4BHARAT/Portfolio-Go-SDK",
          install: "go get github.com/SHT4BHARAT/Portfolio-Go-SDK",
          registryInstall: "go get github.com/SHT4BHARAT/Portfolio-Go-SDK",
          registry: "https://pkg.go.dev/github.com/SHT4BHARAT/Portfolio-Go-SDK",
          documentation: `${origin}/developers/sdk#go`,
        },
        ruby: {
          package: "shivanshu-sdk",
          install: "gem install shivanshu-sdk",
          registryInstall: "gem install shivanshu-sdk",
          registry: "https://rubygems.org/gems/shivanshu-sdk",
          documentation: `${origin}/developers/sdk#ruby`,
        },
        npm: "sht-portfolio-v2",
        pypi: "shivanshu-sdk",
        gem: "shivanshu-sdk",
        goModule: "github.com/SHT4BHARAT/Portfolio-Go-SDK",
        cli: "shivanshu",
        homepage: `${origin}/developers/sdk`,
      },
      mcp: {
        product: `${origin}/mcp`,
        docs: `${origin}/mcp/docs`,
        server: `${origin}/mcp`,
        serverCard: `${origin}/.well-known/mcp/server-card.json`,
        docsCard: `${origin}/.well-known/mcp/docs/server-card.json`,
        card: `${origin}/.well-known/mcp/server-card.json`,
        registries: {
          npm: "https://www.npmjs.com/package/sht-portfolio-v2",
          product: `${origin}/mcp`,
          docs: `${origin}/mcp/docs`,
          smithery: "https://smithery.ai/server/@SHT4BHARAT/shivanshutiwari",
          "mcp.so": "https://mcp.so/server/shivanshutiwari-product-server",
        },
      },
      documentation: {
        llms: `${origin}/llms.txt`,
        developers: `${origin}/developers`,
        deprecation: `${origin}/developers/deprecation`,
        sitemap: `${origin}/sitemap.xml`,
        auth: `${origin}/auth.md`,
      },
      repository: {
        primary: "https://github.com/SHT4BHARAT/NoIntroNeeded",
        type: "public-github",
        description: "Public repo for agent configs (AGENTS.md, .cursorrules), SKILL.md, plugin.json, and the WebMCP tools powering this site.",
        agentConfigs: ["https://shivanshutiwari.in/AGENTS.md", "https://shivanshutiwari.in/.cursorrules"],
        sdkRepos: {
          go: "https://github.com/SHT4BHARAT/Portfolio-Go-SDK",
          typescript: "https://github.com/SHT4BHARAT/NoIntroNeeded/tree/main/sdk/typescript",
        },
      },
  sandbox: {
        url: `${origin}/api/v1/sandbox/ping`,
        environment: "sandbox",
        testEndpoints: {
          ping: `${origin}/api/v1/sandbox/ping`,
          contact: `${origin}/api/v1/sandbox/contact`,
          keys: `${origin}/api/v1/keys`,
        },
      },
      pricing: {
        tier: "free",
        cost: 0,
        model: "open-access",
        currency: "USD",
        details: `${origin}/pricing.md`,
      },
      capabilities: [
        "portfolio-query",
        "project-compare",
        "markdown-negotiation",
        "sitemap-discovery",
        "mcp-streamable-http",
        "dual-mcp-coverage",
        "async-jobs",
        "batch-operations",
        "sandbox-testing",
        "self-serve-keys",
      ],
      key_capabilities: [
        "portfolio-query",
        "project-compare",
        "markdown-negotiation",
        "sitemap-discovery",
        "mcp-streamable-http",
        "dual-mcp-coverage",
        "async-jobs",
        "batch-operations",
        "sandbox-testing",
        "self-serve-keys",
      ],
    };
    return new Response(JSON.stringify(payload, null, 2), {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Vary: "Accept",
        "Cache-Control": "public, max-age=3600",
      },
    });
  }

  // Skip negotiation for static assets with file extensions (except .md sibling)
  if (/\.(?:svg|jpg|jpeg|png|gif|ico|webp|avif|css|js|json|xml|txt|woff2?|map)$/i.test(pathname)) {
    return null;
  }

  // Bot-UA markdown serving: serve markdown directly to known AI crawlers even with Accept: text/html
  const ua = request.headers.get("user-agent") ?? "";
  if (BOT_UA_RE.test(ua)) {
    const url = request.nextUrl.clone();
    url.pathname = `/api/markdown${pathname}`;
    const rewritten = NextResponse.rewrite(url);
    appendVaryAccept(rewritten.headers);
    return rewritten;
  }

  // Explicit .md sibling: always Markdown, strip .md and rewrite to handler
  if (pathname.endsWith(".md")) {
    const url = request.nextUrl.clone();
    url.pathname = `/api/markdown${pathname.slice(0, -3)}`;
    const rewritten = NextResponse.rewrite(url);
    appendVaryAccept(rewritten.headers);
    return rewritten;
  }

  const acceptHeader = request.headers.get("accept");
  const chosen = preferredType(acceptHeader);

  if (chosen === "text/markdown") {
    const url = request.nextUrl.clone();
    url.pathname = `/api/markdown${pathname}`;
    const rewritten = NextResponse.rewrite(url);
    appendVaryAccept(rewritten.headers);
    return rewritten;
  }

  if (chosen === null && acceptHeader) {
    return new Response("Not Acceptable\n\nAvailable: text/html, text/markdown\n", {
      status: 406,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        Vary: "Accept",
      },
    });
  }

  return null;
}

export const config = {
  matcher: ["/((?!api/|_next/|_vercel/).*)"],
};
