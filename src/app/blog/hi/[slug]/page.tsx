import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/blog";
import { formatDate } from "@/lib/blog/utils";
import { BlogPostSchema } from "@/components/seo/BlogPostSchema";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug, "hi");

  if (!post) return {};

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.excerpt,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.excerpt,
      type: "article",
      publishedTime: post.frontmatter.date,
      locale: "hi_IN",
    },
    alternates: {
      languages: {
        en: `/blog/${slug}`,
      },
    },
  };
}

export default async function HindiBlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug, "hi");

  if (!post) notFound();

  const { frontmatter } = post;

  return (
    <>
      <BlogPostSchema frontmatter={frontmatter} />
      <BreadcrumbSchema
        items={[
          { name: "Blog", href: "/blog" },
          { name: frontmatter.title, href: `/blog/hi/${slug}` },
        ]}
      />

      <main className="mx-auto max-w-2xl flex-1 px-4 py-16">
        <Link
          href="/blog"
          className="mb-8 inline-block font-mono text-xs text-muted-foreground hover:text-accent transition-colors"
        >
          ← ब्लॉग पर वापस
        </Link>

        <article>
          <header className="mb-8">
            <div className="mb-2 text-xs text-muted-foreground">
              {formatDate(frontmatter.date)} · {post.readingTime} min read
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {frontmatter.title}
            </h1>

            <p className="mt-3 text-lg text-muted">{frontmatter.excerpt}</p>

            {frontmatter.translationOf && (
              <p className="mt-3 text-sm text-muted-foreground">
                <Link
                  href={`/blog/${frontmatter.translationOf}`}
                  className="text-accent underline decoration-accent/30 underline-offset-2 hover:decoration-accent"
                >
                  Read in English
                </Link>
              </p>
            )}
          </header>

          <div className="prose-custom">
            <MDXRemote
              source={post.content}
              options={{
                mdxOptions: {
                  rehypePlugins: [
                    [
                      rehypePrettyCode,
                      {
                        theme: { dark: "github-dark", light: "github-light" },
                        keepBackground: false,
                        defaultLang: "plaintext",
                      },
                    ],
                  ],
                },
              }}
            />
          </div>
        </article>
      </main>
    </>
  );
}
