import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import { experience } from "@/lib/achievements/data";
import { RevealOnScroll } from "@/components/animation/RevealOnScroll";

export const metadata: Metadata = {
  title: "Experience — Shivanshu Tiwari",
  description:
    "Work experience from Shivanshu Tiwari.",
  openGraph: {
    title: "Experience — Shivanshu Tiwari",
    description: "Work experience and internships from Shivanshu Tiwari.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Experience — Shivanshu Tiwari",
    description: "Work experience and internships from Shivanshu Tiwari.",
  },
  alternates: {
    canonical: `${SITE_URL}/experience`,
  },
  robots: "index, follow",
};

export default function ExperiencePage() {
  return (
    <div className="mx-auto max-w-3xl flex-1 px-4 py-20">
      <RevealOnScroll>
        <h1 className="font-display mb-2 text-3xl font-bold tracking-tight">Experience</h1>
      </RevealOnScroll>

      <RevealOnScroll>
        <p className="mb-8 text-muted">Work history and internships.</p>
      </RevealOnScroll>

      <div className="space-y-6">
        {experience.map((exp, i) => (
          <RevealOnScroll key={`${exp.company}-${exp.role}`} index={i}>
            <div className="rounded-lg border border-accent/10 bg-card p-5">
              <div className="flex items-baseline justify-between">
                <h3 className="text-sm font-semibold">{exp.role}</h3>
                <span className="text-xs text-muted-foreground">{exp.period}</span>
              </div>
              <p className="text-xs text-muted-foreground">{exp.company}</p>
              <p className="mt-2 text-sm text-muted">{exp.description}</p>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  );
}
