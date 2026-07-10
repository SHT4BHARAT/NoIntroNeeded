"use client";

import { useRole } from "@/components/providers/RoleProvider";
import { getRoleBySlug } from "@/lib/role/config";
import { projects, getProjectsBySlugs } from "@/lib/projects/config";
import { RoleHero } from "@/components/role/RoleHero";
import { RoleProjectCard } from "@/components/role/RoleProjectCard";
import { RoleProjectList } from "@/components/role/RoleProjectList";
import { RevealOnScroll } from "@/components/animation/RevealOnScroll";
import { SOCIAL } from "@/lib/constants";

export function HomeContent() {
  const { currentRole } = useRole();

  if (currentRole && getRoleBySlug(currentRole)) {
    return <RoleHome roleSlug={currentRole} />;
  }

  return <ShowEverything />;
}

function RoleHome({ roleSlug }: { roleSlug: string }) {
  const role = getRoleBySlug(roleSlug)!;
  const roleProjects = getProjectsBySlugs(role.projectSlugs);

  return (
    <>
      <RoleHero role={role} />

      <div className="mx-auto max-w-4xl px-4 py-12">
        <RevealOnScroll>
          <section className="mb-16">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-muted">
              About
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted">
              {role.about}
            </p>
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
            <RoleProjectList projects={roleProjects} />
          </section>
        </RevealOnScroll>
      </div>
    </>
  );
}

function ShowEverything() {
  return (
    <>
      <section className="border-b border-border">
        <RevealOnScroll className="mx-auto max-w-4xl px-4 py-20 sm:py-28">
          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            I build AI-native backend systems
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            Autonomous agents, LLM pipelines, production APIs — ranked by what's actually working, not by title.
          </p>
          <p className="mt-2 text-base text-muted">
            B.Tech CS &amp; IT, SIRT Bhopal (RGPV CSIT) &middot; Class of 2027
          </p>
        </RevealOnScroll>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-12">
        <section className="mb-16">
          <RevealOnScroll>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-muted">
              About
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted">
              I don&apos;t just use AI — I build things with it that keep running after I close my laptop. I&apos;m a third-year B.Tech CS &amp; IT student in Bhopal, and over the past year I&apos;ve built autonomous agents, LLM pipelines, voice intelligence tools, and RL benchmarking systems across 19 projects — some shipped and deployed, some deliberately stopped short of production so I could document what actually worked and what didn&apos;t. I&apos;m not interested in demos that only look good in a pitch. When something fails — an RL agent losing to a simple heuristic, a classifier scoring 25% instead of the 90% I hoped for — I keep the result and figure out why, instead of reframing it until it sounds better. That&apos;s the standard I hold my own work to, and it&apos;s the standard I expect from anything I ship.
            </p>
          </RevealOnScroll>
        </section>

        <section className="mb-16">
          <RevealOnScroll>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-muted">
              Skills
            </h2>
          </RevealOnScroll>

          <RevealOnScroll>
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
                  {["OpenAI API", "Google Gemini", "Sarvam AI", "LangChain", "CrewAI", "Stable-Baselines3", "Gymnasium", "OpenEnv"].map(
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
                  Backend / DevOps
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "FastAPI",
                    "Django",
                    "Node.js",
                    "Express",
                    "Docker",
                    "Redis",
                    "PostgreSQL",
                    "Celery",
                    "Socket.io",
                    "NATS JetStream",
                    "Terraform",
                    "Railway",
                    "Vercel",
                  ].map((skill) => (
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
          </RevealOnScroll>
        </section>

        <section className="mb-16">
          <RevealOnScroll index={4}>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-muted">
              Projects
            </h2>
          </RevealOnScroll>

          <RevealOnScroll index={5}>
            <p className="mt-1 text-sm text-muted">
              The strongest work, ranked — no role framing.
            </p>
          </RevealOnScroll>

          <RevealOnScroll index={6}>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {[...projects]
                .sort((a, b) => {
                  if (a.featured && !b.featured) return -1;
                  if (!a.featured && b.featured) return 1;
                  return 0;
                })
                .map((project, i) => (
                  <div
                    key={project.slug}
                    style={{ transitionDelay: `${Math.min(i * 60, 420)}ms` }}
                  >
                    <RoleProjectCard project={project} />
                  </div>
                ))}
            </div>
          </RevealOnScroll>
        </section>

        <RevealOnScroll>
          <footer className="border-t border-border pb-8 pt-8">
            <div className="flex flex-col items-center gap-2 text-sm text-muted sm:flex-row sm:justify-between">
              <p>&copy; {new Date().getFullYear()} Shivanshu Tiwari</p>
              <a
                href={SOCIAL.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-foreground"
              >
                LinkedIn
              </a>
            </div>
          </footer>
        </RevealOnScroll>
      </div>
    </>
  );
}
