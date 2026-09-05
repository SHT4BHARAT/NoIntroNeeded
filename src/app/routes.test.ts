import { describe, it, expect } from "vitest";
import * as fs from "fs";
import * as path from "path";
import { staticPageMarkdown } from "@/lib/markdown/generators";
import { projects } from "@/lib/projects/config";

const APP_DIR = path.join(process.cwd(), "src", "app");

describe("projects / docs / services / work routes", () => {
  it("has an index page for /projects (not just [slug] detail pages)", () => {
    expect(fs.existsSync(path.join(APP_DIR, "projects", "page.tsx"))).toBe(true);
  });

  it("has a /docs documentation hub page", () => {
    expect(fs.existsSync(path.join(APP_DIR, "docs", "page.tsx"))).toBe(true);
  });

  it("has a /services capabilities page", () => {
    expect(fs.existsSync(path.join(APP_DIR, "services", "page.tsx"))).toBe(true);
  });

  it("redirects /work to /experience in next.config.ts", () => {
    const cfg = fs.readFileSync(path.join(process.cwd(), "next.config.ts"), "utf-8");
    expect(cfg).toContain('source: "/work"');
    expect(cfg).toContain('destination: "/experience"');
    expect(cfg).toContain("permanent: true");
  });

  it("includes the new routes in the sitemap", () => {
    const sitemap = fs.readFileSync(path.join(APP_DIR, "sitemap.ts"), "utf-8");
    expect(sitemap).toContain('"/projects"');
    expect(sitemap).toContain('"/docs"');
    expect(sitemap).toContain('"/services"');
  });
});

describe("markdown twins for new routes", () => {
  it("generates a projects index markdown twin listing every project", () => {
    const md = staticPageMarkdown("projects");
    expect(md).not.toBeNull();
    expect(md).toContain(`# Projects — Shivanshu Tiwari`);
    expect(md).toContain(`canonical: "https://shivanshutiwari.in/projects"`);
    for (const p of projects.slice(0, 5)) {
      expect(md).toContain(`/projects/${p.slug}`);
    }
    expect(md).toContain("Featured Projects");
  });

  it("generates a docs markdown twin covering specs, SDKs, CLI, and MCP", () => {
    const md = staticPageMarkdown("docs");
    expect(md).not.toBeNull();
    expect(md).toContain("# Developer Documentation — Shivanshu Tiwari");
    expect(md).toContain("openapi.json");
    expect(md).toContain("npx shivanshu");
    expect(md).toContain("/mcp/docs");
    expect(md).toContain("AGENTS.md");
    expect(md).toContain("shivanshu-sdk");
  });

  it("generates a services markdown twin written in first person", () => {
    const md = staticPageMarkdown("services");
    expect(md).not.toBeNull();
    expect(md).toContain("# Services & Capabilities — Shivanshu Tiwari");
    expect(md).toContain("I build");
    expect(md).toContain("What I'm Looking For");
    expect(md).toContain("/projects/agentic-honey-pot");
    expect(md).toContain("/projects/daitfo");
  });

  it("writes all new-page content in first person (no third-person he/his framing)", () => {
    for (const route of ["projects", "docs", "services"]) {
      const md = staticPageMarkdown(route) ?? "";
      expect(md, `${route} markdown must exist`).not.toBeNull();
      expect(md, `${route} must not use third-person "his"`).not.toMatch(/\bhis\b/i);
    }
  });
});

describe("first-person voice on new HTML pages", () => {
  it("services page uses first-person copy", () => {
    const file = fs.readFileSync(path.join(APP_DIR, "services", "page.tsx"), "utf-8");
    expect(file).toContain("I build");
    expect(file).toContain("I&apos;m actively looking");
    expect(file).not.toMatch(/\bhis\b/);
  });

  it("docs page uses first-person copy", () => {
    const file = fs.readFileSync(path.join(APP_DIR, "docs", "page.tsx"), "utf-8");
    expect(file).toContain("I maintain this documentation");
    expect(file).not.toMatch(/\bhis\b/);
  });

  it("projects index page uses first-person copy", () => {
    const file = fs.readFileSync(path.join(APP_DIR, "projects", "page.tsx"), "utf-8");
    expect(file).toContain("Everything I&apos;ve built");
    expect(file).not.toMatch(/\bhis\b/);
  });
});