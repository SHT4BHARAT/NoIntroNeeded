import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "@/lib/projects/config";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { SoftwareSourceCodeSchema } from "@/components/seo/SoftwareSourceCodeSchema";

const flagshipMeta: Record<
  string,
  { title: string; description: string; ogTitle: string; ogDescription: string }
> = {
  daitfo: {
    title: "DAITFO — RL vs Heuristic Traffic Signal Benchmark | Shivanshu Tiwari",
    description:
      "A controlled benchmark testing PPO reinforcement learning against a queue-based heuristic for traffic signal control. Result: the heuristic won on every metric — full methodology, 27 experiment runs, and root-cause analysis of RL training instability.",
    ogTitle: "DAITFO — Does RL Actually Beat a Heuristic at Traffic Control?",
    ogDescription:
      "27 controlled experiments. The heuristic won every time. Here's why, and what it reveals about RL training instability.",
  },
  "agentic-honey-pot": {
    title: "Agentic Honeypot — AI Scam-Baiting System | Shivanshu Tiwari",
    description:
      "An AI agent that impersonates an elderly victim persona to engage phone/SMS scammers in live conversation and extract fraud intelligence — UPI IDs, bank accounts, phishing URLs — built with FastAPI and Gemini 2.0 Flash, deployed on Render.",
    ogTitle: "An AI That Talks to Scammers So You Don't Have To",
    ogDescription:
      "Built an autonomous honeypot that extracts real fraud intelligence from scam conversations. Live demo included.",
  },
  "home-services-app": {
    title: "Home Services App — Emergency Home Services Platform | Shivanshu Tiwari",
    description:
      "Full-stack platform connecting Indian housing society residents with verified local technicians. Node.js/Express backend, Kotlin/Compose Android app, Next.js admin dashboard, real-time tracking via Socket.io.",
    ogTitle: "Home Services App — Full-Stack Emergency Services Platform",
    ogDescription:
      "Three clients, one API: Android app, admin dashboard, and a real-time Node.js backend with live technician tracking.",
  },
  samvad: {
    title: "Samvad — AI Meeting Assistant | Shivanshu Tiwari",
    description:
      "Records in-person meetings, transcribes live via Sarvam AI speech-to-text, and runs a post-meeting ReAct agent that extracts and emails assigned tasks with deadlines — no manual notes needed.",
    ogTitle: "Samvad — Turns Meeting Audio Into Assigned Tasks Automatically",
    ogDescription:
      "Live transcription plus a post-meeting AI agent pipeline that extracts and emails tasks with deadlines.",
  },
  "cloud-audit-env": {
    title: "CloudAuditEnv — LLM Agent Evaluation for Cloud Security | Shivanshu Tiwari",
    description:
      "A procedurally generated cloud security environment for testing whether LLM agents can remediate real AWS vulnerability patterns without breaking production. Built for the OpenENV MetaHackathon, deployed on HuggingFace Spaces.",
    ogTitle: "Can LLM Agents Actually Fix Cloud Security Vulnerabilities?",
    ogDescription:
      "A benchmark environment that tests remediation, not just detection — built on Meta's OpenEnv framework.",
  },
  "payout-engine": {
    title: "PayoutEngine — Concurrency-Safe Payout System | Shivanshu Tiwari",
    description:
      "A Django/Celery payout engine using pessimistic row locking and an immutable ledger to eliminate double-spend races, proven with real Python threading tests — not mocks.",
    ogTitle: "A Payout Engine That Can't Double-Spend, Proven With Real Concurrency Tests",
    ogDescription:
      "Pessimistic locking, immutable ledger, and threading tests that actually prove the concurrency guarantee holds.",
  },
};

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

  const meta = flagshipMeta[slug];
  if (meta) {
    return {
      title: meta.title,
      description: meta.description,
      openGraph: {
        title: meta.ogTitle,
        description: meta.ogDescription,
      },
    };
  }

  return {
    title: `${project.title} | Shivanshu Tiwari`,
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
      <SoftwareSourceCodeSchema project={project} />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Projects", href: "/" },
          { name: project.title, href: `/projects/${project.slug}` },
        ]}
      />

      <article className="mx-auto max-w-4xl px-4 py-12">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-foreground"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Back to projects
        </Link>

        <header className="mb-10">
          <p className="font-mono text-xs font-medium uppercase tracking-widest text-muted">
            {project.date}
          </p>
          <h1 className="mt-2 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            {project.title}
          </h1>
          {project.tagline && (
            <p className="mt-2 text-base italic text-muted-foreground">
              {project.tagline}
            </p>
          )}
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

        {project.problem && (
          <section className="mb-10">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-muted">
              The Problem
            </h2>
            <div className="mt-3 space-y-4 text-sm leading-relaxed text-muted">
              {project.problem.split("\n\n").map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>
        )}

        {project.whatIBuilt && (
          <section className="mb-10">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-muted">
              What I Built
            </h2>
            <div className="mt-3 space-y-4 text-sm leading-relaxed text-muted">
              {project.whatIBuilt.split("\n\n").map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>
        )}

        {project.architecture && (
          <section className="mb-10">
            <pre className="overflow-x-auto rounded-lg border border-border bg-surface p-4 font-mono text-xs leading-relaxed text-muted">
              {project.architecture}
            </pre>
          </section>
        )}

        {project.result && (
          <section className="mb-10">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-muted">
              The Result
            </h2>
            <div className="mt-3 space-y-4 text-sm leading-relaxed text-muted">
              {project.result.split("\n\n").map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>
        )}

        {project.keyDecisions && project.keyDecisions.length > 0 && (
          <section className="mb-10">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-muted">
              Key Decisions &amp; Tradeoffs
            </h2>
            <ul className="mt-3 space-y-3">
              {project.keyDecisions.map((d, i) => (
                <li key={i} className="text-sm leading-relaxed text-muted">
                  {d}
                </li>
              ))}
            </ul>
          </section>
        )}

        {project.honestPart && (
          <section className="mb-10">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-muted">
              The Honest Part
            </h2>
            <div className="mt-3 space-y-4 text-sm leading-relaxed text-muted">
              {project.honestPart.split("\n\n").map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>
        )}

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
      </article>
    </>
  );
}
