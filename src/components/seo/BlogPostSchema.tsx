import type { BlogFrontmatter } from "@/lib/blog/schema";

export function BlogPostSchema({
  frontmatter,
}: {
  frontmatter: BlogFrontmatter;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: frontmatter.title,
    datePublished: frontmatter.date,
    dateModified: frontmatter.updated ?? frontmatter.date,
    description: frontmatter.excerpt,
    author: {
      "@type": "Person",
      name: "Shivanshu Tiwari",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
