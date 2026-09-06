import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/constants";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { RevealOnScroll } from "@/components/animation/RevealOnScroll";

export const metadata: Metadata = {
  title: "Developer Documentation & API Docs — Shivanshu Tiwari",
  description:
    "My documentation hub: OpenAPI 3.0.3 spec, authentication guide, multi-language SDKs, CLI, dual MCP servers, and agent config files — free and machine-readable.",
  openGraph: {
    title: "Developer Documentation & API Docs — Shivanshu Tiwari",
    description:
      "Everything you need to integrate with my APIs, SDKs, CLI, and MCP servers — in one place.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Developer Documentation & API Docs — Shivanshu Tiwari",
    description: "Everything you need to integrate with my APIs, SDKs, CLI, and MCP servers.",
  },
  alternates: {
    canonical: `${SITE_URL}/docs`,
  },
  robots: "index, follow",
};

const docSections = [
  {
    heading: "Start Here",
    links: [
      {
        href: "/developers",
        label: "Developer Portal",
        note: "my full API quickstart, endpoint reference, and testing guide",
      },
      {
        href: "/llms.txt",
        label: "AI Agent Navigation Index (llms.txt)",
        note: "how I recommend agents navigate this site",
      },
      {
        href: "/search",
        label: "Site Search",
        note: "unified search across my projects and developer resources — also at /api/search?q=<query>",
      },
      {
        href: "/sitemap.xml",
        label: "Sitemap",
        note: "every indexable URL on this site",
      },
    ],
  },
  {
    heading: "API Reference",
    links: [
      {
        href: "/openapi.json",
        label: "OpenAPI 3.0.3 Spec (JSON)",
        note: "complete machine-readable schema for my REST endpoints",
      },
      {
        href: "/openapi.yaml",
        label: "OpenAPI 3.0.3 Spec (YAML)",
        note: "the same specification in YAML",
      },
      {
        href: "/auth.md",
        label: "Authentication Guide (auth.md)",
        note: "anonymous access plus self-serve ephemeral test keys",
      },
      {
        href: "/pricing.md",
        label: "Pricing & Service Tiers",
        note: "my tiers and rate limits — everything is currently free",
      },
      {
        href: "/developers/deprecation",
        label: "API Deprecation Policy",
        note: "my RFC 8594 Sunset header and 180-day notice commitments",
      },
    ],
  },
  {
    heading: "SDKs & CLI",
    links: [
      {
        href: "/developers/sdk",
        label: "Multi-Language SDKs",
        note: "my client libraries for TypeScript (npm: sht-portfolio-v2), Python (PyPI: shivanshu-sdk), Go, and Ruby (shivanshu-sdk)",
      },
      {
        href: "/developers/cli",
        label: "Dedicated CLI Tool",
        note: "runs with zero installation: npx shivanshu",
      },
    ],
  },
  {
    heading: "MCP Servers (Streamable HTTP)",
    links: [
      {
        href: "/mcp",
        label: "Product Actions MCP Server",
        note: "my tools for listing, fetching, and comparing projects, plus contact — server card at /.well-known/mcp/server-card.json",
      },
      {
        href: "/mcp/docs",
        label: "Documentation MCP Server",
        note: "my tools for searching and retrieving documentation — server card at /.well-known/mcp/docs/server-card.json",
      },
      {
        href: "https://smithery.ai/server/@SHT4BHARAT/shivanshutiwari",
        label: "MCP Registry Listings (Smithery / mcp.so)",
        note: "my Streamable HTTP servers published to external agent registries for discoverability",
      },
    ],
  },
  {
    heading: "Agent Resources",
    links: [
      {
        href: "/AGENTS.md",
        label: "AGENTS.md",
        note: "my coding-agent instructions and conventions",
      },
      {
        href: "/SKILL.md",
        label: "SKILL.md",
        note: "my agent skill definition — compatible with npx skills add",
      },
      {
        href: "/.cursorrules",
        label: ".cursorrules",
        note: "my Cursor IDE rules",
      },
      {
        href: "/.well-known/plugin.json",
        label: "Agent Plugin Manifest",
        note: "my Agent Plugins manifest (agent-plugins.org)",
      },
      {
        href: "/.well-known/api-catalog",
        label: "RFC 9727 API Catalog",
        note: "my linkset for API discovery",
      },
      {
        href: "/.well-known/ard.json",
        label: "Agentic Resource Discovery (ARD)",
        note: "my canonical resource catalog",
      },
    ],
  },
];

export default function DocsPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Developer Documentation", href: "/docs" },
        ]}
      />

      <div className="mx-auto max-w-3xl flex-1 px-4 py-20">
        <RevealOnScroll>
          <p className="font-mono text-xs text-muted">
            <span className="text-accent">[</span> {docSections.length} sections ·{" "}
            {docSections.reduce((n, s) => n + s.links.length, 0)} links{" "}
            <span className="text-accent">]</span>
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight">
            Shivanshu Tiwari — Developer Documentation &amp; API Docs
          </h1>
          <p className="mt-3 max-w-prose text-muted">
            I maintain this documentation so both humans and AI agents can integrate with my work
            without guessing. Everything below is free, versioned, and machine-readable — and every
            page on my site also serves markdown via{" "}
            <code className="font-mono text-xs">Accept: text/markdown</code> or a{" "}
            <code className="font-mono text-xs">.md</code> sibling URL.
          </p>
        </RevealOnScroll>

        <div className="mt-10 space-y-10">
          {docSections.map((section, i) => (
            <RevealOnScroll key={section.heading} index={i}>
              <section>
                <div className="flex items-baseline justify-between gap-4">
                  <h2 className="font-display text-lg font-semibold tracking-tight">
                    {section.heading}
                  </h2>
                  <span className="font-mono text-xs text-muted">
                    [ {String(section.links.length).padStart(2, "0")} ]
                  </span>
                </div>
                <ul className="mt-4 space-y-3">
                  {section.links.map((link) => (
                    <li key={link.href} className="rounded-lg border border-border bg-card p-4">
                      <Link
                        href={link.href}
                        className="font-mono text-sm font-medium text-accent transition-opacity hover:opacity-90"
                      >
                        {link.href}
                      </Link>
                      <p className="mt-1 text-sm text-foreground">{link.label}</p>
                      <p className="text-xs text-muted">{link.note}</p>
                    </li>
                  ))}
                </ul>
              </section>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </>
  );
}