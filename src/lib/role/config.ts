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
    about:
      "I don't just use AI — I build things with it that keep running after I close my laptop. I'm a third-year B.Tech CS & IT student in Bhopal, and over the past year I've built autonomous agents, LLM pipelines, voice intelligence tools, and RL benchmarking systems across 19 projects — some shipped and deployed, some deliberately stopped short of production so I could document what actually worked and what didn't. I'm not interested in demos that only look good in a pitch. When something fails — an RL agent losing to a simple heuristic, a classifier scoring 25% instead of the 90% I hoped for — I keep the result and figure out why, instead of reframing it until it sounds better. That's the standard I hold my own work to, and it's the standard I expect from anything I ship.",
    skills: {
      categories: [
        {
          name: "Languages",
          items: ["Python", "JavaScript", "TypeScript", "Kotlin", "SQL", "Dart"],
        },
        {
          name: "AI / ML",
          items: ["Google Gemini", "OpenAI API", "Sarvam AI", "LangChain", "CrewAI", "Stable-Baselines3", "Gymnasium", "OpenEnv"],
        },
        {
          name: "Backend / Infra",
          items: ["FastAPI", "Django", "Node.js", "Express", "Docker", "Redis", "PostgreSQL", "Celery", "Socket.io", "NATS JetStream", "Terraform", "Railway", "Vercel"],
        },
      ],
    },
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
    about:
      "I don't just use AI — I build things with it that keep running after I close my laptop. I'm a third-year B.Tech CS & IT student in Bhopal, and over the past year I've built autonomous agents, LLM pipelines, voice intelligence tools, and RL benchmarking systems across 19 projects — some shipped and deployed, some deliberately stopped short of production so I could document what actually worked and what didn't. I'm not interested in demos that only look good in a pitch. When something fails — an RL agent losing to a simple heuristic, a classifier scoring 25% instead of the 90% I hoped for — I keep the result and figure out why, instead of reframing it until it sounds better. That's the standard I hold my own work to, and it's the standard I expect from anything I ship.",
    skills: {
      categories: [
        {
          name: "Languages",
          items: ["Python", "JavaScript", "TypeScript", "Kotlin", "SQL", "Dart"],
        },
        {
          name: "Backend / Infrastructure",
          items: ["FastAPI", "Django", "Node.js", "Express", "Docker", "Redis", "PostgreSQL", "Celery", "Socket.io", "NATS JetStream", "Terraform", "Railway", "Vercel"],
        },
        {
          name: "API & Security",
          items: ["REST APIs", "OAuth2", "Gmail API", "HMAC-SHA256", "WebSocket"],
        },
      ],
    },
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
