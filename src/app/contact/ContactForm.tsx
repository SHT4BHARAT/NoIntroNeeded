"use client";

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { contactSchema } from "@/lib/contact/validation";
import { track } from "@/lib/analytics";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

interface FieldErrors {
  name?: string;
  email?: string;
  message?: string;
}

interface FormValues {
  name: string;
  email: string;
  message: string;
}

function getFieldErrors(values: FormValues): FieldErrors {
  const result = contactSchema.safeParse({ ...values, _name: "" });
  if (!result.success) {
    const field = result.error.flatten().fieldErrors;
    return {
      name: field.name?.[0],
      email: field.email?.[0],
      message: field.message?.[0],
    };
  }
  return {};
}

export function ContactForm() {
  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errors, setErrors] = useState<FieldErrors>({});

  const messageRef = useRef<HTMLTextAreaElement | null>(null);
  const honeypotRef = useRef<HTMLInputElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const el = messageRef.current;
    if (!el) return;
    // Auto-resize
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [values.message]);

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function handleBlur(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    const allValues = { ...values, [name]: value };
    const fieldErrors = getFieldErrors(allValues);
    setErrors((prev) => ({ ...prev, [name]: fieldErrors[name as keyof FieldErrors] }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrors({});

    const honeypotValue = honeypotRef.current?.value ?? "";
    const parsed = contactSchema.safeParse({ ...values, _name: honeypotValue });
    if (!parsed.success) {
      const field = parsed.error.flatten().fieldErrors;
      setErrors({
        name: field.name?.[0],
        email: field.email?.[0],
        message: field.message?.[0],
      });
      setStatus("idle");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      if (!res.ok) throw new Error("Failed");

      track("contact_submit");
      setStatus("sent");
      setValues({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  const messageMax = 5000;
  const messageCount = values.message.length;

  const shakeClass =
    status === "error" && !prefersReducedMotion
      ? "animate-[shake_320ms_ease-in-out]"
      : "";

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
      noValidate
      // WebMCP: W3C draft standard declarative tool attributes (survives SSR for AI agents)
      toolname="submit_contact"
      tooldescription="Submit contact message or internship inquiry to Shivanshu Tiwari — name, email, and message (rate-limited, honeypot-protected)"
    >
      {/* Honeypot */}
      <div aria-hidden="true" className="absolute left-[-9999px]">
        <label htmlFor="_name">Leave this empty</label>
        <input
          ref={honeypotRef}
          id="_name"
          name="_name"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
          className="h-0 w-0 overflow-hidden opacity-0"
        />
      </div>

      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          toolparam="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
          autoComplete="name"
          className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          placeholder="Your name"
        />
        {errors.name && <p id="name-error" className="mt-1 text-xs text-red-500">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          toolparam="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          autoComplete="email"
          className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          placeholder="you@example.com"
        />
        {errors.email && <p id="email-error" className="mt-1 text-xs text-red-500">{errors.email}</p>}
      </div>

      <div>
        <div className="mb-1 flex items-center justify-between gap-4">
          <label htmlFor="message" className="block text-sm font-medium">
            Message
          </label>
          <span id="message-count" className="text-xs font-mono tabular-nums text-muted-foreground">
            {messageCount}/{messageMax}
          </span>
        </div>

        <textarea
          ref={messageRef}
          id="message"
          name="message"
          required
          toolparam="message"
          minLength={10}
          maxLength={messageMax}
          value={values.message}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : "message-count"}
          className={[
            "w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
            shakeClass,
          ].join(" ")}
          placeholder="Your message (at least 10 characters)"
        />

        {errors.message && <p id="message-error" className="mt-1 text-xs text-red-500">{errors.message}</p>}
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-lg bg-accent px-6 py-2.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {status === "sending" ? <span aria-live="polite">Sending&hellip;</span> : "Send"}
      </button>

      {status === "sent" && (
        <p className="text-sm text-green-500" aria-live="polite" role="status">
          Message sent! I&apos;ll get back to you soon.
        </p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-500" aria-live="polite" role="alert">Something went wrong. Please try again later.</p>
      )}
    </form>
  );
}
