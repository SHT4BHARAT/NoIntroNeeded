import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { formatDate } from "@/lib/blog/utils";

export function RecentPosts({ currentSlug }: { currentSlug?: string }) {
  const posts = getAllPosts("en")
    .filter((p) => p.frontmatter.slug !== currentSlug)
    .slice(0, 4);

  if (posts.length === 0) return null;

  return (
    <aside className="mt-16 border-t border-border pt-8">
      <h2 className="mb-4 text-lg font-semibold tracking-tight">Recent Posts</h2>
      <div className="space-y-3">
        {posts.map((post) => (
          <Link
            key={post.frontmatter.slug}
            href={`/blog/${post.frontmatter.slug}`}
            className="group block rounded-lg border border-border p-4 transition-colors hover:bg-surface"
          >
            <span className="inline-block rounded bg-accent-bg px-2 py-0.5 font-mono text-xs text-accent">
              {post.frontmatter.category.replace("-", " & ")}
            </span>
            <h3 className="mt-1 text-sm font-medium">
              {post.frontmatter.title}
            </h3>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {formatDate(post.frontmatter.date)} · {post.readingTime} min read
            </p>
          </Link>
        ))}
      </div>
    </aside>
  );
}
