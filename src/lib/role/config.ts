import type { RoleConfig } from "@/types/role";

export const roles: RoleConfig[] = [
  {
    slug: "ai-engineer",
    title: "AI / Agentic Engineer",
    headline: "I build autonomous AI systems",
    subheading:
      "Autonomous agents, LLM pipelines, and voice AI that run in production — not local demos.",
    description:
      "I build production AI systems — autonomous agents, LLM pipelines, and voice AI that ships.",
    projectSlugs: [
      "agentic-honey-pot",
      "samvad",
      "email-categorization-agent",
      "call-center-compliance-api",
    ],
  },
  {
    slug: "backend-systems",
    title: "Backend / Systems Engineer",
    headline: "I build AI-native backend systems",
    subheading: "API design, real-time infra, distributed systems",
    description:
      "I design and build backend systems — real-time APIs, distributed infrastructure, and production deployments.",
    projectSlugs: [
      "samvad",
      "agentic-honey-pot",
      "call-center-compliance-api",
      "email-categorization-agent",
      "echopay",
    ],
  },
];

export function getRoleBySlug(slug: string): RoleConfig | undefined {
  return roles.find((r) => r.slug === slug);
}
