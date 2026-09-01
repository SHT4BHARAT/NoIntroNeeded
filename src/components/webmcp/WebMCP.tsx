"use client";
import { useEffect } from "react";

export function WebMCP() {
  useEffect(() => {
    const register = () => {
      const ctx = (document as unknown as { modelContext?: { registerTool?: (t: unknown) => void } }).modelContext
        ?? (navigator as unknown as { modelContext?: { registerTool?: (t: unknown) => void } }).modelContext;
      if (!ctx?.registerTool) return;
      try {
        ctx.registerTool({
          name: "query_portfolio",
          description: "Query Shivanshu Tiwari's portfolio — projects, blog, achievements",
          inputSchema: { type: "object", properties: { query: { type: "string" } } },
          handler: async ({ query }: { query: string }) => {
            const res = await fetch(`/api/markdown?query=${encodeURIComponent(query)}`);
            return res.text();
          },
        } as unknown as Parameters<NonNullable<typeof ctx.registerTool>>[0]);
      } catch {}
    };
    register();
  }, []);
  return null;
}
