import type { Metadata } from "next";
import { SITE_URL, SITE_TITLE } from "@/lib/constants";
import { projects } from "@/lib/projects/config";
import { RoleProjectCard } from "@/components/role/RoleProjectCard";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { CollectionPageSchema } from "@/components/seo/CollectionPageSchema";
import { RevealOnScroll } from "@/components/animation/RevealOnScroll";

export const metadata: Metadata = {
  title: "Projects — Shivanshu Tiwari",
  description: `All ${projects.length} projects I've built and documented — autonomous AI agents, LLM pipelines, voice intelligence, RL benchmarks, and concurrency-safe backend systems, with honest writeups including what didn't work.`,
  openGraph: {
    title: "Projects — Shivanshu Tiwari",
    description:
      "Every project I've built, documented honestly — including negative results and limitation disclosures.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects — Shivanshu Tiwari",
    description: "Every project I've built, documented honestly — including what didn't work.",
  },
  alternates: {
    canonical: `${SITE_URL}/projects`,
  },
  robots: "index, follow",
};

export default function ProjectsPage() {
  // Featured first, original order preserved within each group
  const ordered = [...projects].sort(
    (a, b) => Number(b.featured ?? false) - Number(a.featured ?? false),
  );
  const featuredCount = projects.filter((p) => p.featured).length;

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Projects", href: "/projects" },
        ]}
      />
      <CollectionPageSchema
        name="Project Portfolio — Shivanshu Tiwari"
        url={`${SITE_URL}/projects`}
        jobTitle={SITE_TITLE}
        projects={projects.map((p) => ({ name: p.title, slug: p.slug }))}
      />

      <div className="mx-auto max-w-5xl flex-1 px-4 py-20">
        <RevealOnScroll>
          <p className="font-mono text-xs text-muted">
            <span className="text-accent">[</span> {projects.length} projects ·{" "}
            {String(featuredCount).padStart(2, "0")} featured{" "}
            <span className="text-accent">]</span>
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">Projects</h1>
          <p className="mt-3 max-w-prose text-base text-muted">
            Everything I&apos;ve built and documented — {projects.length} projects spanning
            autonomous AI agents, LLM pipelines, voice intelligence, reinforcement-learning
            benchmarks, and concurrency-safe backend systems. For each one I document the stack I
            chose, the decisions I made, and — where things didn&apos;t work — exactly what I
            learned from the failure.
          </p>
        </RevealOnScroll>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {ordered.map((project, i) => (
            <RevealOnScroll key={project.slug} index={i}>
              <RoleProjectCard project={project} />
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </>
  );
}