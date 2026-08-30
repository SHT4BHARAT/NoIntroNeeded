import { describe, it, expect } from "vitest";
import * as fs from "fs";
import * as path from "path";

function visibleCharCount(mdOrTsx: string): number {
  // Rough: strip tags/markdown
  return mdOrTsx.replace(/<[^>]*>/g, "").replace(/[#*`\[\]()_>]/g, "").replace(/\s+/g, " ").trim().length;
}

describe("Trust pages content length", () => {
  it("/about has >=500 visible chars", () => {
    const file = fs.readFileSync(path.join(process.cwd(), "src/app/about/page.tsx"), "utf-8");
    expect(visibleCharCount(file)).toBeGreaterThanOrEqual(500);
  });

  it("/privacy has >=500 visible chars", () => {
    const file = fs.readFileSync(path.join(process.cwd(), "src/app/privacy/page.tsx"), "utf-8");
    expect(visibleCharCount(file)).toBeGreaterThanOrEqual(500);
  });

  it("/contact has >=500 visible chars", () => {
    const file = fs.readFileSync(path.join(process.cwd(), "src/app/contact/page.tsx"), "utf-8");
    expect(visibleCharCount(file)).toBeGreaterThanOrEqual(500);
  });

  it("sitemap includes about and privacy", () => {
    const sitemap = fs.readFileSync(path.join(process.cwd(), "src/app/sitemap.ts"), "utf-8");
    expect(sitemap).toContain('"/about"');
    expect(sitemap).toContain('"/privacy"');
  });

  it("markdown generators produce >=500 chars for trust pages", async () => {
    const { staticPageMarkdown } = await import("@/lib/markdown/generators");
    for (const page of ["about", "privacy", "contact"]) {
      const md = staticPageMarkdown(page);
      expect(md, `${page} markdown not null`).not.toBeNull();
      const visible = md!.replace(/[#*`\[\]()_>-]/g, "").replace(/\s+/g, " ").trim();
      expect(visible.length, `${page} markdown length`).toBeGreaterThanOrEqual(500);
    }
  });
});
