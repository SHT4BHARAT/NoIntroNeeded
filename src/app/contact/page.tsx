import type { Metadata } from "next";
import { SITE_URL, SOCIAL } from "@/lib/constants";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact — Shivanshu Tiwari",
  description:
    "Get in touch with Shivanshu Tiwari — AI agent engineer and backend systems developer, actively looking for AI/Software Engineering internships (remote or hybrid).",
  openGraph: {
    title: "Contact — Shivanshu Tiwari",
    description:
      "Get in touch with Shivanshu Tiwari — AI agent engineer and backend systems developer.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact — Shivanshu Tiwari",
    description:
      "Get in touch with Shivanshu Tiwari — AI agent engineer and backend systems developer.",
  },
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
  robots: "index, follow",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl flex-1 px-4 py-20">
      <h1 className="font-display mb-2 text-3xl font-bold tracking-tight">Contact</h1>
      <p className="mb-2 text-muted">
        Have a question, project idea, or just want to say hi? Drop a message. I aim to respond within
        2–3 days — a follow-up via email is welcome if you haven&apos;t heard back.
      </p>
      <p className="mb-4 text-sm text-muted">
        I&apos;m actively looking for AI / Software Engineering internships (remote or hybrid) and open to
        collaborations on agent systems, LLM pipelines, and backend infrastructure. For detailed inquiries
        or internship outreach, email is preferred:{" "}
        <a href={SOCIAL.email} className="text-accent hover:underline">
          {SOCIAL.email.replace("mailto:", "")}
        </a>{" "}
        — you can also find me on{" "}
        <a href={SOCIAL.github} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
          GitHub
        </a>{" "}
        and{" "}
        <a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
          LinkedIn
        </a>
        . Questions about any of the 19 documented projects (especially DAITFO, Agentic Honeypot, Samvad,
        PayoutEngine, CloudAuditEnv) are welcome — include the project name and what you&apos;d like to
        know.
      </p>
      <p className="mb-8 text-xs text-muted-foreground">
        The form below sends your name, email, and message to a Google Sheet via Google Sheets API. No data
        is sold or shared beyond that. Rate-limited (5 requests per IP window) and honeypot-filtered — see{" "}
        <a href="/privacy" className="text-accent hover:underline">
          privacy
        </a>{" "}
        for details.
      </p>
      <ContactForm />
    </div>
  );
}
