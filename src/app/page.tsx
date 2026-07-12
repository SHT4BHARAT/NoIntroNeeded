import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import { PersonSchema } from "@/components/seo/PersonSchema";
import { HomeContent } from "@/components/home/HomeContent";

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
    canonical: `${SITE_URL}/`,
  },
  robots: "index, follow",
};

export default function HomePage() {
  return (
    <>
      <PersonSchema />
      <HomeContent />
    </>
  );
}
