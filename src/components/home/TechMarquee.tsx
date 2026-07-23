"use client";

import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

const techStack = [
  "Python",
  "TypeScript",
  "JavaScript",
  "Kotlin",
  "SQL",
  "Dart",
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
  "OpenAI API",
  "Google Gemini",
  "Sarvam AI",
  "LangChain",
  "CrewAI",
  "Stable-Baselines3",
  "Gymnasium",
  "OpenEnv",
];

export function TechMarquee() {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div className="border-y border-border">
        <div className="mx-auto max-w-5xl px-4 py-6">
          <div className="flex flex-wrap justify-center gap-2">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-muted"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border-y border-border overflow-hidden">
      <div className="flex w-max animate-marquee gap-3 py-5 hover:[animation-play-state:paused]">
        {[...techStack, ...techStack].map((tech, i) => (
          <span
            key={`${tech}-${i}`}
            className="inline-flex shrink-0 items-center rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-muted transition-colors hover:border-accent/50 hover:text-foreground"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
