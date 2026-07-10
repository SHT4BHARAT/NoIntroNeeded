import type { Metadata } from "next";
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

      <RevealOnScroll>
        <p className="text-sm text-muted">
          No volunteer entries yet.
        </p>
      </RevealOnScroll>
    </main>
  );
}
