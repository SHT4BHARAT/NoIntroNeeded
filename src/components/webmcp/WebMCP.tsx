"use client";
import { useEffect, useState } from "react";
import { useWebMCP } from "@mcp-b/react-webmcp";
import {
  getContactInfoTool,
  searchBlogPostsTool,
  searchPortfolioProjectsTool,
} from "@/lib/webmcp/tools";

/**
 * Registers the site's read-only WebMCP tools on document.modelContext.
 *
 * - WebMCP is a browser-only API — document.modelContext does not exist during
 *   server rendering, so registration happens in this client component only.
 * - The @mcp-b/webmcp-polyfill installs document.modelContext when the browser
 *   does not provide it natively (native support is near-zero today), so the
 *   tools are also reachable through bridge-extension paths (Cursor, Claude
 *   Code browser bridges). It is dynamically imported to keep it out of the
 *   server bundle; initializeWebMCPPolyfill() is a no-op when a native
 *   context already exists. (The heavier @mcp-b/global runtime is explicitly
 *   not needed — it is for prompts/resources/transport, which we don't use.)
 * - useWebMCP handles the registration lifecycle: register on mount,
 *   unregister via AbortController on unmount, and re-register on config
 *   change — no hand-rolled double-registration risk.
 *
 * Tools are defined in `@/lib/webmcp/tools` (pure, unit-tested independently
 * of the browser API). All three are read-only lookups; nothing here writes,
 * sends, or submits.
 */
export function WebMCP() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const polyfill = await import("@mcp-b/webmcp-polyfill");
        if (!cancelled) polyfill.initializeWebMCPPolyfill();
      } catch {
        // Native WebMCP may still be available; the hooks below feature-detect.
      }
      if (!cancelled) setReady(true);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useWebMCP({
    name: getContactInfoTool.name,
    description: getContactInfoTool.description,
    inputSchema: getContactInfoTool.inputSchema,
    annotations: getContactInfoTool.annotations,
    execute: getContactInfoTool.execute,
    enabled: ready,
  });

  useWebMCP({
    name: searchPortfolioProjectsTool.name,
    description: searchPortfolioProjectsTool.description,
    inputSchema: searchPortfolioProjectsTool.inputSchema,
    annotations: searchPortfolioProjectsTool.annotations,
    execute: searchPortfolioProjectsTool.execute,
    enabled: ready,
  });

  useWebMCP({
    name: searchBlogPostsTool.name,
    description: searchBlogPostsTool.description,
    inputSchema: searchBlogPostsTool.inputSchema,
    annotations: searchBlogPostsTool.annotations,
    execute: searchBlogPostsTool.execute,
    enabled: ready,
  });

  return null;
}

