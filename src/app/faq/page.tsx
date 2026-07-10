import type { Metadata } from "next";
import { FaqAccordion } from "@/components/home/FaqAccordion";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { RevealOnScroll } from "@/components/animation/RevealOnScroll";

export const metadata: Metadata = {
  title: "FAQ — Shivanshu Tiwari",
  description:
    "Frequently asked questions about Shivanshu Tiwari — AI agent engineer and backend systems developer, his projects, tech stack, and availability.",
  openGraph: {
    title: "FAQ — Shivanshu Tiwari",
    description:
      "Quick answers about Shivanshu Tiwari's work, tech stack, and availability.",
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

export default function FaqPage() {
  return (
    <>
      <FAQSchema questions={faqItems} />

      <main className="mx-auto max-w-2xl flex-1 px-4 py-16">
        <RevealOnScroll>
          <h1 className="mb-2 text-3xl font-bold tracking-tight">
            Frequently Asked Questions
          </h1>
        </RevealOnScroll>

        <RevealOnScroll>
          <p className="mb-8 text-muted">
            Quick answers to common questions about my work, tech stack, and availability.
          </p>
        </RevealOnScroll>

        <RevealOnScroll>
          <FaqAccordion items={faqItems} />
        </RevealOnScroll>
      </main>
    </>
  );
}
