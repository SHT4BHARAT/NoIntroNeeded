import { SITE_URL } from "@/lib/constants";
import crypto from "crypto";
import fs from "fs";
import path from "path";

export function GET() {
  let skillDigest = "sha256:686ab8b5d5a226542c4e910f00872cc0e0d2ef837af0805d0af10fb1f6af06ef";
  try {
    const file = fs.readFileSync(path.join(process.cwd(), "public/llms.txt"), "utf-8");
    skillDigest = "sha256:" + crypto.createHash("sha256").update(file).digest("hex");
  } catch {}

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
          digest: skillDigest,
        },
        {
          name: "project-compare",
          description: "When to use: compare Shivanshu Tiwari projects. Compare PPO vs heuristic, Honeypot, Samvad",
          url: `${SITE_URL}/#projects`,
          type: "skill-md",
          digest: PROJECT_DIGEST,
        },
        {
          name: "portfolio-cli-sdk",
          description: "When to use: programmatically interact via official CLI or multi-language SDKs (TypeScript, Python, Go)",
          url: `${SITE_URL}/developers/sdk`,
          type: "skill-md",
          digest: "sha256:cli-sdk-integration-tools-v1",
        },
      ],
    },
    { headers: { "Content-Type": "application/json; charset=utf-8" } }
  );
}
