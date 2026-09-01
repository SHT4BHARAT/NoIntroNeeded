import { SITE_URL } from "@/lib/constants";
export function GET() {
  return new Response(JSON.stringify({ code: "gone", message: "v1 moved to /api/v1", hint: "Use /api/v1/* with Sunset header" }), {
    status: 301,
    headers: {
      "Content-Type": "application/json",
      Location: `${SITE_URL}/api/v1/projects`,
      Sunset: new Date(Date.now() + 31536000000).toUTCString(),
      Deprecation: "true",
      "RateLimit-Limit": "60",
    },
  });
}
