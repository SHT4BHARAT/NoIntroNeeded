import { describe, expect, it, vi, beforeEach } from "vitest";
import { NextRequest, NextResponse } from "next/server";
import {
  fetchMarkdownForPath,
  getCachedMarkdown,
  setCachedMarkdown,
} from "@/lib/agent-mode/fetch-markdown";
import { proxy } from "@/proxy";

describe("Human / Agent Toggle — Specifications", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe("Markdown Cache Management", () => {
    it("stores and retrieves markdown content for a route", () => {
      setCachedMarkdown("/test-route", "# Test Content");
      expect(getCachedMarkdown("/test-route")).toBe("# Test Content");
    });
  });

  describe("Client-Side Fetch Logic", () => {
    it("returns cached content without triggering network fetch", async () => {
      setCachedMarkdown("/cached-page", "# Already Cached");
      const fetchSpy = vi.spyOn(globalThis, "fetch");

      const result = await fetchMarkdownForPath("/cached-page");
      expect(result).toBe("# Already Cached");
      expect(fetchSpy).not.toHaveBeenCalled();
    });

    it("fetches /?mode=agent with text/markdown accept header for root route", async () => {
      const mockMarkdown = "# Root Agent View\n\n- Product: Shivanshu Tiwari";
      const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
        ok: true,
        text: async () => mockMarkdown,
      } as Response);

      const result = await fetchMarkdownForPath("/");
      expect(result).toBe(mockMarkdown);
      expect(fetchSpy).toHaveBeenCalledWith("/?mode=agent", {
        headers: { Accept: "text/markdown, text/plain;q=0.9" },
      });
      expect(getCachedMarkdown("/")).toBe(mockMarkdown);
    });

    it("fetches ${pathname}.md for subpages", async () => {
      const mockMarkdown = "# Projects\n\nList of autonomous agent projects.";
      const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
        ok: true,
        text: async () => mockMarkdown,
      } as Response);

      const result = await fetchMarkdownForPath("/projects");
      expect(result).toBe(mockMarkdown);
      expect(fetchSpy).toHaveBeenCalledWith("/projects.md", {
        headers: { Accept: "text/markdown, text/plain;q=0.9" },
      });
      expect(getCachedMarkdown("/projects")).toBe(mockMarkdown);
    });

    it("gracefully falls back to /api/markdown when primary route fails", async () => {
      const mockMarkdown = "# Secondary Fallback Content";
      const fetchSpy = vi.spyOn(globalThis, "fetch")
        // primary fails
        .mockResolvedValueOnce({
          ok: false,
          text: async () => "Not Found",
        } as Response)
        // secondary succeeds
        .mockResolvedValueOnce({
          ok: true,
          text: async () => mockMarkdown,
        } as Response);

      const result = await fetchMarkdownForPath("/fallback-route");
      expect(result).toBe(mockMarkdown);
      expect(fetchSpy).toHaveBeenCalledTimes(2);
      expect(fetchSpy).toHaveBeenNthCalledWith(1, "/fallback-route.md", {
        headers: { Accept: "text/markdown, text/plain;q=0.9" },
      });
      expect(fetchSpy).toHaveBeenNthCalledWith(2, "/api/markdown/fallback-route", {
        headers: { Accept: "text/markdown" },
      });
    });

    it("rejects HTML shell error pages to prevent rendering broken DOM markup", async () => {
      const htmlError = "<!DOCTYPE html><html><body>404 Not Found</body></html>";
      vi.spyOn(globalThis, "fetch").mockResolvedValue({
        ok: true,
        text: async () => htmlError,
      } as Response);

      await expect(fetchMarkdownForPath("/missing-route")).rejects.toThrow(
        'Agent view is not available for "/missing-route".'
      );
    });
  });

  describe("Server-Side Negotiation for ?mode=agent", () => {
    it("allows human browsers requesting text/html on ?mode=agent to render full HTML page", () => {
      const req = new NextRequest("http://localhost:3000/?mode=agent", {
        headers: {
          accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
        },
      });

      const res = proxy(req);
      // When null / NextResponse.next(), Next.js renders the full HTML page instead of intercepting with JSON
      expect(res).toBeInstanceOf(NextResponse);
    });

    it("serves machine-readable JSON to API clients/bots on ?mode=agent without text/html", async () => {
      const req = new NextRequest("http://localhost:3000/?mode=agent", {
        headers: {
          accept: "application/json",
          "user-agent": "curl/8.7.1",
        },
      });

      const res = proxy(req);
      expect(res).toBeInstanceOf(Response);
      expect(res?.headers.get("Content-Type")).toContain("application/json");
      const body = await res?.json();
      expect(body.mode).toBe("agent");
      expect(body.product).toContain("Shivanshu Tiwari");
    });

    it("serves markdown on ?mode=agent when Accept: text/markdown is requested", async () => {
      const req = new NextRequest("http://localhost:3000/?mode=agent", {
        headers: {
          accept: "text/markdown",
          "user-agent": "curl/8.7.1",
        },
      });

      const res = proxy(req);
      expect(res).toBeInstanceOf(Response);
      expect(res?.headers.get("Content-Type")).toContain("text/markdown");
      const text = await res?.text();
      expect(text).toContain("# Shivanshu Tiwari — Agent Mode View");
    });
  });
});
