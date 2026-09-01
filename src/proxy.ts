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

  // Never negotiate API/MCP/OpenAPI — they are JSON, not HTML/markdown twins
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/mcp") ||
    pathname.startsWith("/ask") ||
    pathname === "/openapi.json" ||
    pathname === "/openapi.yaml" ||
    pathname.startsWith("/.well-known/")
  ) {
    return null;
  }

  // API probes that would otherwise return HTML 404 should return JSON+WWW-Authenticate
  // /api/* is excluded from matcher (handled by api routes), so this only needs to catch top-level /v2, /agent
  if (pathname === "/v2" || pathname.startsWith("/v2/") || pathname.startsWith("/agent")) {
    return new Response(JSON.stringify({ code: "not_found", message: "Not found — see /openapi.json", hint: "GET /openapi.json", requestId: `req_${Date.now()}` }), {
      status: 404,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "WWW-Authenticate": `Bearer resource_metadata="https://shivanshutiwari.in/.well-known/oauth-protected-resource"`,
        "RateLimit-Limit": "60",
      },
    });
  }

  // ?mode=agent → structured JSON view with api, agent, sdk, mcp, openapi signals (Access: Agent mode view)
  if (search.get("mode") === "agent") {
    const payload = {
      product: "Shivanshu Tiwari — shivanshutiwari.in",
      mode: "agent",
      api: { openapi: `${request.nextUrl.origin}/openapi.json`, catalog: `${request.nextUrl.origin}/.well-known/api-catalog`, sitemap: `${request.nextUrl.origin}/sitemap.xml` },
      agent: { skills: `${request.nextUrl.origin}/.well-known/agent-skills/index.json`, card: `${request.nextUrl.origin}/.well-known/agent-card.json`, instructions: `${request.nextUrl.origin}/llms.txt` },
      sdk: { npm: "sht-portfolio-v2", cli: "shivanshu", repository: "https://github.com/SHT4BHARAT/NoIntroNeeded", homepage: "https://shivanshutiwari.in" },
      mcp: { server: `${request.nextUrl.origin}/mcp`, docs: `${request.nextUrl.origin}/mcp/docs`, card: `${request.nextUrl.origin}/.well-known/mcp/server-card.json` },
      auth: { discovery: `${request.nextUrl.origin}/.well-known/oauth-protected-resource`, method: "anonymous", docs: `${request.nextUrl.origin}/auth.md` },
      capabilities: ["portfolio-query", "project-compare", "markdown-negotiation", "sitemap-discovery"],
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
