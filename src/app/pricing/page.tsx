import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Pricing & API Access Tiers | Shivanshu Tiwari",
  description: "Transparent API pricing, free rate limits, and access tiers for developers and autonomous AI agents integrating with Shivanshu Tiwari's portfolio and APIs.",
  alternates: {
    canonical: `${SITE_URL}/pricing`,
  },
};

export default function PricingPage() {
  return (
    <main className="min-h-screen py-16 px-4 max-w-4xl mx-auto">
      <header className="mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          API Access &amp; Pricing
        </h1>
        <p className="mt-3 text-base sm:text-lg text-muted">
          Transparent, open access for developers and autonomous AI agents. All endpoints and MCP servers are free of charge.
        </p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 mb-12">
        <div className="rounded-xl border border-border bg-surface p-6 flex flex-col justify-between">
          <div>
            <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-accent/20 text-accent mb-4">
              Community &amp; AI Agents
            </span>
            <h2 className="text-2xl font-bold text-foreground">Free Tier</h2>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-foreground">$0</span>
              <span className="text-muted text-sm">/ forever</span>
            </div>
            <p className="mt-4 text-sm text-muted">
              Full access to portfolio REST endpoints, markdown content twins, and dual Streamable HTTP MCP servers.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-foreground">
              <li className="flex items-center gap-2">
                <span className="text-accent font-bold">✓</span> 60 requests/minute per IP
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent font-bold">✓</span> Dual MCP Servers (/mcp and /mcp/docs)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent font-bold">✓</span> RFC 8594 Deprecation &amp; Sunset headers
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent font-bold">✓</span> Anonymous &amp; self-serve testing
              </li>
            </ul>
          </div>
          <div className="mt-8">
            <Link
              href="/developers"
              className="block w-full text-center py-2.5 px-4 rounded-lg bg-accent text-background font-medium hover:opacity-90 transition-opacity"
            >
              Explore API Docs
            </Link>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-surface p-6 flex flex-col justify-between">
          <div>
            <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/20 text-foreground mb-4">
              Testing &amp; CI/CD
            </span>
            <h2 className="text-2xl font-bold text-foreground">Sandbox Mode</h2>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-foreground">$0</span>
              <span className="text-muted text-sm">/ self-serve</span>
            </div>
            <p className="mt-4 text-sm text-muted">
              Dedicated sandbox endpoints with instant test keys to validate tool calls without touching production data.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-foreground">
              <li className="flex items-center gap-2">
                <span className="text-accent font-bold">✓</span> 120 requests/minute rate limit
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent font-bold">✓</span> Instant test key generation (POST /api/v1/keys)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent font-bold">✓</span> Safe simulation headers (X-Sandbox: true)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent font-bold">✓</span> Async jobs mock dispatch (202 Accepted)
              </li>
            </ul>
          </div>
          <div className="mt-8">
            <Link
              href="/sandbox"
              className="block w-full text-center py-2.5 px-4 rounded-lg border border-border text-foreground hover:bg-surface-hover transition-colors"
            >
              Visit Sandbox Portal
            </Link>
          </div>
        </div>
      </div>

      <section className="rounded-xl border border-border bg-surface/50 p-6 text-sm text-muted space-y-2">
        <h3 className="text-base font-semibold text-foreground mb-2">Machine-Readable Specifications</h3>
        <p>
          AI agents can read raw pricing and tier specifications at{" "}
          <Link href="/pricing.md" className="text-accent hover:underline">/pricing.md</Link>{" "}
          or inspect the OpenAPI spec at{" "}
          <Link href="/openapi.json" className="text-accent hover:underline">/openapi.json</Link>.
        </p>
      </section>
    </main>
  );
}
