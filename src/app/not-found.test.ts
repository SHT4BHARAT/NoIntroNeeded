import { describe, it, expect } from "vitest";
import * as fs from "fs";
import * as path from "path";

describe("404 page", () => {
  it("contains recovery links", () => {
    const file = fs.readFileSync(path.join(process.cwd(), "src/app/not-found.tsx"), "utf-8");
    expect(file).toContain("/sitemap.xml");
    expect(file).toContain("/llms.txt");
    expect(file).toContain('404 — page not found'.toLowerCase().replace("—", "—") || "404");
    // Check suggestions include About and Contact
    expect(file).toContain('"/about"');
    expect(file).toContain('"/contact"');
  });

  it("project page uses notFound()", () => {
    const file = fs.readFileSync(path.join(process.cwd(), "src/app/projects/[slug]/page.tsx"), "utf-8");
    expect(file).toContain("notFound()");
  });

  it("blog page uses notFound()", () => {
    const file = fs.readFileSync(path.join(process.cwd(), "src/app/blog/[slug]/page.tsx"), "utf-8");
    expect(file).toContain("notFound()");
  });
});
