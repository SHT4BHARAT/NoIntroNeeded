import type { Metadata } from "next";
import { getRoleBySlug } from "@/lib/role/config";
import { getProjectsBySlugs } from "@/lib/projects/config";
import { RoleHero } from "@/components/role/RoleHero";
import { RoleProjectList } from "@/components/role/RoleProjectList";
import { RoleSections } from "@/components/role/RoleSections";
import { PersonSchema } from "@/components/seo/PersonSchema";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { CollectionPageSchema } from "@/components/seo/CollectionPageSchema";
import { RevealOnScroll } from "@/components/animation/RevealOnScroll";

const role = getRoleBySlug("ai-engineer")!;

export const metadata: Metadata = {
  title:
    "AI Agent Engineer | Autonomous Agents & LLM Pipelines",
  description:
    "AI agent engineering portfolio: autonomous scam-detection agents, RL benchmarking systems, voice intelligence pipelines, and LLM agent evaluation environments. B.Tech CS & IT, SIRT Bhopal, Class of 2027.",
  openGraph: {
    title: "AI Agent Engineer",
    description:
      "Autonomous agents, LLM pipelines, and RL systems — built and documented honestly, including what didn't work.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Agent Engineer",
    description:
      "Autonomous agents, LLM pipelines, and RL systems — built and documented honestly, including what didn't work.",
  },
  alternates: {
    canonical: "https://shivanshutiwari.in/ai-engineer",
  },
  robots: "index, follow",
};

export default function AIEngineerPage() {
  const projects = getProjectsBySlugs(role.projectSlugs);

  const framingMap: Record<string, string> = {};
  for (const p of projects) {
    if (p.aiFraming) framingMap[p.slug] = p.aiFraming;
  }

  const collectionProjects = projects
    .filter((p) =>
      ["daitfo", "agentic-honey-pot", "samvad", "cloud-audit-env"].includes(p.slug)
    )
    .map((p) => ({ name: p.title, slug: p.slug }));

  return (
    <>
      <PersonSchema />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: role.title, href: "/ai-engineer" },
        ]}
      />
      <CollectionPageSchema
        name="AI Agent Engineering Portfolio"
        url="https://shivanshutiwari.in/ai-engineer"
        jobTitle="AI Agent Engineer"
        projects={collectionProjects}
      />

      <RoleHero role={role} />

      <div className="mx-auto max-w-4xl px-4 py-12">
        <RevealOnScroll>
          <RoleSections
            aboutText="I don&apos;t just use AI — I build things with it that keep running after I close my laptop. I&apos;m a third-year B.Tech CS &amp; IT student in Bhopal, and over the past year I&apos;ve built autonomous agents, LLM pipelines, voice intelligence tools, and RL benchmarking systems across 19 projects — some shipped and deployed, some deliberately stopped short of production so I could document what actually worked and what didn&apos;t. I&apos;m not interested in demos that only look good in a pitch. When something fails — an RL agent losing to a simple heuristic, a classifier scoring 25% instead of the 90% I hoped for — I keep the result and figure out why, instead of reframing it until it sounds better. That&apos;s the standard I hold my own work to, and it&apos;s the standard I expect from anything I ship."
          />
        </RevealOnScroll>

        <RevealOnScroll>
          <section className="mb-16">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-muted">
              Skills
            </h2>
            <div className="mt-4 space-y-4">
              <div>
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Languages
                </h3>
                <div className="flex flex-wrap gap-2">
                  {["Python", "JavaScript", "TypeScript", "Kotlin", "SQL", "Dart"].map((skill) => (
                    <span
                      key={skill}
                      className="rounded-md border border-border bg-surface px-3 py-1 font-mono text-xs text-muted"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  AI / ML
                </h3>
                <div className="flex flex-wrap gap-2">
                  {["Google Gemini", "OpenAI API", "Sarvam AI", "LangChain", "CrewAI", "Stable-Baselines3", "Gymnasium", "OpenEnv"].map(
                    (skill) => (
                      <span
                        key={skill}
                        className="rounded-md border border-border bg-surface px-3 py-1 font-mono text-xs text-muted"
                      >
                        {skill}
                      </span>
                    ),
                  )}
                </div>
              </div>
              <div>
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Backend / Infra
                </h3>
                <div className="flex flex-wrap gap-2">
                  {["FastAPI", "Django", "Node.js", "Express", "Docker", "Redis", "PostgreSQL", "Celery", "Socket.io", "NATS JetStream", "Terraform", "Railway", "Vercel"].map(
                    (skill) => (
                      <span
                        key={skill}
                        className="rounded-md border border-border bg-surface px-3 py-1 font-mono text-xs text-muted"
                      >
                        {skill}
                      </span>
                    ),
                  )}
                </div>
              </div>
            </div>
          </section>
        </RevealOnScroll>

        <RevealOnScroll>
          <section className="mb-16">
            <RoleProjectList projects={projects} framingMap={framingMap} />
          </section>
        </RevealOnScroll>

      </div>
    </>
  );
}
