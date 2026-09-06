import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import Link from "next/link";
import { SandboxInteractiveWidget } from "@/components/sandbox/SandboxInteractiveWidget";

export const metadata: Metadata = {
  title: "API Sandbox & Test Environment — Shivanshu Tiwari",
  description:
    "Sandbox testing environment for Shivanshu Tiwari Portfolio API — simulate contact submissions, generate test keys, and exercise endpoints safely.",
  alternates: {
    canonical: `${SITE_URL}/sandbox`,
  },
};

export default function SandboxPage() {
  return (
    <div className="mx-auto max-w-4xl flex-1 px-4 py-16">
      <h1 className="font-display mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
        Shivanshu Tiwari API Sandbox & Test Environment
      </h1>
      <p className="mb-6 text-muted">
        A dedicated test environment designed for autonomous AI agents, coding assistants, and developers to test integrations without altering live data. Free tier active, zero human approval required.
      </p>

      {/* 1-Click Interactive Console */}
      <SandboxInteractiveWidget />

      <div className="space-y-6">
        <div className="rounded-xl border border-border bg-surface p-6">
          <h2 className="text-xl font-semibold mb-2">Sandbox Ping</h2>
          <p className="text-sm text-muted mb-4">
            Verify connectivity to the sandbox testing surface. Returns a positive pong response and passes the <code>X-Sandbox: true</code> header.
          </p>
          <pre className="rounded-lg bg-background p-4 text-xs font-mono text-foreground overflow-x-auto">
            curl -s https://shivanshutiwari.in/api/v1/sandbox/ping
          </pre>
        </div>

        <div className="rounded-xl border border-border bg-surface p-6">
          <h2 className="text-xl font-semibold mb-2">Instant Test API Key Generation</h2>
          <p className="text-sm text-muted mb-4">
            Generate self-serve ephemeral sandbox keys on demand without human intervention or email signups.
          </p>
          <pre className="rounded-lg bg-background p-4 text-xs font-mono text-foreground overflow-x-auto">
            curl -X POST https://shivanshutiwari.in/api/v1/keys
          </pre>
        </div>

        <div className="rounded-xl border border-border bg-surface p-6">
          <h2 className="text-xl font-semibold mb-2">Simulated Contact Submissions</h2>
          <p className="text-sm text-muted mb-4">
            Test form payloads, schema validation, and idempotency headers safely without dispatching production emails.
          </p>
          <pre className="rounded-lg bg-background p-4 text-xs font-mono text-foreground overflow-x-auto">
{`curl -X POST https://shivanshutiwari.in/api/v1/sandbox/contact \\
  -H "Content-Type: application/json" \\
  -d '{"name": "Agent Test", "email": "test@example.com", "message": "Simulated testing payload"}'`}
          </pre>
        </div>
      </div>

      <div className="mt-10 flex gap-4 text-sm">
        <Link href="/developers" className="text-accent hover:underline">
          &larr; Return to Developer Portal
        </Link>
        <Link href="/openapi.json" className="text-accent hover:underline">
          View OpenAPI Spec
        </Link>
      </div>
    </div>
  );
}
