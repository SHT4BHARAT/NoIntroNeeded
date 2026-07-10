import type { Metadata } from "next";
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
    <main className="mx-auto max-w-2xl flex-1 px-4 py-16">
      <RevealOnScroll>
        <h1 className="mb-2 text-3xl font-bold tracking-tight">Blog</h1>
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
          <p className="text-sm text-muted-foreground">No posts yet.</p>
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
    </main>
  );
}
