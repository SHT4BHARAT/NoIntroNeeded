import { searchSite } from "@/lib/search";

export function GET(req: Request) {
  const url = new URL(req.url);
  const q = url.searchParams.get("q") ?? url.searchParams.get("query") ?? "";
  const results = searchSite(q);

  return Response.json(results, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=300",
      "Access-Control-Allow-Origin": "*",
    },
  });
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
