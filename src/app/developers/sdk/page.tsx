import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Multi-Language SDKs — Shivanshu Tiwari Developers",
  description:
    "Official SDK client libraries for TypeScript, Python, and Go to integrate with Shivanshu Tiwari portfolio APIs, projects, and autonomous agent evaluation.",
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
          Multi-Language SDKs
        </h1>
        <p className="mt-3 text-base text-muted">
          First-class, zero-dependency client libraries for TypeScript, Python, and Go. Programmatically query 19 engineering projects, inspect system architectures, generate ephemeral sandbox keys, and dispatch asynchronous tasks.
        </p>
      </div>

      {/* Package Matrix Overview */}
      <div className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-surface p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="font-display font-semibold text-foreground">TypeScript / Node</span>
            <span className="rounded bg-accent/10 px-2 py-0.5 font-mono text-[11px] text-accent">v1.0.0</span>
          </div>
          <p className="text-xs text-muted mb-4">Strictly typed, isomorphic (Node.js & Edge Runtime), native fetch.</p>
          <pre className="overflow-x-auto rounded bg-background p-2.5 font-mono text-xs text-foreground border border-border">
            <code>npm i sht-portfolio-v2</code>
          </pre>
        </div>

        <div className="rounded-xl border border-border bg-surface p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="font-display font-semibold text-foreground">Python</span>
            <span className="rounded bg-accent/10 px-2 py-0.5 font-mono text-[11px] text-accent">v1.0.0</span>
          </div>
          <p className="text-xs text-muted mb-4">Zero third-party dependencies, standard library only, Python 3.9+.</p>
          <pre className="overflow-x-auto rounded bg-background p-2.5 font-mono text-xs text-foreground border border-border">
            <code>pip install shivanshu-sdk</code>
          </pre>
        </div>

        <div className="rounded-xl border border-border bg-surface p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="font-display font-semibold text-foreground">Go</span>
            <span className="rounded bg-accent/10 px-2 py-0.5 font-mono text-[11px] text-accent">v1.0.0</span>
          </div>
          <p className="text-xs text-muted mb-4">Idiomatic Go structs, context-aware requests, zero external deps.</p>
          <pre className="overflow-x-auto rounded bg-background p-2.5 font-mono text-xs text-foreground border border-border">
            <code>go get .../sdk/go</code>
          </pre>
        </div>
      </div>

      {/* TypeScript Section */}
      <section id="typescript" className="mb-14 rounded-xl border border-border bg-surface p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl font-semibold tracking-tight">1. TypeScript & JavaScript SDK</h2>
          <a
            href="https://github.com/SHT4BHARAT/NoIntroNeeded/tree/main/sdk/typescript"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-accent hover:underline"
          >
            GitHub Source &rarr;
          </a>
        </div>
        <p className="text-sm text-muted mb-4">
          The TypeScript SDK provides full typings for all projects, endpoints, and error models. Compatible with Node.js, Next.js, Bun, and Deno.
        </p>

        <div className="space-y-4">
          <div>
            <p className="text-xs font-mono uppercase text-muted mb-1">Install:</p>
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
            href="https://github.com/SHT4BHARAT/NoIntroNeeded/tree/main/sdk/python"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-accent hover:underline"
          >
            GitHub Source &rarr;
          </a>
        </div>
        <p className="text-sm text-muted mb-4">
          Pure Python with zero third-party dependencies, built using standard library modules for immediate use in AI agent loops, LangChain, and evaluation scripts.
        </p>

        <div className="space-y-4">
          <div>
            <p className="text-xs font-mono uppercase text-muted mb-1">Install:</p>
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

      {/* Go Section */}
      <section id="go" className="mb-14 rounded-xl border border-border bg-surface p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl font-semibold tracking-tight">3. Go SDK</h2>
          <a
            href="https://github.com/SHT4BHARAT/NoIntroNeeded/tree/main/sdk/go"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-accent hover:underline"
          >
            GitHub Source &rarr;
          </a>
        </div>
        <p className="text-sm text-muted mb-4">
          Standard Go module using standard library HTTP primitives and context cancellation.
        </p>

        <div className="space-y-4">
          <div>
            <p className="text-xs font-mono uppercase text-muted mb-1">Install:</p>
            <pre className="overflow-x-auto rounded-lg border border-border bg-background p-3 font-mono text-xs text-foreground">
              <code>go get github.com/SHT4BHARAT/NoIntroNeeded/sdk/go</code>
            </pre>
          </div>

          <div>
            <p className="text-xs font-mono uppercase text-muted mb-1">Usage Example:</p>
            <pre className="overflow-x-auto rounded-lg border border-border bg-background p-4 font-mono text-xs text-foreground">
{`package main

import (
	"context"
	"fmt"
	"log"

	"github.com/SHT4BHARAT/NoIntroNeeded/sdk/go"
)

func main() {
	ctx := context.Background()
	client := shivanshu.NewClient()

	// 1. List projects
	projects, err := client.ListProjects(ctx, "ai-agents", 10, "")
	if err != nil {
		log.Fatal(err)
	}
	for _, p := range projects.Data {
		fmt.Printf("Project: %s (%s)\\n", p.Title, p.Slug)
	}

	// 2. Ping sandbox
	status, err := client.PingSandbox(ctx)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("Sandbox: %v\\n", status.Sandbox)
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
