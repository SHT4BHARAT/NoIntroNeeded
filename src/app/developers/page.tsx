import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Developers — Shivanshu Tiwari",
  description:
    "Developer portal for shivanshutiwari.in — API catalog, markdown alternates, sitemap, agent skills, MCP, and sandbox-free read-only access.",
  alternates: { canonical: `${SITE_URL}/developers` },
};

export default function DevelopersPage() {
  return (
    <div className="mx-auto max-w-3xl flex-1 px-4 py-20">
      <h1 className="font-display mb-2 text-3xl font-bold tracking-tight">Developers</h1>
      <p className="mb-8 text-muted">
        Read-only developer surface for agents and scripts. No API keys, no sandbox needed — everything is public over HTTPS.
      </p>

      <section className="mb-10">
        <h2 className="font-display mb-3 text-sm font-semibold uppercase tracking-widest text-muted">Quickstart</h2>
        <pre className="overflow-x-auto rounded-lg border border-border bg-surface p-4 font-mono text-xs">
{`# Entry points agents actually use
curl -s https://shivanshutiwari.in/llms.txt
curl -s https://shivanshutiwari.in/sitemap.xml
curl -H "Accept: text/markdown" https://shivanshutiwari.in/about
# Or via alternate twin
curl -s https://shivanshutiwari.in/about.md`}
        </pre>
      </section>

      <section className="mb-10">
        <h2 className="font-display mb-3 text-sm font-semibold uppercase tracking-widest text-muted">Endpoints</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm text-muted">
          <li><code>GET /sitemap.xml</code> — 30+ URLs (projects, blog, pages)</li>
          <li><code>GET /llms.txt</code> + per-section <code>/about/llms.txt</code> style via <code>/api/markdown/...</code></li>
          <li><code>GET /feed.xml</code> — Atom feed for blog</li>
          <li><code>Accept: text/markdown</code> or <code>?mode=agent</code> on any page → markdown twin with frontmatter</li>
          <li><code>GET /.well-known/agent-skills/index.json</code>, <code>/.well-known/agent-card.json</code>, <code>/.well-known/mcp/server-card.json</code>, <code>/.well-known/api-catalog</code>, <code>/.well-known/ard.json</code></li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="font-display mb-3 text-sm font-semibold uppercase tracking-widest text-muted">Auth</h2>
        <p className="text-sm text-muted">
          Public read-only. No bearer token, no OAuth. See <Link href="/auth.md" className="text-accent hover:underline">/auth.md</Link> and{" "}
          <code>/.well-known/oauth-protected-resource</code> which advertises <code>anonymous</code> access.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="font-display mb-3 text-sm font-semibold uppercase tracking-widest text-muted">Sandbox</h2>
        <p className="text-sm text-muted">
          Test without touching production: <code>GET /api/v1/sandbox/ping?sandbox=true</code> returns <code>{"{"}pong:true, sandbox:true{"}"}</code> with <code>X-Sandbox: true</code>. Docs MCP at <code>/mcp/docs</code> is read-only and safe to crawl.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="font-display mb-3 text-sm font-semibold uppercase tracking-widest text-muted">Discovery</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm text-muted">
          <li><Link href="/llms.txt" className="text-accent hover:underline">llms.txt</Link> lists curated links</li>
          <li><Link href="/sitemap.xml" className="text-accent hover:underline">sitemap.xml</Link> for exhaustive crawl</li>
          <li><code>Link</code> headers advertise sitemap + markdown alternate + api-catalog (RFC 8288)</li>
          <li>AGENTS.md at <a href="https://github.com/SHT4BHARAT/NoIntroNeeded/blob/main/AGENTS.md" className="text-accent hover:underline">repo</a> + SKILL.md / plugin.json</li>
        </ul>
      </section>

      <p className="text-xs text-muted-foreground">
        Source: {SITE_URL}. All markdown twins reuse <code>src/lib/projects/config.ts</code> and MDX — single source of truth.
      </p>
    </div>
  );
}
