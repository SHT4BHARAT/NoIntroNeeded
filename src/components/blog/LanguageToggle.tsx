import Link from "next/link";

export function LanguageToggle({
  slug,
  currentLang,
}: {
  slug: string;
  currentLang: "en" | "hi";
}) {
  const otherLang = currentLang === "en" ? "hi" : "en";
  const href = otherLang === "en" ? `/blog/${slug}` : `/blog/hi/${slug}`;

  return (
    <div className="flex items-center gap-1.5 rounded-lg border border-border bg-surface px-2 py-1">
      <span
        className={`rounded px-1.5 py-0.5 font-mono text-xs transition-colors ${
          currentLang === "en"
            ? "bg-accent text-accent-foreground"
            : "text-muted-foreground"
        }`}
      >
        EN
      </span>
      <span className="text-xs text-muted-foreground">/</span>
      <Link
        href={href}
        className={`rounded px-1.5 py-0.5 font-mono text-xs transition-colors hover:text-foreground ${
          currentLang === "hi"
            ? "bg-accent text-accent-foreground"
            : "text-muted-foreground"
        }`}
      >
        HI
      </Link>
    </div>
  );
}
