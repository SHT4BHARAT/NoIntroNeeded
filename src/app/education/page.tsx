import type { Metadata } from "next";
import { education } from "@/lib/achievements/data";
import { RevealOnScroll } from "@/components/animation/RevealOnScroll";

export const metadata: Metadata = {
  title: "Education — Shivanshu Tiwari",
  description:
    "Academic background of Shivanshu Tiwari — B.Tech Computer Science & IT at SIRT Bhopal (RGPV), Class of 2027.",
};

export default function EducationPage() {
  return (
    <main className="mx-auto max-w-2xl flex-1 px-4 py-16">
      <RevealOnScroll>
        <h1 className="mb-2 text-3xl font-bold tracking-tight">Education</h1>
      </RevealOnScroll>

      <RevealOnScroll>
        <p className="mb-8 text-muted">Academic background and qualifications.</p>
      </RevealOnScroll>

      <div className="space-y-6">
        {education.map((edu, i) => (
          <RevealOnScroll key={`${edu.institution}-${edu.degree}`} index={i}>
            <div className="rounded-lg border border-border bg-card p-5">
              <div className="flex items-baseline justify-between">
                <h3 className="text-sm font-semibold">{edu.degree}</h3>
                <span className="text-xs text-muted-foreground">{edu.period}</span>
              </div>
              <p className="text-xs text-muted-foreground">{edu.institution}</p>
              <p className="mt-2 text-sm text-muted">{edu.description}</p>
              {edu.skills && edu.skills.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {edu.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-md bg-surface px-2 py-0.5 font-mono text-[11px] text-muted"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </main>
  );
}
