import type { Metadata } from "next";
import { getRoleBySlug } from "@/lib/role/config";
import { getProjectsBySlugs } from "@/lib/projects/config";
import { RoleHero } from "@/components/role/RoleHero";
import { RoleProjectList } from "@/components/role/RoleProjectList";
import { RoleSections } from "@/components/role/RoleSections";
import { PersonSchema } from "@/components/seo/PersonSchema";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { RevealOnScroll } from "@/components/animation/RevealOnScroll";

const role = getRoleBySlug("backend-systems")!;

export const metadata: Metadata = {
  title: role.title,
  description: role.description,
  openGraph: {
    title: `${role.title} — Shivanshu Tiwari`,
    description: role.description,
  },
};

export default function BackendSystemsPage() {
  const projects = getProjectsBySlugs(role.projectSlugs);

  const framingMap: Record<string, string> = {};
  for (const p of projects) {
    if (p.backendFraming) framingMap[p.slug] = p.backendFraming;
  }

  return (
    <>
      <PersonSchema />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: role.title, href: "/backend-systems" },
        ]}
      />

      <RoleHero role={role} />

      <div className="mx-auto max-w-4xl px-4 py-12">
        <RevealOnScroll>
          <RoleSections
            aboutText="I don&apos;t just use AI — I build things with it that keep running after I close my laptop. I&apos;m a third-year B.Tech CS &amp; IT student from Bhopal, and I&apos;ve spent the last year building AI-powered systems — autonomous agents, LLM pipelines, voice intelligence tools, and automation workflows that handle real tasks without human supervision. I&apos;m not interested in demos that look good in a presentation. I build things that work in production and prove it by deploying them. The standard I hold myself to: the system owns the task completely."
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
                {["Python", "JavaScript", "TypeScript", "Kotlin", "SQL"].map((skill) => (
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
                Backend / Infrastructure
              </h3>
              <div className="flex flex-wrap gap-2">
                {["FastAPI", "Node.js", "Docker", "Redis", "PostgreSQL", "WebSocket", "Railway", "Vercel"].map((skill) => (
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
                API &amp; Security
              </h3>
              <div className="flex flex-wrap gap-2">
                {["REST APIs", "OAuth2", "Gmail API", "HMAC-SHA256", "WebSocket"].map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md border border-border bg-surface px-3 py-1 font-mono text-xs text-muted"
                  >
                    {skill}
                  </span>
                ))}
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
