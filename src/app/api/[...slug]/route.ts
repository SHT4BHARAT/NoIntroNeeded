import { SITE_URL } from "@/lib/constants";

function jsonError(status: number, code: string, message: string) {
  return new Response(JSON.stringify({ code, message, hint: "See /openapi.json and /developers", requestId: `req_${Date.now()}` }), {
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

export function GET() { return jsonError(404, "not_found", "API endpoint not found — see /openapi.json"); }
export function POST() { return jsonError(404, "not_found", "API endpoint not found — see /openapi.json"); }
export function PUT() { return jsonError(404, "not_found", "API endpoint not found"); }
export function PATCH() { return jsonError(404, "not_found", "API endpoint not found"); }
export function DELETE() { return jsonError(404, "not_found", "API endpoint not found"); }
export function OPTIONS() { return new Response(null, { status: 204, headers: { Allow: "GET, POST, PUT, PATCH, DELETE, OPTIONS" } }); }
