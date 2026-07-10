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
        className="rounded-lg border border-border bg-card p-5 transition-[transform,box-shadow,border-color,background-color] duration-150 ease-out hover:-translate-y-4 hover:border-accent/70 hover:bg-surface hover:shadow-[0_12px_30px_-18px_rgba(34,211,238,0.40)] focus-visible:-translate-y-4 focus-visible:border-accent/70 focus-visible:bg-surface focus-visible:shadow-[0_12px_30px_-18px_rgba(34,211,238,0.40)] focus-visible:outline-none motion-reduce:transform-none motion-reduce:shadow-none motion-reduce:transition-none"
      >
        <div className="mb-2 flex items-center gap-3">
          <span className="inline-block rounded bg-accent/10 px-2 py-0.5 font-mono text-xs text-accent">
            {CATEGORY_LABELS[category]}
          </span>
          <span className="text-xs text-muted-foreground">
            {formatDate(date)}
          </span>
        </div>
        <h2 className="text-lg font-semibold tracking-tight group-hover:text-accent transition-colors">
          {title}
        </h2>
        <p className="mt-1 line-clamp-2 text-sm text-muted">{excerpt}</p>
        <span className="mt-2 inline-block font-mono text-xs text-muted-foreground">
          {readingTime} min read
        </span>
      </article>
    </Link>
  );
}
