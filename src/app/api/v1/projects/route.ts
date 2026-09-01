import { projects } from "@/lib/projects/config";

export function GET(req: Request) {
  const url = new URL(req.url);
  const limit = Math.min(100, Math.max(1, Number(url.searchParams.get("limit") ?? "20")));
  const cursor = url.searchParams.get("cursor");
  const start = cursor ? Number(Buffer.from(cursor, "base64").toString()) || 0 : 0;
  const slice = projects.slice(start, start + limit);
  const nextCursor = start + limit < projects.length ? Buffer.from(String(start + limit)).toString("base64") : null;
  return Response.json(
    { data: slice, pagination: { nextCursor, hasMore: !!nextCursor, limit } },
    {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "RateLimit-Limit": "60",
        "RateLimit-Remaining": "59",
        "RateLimit-Reset": "60",
        "API-Version": "v1",
      },
    }
  );
}
export function OPTIONS() {
  return new Response(null, { status: 204, headers: { Allow: "GET, OPTIONS" } });
}
