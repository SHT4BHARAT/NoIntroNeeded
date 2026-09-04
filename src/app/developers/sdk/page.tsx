import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Multi-Language SDKs & CLI — Shivanshu Tiwari Developers",
  description:
    "Official SDK client libraries for TypeScript (NPM: sht-portfolio-v2) and Python (PyPI: shivanshu-sdk) to integrate with Shivanshu Tiwari portfolio APIs, projects, and autonomous agent evaluation.",
  alternates: {
    canonical: `${SITE_URL}/developers/sdk`,
    types: {
      "text/markdown": `${SITE_URL}/developers/sdk.md`,
    },
  },
};

export default function SdkPage() {
  return (
    <div className="mx-auto max-w-4xl flex-1 px-4 py-16">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-mono text-accent mb-2">
          <Link href="/developers" className="hover:underline">Developers</Link>
          <span>/</span>
          <span>SDKs</span>
        </div>
        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Multi-Language SDKs & CLI
        </h1>
        <p className="mt-2 text-sm text-muted">
          First-class, zero-dependency client libraries published on global package registries. Programmatically query 19 engineering projects, inspect system architectures, generate ephemeral sandbox keys, and dispatch asynchronous tasks.
        </p>

        {/* Live Registry Badges */}
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <a
            href="https://www.npmjs.com/package/sht-portfolio-v2"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-mono transition-colors hover:border-accent"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-muted">npm:</span>
            <strong className="text-foreground">sht-portfolio-v2@1.0.0</strong>
          </a>
          <a
            href="https://pypi.org/project/shivanshu-sdk/1.0.0/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-mono transition-colors hover:border-accent"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-muted">pypi:</span>
            <strong className="text-foreground">shivanshu-sdk==1.0.0</strong>
          </a>
          <Link
            href="/openapi.json"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-mono transition-colors hover:border-accent"
          >
            <span className="text-muted">spec:</span>
            <strong className="text-accent">OpenAPI 3.0.3</strong>
          </Link>
        </div>

        {/* Registry Notice */}
        <div className="mt-6 rounded-xl border border-border bg-surface p-4 text-xs text-muted">
          <div className="flex items-center gap-2 font-semibold text-foreground mb-1.5">
            <span className="inline-block h-2 w-2 rounded-full bg-accent animate-pulse" />
            Official Registry Distribution
          </div>
          <p className="leading-relaxed">
            Both packages are published to official registries with zero runtime dependencies. Developers and automated AI agents can install them directly without private repository authentication or git clone overhead.
          </p>
        </div>
      </div>

      {/* Package Matrix Overview */}
      <div className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-surface p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="font-display font-semibold text-foreground">TypeScript / Node</span>
            <span className="rounded bg-accent/10 px-2 py-0.5 font-mono text-[11px] text-accent">NPM Live</span>
          </div>
          <p className="text-xs text-muted mb-2">Strictly typed, isomorphic (Node.js & Edge Runtime), native fetch.</p>
          <pre className="overflow-x-auto rounded bg-background p-2.5 font-mono text-xs text-foreground border border-border">
            <code>npm install sht-portfolio-v2</code>
          </pre>
          <div className="mt-3 flex items-center justify-between text-[11px]">
            <a
              href="https://www.npmjs.com/package/sht-portfolio-v2"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              npmjs.com/package/sht-portfolio-v2 &rarr;
            </a>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-surface p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="font-display font-semibold text-foreground">Python</span>
            <span className="rounded bg-accent/10 px-2 py-0.5 font-mono text-[11px] text-accent">PyPI Live</span>
          </div>
          <p className="text-xs text-muted mb-2">Zero third-party dependencies, standard library only, Python 3.9+.</p>
          <pre className="overflow-x-auto rounded bg-background p-2.5 font-mono text-xs text-foreground border border-border">
            <code>pip install shivanshu-sdk</code>
          </pre>
          <div className="mt-3 flex items-center justify-between text-[11px]">
            <a
              href="https://pypi.org/project/shivanshu-sdk/1.0.0/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              pypi.org/project/shivanshu-sdk &rarr;
            </a>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-surface p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="font-display font-semibold text-foreground">Interactive CLI</span>
            <span className="rounded bg-accent/10 px-2 py-0.5 font-mono text-[11px] text-accent">Instant</span>
          </div>
          <p className="text-xs text-muted mb-2">Run directly via npx without manual installation or configuration.</p>
          <pre className="overflow-x-auto rounded bg-background p-2.5 font-mono text-xs text-foreground border border-border">
            <code>npx sht-portfolio-v2 projects</code>
          </pre>
          <div className="mt-3 flex items-center justify-between text-[11px]">
            <Link href="/developers/cli" className="text-accent hover:underline">
              CLI documentation &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* TypeScript Section */}
      <section id="typescript" className="mb-14 rounded-xl border border-border bg-surface p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl font-semibold tracking-tight">1. TypeScript & JavaScript SDK (`sht-portfolio-v2`)</h2>
          <a
            href="https://www.npmjs.com/package/sht-portfolio-v2"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-accent hover:underline"
          >
            NPM Package &rarr;
          </a>
        </div>
        <p className="text-sm text-muted mb-4">
          The TypeScript SDK provides full typings for all projects, endpoints, and error models. Compatible with Node.js, Next.js, Bun, and Deno.
        </p>

        <div className="space-y-4">
          <div>
            <p className="text-xs font-mono uppercase text-muted mb-1">Installation:</p>
            <pre className="overflow-x-auto rounded-lg border border-border bg-background p-3 font-mono text-xs text-foreground">
              <code>npm install sht-portfolio-v2</code>
            </pre>
          </div>

          <div>
            <p className="text-xs font-mono uppercase text-muted mb-1">Usage Example:</p>
            <pre className="overflow-x-auto rounded-lg border border-border bg-background p-4 font-mono text-xs text-foreground">
{`import { ShivanshuClient } from "sht-portfolio-v2";

const client = new ShivanshuClient();

async function run() {
  // 1. List AI Agent projects
  const { data: projects } = await client.projects.list({ domain: "ai-agents" });
  console.log("Projects:", projects.map((p) => p.title));

  // 2. Fetch specific project architecture
  const project = await client.projects.get("agentic-honey-pot");
  console.log("Architecture Summary:", project.architecture?.summary);

  // 3. Generate 24-hour test key
  const key = await client.keys.generate();
  console.log("Generated Key:", key.apiKey);

  // 4. Ping sandbox
  const sandbox = await client.sandbox.ping();
  console.log("Sandbox active:", sandbox.sandbox);
}

run().catch(console.error);`}
            </pre>
          </div>
        </div>
      </section>

      {/* Python Section */}
      <section id="python" className="mb-14 rounded-xl border border-border bg-surface p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl font-semibold tracking-tight">2. Python SDK (`shivanshu-sdk`)</h2>
          <a
            href="https://pypi.org/project/shivanshu-sdk/1.0.0/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-accent hover:underline"
          >
            PyPI Package &rarr;
          </a>
        </div>
        <p className="text-sm text-muted mb-4">
          Pure Python with zero third-party dependencies, built using standard library modules for immediate use in AI agent loops, LangChain, and evaluation scripts.
        </p>

        <div className="space-y-4">
          <div>
            <p className="text-xs font-mono uppercase text-muted mb-1">Installation:</p>
            <pre className="overflow-x-auto rounded-lg border border-border bg-background p-3 font-mono text-xs text-foreground">
              <code>pip install shivanshu-sdk</code>
            </pre>
          </div>

          <div>
            <p className="text-xs font-mono uppercase text-muted mb-1">Usage Example:</p>
            <pre className="overflow-x-auto rounded-lg border border-border bg-background p-4 font-mono text-xs text-foreground">
{`from shivanshu import ShivanshuClient

client = ShivanshuClient()

# 1. Query projects
res = client.list_projects(domain="ai-agents")
print("Found projects:", [p["title"] for p in res["data"]])

# 2. Get detailed architecture
proj = client.get_project("agentic-honey-pot")
print("Stack:", proj.get("stack"))
print("Architecture:", proj.get("architecture", {}).get("summary"))

# 3. Test sandbox ping
sandbox = client.ping_sandbox()
print("Sandbox status:", sandbox["sandbox"])

# 4. Generate ephemeral key
key_data = client.generate_key()
print("API Key:", key_data["apiKey"])`}
            </pre>
          </div>
        </div>
      </section>

      {/* Go / REST Section */}
      <section id="go" className="mb-14 rounded-xl border border-border bg-surface p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl font-semibold tracking-tight">3. Go & Direct REST API</h2>
          <Link
            href="/openapi.json"
            className="font-mono text-xs text-accent hover:underline"
          >
            OpenAPI Spec &rarr;
          </Link>
        </div>
        <p className="text-sm text-muted mb-4">
          Standard HTTP integration using Go standard library primitives or any OpenAPI-compatible client generator.
        </p>

        <div className="space-y-4">
          <div>
            <p className="text-xs font-mono uppercase text-muted mb-1">Usage Example (Go):</p>
            <pre className="overflow-x-auto rounded-lg border border-border bg-background p-4 font-mono text-xs text-foreground">
{`package main

import (
	"fmt"
	"io"
	"log"
	"net/http"
)

func main() {
	resp, err := http.Get("https://shivanshutiwari.in/api/v1/projects?domain=ai-agents")
	if err != nil {
		log.Fatal(err)
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Projects:", string(body))
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* Navigation Footer */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6 text-sm">
        <Link href="/developers" className="text-accent hover:underline">
          &larr; Return to Developer Portal
        </Link>
        <Link href="/developers/cli" className="text-accent hover:underline">
          View Dedicated CLI Tool Guide &rarr;
        </Link>
      </div>
    </div>
  );
}
