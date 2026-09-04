import { describe, it, expect } from "vitest";
import * as fs from "fs";
import * as path from "path";
import { staticPageMarkdown } from "@/lib/markdown/generators";
import { searchSite } from "@/lib/search";
import { searchDeveloperResources } from "@/lib/search/resources";

describe("CLI Tool & Multi-Language SDKs Integrity", () => {
  const repoRoot = process.cwd();

  it("cli.mjs exists and defines all core commands", () => {
    const cliPath = path.join(repoRoot, "cli.mjs");
    expect(fs.existsSync(cliPath)).toBe(true);
    const content = fs.readFileSync(cliPath, "utf-8");
    expect(content).toContain("projects [domain]");
    expect(content).toContain("project <slug>");
    expect(content).toContain("compare <slugA> <slugB>");
    expect(content).toContain("keys");
    expect(content).toContain("sandbox");
    expect(content).toContain("batch");
    expect(content).toContain("jobs [jobId]");
    expect(content).toContain("--json");
  });

  it("TypeScript SDK files and compiled artifacts exist", () => {
    const pkgPath = path.join(repoRoot, "sdk/typescript/package.json");
    const srcPath = path.join(repoRoot, "sdk/typescript/src/index.ts");
    const readmePath = path.join(repoRoot, "sdk/typescript/README.md");
    const distPath = path.join(repoRoot, "sdk/typescript/dist/index.js");

    expect(fs.existsSync(pkgPath)).toBe(true);
    expect(fs.existsSync(srcPath)).toBe(true);
    expect(fs.existsSync(readmePath)).toBe(true);
    expect(fs.existsSync(distPath)).toBe(true);

    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
    expect(pkg.name).toBe("sht-portfolio-v2");
    expect(pkg.version).toMatch(/^1\./);
  });

  it("Python SDK files exist with zero-dependency client", () => {
    const pyprojectPath = path.join(repoRoot, "sdk/python/pyproject.toml");
    const clientPath = path.join(repoRoot, "sdk/python/shivanshu/client.py");
    const readmePath = path.join(repoRoot, "sdk/python/README.md");

    expect(fs.existsSync(pyprojectPath)).toBe(true);
    expect(fs.existsSync(clientPath)).toBe(true);
    expect(fs.existsSync(readmePath)).toBe(true);

    const clientCode = fs.readFileSync(clientPath, "utf-8");
    expect(clientCode).toContain("class ShivanshuClient");
    expect(clientCode).toContain("def list_projects");
    expect(clientCode).toContain("def get_project");
    expect(clientCode).toContain("def generate_key");
  });

  it("Go SDK files exist with idiomatic structs", () => {
    const modPath = path.join(repoRoot, "sdk/go/go.mod");
    const clientPath = path.join(repoRoot, "sdk/go/client.go");
    const readmePath = path.join(repoRoot, "sdk/go/README.md");

    expect(fs.existsSync(modPath)).toBe(true);
    expect(fs.existsSync(clientPath)).toBe(true);
    expect(fs.existsSync(readmePath)).toBe(true);

    const goCode = fs.readFileSync(clientPath, "utf-8");
    expect(goCode).toContain("package shivanshu");
    expect(goCode).toContain("type Client struct");
    expect(goCode).toContain("func NewClient");
  });

  it("generates markdown twins for developers/cli and developers/sdk", () => {
    const cliMd = staticPageMarkdown("developers/cli");
    expect(cliMd).not.toBeNull();
    expect(cliMd).toContain("Shivanshu Tiwari CLI Tool Guide");
    expect(cliMd).toContain("npx shivanshu");

    const sdkMd = staticPageMarkdown("developers/sdk");
    expect(sdkMd).not.toBeNull();
    expect(sdkMd).toContain("Shivanshu Tiwari Multi-Language SDKs");
    expect(sdkMd).toContain("npm install sht-portfolio-v2");
    expect(sdkMd).toContain("pip install shivanshu-sdk");
    expect(sdkMd).toContain("go get github.com/SHT4BHARAT/NoIntroNeeded/sdk/go");
  });

  it("advertises x-sdks and x-cli in openapi.json", () => {
    const openapiPath = path.join(repoRoot, "public/openapi.json");
    const openapi = JSON.parse(fs.readFileSync(openapiPath, "utf-8"));
    expect(openapi["x-cli"]).toBeDefined();
    expect(openapi["x-cli"].run).toBe("npx shivanshu");
    expect(openapi["x-sdks"]).toBeDefined();
    expect(openapi["x-sdks"].typescript).toBeDefined();
    expect(openapi["x-sdks"].python).toBeDefined();
    expect(openapi["x-sdks"].go).toBeDefined();
  });

  it("advertises CLI tool and multi-language SDKs in llms.txt", () => {
    const llms = fs.readFileSync(path.join(repoRoot, "public/llms.txt"), "utf-8");
    expect(llms).toContain("Dedicated CLI Tool");
    expect(llms).toContain("npx shivanshu");
    expect(llms).toContain("Multi-Language SDKs");
    expect(llms).toContain("npm i sht-portfolio-v2");
    expect(llms).toContain("pip install shivanshu-sdk");
  });

  it("surfaces developer resources and projects via unified search", () => {
    const devResults = searchDeveloperResources("sdk");
    expect(devResults.length).toBeGreaterThan(0);
    expect(devResults[0].title).toContain("SDK");

    const siteResults = searchSite("developer");
    expect(siteResults.total).toBeGreaterThan(0);
    expect(siteResults.developerResources.length).toBeGreaterThan(0);

    const searchMd = staticPageMarkdown("search");
    expect(searchMd).not.toBeNull();
    expect(searchMd).toContain("Search — Shivanshu Tiwari");
  });

  it("advertises search in openapi.json and llms.txt", () => {
    const openapiPath = path.join(repoRoot, "public/openapi.json");
    const openapi = JSON.parse(fs.readFileSync(openapiPath, "utf-8"));
    expect(openapi["x-search"]).toBeDefined();
    expect(openapi.paths["/api/search"]).toBeDefined();

    const llms = fs.readFileSync(path.join(repoRoot, "public/llms.txt"), "utf-8");
    expect(llms).toContain("Site Search");
    expect(llms).toContain("https://shivanshutiwari.in/search");
  });
});
