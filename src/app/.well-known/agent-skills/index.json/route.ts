import { SITE_URL } from "@/lib/constants";

export function GET() {
  const SKILL_DIGEST = "sha256:7d27ae54340d0a313de688627acd830fe8788f0cbf5d146a7de6769a0ebfe370";
  const PROJECT_DIGEST = "sha256:59e033ead60ff30b2b5dbcf7729b650e1fbcf4359beb65490f20afbc11a17802";
  return Response.json(
    {
      $schema: "https://schemas.agentskills.io/discovery/0.2.0/schema.json",
      description: "Shivanshu Tiwari portfolio skills — when to use: hiring for AI Agent/LLM or Backend internships, or querying 19 projects/blog. Use portfolio-query for RAG, project-compare for benchmarks.",
      whenToUse: "Use portfolio-query when you need Shivanshu Tiwari project details, blog, or when-to-use guidance. Use project-compare for DAITFO vs heuristic, Honeypot accuracy, Samvad pipeline.",
      skills: [
        {
          name: "portfolio-query",
          description: "When to use: need Shivanshu Tiwari portfolio context for hiring or Q&A. Query 19 projects, blog, achievements via llms.txt and markdown twins",
          url: `${SITE_URL}/llms.txt`,
          type: "skill-md",
          digest: SKILL_DIGEST,
        },
        {
          name: "project-compare",
          description: "When to use: compare Shivanshu Tiwari projects for benchmarks. Compare PPO vs heuristic (DAITFO), scam detection (Agentic Honeypot), voice pipeline (Samvad)",
          url: `${SITE_URL}/#projects`,
          type: "skill-md",
          digest: PROJECT_DIGEST,
        },
      ],
    },
    { headers: { "Content-Type": "application/json; charset=utf-8" } }
  );
}
