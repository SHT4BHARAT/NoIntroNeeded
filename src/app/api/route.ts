import { SITE_URL } from "@/lib/constants";

function jsonError(code: string, message: string, hint: string, status: number) {
  return new Response(JSON.stringify({ code, message, hint, requestId: `req_${Date.now()}` }), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "WWW-Authenticate": `Bearer resource_metadata="${SITE_URL}/.well-known/oauth-protected-resource"`,
      "RateLimit-Limit": "60",
      "RateLimit-Remaining": "59",
      "RateLimit-Reset": "60",
    },
  });
}

export function GET() {
  return jsonError("unauthorized", "Missing authentication — see resource_metadata", "Fetch /.well-known/oauth-protected-resource", 401);
}
export function POST() { return GET(); }
export function OPTIONS() { return new Response(null, { status: 204, headers: { Allow: "GET, POST, OPTIONS" } }); }
