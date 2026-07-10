import type { Metadata } from "next";
import { projects } from "@/lib/projects/config";
import { experience, certifications } from "@/lib/achievements/data";
import { RoleProjectCard } from "@/components/role/RoleProjectCard";
import { RevealOnScroll } from "@/components/animation/RevealOnScroll";
import { PersonSchema } from "@/components/seo/PersonSchema";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { FaqAccordion } from "@/components/home/FaqAccordion";

export const metadata: Metadata = {
  title: "Shivanshu Tiwari — AI-Native Backend Systems",
  description:
    "AI-native backend systems — autonomous agents, LLM pipelines, and production APIs, built by a B.Tech CS & IT student in Bhopal.",
};

const faqItems = [
  {
    question: "What does Shivanshu build?",
    answer:
      "Autonomous AI agents and backend systems that run in production without human supervision — scam-detection agents, voice intelligence tools, email automation, and the real-time infrastructure (APIs, databases, WebSocket services) that keeps them running.",
  },
  {
    question: "What's his most technically impressive project?",
    answer:
      "Agentic Honey-Pot — an autonomous agent that holds live conversations with real scammers to extract fraud intelligence, running at 85\u201390% detection accuracy on a Dockerized FastAPI service with 99%+ uptime. It won Finalist at the GUVI India AI Impact Buildathon 2026.",
  },
  {
    question: "Is he looking for work?",
    answer:
      "Yes \u2014 actively looking for an AI or Software Engineering internship, remote or hybrid.",
  },
  {
    question: "What's his tech stack?",
    answer:
      "Python and JavaScript/TypeScript, with hands-on experience in OpenAI, Google Gemini, Sarvam AI, LangChain, CrewAI, FastAPI, Node.js, Docker, Redis, PostgreSQL, and WebSockets.",
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
            Autonomous agents, LLM pipelines, production APIs — no role framing, just the strongest work, ranked.
          </p>
          <p className="mt-2 text-base text-muted">
            B.Tech CS &amp; IT, SIRT Bhopal &middot; Class of 2027
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
              I don&apos;t just use AI — I build things with it that keep running after I close my laptop. I&apos;m a third-year B.Tech CS &amp; IT student from Bhopal, and I&apos;ve spent the last year building AI-powered systems — autonomous agents, LLM pipelines, voice intelligence tools, and automation workflows that handle real tasks without human supervision. I&apos;m not interested in demos that look good in a presentation. I build things that work in production and prove it by deploying them. The standard I hold myself to: the system owns the task completely.
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
                  AI / Automation
                </h3>
                <div className="flex flex-wrap gap-2">
                  {["OpenAI API", "Google Gemini", "LangChain", "CrewAI", "Sarvam AI"].map(
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
                    "Node.js",
                    "Docker",
                    "Redis",
                    "PostgreSQL",
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
