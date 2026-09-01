import { SITE_URL } from "@/lib/constants";
function jsonError(status: number) {
  return new Response(JSON.stringify({ code: "unauthorized", message: "Use Bearer with resource_metadata", hint: `GET ${SITE_URL}/.well-known/oauth-protected-resource`, requestId: `req_${Date.now()}` }), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "WWW-Authenticate": `Bearer resource_metadata="${SITE_URL}/.well-known/oauth-protected-resource"`,
      "RateLimit-Limit": "60",
      "RateLimit-Remaining": "59",
      "RateLimit-Reset": "60",
      Deprecation: "false",
    },
  });
}
export function GET() { return jsonError(401); }
export function POST() { return jsonError(401); }
