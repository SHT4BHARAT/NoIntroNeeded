import Link from "next/link";
import { CATEGORY_LABELS, CATEGORY_ORDER } from "@/lib/blog/constants";

export function CategoryFilter({
  counts,
  activeCategory,
}: {
  counts: Record<string, number>;
  activeCategory: string | null;
}) {
  return (
    <div className="mb-8 flex flex-wrap gap-2">
      <Link
        href="/blog"
        className={`rounded-md border px-3 py-1.5 font-mono text-xs transition-colors duration-150 ease-out ${
          activeCategory === null
            ? "border-accent bg-accent/10 text-accent"
            : "border-border text-muted hover:bg-surface hover:border-accent/50"
        } motion-reduce:transition-none`}
      >
        All ({Object.values(counts).reduce((a, b) => a + b, 0)})
      </Link>
      {CATEGORY_ORDER.map((cat) => (
        <Link
          key={cat}
          href={`/blog?category=${cat}`}
          className={`rounded-md border px-3 py-1.5 font-mono text-xs transition-colors duration-150 ease-out ${
            activeCategory === cat
              ? "border-accent bg-accent/10 text-accent"
              : "border-border text-muted hover:bg-surface hover:border-accent/50"
          } motion-reduce:transition-none`}
        >
          {CATEGORY_LABELS[cat]} ({counts[cat] || 0})
        </Link>
      ))}
    </div>
  );
}
