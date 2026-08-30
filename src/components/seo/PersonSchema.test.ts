import { describe, it, expect } from "vitest";
import { SITE_URL, SITE_NAME, SOCIAL } from "@/lib/constants";
import * as fs from "fs";
import * as path from "path";

describe("PersonSchema JSON-LD", () => {
  it("contains required keys", async () => {
    // Dynamically import the component's generated schema by reading source
    const file = fs.readFileSync(path.join(process.cwd(), "src/components/seo/PersonSchema.tsx"), "utf-8");
    expect(file).toContain(`"@type": "Person"`);
    expect(file).toContain(`name: SITE_NAME`);
    expect(file).toContain(`url: SITE_URL`);
    expect(file).toContain(`sameAs`);
    expect(file).toContain(`jobTitle`);
    expect(file).toContain(`alumniOf`);
    expect(file).toContain(`knowsAbout`);
  });

  it("SITE_URL is apex domain", () => {
    expect(SITE_URL).toBe("https://shivanshutiwari.in");
  });

  it("SOCIAL links are valid https", () => {
    expect(SOCIAL.github).toMatch(/^https:\/\/github\.com\/SHT4BHARAT$/);
    expect(SOCIAL.linkedin).toMatch(/^https:\/\/www\.linkedin\.com\/in\/shivanshutiwari-/);
  });

  it("SITE_NAME is consistent", () => {
    expect(SITE_NAME).toBe("Shivanshu Tiwari");
  });

  it("llms.txt H1 matches SITE_NAME", () => {
    const llms = fs.readFileSync(path.join(process.cwd(), "public/llms.txt"), "utf-8");
    const firstLine = llms.split("\n")[0].trim();
    expect(firstLine).toBe(`# ${SITE_NAME}`);
    // Second non-blank line should be blockquote
    const lines = llms.split("\n");
    const nonBlank = lines.filter((l) => l.trim() !== "");
    expect(nonBlank[1].startsWith(">")).toBe(true);
  });

  it("llms.txt contains When to use this section", () => {
    const llms = fs.readFileSync(path.join(process.cwd(), "public/llms.txt"), "utf-8");
    expect(llms.toLowerCase()).toContain("when to use this");
    expect(llms.toLowerCase()).toContain("when not to use");
    // Should list specific generic-avoidance content (not just generic marketing)
    expect(llms).toMatch(/Agentic Honeypot|DAITFO|PayoutEngine|Samvad/);
  });
});
