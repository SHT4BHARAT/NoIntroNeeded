import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { ROLE_COOKIE_NAME, ROLE_COOKIE_MAX_AGE, isValidRole } from "@/lib/role/cookie";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const roleCookie = request.cookies.get(ROLE_COOKIE_NAME)?.value;

  if (pathname.startsWith("/ai-engineer") || pathname.startsWith("/backend-systems")) {
    const role = pathname.split("/")[1];
    if (isValidRole(role) && roleCookie !== role) {
      const response = NextResponse.next();
      response.cookies.set(ROLE_COOKIE_NAME, role, {
        maxAge: ROLE_COOKIE_MAX_AGE,
        path: "/",
        sameSite: "lax",
      });
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/ai-engineer/:path*", "/backend-systems/:path*"],
};
