import { projects } from "@/lib/projects/config";
import { SITE_URL } from "@/lib/constants";

export function GET(req: Request) {
  const url = new URL(req.url);
  const limit = Math.min(100, Math.max(1, Number(url.searchParams.get("limit") ?? "20")));
  const cursor = url.searchParams.get("cursor");
  const domain = url.searchParams.get("domain");

  const filtered = domain ? projects.filter((p) => p.domain === domain) : projects;
  const start = cursor ? Number(Buffer.from(cursor, "base64").toString()) || 0 : 0;
  const slice = filtered.slice(start, start + limit);
  const nextCursor =
    start + limit < filtered.length ? Buffer.from(String(start + limit)).toString("base64") : null;

  return Response.json(
    { data: slice, pagination: { nextCursor, hasMore: !!nextCursor, limit } },
    {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "RateLimit-Limit": "60",
        "RateLimit-Remaining": "59",
        "RateLimit-Reset": "60",
        "API-Version": "v1",
        Deprecation: "@1798761600",
        Sunset: "Thu, 31 Dec 2026 23:59:59 GMT",
        Link: `<${SITE_URL}/developers/deprecation>; rel="deprecation"`,
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
}

export function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      Allow: "GET, OPTIONS",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
