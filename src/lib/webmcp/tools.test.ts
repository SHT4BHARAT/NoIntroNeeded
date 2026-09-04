import { afterEach, describe, expect, it, vi } from "vitest";
import {
  formatBlogPostsForAgent,
  getContactInfoTool,
  getProjectDetailsTool,
  parseBlogIndex,
  searchBlogPostsTool,
  searchPortfolioProjectsTool,
  searchDeveloperResourcesTool,
  webmcpTools,
  type ToolResult,
} from "@/lib/webmcp/tools";
import { SOCIAL } from "@/lib/constants";

/**
 * Blog index fixture in the exact format produced by
 * staticPageMarkdown("blog") in src/lib/markdown/generators.ts.
 */
const BLOG_INDEX_MD = `---
title: "Blog — Shivanshu Tiwari"
description: "Field notes, repo deep-dives, and technical commentary."
canonical: "https://shivanshutiwari.in/blog"
---

# Blog — Shivanshu Tiwari

Field notes, repo deep-dives, and technical commentary.

- [Hello, World — Why I Document My Failures](https://shivanshutiwari.in/blog/hello-world): An introduction to honest documentation — what broke, what I learned, and why negative results belong in a portfolio.
- [India Innovates 2026 — Road to Top 60](https://shivanshutiwari.in/blog/india-innovates-2026-road-to-top-60): Field notes from the Delhi Next national cohort — smart traffic management, MCD presentations, and what worked.
- [Model Drop — Gemini 2.0 Flash in Production](https://shivanshutiwari.in/blog/model-drop-gemini): Repo notes on running Gemini 2.0 Flash for scam-baiting agents — temperature tuning, latency, and entity extraction.

---
*Source: https://shivanshutiwari.in/blog*
`;

afterEach(() => {
  vi.unstubAllGlobals();
});

function textOf(result: ToolResult): string {
  expect(result.content).toHaveLength(1);
  expect(result.content[0].type).toBe("text");
  return result.content[0].text;
}

describe("WebMCP tool registration metadata", () => {
  it("exposes the focused read-only tools (including developer resources search)", () => {
    expect(webmcpTools.map((t) => t.name)).toEqual([
      "get_contact_info",
      "search_portfolio_projects",
      "get_project_details",
      "search_blog_posts",
      "search_developer_resources",
    ]);
  });

  it("uses tool names matching the WebMCP valid pattern", () => {
    const pattern = /^[A-Za-z0-9_.-]{1,128}$/;
    for (const tool of webmcpTools) {
      expect(tool.name).toMatch(pattern);
    }
  });

  it("declares readOnlyHint: true on every tool", () => {
    for (const tool of webmcpTools) {
      expect(tool.annotations.readOnlyHint).toBe(true);
    }
  });

  it("declares untrustedContentHint on the contact tool (ora Trust finding)", () => {
    // get_contact_info returns message/profile-shaped fields, so the scanner
    // requires the untrusted-content hint; search tools return the site's own
    // content and correctly omit it.
    expect(getContactInfoTool.annotations.untrustedContentHint).toBe(true);
    expect(searchPortfolioProjectsTool.annotations.untrustedContentHint).toBeUndefined();
    expect(searchBlogPostsTool.annotations.untrustedContentHint).toBeUndefined();
    expect(searchDeveloperResourcesTool.annotations.untrustedContentHint).toBeUndefined();
  });

  it("describes every tool and every declared parameter", () => {
    for (const tool of webmcpTools) {
      expect(tool.description.trim().length).toBeGreaterThan(0);
      // Chrome guidance: ≤500 chars per tool description.
      expect(tool.description.length).toBeLessThanOrEqual(500);
      for (const [param, schema] of Object.entries(
        tool.inputSchema.properties
      )) {
        expect(
          schema.description.trim().length,
          `${tool.name}.${param} needs a description`
        ).toBeGreaterThan(0);
        // Chrome guidance: ≤150 chars per parameter description.
        expect(schema.description.length).toBeLessThanOrEqual(150);
      }
    }
  });

  it("requires the query parameter on the search tools", () => {
    expect(searchPortfolioProjectsTool.inputSchema.required).toEqual([
      "query",
    ]);
    expect(searchBlogPostsTool.inputSchema.required).toEqual(["query"]);
    expect(searchDeveloperResourcesTool.inputSchema.required).toEqual(["query"]);
    expect(getContactInfoTool.inputSchema.required).toBeUndefined();
  });
});

describe("execute() result shape", () => {
  it("get_contact_info returns the standard text-content shape with real data", async () => {
    const result = await getContactInfoTool.execute({});
    const text = textOf(result);
    expect(result).toEqual({
      content: [{ type: "text", text: expect.any(String) }],
    });
    expect(text).toContain("sht4bharat@gmail.com");
    expect(text).toContain(SOCIAL.github);
    expect(text).toContain(SOCIAL.linkedin);
    // Ground rule 0: the tool returns details, it does not send anything.
    expect(text).toContain("cannot send messages");
  });

  it("search_portfolio_projects returns the standard text-content shape", async () => {
    const result = await searchPortfolioProjectsTool.execute({
      query: "FastAPI",
    });
    expect(result).toEqual({
      content: [{ type: "text", text: expect.any(String) }],
    });
    expect(textOf(result)).toContain("Found");
  });

  it("search_blog_posts returns the standard text-content shape", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response(BLOG_INDEX_MD, { status: 200 }))
    );
    const result = await searchBlogPostsTool.execute({ query: "Gemini" });
    expect(result).toEqual({
      content: [{ type: "text", text: expect.any(String) }],
    });
    expect(textOf(result)).toContain("Gemini 2.0 Flash in Production");
  });
});

describe("search_portfolio_projects (shared projects data source)", () => {
  it("matches by technology", async () => {
    const text = textOf(
      await searchPortfolioProjectsTool.execute({ query: "Gemini" })
    );
    expect(text).toContain("Agentic Honeypot");
    expect(text).toContain("/projects/agentic-honey-pot");
  });

  it("matches by problem domain", async () => {
    const text = textOf(
      await searchPortfolioProjectsTool.execute({
        query: "reinforcement learning",
      })
    );
    expect(text).toContain("DAITFO");
  });

  it("returns a helpful no-match message instead of an empty result", async () => {
    const text = textOf(
      await searchPortfolioProjectsTool.execute({ query: "zzzqxv" })
    );
    expect(text).toContain("No projects matched");
  });

  it("does not leak case-study narrative fields into output", async () => {
    const text = textOf(
      await searchPortfolioProjectsTool.execute({
        query: "scam honeypot UPI phishing",
      })
    );
    // Only curated descriptive fields (title/pitch/stack/URL) are surfaced.
    expect(text).not.toContain("What I Built");
    expect(text).not.toContain("Key Decisions");
  });
});

describe("get_project_details (record detail drill-down)", () => {
  it("returns the full record for a valid slug", async () => {
    const text = textOf(await getProjectDetailsTool.execute({ slug: "samvad" }));
    expect(text).toContain("Samvad");
    expect(text).toContain("Stack:");
    expect(text).toContain("Highlights:");
    expect(text).toContain("https://shivanshutiwari.in/projects/samvad");
  });

  it("suggests valid slugs for an unknown slug", async () => {
    const text = textOf(await getProjectDetailsTool.execute({ slug: "nope" }));
    expect(text).toContain("No project with slug");
    expect(text).toContain("agentic-honey-pot");
    expect(text).toContain("samvad");
  });

  it("requires the slug parameter", async () => {
    for (const args of [{}, { slug: "  " }]) {
      const text = textOf(await getProjectDetailsTool.execute(args));
      expect(text).toContain('"slug" parameter is required');
    }
  });

  it("keeps case-study narrative fields out of the detail record", async () => {
    const text = textOf(
      await getProjectDetailsTool.execute({ slug: "agentic-honey-pot" })
    );
    expect(text).not.toContain("What I Built");
    expect(text).not.toContain("Key Decisions");
    expect(text).not.toContain("The Honest Part");
  });
});

describe("search_blog_posts (markdown twin data source)", () => {
  it("parses the /blog.md listing format", () => {
    const entries = parseBlogIndex(BLOG_INDEX_MD);
    expect(entries).toHaveLength(3);
    expect(entries[0]).toEqual({
      title: "Hello, World — Why I Document My Failures",
      url: "https://shivanshutiwari.in/blog/hello-world",
      excerpt: expect.stringContaining("honest documentation"),
    });
  });

  it("fetches /blog.md with the agent's AbortSignal passed through", async () => {
    const fetchMock = vi.fn(async (_url: string, init?: RequestInit) => {
      expect(init?.signal).toBeDefined();
      return new Response(BLOG_INDEX_MD, { status: 200 });
    });
    vi.stubGlobal("fetch", fetchMock);
    const controller = new AbortController();
    await searchBlogPostsTool.execute(
      { query: "Gemini" },
      { signal: controller.signal }
    );
    expect(fetchMock).toHaveBeenCalledWith(
      "/blog.md",
      expect.objectContaining({ signal: controller.signal })
    );
  });

  it("rejects when the agent aborts mid-fetch", async () => {
    const controller = new AbortController();
    vi.stubGlobal(
      "fetch",
      vi.fn(
        (_url: string, init?: RequestInit) =>
          new Promise<Response>((_resolve, reject) => {
            init?.signal?.addEventListener("abort", () =>
              reject(new Error("AbortError"))
            );
          })
      )
    );
    const pending = searchBlogPostsTool.execute(
      { query: "Gemini" },
      { signal: controller.signal }
    );
    controller.abort();
    await expect(pending).rejects.toThrow("AbortError");
  });

  it("falls back gracefully when the blog index cannot be loaded", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response("nope", { status: 404 }))
    );
    const text = textOf(await searchBlogPostsTool.execute({ query: "Gemini" }));
    expect(text).toContain("Could not load the blog index");
    expect(text).toContain("https://shivanshutiwari.in/blog");
  });

  it("returns a helpful no-match message", () => {
    const none = formatBlogPostsForAgent([]);
    expect(none).toContain("No blog posts matched");
  });
});

describe("empty / missing query handling", () => {
  it("explains the required parameter instead of throwing", async () => {
    for (const tool of [searchPortfolioProjectsTool, searchBlogPostsTool]) {
      const missing = textOf(await tool.execute({}));
      expect(missing).toContain('"query" parameter is required');
      const blank = textOf(await tool.execute({ query: "   " }));
      expect(blank).toContain('"query" parameter is required');
    }
  });
});

describe("content safety (spec §0.4 — example-attack phrasing)", () => {
  const ATTACK_PATTERNS: RegExp[] = [
    /send me that UPI/i,
    /SYSTEM\s*(OVERRIDE|:)/i,
    /ignore (all )?(previous|prior) instructions/i,
    /enter your (OTP|password|PIN)/i,
    /verify your account/i,
    /click (this|the following) link/i,
    /proceed to checkout without asking/i,
    /share-content/i,
  ];

  it("never emits embedded example-attack phrasing through tool output", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response(BLOG_INDEX_MD, { status: 200 }))
    );
    const probeQueries = [
      "scam",
      "phishing",
      "UPI",
      "honeypot",
      "bank account",
      "fraud",
    ];
    for (const query of probeQueries) {
      for (const result of [
        await searchPortfolioProjectsTool.execute({ query }),
        await searchBlogPostsTool.execute({ query }),
        // Detail drill-down on the highest-risk project (scam-baiting case study).
        await getProjectDetailsTool.execute({ slug: "agentic-honey-pot" }),
      ]) {
        const text = textOf(result);
        for (const pattern of ATTACK_PATTERNS) {
          expect(text, `"${query}" output hit ${pattern}`).not.toMatch(pattern);
        }
      }
    }
    const contact = textOf(await getContactInfoTool.execute({}));
    for (const pattern of ATTACK_PATTERNS) {
      expect(contact).not.toMatch(pattern);
    }
  });
});

