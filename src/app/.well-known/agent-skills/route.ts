import { SITE_URL } from "@/lib/constants";

export function GET() {
  return Response.json(
    {
      skills: [
        {
          name: "portfolio-query",
          description: "Query 19 projects, blog posts, achievements, education, FAQ via llms.txt and markdown twins",
          url: `${SITE_URL}/llms.txt`,
        },
        {
          name: "project-compare",
          description: "Compare PPO vs heuristic (DAITFO), scam detection (Agentic Honeypot), voice pipeline (Samvad)",
          url: `${SITE_URL}/#projects`,
        },
      ],
    },
    { headers: { "Content-Type": "application/json; charset=utf-8" } }
  );
}
