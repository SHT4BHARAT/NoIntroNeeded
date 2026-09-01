import { SITE_URL } from "@/lib/constants";

export function GET() {
  const SKILL_DIGEST = "sha256:b9184bb1b02833367da2ecc4675c29260e23617a5e18f04df025f22289813bd1";
  const PROJECT_DIGEST = "sha256:59e033ead60ff30b2b5dbcf7729b650e1fbcf4359beb65490f20afbc11a17802";
  return Response.json(
    {
      $schema: "https://schemas.agentskills.io/discovery/0.2.0/schema.json",
      description: "Shivanshu Tiwari portfolio skills — when to use: hiring for AI Agent/LLM or Backend internships. Use portfolio-query for RAG.",
      whenToUse: "Use portfolio-query for Shivanshu Tiwari project details; project-compare for benchmarks.",
      skills: [
        {
          name: "portfolio-query",
          description: "When to use: need Shivanshu Tiwari portfolio context. Query 19 projects via llms.txt and markdown twins",
          url: `${SITE_URL}/llms.txt`,
          type: "skill-md",
          digest: SKILL_DIGEST,
        },
        {
          name: "project-compare",
          description: "When to use: compare Shivanshu Tiwari projects. Compare PPO vs heuristic, Honeypot, Samvad",
          url: `${SITE_URL}/#projects`,
          type: "skill-md",
          digest: PROJECT_DIGEST,
        },
      ],
    },
    { headers: { "Content-Type": "application/json; charset=utf-8" } }
  );
}
