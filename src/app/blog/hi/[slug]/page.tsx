import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/blog";
import Image from "next/image";
import { SITE_URL } from "@/lib/constants";
import { formatDate } from "@/lib/blog/utils";
import { BlogPostSchema } from "@/components/seo/BlogPostSchema";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import { CATEGORY_LABELS } from "@/lib/blog/constants";
import { BlogTOC } from "@/components/blog/BlogTOC";
import { ReadingProgressBar } from "@/components/blog/ReadingProgressBar";
import { BackToTop } from "@/components/blog/BackToTop";
import { RecentPosts } from "@/components/blog/RecentPosts";
import { PersonMention } from "@/components/blog/PersonMention";
import { ImageCarousel } from "@/components/blog/ImageCarousel";
import { PhotoStrip } from "@/components/gallery/PhotoStrip";
import { LanguageToggle } from "@/components/blog/LanguageToggle";
import { getAllSlugs } from "@/lib/blog";

export function generateStaticParams() {
  return getAllSlugs("hi").map((slug) => ({ slug }));
}

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
      canonical: `${SITE_URL}/blog/hi/${slug}`,
      languages: {
        en: `${SITE_URL}/blog/${slug}`,
        hi: `${SITE_URL}/blog/hi/${slug}`,
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

      <ReadingProgressBar />
      <main className="mx-auto max-w-2xl flex-1 px-4 py-16">
        <Link
          href="/blog"
          className="mb-8 inline-block font-mono text-xs text-muted-foreground hover:text-accent transition-colors"
        >
          ← ब्लॉग पर वापस
        </Link>

        <article className="relative">
          <header className="mb-8">
            <div className="mb-3 flex items-center gap-3">
              <span className="inline-block rounded bg-accent-bg px-2 py-0.5 font-mono text-xs text-accent">
                {CATEGORY_LABELS[frontmatter.category] ?? frontmatter.category}
              </span>
              <span className="text-xs text-muted-foreground">
                {formatDate(frontmatter.date)}
              </span>
              <span className="font-mono text-xs text-muted-foreground">
                {post.readingTime} min read
              </span>

              <LanguageToggle slug={slug} currentLang="hi" />
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {frontmatter.title}
            </h1>

            <p className="mt-3 text-lg text-muted">{frontmatter.excerpt}</p>

            {frontmatter.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {frontmatter.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-border bg-surface px-2 py-0.5 font-mono text-xs text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

          </header>

          <div className="blog-content-wrapper">
            <MDXRemote
              source={post.content}
              components={{
                PersonMention,
                ImageCarousel,
                PhotoStrip,
                img: (props) => {
                  const { src, alt } = props;
                  if (!src) return null;
                  return (
                    <span className="relative block aspect-[16/9] w-full overflow-hidden rounded-lg border border-border my-6">
                      <Image
                        src={src}
                        alt={alt || ""}
                        fill
                        sizes="(max-width: 768px) 100vw, 800px"
                        className="object-cover animate-pulse-once"
                      />
                    </span>
                  );
                },
              }}
              options={{
                mdxOptions: {
                  rehypePlugins: [
                    rehypeSlug,
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

        <RecentPosts currentSlug={slug} lang="hi" />
      </main>
      <aside className="fixed right-8 top-24 hidden w-56 xl:block">
        <BlogTOC />
      </aside>
      <BackToTop />
    </>
  );
}
