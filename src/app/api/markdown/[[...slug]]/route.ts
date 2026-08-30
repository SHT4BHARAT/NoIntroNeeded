import { getProjectBySlug } from "@/lib/projects/config";
import { getPostBySlug } from "@/lib/blog";
import {
  homeMarkdown,
  projectMarkdown,
  blogPostMarkdown,
  staticPageMarkdown,
} from "@/lib/markdown/generators";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug?: string[] }> }
) {
  const { slug = [] } = await params;
  const pathname = "/" + slug.join("/");

  // Root
  if (slug.length === 0) {
    return markdownResponse(homeMarkdown());
  }

  // Projects: /projects/<slug>
  if (slug[0] === "projects" && slug.length === 2) {
    const md = projectMarkdown(slug[1]);
    if (!md) return notFoundMarkdown(`Project "${slug[1]}" not found.`);
    return markdownResponse(md);
  }

  // Blog posts: /blog/<slug> and /blog/hi/<slug>
  if (slug[0] === "blog") {
    if (slug.length === 1) {
      const md = staticPageMarkdown("blog");
      return markdownResponse(md!);
    }
    if (slug.length === 2) {
      // Check if it's a blog post slug
      const post = getPostBySlug(slug[1], "en");
      if (post) {
        const md = blogPostMarkdown(slug[1], "en");
        return markdownResponse(md!);
      }
      // Could be /blog/hi listing? No, hi needs 3 segments
      return notFoundMarkdown(`Blog post "${slug[1]}" not found.`);
    }
    if (slug.length === 3 && slug[1] === "hi") {
      const post = getPostBySlug(slug[2], "hi");
      if (post) {
        const md = blogPostMarkdown(slug[2], "hi");
        return markdownResponse(md!);
      }
      return notFoundMarkdown(`Blog post "${slug[2]}" (hi) not found.`);
    }
  }

  // Check project slug reuse via staticPageMarkdown
  // Also handle simple static pages: about, privacy, contact, education, etc.
  // Try direct static page match
  const staticMd = staticPageMarkdown(pathname.replace(/^\//, ""));
  if (staticMd) {
    return markdownResponse(staticMd);
  }

  // Also try without leading slash variations
  // Fallback: unknown path -> 404 markdown
  // For project slugs without prefix? No, projects already handled.
  // Check if slug is a direct project slug at root? No.

  // As last resort, check if it's a top-level project slug without prefix (should 404)
  // Return 404 with recovery pointers
  return notFoundMarkdown(`Page "${pathname}" not found.`);
}

function markdownResponse(body: string): Response {
  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Vary: "Accept",
      "Cache-Control": "s-maxage=60, stale-while-revalidate=86400",
    },
  });
}

function notFoundMarkdown(message: string): Response {
  const body = `# 404 — Page Not Found

${message}

## Start here

- [Home](https://shivanshutiwari.in/)
- [Projects](https://shivanshutiwari.in/#projects)
- [About](https://shivanshutiwari.in/about)
- [Contact](https://shivanshutiwari.in/contact)
- [Blog](https://shivanshutiwari.in/blog)

## Discovery

- Sitemap: https://shivanshutiwari.in/sitemap.xml
- Agent guide: https://shivanshutiwari.in/llms.txt
`;
  return new Response(body, {
    status: 404,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Vary: "Accept",
      "Cache-Control": "s-maxage=60, stale-while-revalidate=60",
    },
  });
}
