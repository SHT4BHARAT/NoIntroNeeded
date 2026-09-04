import { SITE_URL } from "@/lib/constants";
import crypto from "crypto";
import fs from "fs";
import path from "path";

export function GET() {
  let skillDigest = "sha256:7d27ae54340d0a313de688627acd830fe8788f0cbf5d146a7de6769a0ebfe370";
  try {
    const file = fs.readFileSync(path.join(process.cwd(), "public/llms.txt"));
    skillDigest = "sha256:" + crypto.createHash("sha256").update(file).digest("hex");
  } catch {}

  let skillMdDigest = "sha256:a3f1000000000000000000000000000000000000000000000000000000000000";
  try {
    const file = fs.readFileSync(path.join(process.cwd(), "public/SKILL.md"));
    skillMdDigest = "sha256:" + crypto.createHash("sha256").update(file).digest("hex");
  } catch {}

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
          digest: skillDigest,
        },
        {
          name: "portfolio-skill",
          description: "When to use: execute official Shivanshu Tiwari agent skill via SKILL.md specification for AI agents",
          url: `${SITE_URL}/SKILL.md`,
          type: "skill-md",
          digest: skillMdDigest,
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
