import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/constants";
import { getAllPosts, getCategoryCounts } from "@/lib/blog";
import { PostCard } from "@/components/blog/PostCard";
import { CategoryFilter } from "@/components/blog/CategoryFilter";
import { blogCategoryEnum } from "@/lib/blog/schema";
import type { BlogCategory } from "@/lib/blog/schema";
import { RevealOnScroll } from "@/components/animation/RevealOnScroll";

export const metadata: Metadata = {
  title: "Blog — Shivanshu Tiwari",
  description:
    "Technical writing on AI agent architecture, backend systems design, and honest post-mortems from real projects — including why reinforcement learning lost to a simple heuristic.",
  openGraph: {
    title: "Blog — Shivanshu Tiwari",
    description:
      "Technical writing on AI agent architecture, backend systems design, and honest post-mortems from real projects.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog — Shivanshu Tiwari",
    description:
      "Technical writing on AI agent architecture, backend systems design, and honest post-mortems from real projects.",
  },
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
  robots: "index, follow",
};

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const parsed = category ? blogCategoryEnum.safeParse(category) : null;
  const activeCategory: BlogCategory | null = parsed?.success ? parsed.data : null;

  const allPosts = getAllPosts("en");
  const counts = getCategoryCounts("en");

  const filteredPosts = activeCategory
    ? allPosts.filter((p) => p.frontmatter.category === activeCategory)
    : allPosts;

  return (
    <div className="mx-auto max-w-3xl flex-1 px-4 py-20">
      <RevealOnScroll>
        <h1 className="font-display mb-2 text-3xl font-bold tracking-tight">Blog</h1>
      </RevealOnScroll>

      <RevealOnScroll>
        <p className="mb-8 text-muted">
          Field notes, repo deep-dives, model &amp; tool drops, and article reactions.
        </p>
      </RevealOnScroll>

      <RevealOnScroll>
        <CategoryFilter counts={counts} activeCategory={activeCategory} />
      </RevealOnScroll>

      {filteredPosts.length === 0 ? (
        <RevealOnScroll>
          <div className="flex flex-col items-center gap-3 rounded-lg border border-border bg-card px-6 py-12 text-center">
            <span className="font-mono text-sm text-muted-foreground" aria-hidden="true">
              ── ∅ ──
            </span>
            <p className="text-sm text-muted-foreground">
              No posts in this category yet.
            </p>
            {activeCategory && (
              <Link
                href="/blog"
                className="rounded-md border border-border bg-surface px-3 py-1.5 font-mono text-xs text-muted transition-colors hover:border-accent/50 hover:text-foreground"
              >
                View all posts
              </Link>
            )}
          </div>
        </RevealOnScroll>
      ) : (
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <RevealOnScroll key={post.frontmatter.slug}>
              <PostCard
                title={post.frontmatter.title}
                slug={post.frontmatter.slug}
                date={post.frontmatter.date}
                category={post.frontmatter.category}
                excerpt={post.frontmatter.excerpt}
                readingTime={post.readingTime}
              />
            </RevealOnScroll>
          ))}
        </div>
      )}
    </div>
  );
}
