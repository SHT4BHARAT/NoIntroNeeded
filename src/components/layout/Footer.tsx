import Link from "next/link";
import { SITE_NAME, SOCIAL } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-4 py-10 sm:flex-row sm:justify-between">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <p className="text-sm text-muted">
            &copy; {new Date().getFullYear()} {SITE_NAME}
          </p>
          <form
            action="/#projects"
            method="GET"
            role="search"
            toolname="search_portfolio_projects"
            tooldescription="Search Shivanshu Tiwari's 19 portfolio projects, tech stacks, and case studies"
            className="flex items-center gap-2"
          >
            <label htmlFor="footer-project-search" className="sr-only">
              Search projects
            </label>
            <input
              id="footer-project-search"
              type="search"
              name="query"
              toolparam="query"
              placeholder="Search projects or stack..."
              className="rounded-md border border-border bg-surface px-3 py-1 text-xs text-foreground placeholder:text-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
            />
            <button
              type="submit"
              className="rounded-md bg-surface px-2.5 py-1 text-xs text-muted transition-colors hover:text-foreground border border-border hover:border-accent/60"
            >
              Search
            </button>
          </form>
        </div>
        <div className="flex items-center gap-5 text-sm text-muted">
          <Link href="/about" className="transition-colors duration-200 hover:text-foreground">
            About
          </Link>
          <Link href="/developers" className="transition-colors duration-200 hover:text-foreground">
            API Docs
          </Link>
          <Link href="/privacy" className="transition-colors duration-200 hover:text-foreground">
            Privacy
          </Link>
          <a
            href="https://github.com/SHT4BHARAT/NoIntroNeeded/blob/main/AGENTS.md"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-200 hover:text-foreground"
          >
            AGENTS.md
          </a>
          <Link
            href={SOCIAL.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub (opens in new tab)"
            className="transition-colors duration-200 hover:text-foreground"
          >
            GitHub
          </Link>
          <Link
            href={SOCIAL.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn (opens in new tab)"
            className="transition-colors duration-200 hover:text-foreground"
          >
            LinkedIn
          </Link>
          <a
            href={SOCIAL.email}
            aria-label="Send email"
            className="transition-colors duration-200 hover:text-foreground"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
