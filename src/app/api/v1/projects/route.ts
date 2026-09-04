import { projects } from "@/lib/projects/config";
import { SITE_URL } from "@/lib/constants";

function getProjectDomain(slug: string): string {
  if (["daitfo", "cloud-audit-env"].includes(slug)) return "rl";
  if (["samvad", "echopay", "saathi-community-assistant", "call-center-compliance-api"].includes(slug)) return "voice-ai";
  if (["agentic-honey-pot", "cyber-mentor", "compliance-iq", "email-categorization-agent", "multilingual-mandi-platform"].includes(slug)) return "ai-agents";
  return "backend";
}

export function GET(req: Request) {
  const url = new URL(req.url);
  const limit = Math.min(100, Math.max(1, Number(url.searchParams.get("limit") ?? "20")));
  const cursor = url.searchParams.get("cursor");
  const domain = url.searchParams.get("domain");

  const enriched = projects.map((p) => ({
    ...p,
    domain: p.domain || getProjectDomain(p.slug),
  }));

  const filtered = domain
    ? enriched.filter((p) => {
        const d = p.domain.toLowerCase();
        const target = domain.toLowerCase();
        if (target === "ai-agents" || target === "ai") return d === "ai-agents" || d === "voice-ai" || d === "rl";
        if (target === "backend") return d === "backend";
        if (target === "voice-ai" || target === "voice") return d === "voice-ai";
        if (target === "rl") return d === "rl";
        return d === target;
      })
    : enriched;

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
