import { SITE_URL } from "@/lib/constants";

export function GET() {
  const SKILL_DIGEST = "sha256:b8544fbb53cee4facf7a6d8c34ce2dc91e053f2172b97aa7b524753669c96bb5";
  const PROJECT_DIGEST = "sha256:3f7a9e1c5d8b2a4f6e9c0d1b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a98765";
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
