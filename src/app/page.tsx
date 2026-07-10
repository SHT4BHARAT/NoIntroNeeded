import type { Metadata } from "next";
import { projects } from "@/lib/projects/config";
import { experience, certifications } from "@/lib/achievements/data";
import { RoleProjectCard } from "@/components/role/RoleProjectCard";
import { RevealOnScroll } from "@/components/animation/RevealOnScroll";
import { PersonSchema } from "@/components/seo/PersonSchema";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { FaqAccordion } from "@/components/home/FaqAccordion";

export const metadata: Metadata = {
  title: "Shivanshu Tiwari — AI Agent Engineer & Backend Systems Developer",
  description:
    "B.Tech CS & IT student (SIRT Bhopal, Class of 2027) building autonomous AI agents, LLM pipelines, and concurrency-safe backend systems. 19 documented projects including an RL traffic benchmark, an AI scam-detection honeypot, and a payout engine with proven race-condition safety.",
  openGraph: {
    title: "Shivanshu Tiwari — AI Agent Engineer & Backend Systems Developer",
    description:
      "Autonomous agents, LLM pipelines, and production APIs — with honest documentation of what worked and what didn't.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shivanshu Tiwari — AI Agent Engineer & Backend Systems Developer",
    description:
      "Autonomous agents, LLM pipelines, and production APIs — with honest documentation of what worked and what didn't.",
  },
  alternates: {
    canonical: "https://shivanshutiwari.in/",
  },
  robots: "index, follow",
};

const faqItems = [
  {
    question: "What does Shivanshu build?",
    answer:
      "Autonomous AI agents and backend systems — scam-detection agents, RL benchmarking pipelines, voice intelligence tools, and the real-time infrastructure (APIs, databases, event buses) that keeps them running. I also document what didn't work, not just what did.",
  },
  {
    question: "What's his most technically interesting project?",
    answer:
      "Depends what you're looking for. DAITFO is the strongest engineering story — a full RL benchmark that found a simple heuristic beats PPO reinforcement learning, with the failure mode fully diagnosed. Agentic Honeypot is the most polished shipped product — a live AI honeypot that engages real scammers and extracts fraud intelligence, deployed on Render with a public demo.",
  },
  {
    question: "Is he looking for work?",
    answer:
      "Yes — actively looking for an AI or Software Engineering internship, remote or hybrid.",
  },
  {
    question: "What's his tech stack?",
    answer:
      "Python and JavaScript/TypeScript, with hands-on experience in Google Gemini, Sarvam AI, LangChain, Stable-Baselines3, FastAPI, Django, Node.js, Docker, Redis, PostgreSQL, and Socket.io/WebSockets.",
  },
];

export default function HomePage() {
  const catchallProjects = projects;

  return (
    <>
      <PersonSchema />
      <FAQSchema questions={faqItems} />

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
              {catchallProjects.map((project, i) => (
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

        <section className="mb-16">
          <RevealOnScroll index={7}>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-muted">
              Experience
            </h2>
          </RevealOnScroll>

          <RevealOnScroll index={8}>
            <div className="mt-4 space-y-6">
              {experience.map((exp) => (
                <div key={exp.company}>
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-sm font-semibold">{exp.role}</h3>
                    <span className="text-xs text-muted-foreground">{exp.period}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{exp.company}</p>
                  <p className="mt-1 text-sm text-muted">{exp.description}</p>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </section>

        <section className="mb-16">
          <RevealOnScroll index={9}>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-muted">
              Certifications
            </h2>
          </RevealOnScroll>

          <RevealOnScroll index={10}>
            <div className="mt-4 space-y-3">
              {certifications.map((cert) => (
                <div key={cert.title} className="rounded-lg border border-border p-4">
                  <h3 className="text-sm font-semibold">{cert.title}</h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {cert.provider} &middot; {cert.duration}
                  </p>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </section>

        <section>
          <RevealOnScroll index={11}>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-muted">
              Frequently Asked Questions
            </h2>
          </RevealOnScroll>

          <RevealOnScroll index={12}>
            <FaqAccordion items={faqItems} />
          </RevealOnScroll>
        </section>
      </div>
    </>
  );
}
