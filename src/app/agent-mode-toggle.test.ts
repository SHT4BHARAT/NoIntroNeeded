import { describe, expect, it, vi, beforeEach } from "vitest";
import {
  fetchMarkdownForPath,
  getCachedMarkdown,
  setCachedMarkdown,
} from "@/lib/agent-mode/fetch-markdown";

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
});
