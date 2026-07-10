import type { Metadata } from "next";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Shivanshu Tiwari.",
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-2xl flex-1 px-4 py-16">
      <h1 className="mb-2 text-3xl font-bold tracking-tight">Contact</h1>
      <p className="mb-8 text-muted">
        Have a question, project idea, or just want to say hi? Drop a message.
      </p>
      <ContactForm />
    </main>
  );
}
