import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Page Not Found",
};

const suggestions = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/projects/agentic-honeypot", label: "Featured Project" },
  { href: "/achievements", label: "Achievements" },
  { href: "/contact", label: "Contact" },
];

export default function NotFound() {
  return (
    <main className="mx-auto flex max-w-2xl flex-1 flex-col items-center justify-center px-4 text-center">
      <span className="font-mono text-6xl font-bold text-accent">404</span>
      <h1 className="mt-4 text-2xl font-bold tracking-tight">Page not found</h1>
      <p className="mt-2 text-muted">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>

      <div className="mt-6 flex w-full flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <Link
          href="/"
          className="rounded-lg bg-accent px-6 py-2.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 active:translate-y-px active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
        >
          Go home
        </Link>
        <Link
          href="/blog"
          className="rounded-lg border border-border px-6 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-surface hover:text-foreground active:translate-y-px active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
        >
          Read the blog
        </Link>
      </div>

      <div className="mt-8 w-full">
        <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted">
          Suggested pages
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {suggestions.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="rounded-md border border-border bg-surface px-3 py-1.5 text-xs font-mono text-muted transition-colors hover:border-accent/60 hover:text-foreground active:translate-y-px active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
            >
              {s.label}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
