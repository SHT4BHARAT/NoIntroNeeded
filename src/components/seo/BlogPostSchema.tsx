import { SITE_URL } from "@/lib/constants";
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
    url: `${SITE_URL}/blog/${frontmatter.lang === "hi" ? "hi/" : ""}${frontmatter.slug}`,
    author: {
      "@type": "Person",
      name: "Shivanshu Tiwari",
    },
    publisher: {
      "@type": "Organization",
      name: "Shivanshu Tiwari",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/icon.svg`,
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
