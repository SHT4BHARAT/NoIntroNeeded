import type { Metadata } from "next";
import { volunteer } from "@/lib/achievements/data";
import { RevealOnScroll } from "@/components/animation/RevealOnScroll";

export const metadata: Metadata = {
  title: "Volunteer — Shivanshu Tiwari",
  description:
    "Volunteer work and community involvement by Shivanshu Tiwari.",
};

export default function VolunteerPage() {
  return (
    <main className="mx-auto max-w-2xl flex-1 px-4 py-16">
      <RevealOnScroll>
        <h1 className="mb-2 text-3xl font-bold tracking-tight">Volunteer</h1>
      </RevealOnScroll>

      <RevealOnScroll>
        <p className="mb-8 text-muted">Community involvement and volunteer work.</p>
      </RevealOnScroll>

      <div className="space-y-6">
        {volunteer.map((v, i) => (
          <RevealOnScroll key={`${v.role}-${v.organization}`} index={i}>
            <div className="rounded-lg border border-border bg-card p-5">
              <div className="flex items-baseline justify-between">
                <h3 className="text-sm font-semibold">{v.role}</h3>
                <span className="text-xs text-muted-foreground">{v.period}</span>
              </div>
              <p className="text-xs text-muted-foreground">{v.organization} &middot; {v.duration}</p>
              <p className="mt-2 text-sm text-muted">{v.description}</p>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </main>
  );
}
