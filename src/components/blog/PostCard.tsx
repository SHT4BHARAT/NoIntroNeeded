import Link from "next/link";
import { formatDate } from "@/lib/blog/utils";
import { CATEGORY_LABELS } from "@/lib/blog/constants";
import type { BlogCategory } from "@/lib/blog/schema";

export function PostCard({
  title,
  slug,
  date,
  category,
  excerpt,
  readingTime,
}: {
  title: string;
  slug: string;
  date: string;
  category: BlogCategory;
  excerpt: string;
  readingTime: number;
}) {
  return (
    <Link href={`/blog/${slug}`} className="group block">
      <article
        className="rounded-lg border border-accent/10 bg-card p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-accent/50 hover:bg-surface group-focus-visible:-translate-y-1 group-focus-visible:border-accent/50 group-focus-visible:bg-surface group-focus-visible:outline-none group-focus-visible:ring-2 group-focus-visible:ring-accent/60 motion-reduce:transform-none motion-reduce:transition-none"
      >
        <div className="mb-3 flex items-center gap-3">
          <span className="inline-block rounded bg-accent-bg px-2 py-0.5 font-mono text-xs text-accent">
            {CATEGORY_LABELS[category]}
          </span>
          <span className="text-xs text-muted-foreground">
            {formatDate(date)}
          </span>
        </div>
        <h2 className="text-lg font-semibold tracking-tight">
          {title}
        </h2>
        <p className="mt-1.5 line-clamp-2 text-sm text-muted leading-relaxed">{excerpt}</p>
        <span className="mt-3 inline-block font-mono text-xs text-muted-foreground">
          {readingTime} min read
        </span>
      </article>
    </Link>
  );
}
