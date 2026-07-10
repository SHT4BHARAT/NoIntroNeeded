import { getAllPosts } from "@/lib/blog";
import { SITE_URL, SITE_NAME } from "@/lib/constants";

const BASE_URL = SITE_URL;

export async function GET() {
  const posts = getAllPosts("en");

  const items = posts
    .map(
      (post) => `
    <entry>
      <title>${escapeXml(post.frontmatter.title)}</title>
      <link href="${BASE_URL}/blog/${post.frontmatter.slug}"/>
      <id>${BASE_URL}/blog/${post.frontmatter.slug}</id>
      <published>${post.frontmatter.date}T00:00:00Z</published>
      <updated>${post.frontmatter.updated ?? post.frontmatter.date}T00:00:00Z</updated>
      <summary type="html">${escapeXml(post.frontmatter.excerpt)}</summary>
      <author>
        <name>${SITE_NAME}</name>
      </author>
      <category term="${post.frontmatter.category}"/>
    </entry>`
    )
    .join("\n");

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${SITE_NAME} — Blog</title>
  <subtitle>Field notes, repo deep-dives, model & tool drops, and article reactions.</subtitle>
  <link href="${BASE_URL}/feed.xml" rel="self"/>
  <link href="${BASE_URL}/blog" rel="alternate"/>
  <id>${BASE_URL}/blog</id>
  <updated>${posts[0]?.frontmatter.date ?? "2025-01-01"}T00:00:00Z</updated>
  <author>
    <name>Shivanshu Tiwari</name>
  </author>
  ${items}
</feed>`;

  return new Response(feed, {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
    },
  });
}

function escapeXml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
