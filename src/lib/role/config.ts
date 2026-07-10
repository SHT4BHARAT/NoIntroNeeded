import type { RoleConfig } from "@/types/role";

export const roles: RoleConfig[] = [
  {
    slug: "ai-engineer",
    title: "AI / Agentic Engineer",
    headline: "I build autonomous agents and LLM pipelines",
    subheading:
      "Scam-detection agents, RL benchmarking systems, voice intelligence — built to run without a human in the loop, and documented honestly when they don't.",
    description:
      "Autonomous agents, LLM pipelines, and voice intelligence — built to run without a human in the loop.",
    projectSlugs: [
      "daitfo",
      "agentic-honey-pot",
      "samvad",
      "cloud-audit-env",
      "echopay",
      "multilingual-mandi-platform",
      "cyber-mentor",
      "compliance-iq",
      "saathi-community-assistant",
      "call-center-compliance-api",
      "email-categorization-agent",
    ],
  },
  {
    slug: "backend-systems",
    title: "Backend / Systems Engineer",
    headline: "I build backend systems that don't lose data under load",
    subheading: "Concurrency-safe payment engines, real-time dispatch with distributed locking, event-driven infra — proven with real tests, not assertions.",
    description:
      "Concurrency-safe payment engines, real-time dispatch, and event-driven infrastructure — proven with real tests, not assertions.",
    projectSlugs: [
      "daitfo",
      "samvad",
      "agentic-honey-pot",
      "email-categorization-agent",
      "echopay",
      "home-services-app",
      "payout-engine",
      "takealift",
      "uidai-aadhaar-analysis",
      "multilingual-mandi-platform",
      "party-invite-ai",
      "cyber-mentor",
      "mail-agents",
      "margdarshak",
      "compliance-iq",
      "cep-iitb",
    ],
  },
];

export function getRoleBySlug(slug: string): RoleConfig | undefined {
  return roles.find((r) => r.slug === slug);
}
