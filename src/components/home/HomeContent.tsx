"use client";

import Link from "next/link";
import { useRole } from "@/components/providers/RoleProvider";
import { getRoleBySlug } from "@/lib/role/config";
import { projects, getProjectsBySlugs } from "@/lib/projects/config";
import { RoleHero } from "@/components/role/RoleHero";
import { RoleProjectCard } from "@/components/role/RoleProjectCard";
import { RoleProjectList } from "@/components/role/RoleProjectList";
import { RevealOnScroll } from "@/components/animation/RevealOnScroll";
import { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    const onScroll = () => {
      const doc = document.documentElement;
      const max = Math.max(1, doc.scrollHeight - doc.clientHeight);
      setProgress(Math.min(100, (doc.scrollTop / max) * 100));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [prefersReducedMotion]);

  return (
    <div className="pointer-events-none fixed left-0 top-0 z-[60] h-[2px] w-full opacity-70">
      <div className="h-full bg-accent" style={{ width: `${progress}%`, transition: "width 100ms linear" }} />
    </div>
  );
}

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
      <div key={roleSlug} className="mx-auto max-w-5xl px-4 py-28">
        <RevealOnScroll>
          <section className="mb-28">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="font-display text-lg font-semibold tracking-tight text-foreground">
                About
              </h2>
              <div className="h-px flex-1 bg-accent/60" />
            </div>
            <p className="max-w-prose text-base leading-relaxed text-muted">
              {role.about}
            </p>
          </section>
        </RevealOnScroll>

        <RevealOnScroll>
          <section className="mb-28">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="font-display text-lg font-semibold tracking-tight text-foreground">
                Skills
              </h2>
              <div className="h-px flex-1 bg-accent/60" />
            </div>
            <div className="mt-6 space-y-5">
              {role.skills.categories.map((cat) => (
                <div key={cat.name}>
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {cat.name}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {cat.items.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-sm bg-surface px-3 py-1 font-mono text-xs text-muted"
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
          <section className="mb-28">
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
      <ScrollProgress />
      <section className="border-b border-border">
        <div className="mx-auto max-w-5xl px-4 py-28 sm:py-36">
          <RevealOnScroll>
            <h1 className="font-display text-[clamp(2.75rem,6.5vw,4.5rem)] font-bold leading-[1.05] tracking-[-0.03em] sm:text-[clamp(3rem,7vw,5rem)]">
              I build AI-native backend systems
            </h1>
          </RevealOnScroll>
          <RevealOnScroll>
            <p className="mt-4 max-w-2xl text-balance text-lg text-muted">
              Autonomous agents, LLM pipelines, production APIs &mdash; ranked by what&apos;s actually working, not by title.
            </p>
          </RevealOnScroll>
          <RevealOnScroll>
            <p className="mt-2 text-base text-muted">
              B.Tech CS &amp; IT, SIRT Bhopal (RGPV CSIT) &middot; Class of 2027
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-28">
        <section className="mb-28">
          <RevealOnScroll>
            <div className="flex items-center gap-3 mb-6">
              <h2 className="font-display text-lg font-semibold tracking-tight text-foreground">
                About
              </h2>
              <div className="h-px flex-1 bg-accent/60" />
            </div>
            <p className="max-w-prose text-balance text-base leading-relaxed text-muted">
              I don&apos;t just use AI &mdash; I build things with it that keep running after I close my laptop. I&apos;m a third-year B.Tech CS &amp; IT student in Bhopal, and over the past year I&apos;ve built autonomous agents, LLM pipelines, voice intelligence tools, and RL benchmarking systems across 19 projects &mdash; some shipped and deployed, some deliberately stopped short of production so I could document what actually worked and what didn&apos;t. I&apos;m not interested in demos that only look good in a pitch. When something fails &mdash; an RL agent losing to a simple heuristic, a classifier scoring 25% instead of the 90% I hoped for &mdash; I keep the result and figure out why, instead of reframing it until it sounds better. That&apos;s the standard I hold my own work to, and it&apos;s the standard I expect from anything I ship.
            </p>
          </RevealOnScroll>
        </section>

        <section className="mb-28">
          <RevealOnScroll>
            <div className="flex items-center gap-3 mb-6">
              <h2 className="font-display text-lg font-semibold tracking-tight text-foreground">
                Skills
              </h2>
              <div className="h-px flex-1 bg-accent/60" />
            </div>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="mt-6 space-y-5">
              <div>
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Languages
                </h3>
                <div className="flex flex-wrap gap-2">
                  {["Python", "JavaScript", "TypeScript", "Kotlin", "SQL", "Dart"].map((skill) => (
                    <span
                      key={skill}
                      className="rounded-sm bg-surface px-3 py-1 font-mono text-xs text-muted"
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
                        className="rounded-sm bg-surface px-3 py-1 font-mono text-xs text-muted"
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
                      className="rounded-sm bg-surface px-3 py-1 font-mono text-xs text-muted"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </section>

        <section className="mb-28">
          <RevealOnScroll>
            <div className="flex items-center gap-3 mb-6">
              <h2 className="font-display text-lg font-semibold tracking-tight text-foreground">
                Projects
              </h2>
              <div className="h-px flex-1 bg-accent/60" />
            </div>
          </RevealOnScroll>

          <RevealOnScroll>
            <p className="mt-1 text-balance text-sm text-muted">
              The strongest work, ranked &mdash; no role framing.
            </p>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {[...projects]
                .sort((a, b) => {
                  if (a.featured && !b.featured) return -1;
                  if (!a.featured && b.featured) return 1;
                  return 0;
                })
                .map((project) => (
                  <RoleProjectCard key={project.slug} project={project} />
                ))}
            </div>
          </RevealOnScroll>
        </section>

        <section className="border-t border-border pt-10">
          <RevealOnScroll>
            <p className="text-sm text-muted">
              Developer resources for <strong className="text-foreground">Shivanshu Tiwari</strong> —{" "}
              <a href="/developers" className="text-accent hover:underline">
                API Docs &amp; Developer Portal
              </a>{" "}
              ·{" "}
              <a href="/openapi.json" className="text-accent hover:underline">
                OpenAPI
              </a>{" "}
              ·{" "}
              <a href="/auth.md" className="text-accent hover:underline">
                Auth
              </a>{" "}
              ·{" "}
              <a href="/.well-known/mcp/server-card.json" className="text-accent hover:underline">
                MCP
              </a>{" "}
              ·{" "}
              <Link href="/AGENTS.md" className="text-accent hover:underline">
                AGENTS.md
              </Link>{" "}
              ·{" "}
              <Link href="/SKILL.md" className="text-accent hover:underline">
                SKILL.md
              </Link>{" "}
              ·{" "}
              <Link href="/developers/sdk" className="text-accent hover:underline">
                SDKs
              </Link>
            </p>
          </RevealOnScroll>
        </section>
      </div>
    </>
  );
}
