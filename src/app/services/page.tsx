import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/constants";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { RevealOnScroll } from "@/components/animation/RevealOnScroll";

export const metadata: Metadata = {
  title: "Services & Capabilities — Shivanshu Tiwari",
  description:
    "What I build, how I work, and what I'm looking for — autonomous AI agents, voice AI, RL benchmarks, and concurrency-safe backend systems.",
  openGraph: {
    title: "Services & Capabilities — Shivanshu Tiwari",
    description: "What I build, how I work, and what I'm looking for — stated plainly.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services & Capabilities — Shivanshu Tiwari",
    description: "What I build, how I work, and what I'm looking for.",
  },
  alternates: {
    canonical: `${SITE_URL}/services`,
  },
  robots: "index, follow",
};

const capabilities = [
  {
    title: "Autonomous AI Agents",
    body: "I build agents that own a task end-to-end — no human in the loop to patch over gaps. My Agentic Honeypot engages real scammers in live conversation and extracts fraud intelligence; my CloudAuditEnv tests whether LLM agents can remediate cloud vulnerabilities without breaking production.",
    href: "/projects/agentic-honey-pot",
    hrefLabel: "See Agentic Honeypot",
  },
  {
    title: "Voice AI",
    body: "I build speech pipelines that hold up in production. My Samvad meeting assistant transcribes live via Sarvam AI over WebSocket, refines the transcript in three phases with a hallucination gate, and runs a post-meeting agent that extracts and emails assigned tasks.",
    href: "/projects/samvad",
    hrefLabel: "See Samvad",
  },
  {
    title: "RL Systems & Evaluation",
    body: "I build controlled benchmarks and report what actually happens. My DAITFO project pits PPO reinforcement learning against a queue-based heuristic for traffic signal control — the heuristic won, and I documented that negative result as the finding itself.",
    href: "/projects/daitfo",
    hrefLabel: "See DAITFO",
  },
  {
    title: "Backend Infrastructure",
    body: "I build concurrency-safe systems with proofs, not promises. My PayoutEngine uses pessimistic row locking and an immutable ledger, verified with real threading tests. I work day-to-day in FastAPI, Django, Node.js, PostgreSQL, Redis, and Docker.",
    href: "/projects/payout-engine",
    hrefLabel: "See PayoutEngine",
  },
];

export default function ServicesPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Services & Capabilities", href: "/services" },
        ]}
      />

      <div className="mx-auto max-w-3xl flex-1 px-4 py-20">
        <RevealOnScroll>
          <h1 className="font-display text-3xl font-bold tracking-tight">
            Services &amp; Capabilities
          </h1>
          <p className="mt-3 text-muted">
            What I build, how I work, and what I&apos;m looking for — stated plainly.
          </p>
        </RevealOnScroll>

        <div className="mt-10 space-y-6">
          {capabilities.map((cap, i) => (
            <RevealOnScroll key={cap.title} index={i}>
              <div className="rounded-lg border border-border bg-card p-6">
                <h2 className="text-lg font-semibold">{cap.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">{cap.body}</p>
                <Link
                  href={cap.href}
                  className="mt-3 inline-block text-sm font-medium text-accent transition-opacity hover:opacity-90"
                >
                  {cap.hrefLabel} →
                </Link>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll>
          <div className="mt-6 rounded-lg border border-border bg-card p-6">
            <h2 className="text-lg font-semibold">How I Work</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              I don&apos;t ship demos that only look good in a pitch. When something fails, I keep
              the result and document why instead of reframing it until it sounds better. My
              standard: the system owns the task completely. My project writeups include honest
              limitation disclosures and negative results — that&apos;s deliberate.
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll>
          <div className="mt-6 rounded-lg border border-accent/40 bg-accent-bg p-6">
            <h2 className="text-lg font-semibold">What I&apos;m Looking For</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              I&apos;m actively looking for an AI or Software Engineering internship (remote or
              hybrid) where production deployment and verifiable testing matter more than demo
              polish. If that sounds like your team, I&apos;d like to hear from you.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="rounded-lg bg-accent px-5 py-2 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
              >
                Contact me
              </Link>
              <Link
                href="/experience"
                className="rounded-lg border border-border px-5 py-2 text-sm font-medium text-muted transition-colors hover:bg-surface hover:text-foreground"
              >
                My experience
              </Link>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </>
  );
}