import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "CLI Tool — Shivanshu Tiwari Developers",
  description:
    "Official CLI tool for Shivanshu Tiwari portfolio APIs — explore 19 projects, generate sandbox API keys, verify test environments, and run batch operations.",
  alternates: {
    canonical: `${SITE_URL}/developers/cli`,
    types: {
      "text/markdown": `${SITE_URL}/developers/cli.md`,
    },
  },
};

export default function CliPage() {
  const commands = [
    {
      name: "projects [domain]",
      desc: "List portfolio projects with summary metadata. Filter by domain: ai-agents, backend, voice-ai, rl.",
      example: "npx shivanshu projects ai-agents",
    },
    {
      name: "project <slug>",
      desc: "Retrieve detailed architectural diagrams, technical tradeoffs, and honest limitation disclosures.",
      example: "npx shivanshu project agentic-honey-pot",
    },
    {
      name: "compare <slugA> <slugB>",
      desc: "Compare two engineering projects side-by-side (domains, stacks, architectures).",
      example: "npx shivanshu compare agentic-honey-pot samvad",
    },
    {
      name: "keys",
      desc: "Generate an ephemeral self-serve sandbox API key valid for 24 hours.",
      example: "npx shivanshu keys",
    },
    {
      name: "sandbox",
      desc: "Verify live connectivity to the isolated sandbox test environment.",
      example: "npx shivanshu sandbox",
    },
    {
      name: "batch",
      desc: "Execute a multi-operation batch request in a single atomic network roundtrip.",
      example: "npx shivanshu batch",
    },
    {
      name: "jobs [jobId]",
      desc: "Dispatch or inspect asynchronous long-running background tasks (HTTP 202 Accepted pattern).",
      example: "npx shivanshu jobs",
    },
    {
      name: "mcp",
      desc: "Inspect Streamable HTTP Model Context Protocol endpoints, tool definitions, and discovery manifests.",
      example: "npx shivanshu mcp",
    },
    {
      name: "docs [path]",
      desc: "View curated LLM documentation index (llms.txt) or markdown twins directly in your terminal.",
      example: "npx shivanshu docs",
    },
    {
      name: "pricing",
      desc: "Inspect transparent zero-surprise service tiers, rate limits, and ACP delegate payment specifications.",
      example: "npx shivanshu pricing",
    },
    {
      name: "contact <name> <email> <msg>",
      desc: "Submit an inquiry or internship proposal with built-in idempotency protection.",
      example: 'npx shivanshu contact "Aria Agent" aria@example.com "Collaborating on voice AI"',
    },
  ];

  return (
    <div className="mx-auto max-w-4xl flex-1 px-4 py-16">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-mono text-accent mb-2">
          <Link href="/developers" className="hover:underline">Developers</Link>
          <span>/</span>
          <span>CLI</span>
        </div>
        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Shivanshu Tiwari CLI
        </h1>
        <p className="mt-3 text-base text-muted">
          Official command-line tool for developers and autonomous agents. Interact with 19 engineering projects, generate sandbox API keys, test asynchronous jobs, and query MCP configurations without leaving your terminal.
        </p>
      </div>

      {/* Quickstart / Installation */}
      <section className="mb-12 rounded-xl border border-border bg-surface p-6 shadow-sm">
        <h2 className="font-display text-lg font-semibold tracking-tight mb-4">Quickstart & Installation</h2>
        <div className="space-y-4">
          <div>
            <p className="text-xs font-mono uppercase text-muted mb-1.5">Run instantly via npx (Zero install):</p>
            <pre className="overflow-x-auto rounded-lg border border-border bg-background p-3.5 font-mono text-xs text-foreground">
              <code>npx shivanshu --help</code>
            </pre>
          </div>
          <div>
            <p className="text-xs font-mono uppercase text-muted mb-1.5">Global Installation (npm):</p>
            <pre className="overflow-x-auto rounded-lg border border-border bg-background p-3.5 font-mono text-xs text-foreground">
              <code>npm install -g sht-portfolio-v2
# Now available directly as:
shivanshu --version</code>
            </pre>
          </div>
        </div>
      </section>

      {/* Command Reference */}
      <section className="mb-12">
        <h2 className="font-display text-xl font-semibold tracking-tight mb-4">Command Reference</h2>
        <div className="space-y-3">
          {commands.map((cmd) => (
            <div key={cmd.name} className="rounded-lg border border-border bg-surface/50 p-4 transition-colors hover:border-accent/40">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <code className="font-mono text-sm font-semibold text-accent">shivanshu {cmd.name}</code>
              </div>
              <p className="mt-1 text-xs text-muted leading-relaxed">{cmd.desc}</p>
              <div className="mt-2.5">
                <pre className="overflow-x-auto rounded bg-background/80 px-2.5 py-1.5 font-mono text-[11px] text-muted-foreground border border-border/50">
                  <code>{cmd.example}</code>
                </pre>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Agent Scripting with --json */}
      <section className="mb-12 rounded-xl border border-border bg-surface p-6">
        <h2 className="font-display text-lg font-semibold tracking-tight mb-2">Agent Scripting & JSON Pipeline</h2>
        <p className="text-sm text-muted mb-4">
          All CLI commands support the <code className="text-accent font-mono">--json</code> flag, returning raw machine-readable JSON suitable for ingestion by AI agent loops, bash scripts, and CI/CD pipelines.
        </p>
        <pre className="overflow-x-auto rounded-lg border border-border bg-background p-4 font-mono text-xs text-foreground">
{`# Ingest projects directly into jq or python
npx shivanshu projects --json | jq '.data[] | {title, slug, stack}'

# Generate an ephemeral API key and export it
export API_KEY=$(npx shivanshu keys --json | jq -r '.apiKey')

# Check sandbox status
npx shivanshu sandbox --json`}
        </pre>
      </section>

      {/* Environment Variables */}
      <section className="mb-12">
        <h2 className="font-display text-lg font-semibold tracking-tight mb-3">Environment Configuration</h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface border-b border-border text-muted font-mono uppercase">
              <tr>
                <th className="p-3">Variable</th>
                <th className="p-3">Default</th>
                <th className="p-3">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="p-3 font-mono text-accent">SHIVANSHU_API_URL</td>
                <td className="p-3 font-mono">https://shivanshutiwari.in</td>
                <td className="p-3 text-muted">Override target API endpoint for local development or staging.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-accent">SHIVANSHU_API_KEY</td>
                <td className="p-3 font-mono">None (Anonymous)</td>
                <td className="p-3 text-muted">Optional bearer authentication token.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Navigation Footer */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6 text-sm">
        <Link href="/developers" className="text-accent hover:underline">
          &larr; Return to Developer Portal
        </Link>
        <Link href="/developers/sdk" className="text-accent hover:underline">
          Explore Multi-Language SDKs &rarr;
        </Link>
      </div>
    </div>
  );
}
