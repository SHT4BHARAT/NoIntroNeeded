import { getProjectBySlug } from "@/lib/projects/config";
import { SITE_URL } from "@/lib/constants";

function getProjectDomain(slug: string): string {
  if (["daitfo", "cloud-audit-env"].includes(slug)) return "rl";
  if (["samvad", "echopay", "saathi-community-assistant", "call-center-compliance-api"].includes(slug)) return "voice-ai";
  if (["agentic-honey-pot", "cyber-mentor", "compliance-iq", "email-categorization-agent", "multilingual-mandi-platform"].includes(slug)) return "ai-agents";
  return "backend";
}

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

  const enriched = {
    ...project,
    domain: project.domain || getProjectDomain(project.slug),
  };

  return Response.json(enriched, {
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
