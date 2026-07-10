import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "@/lib/projects/config";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Projects", href: "/" },
          { name: project.title, href: `/projects/${project.slug}` },
        ]}
      />

      <article className="mx-auto max-w-4xl px-4 py-12">
        <header className="mb-10">
          <p className="font-mono text-xs font-medium uppercase tracking-widest text-muted">
            {project.date}
          </p>
          <h1 className="mt-2 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            {project.title}
          </h1>
          <p className="mt-3 text-lg text-muted">{project.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-md bg-surface px-3 py-1 font-mono text-xs text-muted"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="mt-4 flex gap-3">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-accent transition-colors hover:text-accent/80"
              >
                Repository &rarr;
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-accent transition-colors hover:text-accent/80"
              >
                Live Demo &rarr;
              </a>
            )}
          </div>
        </header>

        <section className="mb-10">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted">
            Highlights
          </h2>
          <ul className="mt-3 space-y-2">
            {project.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2 text-sm text-muted">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {h}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted">
            Case Study
          </h2>
          <div className="mt-3 space-y-4 text-sm leading-relaxed text-muted">
            <p>
              Case study summary — the detailed breakdown is captured in the
              <span className="font-medium text-foreground">
                {" "}
                Highlights{" "}
              </span>
              above: the core problem, the system architecture, and the shipped
              implementation outcomes for this project.
            </p>
          </div>
        </section>
      </article>
    </>
  );
}
