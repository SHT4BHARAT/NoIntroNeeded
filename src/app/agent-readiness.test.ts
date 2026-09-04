import { describe, it, expect } from "vitest";
import { POST as mcpPOST } from "@/app/mcp/route";
import { GET as sandboxGET } from "@/app/api/v1/sandbox/ping/route";
import * as fs from "fs";
import * as path from "path";

describe("MCP server handshake", () => {
  it("responds to initialize with a valid JSON-RPC result", async () => {
    const res = await mcpPOST(
      new Request("http://localhost/mcp", {
        method: "POST",
        headers: { "content-type": "application/json", accept: "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: 1,
          method: "initialize",
          params: { protocolVersion: "2024-11-05", capabilities: {}, clientInfo: { name: "test", version: "1" } },
        }),
      })
    );
    expect(res.status).toBe(200);
    expect(res.headers.get("MCP-Protocol-Version")).toBe("2024-11-05");
    const body = await res.json();
    expect(body.jsonrpc).toBe("2.0");
    expect(body.id).toBe(1);
    expect(body.result.protocolVersion).toBe("2024-11-05");
    expect(body.result.serverInfo.name).toBeDefined();
  });

  it("returns tools on tools/list", async () => {
    const res = await mcpPOST(
      new Request("http://localhost/mcp", {
        method: "POST",
        headers: { "content-type": "application/json", accept: "application/json" },
        body: JSON.stringify({ jsonrpc: "2.0", id: 2, method: "tools/list" }),
      })
    );
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.result.tools.length).toBeGreaterThanOrEqual(4);
  });
});

describe("Sandbox endpoint", () => {
  it("returns documented JSON shape and X-Sandbox header", async () => {
    const res = await sandboxGET(
      new Request("http://localhost/api/v1/sandbox/ping?sandbox=true")
    );
    expect(res.status).toBe(200);
    expect(res.headers.get("X-Sandbox")).toBe("true");
    const body = await res.json();
    expect(body.pong).toBe(true);
    expect(body.sandbox).toBe(true);
  });
});

describe("auth.md integrity", () => {
  const repoRoot = process.cwd();
  const authMd = fs.readFileSync(path.join(repoRoot, "src/app/auth.md/route.ts"), "utf-8");

  it("contains all 8 standard WorkOS walkthrough sections", () => {
    expect(authMd).toMatch(/## Discover/);
    expect(authMd).toMatch(/## Pick a method/);
    expect(authMd).toMatch(/## Register/);
    expect(authMd).toMatch(/## Claim/);
    expect(authMd).toMatch(/## Exchange/);
    expect(authMd).toMatch(/## Use the access_token/);
    expect(authMd).toMatch(/## Errors/);
    expect(authMd).toMatch(/## Revocation/);
  });

  it("contains WorkOS agent_auth block and required spec anchors", () => {
    expect(authMd).toMatch(/agent_auth/);
    expect(authMd).toMatch(/identity_endpoint/);
    expect(authMd).toMatch(/identity_assertion/);
    expect(authMd).toMatch(/service_auth/);
    expect(authMd).toMatch(/id-jag/);
    expect(authMd).toMatch(/WWW-Authenticate/);
    expect(authMd).toMatch(/oauth-protected-resource/);
    expect(authMd).toMatch(/oauth-authorization-server/);
  });

  it("states plainly that read access requires no credentials", () => {
    expect(authMd).toMatch(/no credentials/i);
  });
});

describe("AGENTS.md discoverability", () => {
  const repoRoot = process.cwd();
  const footer = fs.readFileSync(path.join(repoRoot, "src/components/layout/Footer.tsx"), "utf-8");
  const llms = fs.readFileSync(path.join(repoRoot, "public/llms.txt"), "utf-8");

  it("links AGENTS.md from the homepage footer", () => {
    expect(footer).toMatch(/AGENTS\.md/);
  });

  it("links AGENTS.md from llms.txt", () => {
    expect(llms).toMatch(/AGENTS\.md/);
  });
});
