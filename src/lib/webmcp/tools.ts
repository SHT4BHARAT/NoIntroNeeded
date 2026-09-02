/**
 * WebMCP tool definitions for shivanshutiwari.in.
 *
 * Design constraints (see spec — WebMCP Implementation Spec):
 * - Read-only, full stop. Every tool returns information; nothing writes, sends, or submits.
 * - Reuses the site's existing single sources of truth:
 *     • projects  → `@/lib/projects/config` (same data the pages and .md twins render)
 *     • blog      → the `/blog.md` markdown twin (generated from the same MDX data layer;
 *                   `src/lib/blog` uses `fs`, which cannot run in a browser client component)
 *     • contact   → `@/lib/constants` SOCIAL (canonical NAP)
 * - Case-study fields (`problem`, `whatIBuilt`, `keyDecisions`, `architecture`) are
 *   deliberately NOT surfaced: Agentic Honeypot's case study documents example
 *   scam-baiting dialogue (e.g. "could you send me that UPI ID again?") which a
 *   consuming agent could misread as instruction rather than documentation (§0.4).
 *   Only curated, descriptive fields flow through tool output; a regression test
 *   asserts the attack phrasing never appears.
 *
 * This module is browser-safe: no React, no Node built-ins. Unit-tested in
 * `src/lib/webmcp/tools.test.ts` independently of the browser API.
 */

import { SITE_NAME, SITE_URL, SOCIAL } from "@/lib/constants";
import { projects } from "@/lib/projects/config";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** MCP tool-result shape expected by WebMCP `execute` callbacks. */
export interface ToolResult {
  content: Array<{ type: "text"; text: string }>;
}

export interface WebMCPToolArgs {
  query?: string;
}

export interface WebMCPToolExecuteOptions {
  /** AbortSignal from the agent / registration — propagated to any fetch. */
  signal?: AbortSignal;
}

export interface WebMCPToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: "object";
    properties: Record<string, { type: "string"; description: string }>;
    required?: string[];
  };
  annotations: {
    readOnlyHint: true;
    /** Marks tool output as content the agent should not blindly trust. */
    untrustedContentHint?: boolean;
  };
  execute: (
    args: WebMCPToolArgs,
    options?: WebMCPToolExecuteOptions
  ) => Promise<ToolResult>;
}

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

function requireQuery(args: WebMCPToolArgs): string | null {
  const query = (args.query ?? "").trim();
  return query.length === 0 ? null : query;
}

function emptyQueryResult(paramDescription: string): ToolResult {
  return formatToolText(
    `The "query" parameter is required and must be non-empty. ${paramDescription}`
  );
}

/** Tokenizes a query into lowercase search terms. */
function tokenize(query: string): string[] {
  return query
    .toLowerCase()
    .split(/[^a-z0-9+#.]+/)
    .filter((t) => t.length > 1);
}

/** Wraps plain text into the standard MCP text-content tool result. */
export function formatToolText(text: string): ToolResult {
  return { content: [{ type: "text", text }] };
}

// ---------------------------------------------------------------------------
// Contact (fixed, zero-argument lookup — canonical NAP from lib/constants)
// ---------------------------------------------------------------------------

export interface ContactInfo {
  name: string;
  email: string;
  github: string;
  linkedin: string;
  contactForm: string;
  note: string;
}

export function getContactInfo(): ContactInfo {
  return {
    name: SITE_NAME,
    email: SOCIAL.email.replace("mailto:", ""),
    github: SOCIAL.github,
    linkedin: SOCIAL.linkedin,
    contactForm: `${SITE_URL}/contact`,
    note: "This tool only returns contact details — it cannot send messages on anyone's behalf.",
  };
}

// ---------------------------------------------------------------------------
// Projects (searches the same `projects` config the pages and .md twins use)
// ---------------------------------------------------------------------------

export interface ProjectMatch {
  title: string;
  slug: string;
  url: string;
  pitch: string;
  stack: string[];
  date: string;
  repository?: string;
  demo?: string;
}

export function searchProjects(query: string, limit = 10): ProjectMatch[] {
  const tokens = tokenize(query);
  if (tokens.length === 0) return [];

  const scored = projects
    .map((p) => {
      const title = p.title.toLowerCase();
      const tagline = (p.tagline ?? "").toLowerCase();
      const description = p.description.toLowerCase();
      const stack = p.stack.join(" ").toLowerCase();
      const slug = p.slug.toLowerCase();
      let score = 0;
      for (const t of tokens) {
        if (title.includes(t)) score += 4;
        if (stack.includes(t)) score += 3;
        if (tagline.includes(t)) score += 2;
        if (description.includes(t)) score += 2;
        if (slug.includes(t)) score += 1;
      }
      return { p, score };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map(({ p }) => ({
    title: p.title,
    slug: p.slug,
    url: `${SITE_URL}/projects/${p.slug}`,
    pitch: p.description,
    stack: [...p.stack],
    date: p.date,
    ...(p.repoUrl ? { repository: p.repoUrl } : {}),
    ...(p.demoUrl ? { demo: p.demoUrl } : {}),
  }));
}

export function formatProjectsForAgent(matches: ProjectMatch[]): string {
  if (matches.length === 0) {
    return "No projects matched this search. Try a technology (e.g. \"FastAPI\", \"Gemini\", \"reinforcement learning\"), a project name (e.g. \"Samvad\", \"DAITFO\"), or a problem domain (e.g. \"scam detection\", \"meetings\").";
  }
  const lines = matches.map(
    (m) =>
      `- ${m.title} (${m.date})\n` +
      `  URL: ${m.url}\n` +
      `  Stack: ${m.stack.join(", ")}\n` +
      `  ${m.pitch}`
  );
  return `Found ${matches.length} matching project${
    matches.length === 1 ? "" : "s"
  }:\n\n${lines.join("\n\n")}`;
}

// ---------------------------------------------------------------------------
// Blog (parses the /blog.md markdown twin — same data source as the blog pages)
// ---------------------------------------------------------------------------

export interface BlogIndexEntry {
  title: string;
  url: string;
  excerpt: string;
}

/**
 * Parses the blog index markdown produced by `staticPageMarkdown("blog")` in
 * `src/lib/markdown/generators.ts`, whose entries look like:
 *   `- [Post title](https://shivanshutiwari.in/blog/slug): Excerpt text`
 */
export function parseBlogIndex(markdown: string): BlogIndexEntry[] {
  const entries: BlogIndexEntry[] = [];
  const listItem = /^-\s+\[(.+?)\]\(([^)\s]+)\):\s*(.+)$/gm;
  for (const match of markdown.matchAll(listItem)) {
    const [, title, url, excerpt] = match;
    if (url.includes("/blog/")) {
      entries.push({ title, url, excerpt });
    }
  }
  return entries;
}

export function searchBlogPosts(
  entries: BlogIndexEntry[],
  query: string,
  limit = 10
): BlogIndexEntry[] {
  const tokens = tokenize(query);
  if (tokens.length === 0) return [];

  const scored = entries
    .map((e) => {
      const title = e.title.toLowerCase();
      const excerpt = e.excerpt.toLowerCase();
      let score = 0;
      for (const t of tokens) {
        if (title.includes(t)) score += 4;
        if (excerpt.includes(t)) score += 2;
      }
      return { e, score };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map(({ e }) => e);
}

export function formatBlogPostsForAgent(matches: BlogIndexEntry[]): string {
  if (matches.length === 0) {
    return "No blog posts matched this search. Try a broader keyword, or browse all posts at https://shivanshutiwari.in/blog.";
  }
  const lines = matches.map(
    (m) => `- ${m.title}\n  URL: ${m.url}\n  ${m.excerpt}`
  );
  return `Found ${matches.length} matching blog post${
    matches.length === 1 ? "" : "s"
  }:\n\n${lines.join("\n\n")}`;
}

// ---------------------------------------------------------------------------
// Tool definitions (registered by <WebMCP /> against document.modelContext)
// ---------------------------------------------------------------------------

/** The blog index is fetched at execution time from the existing .md twin. */
export const BLOG_INDEX_PATH = "/blog.md";

export const getContactInfoTool: WebMCPToolDefinition = {
  name: "get_contact_info",
  description:
    "Returns Shivanshu Tiwari's public contact information: email address, GitHub profile, LinkedIn profile, and contact form URL. Read-only lookup — it does not send messages or modify anything.",
  inputSchema: { type: "object", properties: {} },
  // Scanner finding (Trust / untrusted-content, weight 4): output contains
  // personal message/profile-shaped fields, so declare the untrusted-content
  // hint per WebMCP draft §6.4.3 — the agent should not treat this as site-
  // verified truth.
  annotations: { readOnlyHint: true, untrustedContentHint: true },
  execute: async () =>
    formatToolText(
      `Public contact information for ${SITE_NAME}:\n\n${JSON.stringify(
        getContactInfo(),
        null,
        2
      )}`
    ),
};

export const searchPortfolioProjectsTool: WebMCPToolDefinition = {
  name: "search_portfolio_projects",
  description:
    "Searches Shivanshu Tiwari's project case studies by keyword — technology, project name, or problem domain — and returns matching projects with titles, one-line pitches, tech stacks, and project page URLs. Read-only.",
  inputSchema: {
    type: "object",
    properties: {
      query: {
        type: "string",
        description: "Keyword, technology, or project name to search for",
      },
    },
    required: ["query"],
  },
  annotations: { readOnlyHint: true },
  execute: async (args, options) => {
    const query = requireQuery(args);
    if (query === null) {
      return emptyQueryResult(
        "Try a technology, project name, or problem domain."
      );
    }
    if (options?.signal?.aborted) {
      throw new Error("Tool execution aborted before search started.");
    }
    return formatToolText(formatProjectsForAgent(searchProjects(query)));
  },
};

export const searchBlogPostsTool: WebMCPToolDefinition = {
  name: "search_blog_posts",
  description:
    "Searches Shivanshu Tiwari's blog posts by keyword or topic and returns matching posts with titles, one-line summaries, and links. Read-only — does not modify anything.",
  inputSchema: {
    type: "object",
    properties: {
      query: {
        type: "string",
        description: "Keyword or topic to search for",
      },
    },
    required: ["query"],
  },
  annotations: { readOnlyHint: true },
  execute: async (args, options) => {
    const query = requireQuery(args);
    if (query === null) {
      return emptyQueryResult("Try a keyword or topic from the blog.");
    }
    // Signal is passed through so agent-side cancellation actually aborts the fetch.
    const response = await fetch(BLOG_INDEX_PATH, {
      headers: { Accept: "text/markdown" },
      signal: options?.signal,
    });
    if (!response.ok) {
      return formatToolText(
        `Could not load the blog index (HTTP ${response.status}). Browse all posts at ${SITE_URL}/blog instead.`
      );
    }
    const markdown = await response.text();
    return formatToolText(
      formatBlogPostsForAgent(searchBlogPosts(parseBlogIndex(markdown), query))
    );
  },
};

/**
 * All WebMCP tools registered on the document. The original generic
 * `query_portfolio` tool is retired in favor of these three focused tools.
 */
export const webmcpTools: WebMCPToolDefinition[] = [
  getContactInfoTool,
  searchPortfolioProjectsTool,
  searchBlogPostsTool,
];


