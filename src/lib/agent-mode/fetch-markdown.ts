/**
 * Client-side helper to fetch the markdown representation of a route.
 * Reuses existing .md routes, ?mode=agent, and /api/markdown endpoints.
 */

const inMemoryCache = new Map<string, string>();

export function getCachedMarkdown(pathname: string): string | undefined {
  return inMemoryCache.get(pathname);
}

export function setCachedMarkdown(pathname: string, content: string): void {
  inMemoryCache.set(pathname, content);
}

export async function fetchMarkdownForPath(pathname: string): Promise<string> {
  const cleanPath = pathname.split("?")[0].replace(/\/$/, "") || "/";

  // Check in-memory cache first
  const cached = inMemoryCache.get(cleanPath);
  if (cached) {
    return cached;
  }

  // 1. Primary candidate:
  // Root route uses ?mode=agent; other routes use .md sibling
  const primaryUrl = cleanPath === "/" ? "/?mode=agent" : `${cleanPath}.md`;

  try {
    const res = await fetch(primaryUrl, {
      headers: { Accept: "text/markdown, text/plain;q=0.9" },
    });
    if (res.ok) {
      const text = await res.text();
      if (isValidMarkdownResponse(text)) {
        inMemoryCache.set(cleanPath, text);
        return text;
      }
    }
  } catch {
    // Fall through to secondary fallback
  }

  // 2. Secondary candidate: direct /api/markdown route
  const apiPath = `/api/markdown${cleanPath === "/" ? "" : cleanPath}`;
  try {
    const apiRes = await fetch(apiPath, {
      headers: { Accept: "text/markdown" },
    });
    if (apiRes.ok) {
      const text = await apiRes.text();
      if (isValidMarkdownResponse(text)) {
        inMemoryCache.set(cleanPath, text);
        return text;
      }
    }
  } catch {
    // Fall through to error
  }

  // 3. Tertiary candidate: path with Accept: text/markdown header
  try {
    const directRes = await fetch(cleanPath, {
      headers: { Accept: "text/markdown" },
    });
    if (directRes.ok) {
      const text = await directRes.text();
      if (isValidMarkdownResponse(text)) {
        inMemoryCache.set(cleanPath, text);
        return text;
      }
    }
  } catch {
    // Fall through to error
  }

  throw new Error(`Agent view is not available for "${pathname}".`);
}

function isValidMarkdownResponse(text: string): boolean {
  if (!text || text.trim().length === 0) return false;
  const trimmed = text.trim();
  // Ensure it is not an HTML 404/error document shell
  if (trimmed.toLowerCase().startsWith("<!doctype html") || trimmed.toLowerCase().startsWith("<html")) {
    return false;
  }
  return true;
}
