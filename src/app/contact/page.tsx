import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
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
      <p className="mb-8 text-muted">
        Have a question, project idea, or just want to say hi? Drop a message.
      </p>
      <ContactForm />
    </div>
  );
}
