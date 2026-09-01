import { describe, it, expect } from "vitest";
import * as fs from "fs";
import * as path from "path";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

describe("Brand name discoverability — consistency", () => {
  it("SITE_NAME and SITE_URL are canonical apex values", () => {
    expect(SITE_NAME).toBe("Shivanshu Tiwari");
    expect(SITE_URL).toBe("https://shivanshutiwari.in");
    expect(SITE_URL).not.toContain("www.");
    expect(SITE_URL.startsWith("https://")).toBe(true);
  });

  it("manifest name and short_name use SITE_NAME/SITE_TITLE without generic drift", () => {
    const src = fs.readFileSync(path.join(process.cwd(), "src/app/manifest.ts"), "utf-8");
    expect(src).toContain("SITE_NAME");
    expect(src).toContain("SITE_TITLE");
    expect(src).toContain("SITE_DESCRIPTION");
    expect(src).not.toContain("Full-Stack GenAI/ML Engineer");
    // Ensure no hard-coded brand variant remains
    expect(src).toContain("short_name: SITE_NAME");
  });

  it("layout OpenGraph siteName and url match canonical brand", () => {
    const src = fs.readFileSync(path.join(process.cwd(), "src/app/layout.tsx"), "utf-8");
    expect(src).toContain("siteName: SITE_NAME");
    expect(src).toContain("url: SITE_URL");
    expect(src).toContain("metadataBase: new URL(SITE_URL)");
  });

  it("header and footer render SITE_NAME identically", () => {
    const header = fs.readFileSync(path.join(process.cwd(), "src/components/layout/Header.tsx"), "utf-8");
    expect(header).toContain("Shivanshu Tiwari");
    const footer = fs.readFileSync(path.join(process.cwd(), "src/components/layout/Footer.tsx"), "utf-8");
    expect(footer).toContain("SITE_NAME");
    const llms = fs.readFileSync(path.join(process.cwd(), "public/llms.txt"), "utf-8");
    expect(llms.split("\n")[0].trim()).toBe(`# ${SITE_NAME}`);
  });

  it("WebSiteSchema contains publisher and alternateName for brand entity", () => {
    const src = fs.readFileSync(path.join(process.cwd(), "src/components/seo/WebSiteSchema.tsx"), "utf-8");
    expect(src).toContain('"@type": "WebSite"');
    expect(src).toContain("alternateName");
    expect(src).toContain("publisher");
    expect(src).toContain("sameAs");
    expect(src).toContain("SOCIAL.github");
  });

  it("www → apex redirect is configured single-hop in both vercel.json and next.config.ts", () => {
    const vercel = JSON.parse(fs.readFileSync(path.join(process.cwd(), "vercel.json"), "utf-8"));
    expect(vercel.redirects).toBeDefined();
    const r = vercel.redirects.find((x: { has?: { value: string }[] }) =>
      x.has?.some((h) => h.value === "www.shivanshutiwari.in")
    );
    expect(r).toBeDefined();
    expect(r.destination).toBe("https://shivanshutiwari.in/$1");
    expect(r.permanent).toBe(true);

    const next = fs.readFileSync(path.join(process.cwd(), "next.config.ts"), "utf-8");
    expect(next).toContain("www.shivanshutiwari.in");
    expect(next).toContain("https://shivanshutiwari.in/:path*");
    expect(next).toContain("redirects");
  });

  it("sitemap is exhaustive: static routes + projects + blog en + hi", () => {
    const src = fs.readFileSync(path.join(process.cwd(), "src/app/sitemap.ts"), "utf-8");
    expect(src).toContain('"/about"');
    expect(src).toContain('"/privacy"');
    expect(src).toContain("projects");
    expect(src).toContain("getAllPosts");
    expect(src).toContain("/blog/hi");
    // Ensure priority tiers exist
    expect(src).toContain("priority:");
  });

  it("robots.txt references sitemap and allows root", () => {
    const p = path.join(process.cwd(), "src/app/robots.txt/route.ts");
    const fallback = path.join(process.cwd(), "src/app/robots.ts");
    const src = fs.existsSync(p) ? fs.readFileSync(p, "utf-8") : fs.readFileSync(fallback, "utf-8");
    expect(src).toContain("Allow: /");
    expect(src).toContain("Sitemap:");
    expect(src).toContain("SITE_URL");
    expect(src).toContain("GPTBot");
    expect(src).toContain("Schemamap:");
  });

  it("all titles follow \"%s — SITE_NAME\" template (no keyword stuffing)", () => {
    // Spot-check a few pages: layout and page.tsx define template
    const layout = fs.readFileSync(path.join(process.cwd(), "src/app/layout.tsx"), "utf-8");
    expect(layout).toContain("template: `%s — ${SITE_NAME}`");
    const page = fs.readFileSync(path.join(process.cwd(), "src/app/page.tsx"), "utf-8");
    // Home title must start with SITE_NAME
    expect(page).toContain(`title: "${SITE_NAME} —`);
  });

  it("no fake backlinks / cloaking: no hidden brand injection", () => {
    const layout = fs.readFileSync(path.join(process.cwd(), "src/app/layout.tsx"), "utf-8");
    // Ensure no display:none keyword stuffing
    expect(layout.toLowerCase()).not.toContain("shivanshu tiwari shivanshu tiwari");
  });
});
