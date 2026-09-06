import { describe, expect, it } from "vitest";
import { productTools } from "@/lib/mcp/product-handler";
import { GET as getServerCard } from "@/app/.well-known/mcp/server-card.json/route";
import { GET as getMcpJson } from "@/app/.well-known/mcp.json/route";
import { OPTIONS as optionsPayment, POST as postPayment } from "@/app/agentic_commerce/delegate_payment/route";
import { POST as postKeys } from "@/app/api/v1/keys/route";
import { GET as getPing } from "@/app/api/v1/sandbox/ping/route";
import { GET as getSandbox } from "@/app/api/v1/sandbox/route";

describe("Orank Fix Specification Verifications", () => {
  describe("1. MCP Server Card Alignment (Zero Drift)", () => {
    it("productTools contains exactly 3 read-only tools", () => {
      expect(productTools).toHaveLength(3);
      expect(productTools.map((t) => t.name)).toEqual([
        "list_projects",
        "get_project",
        "compare_projects",
      ]);
      // Verify all tools are read-only
      productTools.forEach((tool) => {
        expect(tool.annotations.readOnlyHint).toBe(true);
        expect(tool.annotations.destructiveHint).toBe(false);
      });
    });

    it("server-card.json tools array matches productTools exactly (3 == 3)", async () => {
      const res = await getServerCard();
      const data = await res.json();
      expect(data.tools).toHaveLength(3);
      expect(data.tools.map((t: { name: string }) => t.name)).toEqual([
        "list_projects",
        "get_project",
        "compare_projects",
      ]);
    });

    it("mcp.json contains exactly 3 tools matching server card", async () => {
      const res = await getMcpJson();
      const data = await res.json();
      expect(data.tools).toHaveLength(3);
    });

    it("server-card.json lists public registries including Smithery and mcp.so", async () => {
      const res = await getServerCard();
      const data = await res.json();
      const registryNames = data.registries.map((r: { name: string }) => r.name);
      expect(registryNames).toContain("smithery");
      expect(registryNames).toContain("mcp.so");
    });
  });

  describe("2. Live Agent Onboarding End-to-End Flow", () => {
    it("POST /api/v1/keys generates working API key self-serve without auth", async () => {
      const res = await postKeys();
      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.apiKey).toMatch(/^sht_test_/);
      expect(data.tier).toBe("sandbox");
      expect(data.freeTier).toBe(true);
    });

    it("GET /api/v1/sandbox/ping verifies sandbox cluster connectivity", async () => {
      const req = new Request("https://shivanshutiwari.in/api/v1/sandbox/ping");
      const res = await getPing(req);
      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.pong).toBe(true);
      expect(data.sandbox).toBe(true);
    });

    it("GET /api/v1/sandbox returns self-serve onboarding endpoints and free-tier guarantee", async () => {
      const res = await getSandbox();
      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.environment).toBe("sandbox");
      expect(data.freeTier).toBe(true);
      expect(data.selfServeKeys).toBe(true);
      expect(data.endpoints.keys).toBeDefined();
      expect(data.endpoints.ping).toBeDefined();
    });
  });

  describe("3. Agentic Commerce Endpoint Explicit Stub Status", () => {
    it("OPTIONS returns 200 with explicit not_implemented and demo_only flags", async () => {
      const res = await optionsPayment();
      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.status).toBe("not_implemented");
      expect(data.demo_only).toBe(true);
      expect(data.message).toContain("placeholder");
    });

    it("POST returns 501 Not Implemented with explicit not_implemented body", async () => {
      const res = await postPayment();
      expect(res.status).toBe(501);
      const data = await res.json();
      expect(data.status).toBe("not_implemented");
      expect(data.demo_only).toBe(true);
      expect(data.placeholder).toBe(true);
      expect(data.message).toContain("No live payment processing is connected yet");
    });
  });
});
