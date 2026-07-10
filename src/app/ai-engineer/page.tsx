import type { Metadata } from "next";
import { getRoleBySlug } from "@/lib/role/config";
import { getProjectsBySlugs } from "@/lib/projects/config";
import { RoleHero } from "@/components/role/RoleHero";
import { RoleProjectList } from "@/components/role/RoleProjectList";
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
          <section className="mb-16">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-muted">
              About
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted">{role.about}</p>
          </section>
        </RevealOnScroll>

        <RevealOnScroll>
          <section className="mb-16">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-muted">
              Skills
            </h2>
            <div className="mt-4 space-y-4">
              {role.skills.categories.map((cat) => (
                <div key={cat.name}>
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {cat.name}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {cat.items.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-md border border-border bg-surface px-3 py-1 font-mono text-xs text-muted"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
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
