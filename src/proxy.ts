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

function maybeNegotiate(request: NextRequest): NextResponse | Response | null {
  const pathname = request.nextUrl.pathname;

  // Skip negotiation for static assets with file extensions (except .md sibling)
  if (/\.(?:svg|jpg|jpeg|png|gif|ico|webp|avif|css|js|json|xml|txt|woff2?|map)$/i.test(pathname)) {
    return null;
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
