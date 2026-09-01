import { SITE_URL } from "@/lib/constants";

export function GET() {
  const SKILL_DIGEST = "sha256:b8544fbb53cee4facf7a6d8c34ce2dc91e053f2172b97aa7b524753669c96bb5";
  return Response.json(
    {
      $schema: "https://schemas.agentskills.io/discovery/0.2.0/schema.json",
      skills: [
        {
          name: "portfolio-query",
          description: "Query 19 projects, blog posts, achievements, education, FAQ via llms.txt and markdown twins",
          url: `${SITE_URL}/llms.txt`,
          type: "skill-md",
          digest: SKILL_DIGEST,
        },
        {
          name: "project-compare",
          description: "Compare PPO vs heuristic (DAITFO), scam detection (Agentic Honeypot), voice pipeline (Samvad)",
          url: `${SITE_URL}/#projects`,
          type: "skill-md",
          digest: SKILL_DIGEST,
        },
      ],
    },
    { headers: { "Content-Type": "application/json; charset=utf-8" } }
  );
}
