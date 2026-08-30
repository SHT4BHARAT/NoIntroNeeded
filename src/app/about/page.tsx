import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL, SOCIAL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About — Shivanshu Tiwari",
  description:
    "About Shivanshu Tiwari — AI-native backend systems engineer (B.Tech CS & IT, SIRT Bhopal 2027) building autonomous agents, LLM pipelines, and concurrency-safe backend systems with honest documentation of what worked and what didn't.",
  openGraph: {
    title: "About — Shivanshu Tiwari",
    description:
      "AI-native backend systems engineer — autonomous agents, LLM pipelines, production APIs, documented honestly.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About — Shivanshu Tiwari",
    description: "AI-native backend systems engineer — autonomous agents, LLM pipelines, production APIs.",
  },
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  robots: "index, follow",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl flex-1 px-4 py-20">
      <h1 className="font-display mb-2 text-3xl font-bold tracking-tight">About</h1>
      <p className="mb-8 text-sm italic text-muted-foreground">
        AI-native backend systems — autonomous agents, LLM pipelines, and production APIs. B.Tech CS & IT, SIRT Bhopal (RGPV) — Class of 2027.
      </p>

      <div className="space-y-8 text-sm leading-relaxed text-muted">
        <section>
          <h2 className="font-display mb-3 text-sm font-semibold uppercase tracking-widest text-muted">
            Who I am
          </h2>
          <p>
            I don&apos;t just use AI — I build things with it that keep running after I close my laptop.
            I&apos;m a third-year B.Tech Computer Science & Information Technology student at Sagar Institute
            of Research and Technology (SIRT), Bhopal, affiliated to Rajiv Gandhi Proudyogiki
            Vishwavidyalaya (RGPV) — Class of 2027. Over the past year I&apos;ve built autonomous agents,
            LLM pipelines, voice intelligence tools, and RL benchmarking systems across 19 documented
            projects — some shipped and deployed, some deliberately stopped short of production so I could
            document what actually worked and what didn&apos;t.
          </p>
        </section>

        <section>
          <h2 className="font-display mb-3 text-sm font-semibold uppercase tracking-widest text-muted">
            How I work
          </h2>
          <p>
            I&apos;m not interested in demos that only look good in a pitch. When something fails — an RL
            agent losing to a simple heuristic, a classifier scoring 25% instead of the 90% I hoped for —
            I keep the result and figure out why, instead of reframing it until it sounds better. That
            honest-documentation approach is visible in my case studies: DAITFO documents a negative
            result (the queue-based heuristic beat PPO on every metric across 27 controlled runs) as the
            finding itself, and CloudAuditEnv explicitly flags unverified benchmark scores and missing seed
            support. The standard I hold my own work to: the system owns the task completely — no human in
            the loop to patch over gaps.
          </p>
        </section>

        <section>
          <h2 className="font-display mb-3 text-sm font-semibold uppercase tracking-widest text-muted">
            What I build
          </h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong className="text-foreground">Autonomous AI agents</strong> — e.g., Agentic Honeypot
              (Gemini 2.0 Flash scam-baiting agent extracting 8 entity types of fraud intelligence, GUVI
              Buildathon 2026 Finalist).
            </li>
            <li>
              <strong className="text-foreground">Voice AI</strong> — e.g., Samvad (Sarvam AI speech-to-text
              streamed over WebSocket, 3-phase transcript refinement with hallucination gate, ReAct agent
              extracting tasks with assignees and deadlines).
            </li>
            <li>
              <strong className="text-foreground">RL systems</strong> — e.g., DAITFO (custom Gymnasium
              environment wrapping SUMO via TraCI, 27 controlled runs benchmarking PPO vs. heuristic).
            </li>
            <li>
              <strong className="text-foreground">Backend infrastructure</strong> — FastAPI, Django,
              Node.js/Express, Docker, Redis, PostgreSQL, Celery, Socket.io, NATS JetStream, deployed on
              Render, Railway, and Vercel.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-display mb-3 text-sm font-semibold uppercase tracking-widest text-muted">
            Background
          </h2>
          <p>
            Based in Bhopal, India. Open to remote and hybrid AI / Software Engineering internships. Reach
            me via <Link href="/contact" className="text-accent hover:underline">contact</Link>,{" "}
            <a href={SOCIAL.github} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">GitHub</a>,{" "}
            <a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">LinkedIn</a>, or{" "}
            <a href={SOCIAL.email} className="text-accent hover:underline">email</a>.
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            Draft bio — awaiting Shivanshu&apos;s review for final wording. Claims above are verifiable from
            the codebase and linked project repos.
          </p>
        </section>
      </div>
    </div>
  );
}
