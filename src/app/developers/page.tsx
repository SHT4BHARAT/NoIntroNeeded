import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Developers — Shivanshu Tiwari",
  description:
    "Developer portal for shivanshutiwari.in — official multi-language SDKs (TypeScript, Python, Go), dedicated CLI tool, OpenAPI 3.0.3, Model Context Protocol (MCP), and sandbox testing.",
  alternates: {
    canonical: `${SITE_URL}/developers`,
    types: {
      "text/markdown": `${SITE_URL}/developers.md`,
    },
  },
};

export default function DevelopersPage() {
  return (
    <div className="mx-auto max-w-4xl flex-1 px-4 py-16">
      <div className="mb-10">
        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Shivanshu Tiwari Developers</h1>
        <p className="mt-3 text-base text-muted">
          Developer portal for <strong className="text-foreground">Shivanshu Tiwari</strong> — programmatic access to 19 engineering projects, AI agent evaluations, and real-time backend systems. Features official multi-language SDKs, a dedicated CLI tool, OpenAPI 3.0.3 specifications, and Dual Streamable HTTP MCP servers.
        </p>

        {/* Developer Search Bar */}
        <form action="/search" method="GET" className="mt-6 flex max-w-xl gap-2">
          <input
            type="search"
            name="q"
            placeholder="Search APIs, SDKs, CLI commands, endpoints, or projects..."
            className="flex-1 rounded-lg border border-border bg-surface px-4 py-2 text-sm text-foreground placeholder:text-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
          />
          <button
            type="submit"
            className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-accent/90"
          >
            Search Docs
          </button>
        </form>
      </div>

      {/* Featured Cards: SDK & CLI */}
      <div className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Link
          href="/developers/cli"
          className="group rounded-xl border border-border bg-surface p-6 transition-all hover:border-accent/50 hover:shadow-md"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="font-display text-lg font-semibold text-foreground group-hover:text-accent">
              Dedicated CLI Tool
            </span>
            <span className="rounded bg-accent/10 px-2 py-0.5 font-mono text-xs text-accent">npx shivanshu</span>
          </div>
          <p className="text-sm text-muted mb-4">
            Interactive command-line tool for quick testing, project comparison, sandbox verification, and scripting with <code className="text-accent">--json</code>.
          </p>
          <div className="font-mono text-xs text-accent flex items-center gap-1">
            Explore CLI commands &rarr;
          </div>
        </Link>

        <Link
          href="/developers/sdk"
          className="group rounded-xl border border-border bg-surface p-6 transition-all hover:border-accent/50 hover:shadow-md"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="font-display text-lg font-semibold text-foreground group-hover:text-accent">
              Multi-Language SDKs
            </span>
            <span className="rounded bg-accent/10 px-2 py-0.5 font-mono text-xs text-accent">NPM & PyPI Live</span>
          </div>
          <p className="text-sm text-muted mb-4">
            Official client packages for TypeScript (<code className="text-accent">npm i sht-portfolio-v2</code>) and Python (<code className="text-accent">pip install shivanshu-sdk</code>). Zero external dependencies.
          </p>
          <div className="font-mono text-xs text-accent flex items-center gap-1">
            View SDK documentation &rarr;
          </div>
        </Link>
      </div>

      {/* Quickstart Code */}
      <section className="mb-10">
        <h2 className="font-display mb-3 text-sm font-semibold uppercase tracking-widest text-muted">Quickstart</h2>
        <pre className="overflow-x-auto rounded-lg border border-border bg-surface p-4 font-mono text-xs text-foreground">
{`# 1. Interactive CLI (Zero installation required)
npx sht-portfolio-v2 projects
npx sht-portfolio-v2 ping

# 2. Multi-Language SDKs (Official Public Registries)
npm install sht-portfolio-v2                       # TypeScript & JavaScript (NPM)
pip install shivanshu-sdk                          # Python 3.9+ (PyPI)

# 3. Direct HTTP API, Search, and Markdown Twins
curl -s https://shivanshutiwari.in/api/search?q=developer
curl -s https://shivanshutiwari.in/llms.txt
curl -s https://shivanshutiwari.in/api/v1/projects
curl -H "Accept: text/markdown" https://shivanshutiwari.in/developers`}
        </pre>
      </section>

      {/* Endpoints */}
      <section className="mb-10">
        <h2 className="font-display mb-3 text-sm font-semibold uppercase tracking-widest text-muted">Core Endpoints</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm text-muted">
          <li><code>GET /api/search?q=:query</code> — Search developer resources, APIs, SDKs, CLI tools, 19 projects, and posts</li>
          <li><code>GET /api/v1/projects</code> — List 19 projects (supports cursor pagination & <code>domain</code> filter)</li>
          <li><code>GET /api/v1/projects/:slug</code> — Detailed project architecture, decisions, and outcomes</li>
          <li><code>POST /api/v1/batch</code> — Execute multiple operations atomically</li>
          <li><code>POST /api/v1/jobs</code> — Asynchronous background task execution (HTTP 202 Accepted)</li>
          <li><code>GET /api/v1/jobs/:jobId</code> — Poll status and results for async tasks</li>
          <li><code>POST /api/v1/keys</code> — Generate ephemeral 24-hour sandbox API key</li>
          <li><code>GET /api/v1/sandbox/ping</code> — Verify sandbox test environment connectivity</li>
          <li><code>POST /api/v1/contact</code> — Idempotent message submission (<code>Idempotency-Key</code>)</li>
        </ul>
      </section>

      {/* Dual MCP Servers */}
      <section className="mb-10">
        <h2 className="font-display mb-3 text-sm font-semibold uppercase tracking-widest text-muted">Model Context Protocol (MCP)</h2>
        <p className="text-sm text-muted mb-3">
          Dual Streamable HTTP servers for LLMs and agentic IDEs (Cursor, Windsurf, Claude Desktop):
        </p>
        <ul className="list-disc space-y-2 pl-5 text-sm text-muted">
          <li>
            <strong>Product Actions MCP:</strong> <code>POST https://shivanshutiwari.in/mcp</code> (Card: <Link href="/.well-known/mcp/server-card.json" className="text-accent hover:underline">server-card.json</Link>)
          </li>
          <li>
            <strong>Documentation MCP:</strong> <code>POST https://shivanshutiwari.in/mcp/docs</code> (Card: <Link href="/.well-known/mcp/docs/server-card.json" className="text-accent hover:underline">docs server-card.json</Link>)
          </li>
        </ul>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted">
          <span>Official Distribution:</span>
          <a href="https://www.npmjs.com/package/sht-portfolio-v2" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">NPM Package (sht-portfolio-v2)</a>
          <span>•</span>
          <Link href="/mcp" className="text-accent hover:underline">Product MCP (/mcp)</Link>
          <span>•</span>
          <Link href="/mcp/docs" className="text-accent hover:underline">Docs MCP (/mcp/docs)</Link>
        </div>
      </section>

      {/* Auth & Pricing */}
      <section className="mb-10">
        <h2 className="font-display mb-3 text-sm font-semibold uppercase tracking-widest text-muted">Authentication & Pricing</h2>
        <p className="text-sm text-muted leading-relaxed">
          Public read-only operations require no API keys or bearer tokens. See <Link href="/auth.md" className="text-accent hover:underline">/auth.md</Link> for identity assertions. For service tiers, rate limits, and ACP delegate payments, see <Link href="/pricing" className="text-accent hover:underline">/pricing</Link> (or <Link href="/pricing.md" className="text-accent hover:underline">/pricing.md</Link>).
        </p>
      </section>

      {/* Discovery */}
      <section className="mb-10">
        <h2 className="font-display mb-3 text-sm font-semibold uppercase tracking-widest text-muted">Discovery & Standards</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm text-muted">
          <li><Link href="/llms.txt" className="text-accent hover:underline">llms.txt</Link> — Curated agent guidance index</li>
          <li><Link href="/sitemap.xml" className="text-accent hover:underline">sitemap.xml</Link> — Complete URL index</li>
          <li><Link href="/openapi.json" className="text-accent hover:underline">openapi.json</Link> & <Link href="/openapi.yaml" className="text-accent hover:underline">openapi.yaml</Link> — OpenAPI 3.0.3 specifications</li>
          <li><Link href="/.well-known/api-catalog" className="text-accent hover:underline">/.well-known/api-catalog</Link> — RFC 9727 linkset</li>
          <li><Link href="/developers/deprecation" className="text-accent hover:underline">/developers/deprecation</Link> — RFC 8594 Sunset policy</li>
        </ul>
      </section>

      <p className="border-t border-border pt-6 text-xs text-muted-foreground">
        Source: {SITE_URL}. All markdown twins reuse <code>src/lib/projects/config.ts</code> and MDX — single source of truth.
      </p>
    </div>
  );
}
