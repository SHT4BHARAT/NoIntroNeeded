import { getProjectBySlug } from "@/lib/projects/config";
import { SITE_URL } from "@/lib/constants";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return Response.json(
      {
        code: "not_found",
        message: `Project '${slug}' not found`,
        hint: "Inspect /api/v1/projects for valid project slugs",
        requestId: `req_${Date.now()}`,
      },
      {
        status: 404,
        headers: {
          "Content-Type": "application/problem+json; charset=utf-8",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }

  return Response.json(project, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Deprecation: "@1798761600",
      Sunset: "Thu, 31 Dec 2026 23:59:59 GMT",
      Link: `<${SITE_URL}/developers/deprecation>; rel="deprecation"`,
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
