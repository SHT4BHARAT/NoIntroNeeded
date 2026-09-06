import Link from "next/link";
import { SITE_NAME, SOCIAL } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/40 backdrop-blur-xs">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-12 pb-32">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          {/* Brand & Search Column */}
          <div className="md:col-span-5 space-y-4">
            <div>
              <Link
                href="/"
                className="font-mono text-base font-bold tracking-tight text-foreground hover:text-accent transition-colors"
              >
                {SITE_NAME}
              </Link>
              <p className="mt-1 text-xs text-muted max-w-sm leading-relaxed">
                AI Agent &amp; Backend Systems Developer — building autonomous agents, RL benchmarking pipelines, and developer-first APIs.
              </p>
            </div>

            {/* Site Search Bar */}
            <form
              action="/search"
              method="GET"
              role="search"
              toolname="search_site"
              tooldescription="Search Shivanshu Tiwari portfolio, developer documentation, APIs, SDKs, CLI, and projects"
              className="flex items-center gap-2 max-w-sm pt-1"
            >
              <label htmlFor="footer-site-search" className="sr-only">
                Search site
              </label>
              <input
                id="footer-site-search"
                type="search"
                name="q"
                toolparam="q"
                placeholder="Search projects, APIs, SDKs, docs..."
                className="flex-1 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs text-foreground placeholder:text-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
              />
              <button
                type="submit"
                className="rounded-lg bg-surface px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-surface-hover border border-border"
              >
                Search
              </button>
            </form>

            <div className="flex items-center gap-2 text-[11px] font-mono text-muted pt-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span>LLM-Ready • RFC 8288 • MCP Enabled</span>
            </div>
          </div>

          {/* Navigation Links Columns */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-6">
            {/* Core Navigation */}
            <div className="space-y-3">
              <p className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground">
                Navigation
              </p>
              <ul className="space-y-2 text-xs text-muted">
                <li>
                  <Link href="/about" className="hover:text-foreground transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/projects" className="hover:text-foreground transition-colors">
                    Projects
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-foreground transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/search" className="hover:text-foreground transition-colors">
                    Search
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-foreground transition-colors">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Developer / AI */}
            <div className="space-y-3">
              <p className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground">
                Developer / AI
              </p>
              <ul className="space-y-2 text-xs text-muted">
                <li>
                  <Link href="/developers" className="hover:text-foreground transition-colors">
                    API Docs
                  </Link>
                </li>
                <li>
                  <Link href="/developers/sdk" className="hover:text-foreground transition-colors">
                    SDKs &amp; CLI
                  </Link>
                </li>
                <li>
                  <Link href="/docs" className="hover:text-foreground transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/AGENTS.md" className="hover:text-foreground transition-colors font-mono">
                    AGENTS.md
                  </Link>
                </li>
                <li>
                  <Link href="/SKILL.md" className="hover:text-foreground transition-colors font-mono">
                    SKILL.md
                  </Link>
                </li>
              </ul>
            </div>

            {/* Ecosystem & Social */}
            <div className="space-y-3 col-span-2 sm:col-span-1">
              <p className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground">
                Ecosystem
              </p>
              <ul className="space-y-2 text-xs text-muted">
                <li>
                  <Link
                    href={SOCIAL.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors"
                  >
                    GitHub
                  </Link>
                </li>
                <li>
                  <Link
                    href={SOCIAL.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors"
                  >
                    LinkedIn
                  </Link>
                </li>
                <li>
                  <a href={SOCIAL.email} className="hover:text-foreground transition-colors">
                    Email
                  </a>
                </li>
                <li>
                  <a
                    href="https://smithery.ai/server/@SHT4BHARAT/shivanshutiwari"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors"
                  >
                    Smithery Registry
                  </a>
                </li>
                <li>
                  <a
                    href="https://mcp.so/server/shivanshutiwari-product-server"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors"
                  >
                    mcp.so Registry
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Divider Bar */}
        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted font-mono">
          <p>
            &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-[11px] text-muted-foreground">
            <span>
              Content negotiation: <code>Accept: text/markdown</code>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
