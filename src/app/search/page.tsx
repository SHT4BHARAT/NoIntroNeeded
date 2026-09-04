import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/constants";
import { searchSite } from "@/lib/search";

export const metadata: Metadata = {
  title: "Search — Shivanshu Tiwari",
  description:
    "Search Shivanshu Tiwari portfolio — find developer resources, multi-language SDKs, dedicated CLI tool, OpenAPI specs, engineering projects, and blog posts.",
  alternates: {
    canonical: `${SITE_URL}/search`,
    types: {
      "text/markdown": `${SITE_URL}/search.md`,
    },
  },
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; query?: string }>;
}) {
  const resolvedParams = await searchParams;
  const q = resolvedParams.q ?? resolvedParams.query ?? "";
  const results = searchSite(q);

  return (
    <div className="mx-auto max-w-4xl flex-1 px-4 py-16">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Site Search
        </h1>
        <p className="mt-2 text-sm text-muted">
          Search developer documentation, APIs, SDKs, CLI tools, 19 engineering projects, and technical writeups.
        </p>

        {/* Search Form */}
        <form action="/search" method="GET" className="mt-6 flex gap-2">
          <input
            type="search"
            name="q"
            defaultValue={q}
            placeholder="Search developers, SDKs, CLI, APIs, projects (e.g. Gemini, FastAPI)..."
            className="flex-1 rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
          />
          <button
            type="submit"
            className="rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-background transition-colors hover:bg-accent/90"
          >
            Search
          </button>
        </form>
      </div>

      {q && (
        <div className="mb-6 flex items-center justify-between text-xs text-muted font-mono">
          <span>Results for &ldquo;{q}&rdquo;</span>
          <span>{results.total} match{results.total === 1 ? "" : "es"} found</span>
        </div>
      )}

      {/* 1. Developer Resources Section */}
      {results.developerResources.length > 0 && (
        <section className="mb-12">
          <div className="flex items-center justify-between border-b border-border pb-2.5 mb-4">
            <h2 className="font-display text-lg font-semibold tracking-tight text-foreground flex items-center gap-2">
              <span>Developer Resources & Documentation</span>
              <span className="rounded bg-accent/10 px-2 py-0.5 font-mono text-xs text-accent">
                {results.developerResources.length}
              </span>
            </h2>
            <Link href="/developers.md" className="font-mono text-xs text-muted hover:text-accent">
              developers.md &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {results.developerResources.map((item) => (
              <div
                key={item.url}
                className="group rounded-xl border border-border bg-surface p-5 transition-all hover:border-accent/40 hover:shadow-sm"
              >
                <div className="flex items-baseline justify-between gap-2 mb-1.5">
                  <Link
                    href={item.url}
                    className="font-display text-base font-semibold text-foreground group-hover:text-accent"
                  >
                    {item.title}
                  </Link>
                </div>
                <p className="text-xs text-muted leading-relaxed mb-3">{item.description}</p>
                <div className="flex items-center gap-3 text-[11px] font-mono">
                  <Link href={item.url} className="text-accent hover:underline">
                    View Page &rarr;
                  </Link>
                  {item.markdownUrl && (
                    <Link href={item.markdownUrl} className="text-muted hover:text-foreground">
                      Markdown (.md)
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 2. Engineering Projects Section */}
      {results.projects.length > 0 && (
        <section className="mb-12">
          <div className="flex items-center justify-between border-b border-border pb-2.5 mb-4">
            <h2 className="font-display text-lg font-semibold tracking-tight text-foreground flex items-center gap-2">
              <span>Engineering Projects</span>
              <span className="rounded bg-surface px-2 py-0.5 font-mono text-xs text-muted">
                {results.projects.length}
              </span>
            </h2>
            <Link href="/#projects" className="font-mono text-xs text-muted hover:text-accent">
              all projects &rarr;
            </Link>
          </div>

          <div className="space-y-3">
            {results.projects.map((p) => (
              <div
                key={p.url}
                className="rounded-lg border border-border bg-surface/50 p-4 transition-colors hover:border-accent/30"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <Link href={p.url} className="font-display text-sm font-semibold text-foreground hover:text-accent">
                    {p.title}
                  </Link>
                  <span className="font-mono text-[11px] text-muted-foreground">{p.tags.slice(0, 4).join(", ")}</span>
                </div>
                <p className="mt-1 text-xs text-muted leading-relaxed">{p.description}</p>
                <div className="mt-2 flex items-center gap-3 text-[11px] font-mono text-accent">
                  <Link href={p.url} className="hover:underline">Case study &rarr;</Link>
                  <Link href={p.markdownUrl} className="text-muted hover:text-foreground">Markdown twin</Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 3. Blog Posts Section */}
      {results.blogPosts.length > 0 && (
        <section className="mb-12">
          <div className="flex items-center justify-between border-b border-border pb-2.5 mb-4">
            <h2 className="font-display text-lg font-semibold tracking-tight text-foreground flex items-center gap-2">
              <span>Technical Blog Posts</span>
              <span className="rounded bg-surface px-2 py-0.5 font-mono text-xs text-muted">
                {results.blogPosts.length}
              </span>
            </h2>
            <Link href="/blog" className="font-mono text-xs text-muted hover:text-accent">
              all posts &rarr;
            </Link>
          </div>

          <div className="space-y-3">
            {results.blogPosts.map((post) => (
              <div
                key={post.url}
                className="rounded-lg border border-border bg-surface/50 p-4 transition-colors hover:border-accent/30"
              >
                <Link href={post.url} className="font-display text-sm font-semibold text-foreground hover:text-accent">
                  {post.title}
                </Link>
                <p className="mt-1 text-xs text-muted leading-relaxed">{post.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Footer Navigation */}
      <div className="border-t border-border pt-6 flex items-center justify-between text-xs text-muted">
        <Link href="/developers" className="text-accent hover:underline">
          &larr; Developer Portal
        </Link>
        <Link href="/llms.txt" className="hover:underline">
          AI Agent Index (llms.txt)
        </Link>
      </div>
    </div>
  );
}
