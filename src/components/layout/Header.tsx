"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { cn } from "@/lib/utils/cn";
import { useTheme } from "@/components/providers/ThemeProvider";
import { RoleSwitcher } from "./RoleSwitcher";
import { SunIcon } from "@/components/icons/SunIcon";
import { MoonIcon } from "@/components/icons/MoonIcon";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/education", label: "Education" },
  { href: "/experience", label: "Experience" },
  { href: "/achievements", label: "Achievements" },
  { href: "/blog", label: "Blogs" },
  { href: "/volunteer", label: "Volunteer" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

function isActiveLink(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/" ||
      pathname.startsWith("/ai-engineer") ||
      pathname.startsWith("/backend-systems");
  }
  if (pathname.startsWith(href)) return true;
  if (href === "/blog" && (pathname.startsWith("/blog/") || pathname.startsWith("/blog/hi/"))) return true;
  if (href === "/achievements" && pathname.startsWith("/achievements/")) return true;
  if (href === "/contact" && pathname.startsWith("/contact/")) return true;
  return false;
}

function ThemeToggleButton() {
  const { theme, toggleTheme, hydrated } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex h-9 w-9 items-center justify-center rounded-md text-sm text-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 hover:bg-surface hover:text-foreground"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <span>
        {hydrated && theme === "light" ? <MoonIcon /> : <SunIcon />}
      </span>
    </button>
  );
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <nav className="flex items-center gap-6 text-sm">
          <Link
            href="/"
            className="font-mono text-base font-medium tracking-tight transition-colors hover:text-accent"
          >
            Shivanshu Tiwari
          </Link>

          <div className="hidden items-center gap-6 text-sm lg:flex">
            {navLinks.map((link) => (
              <div key={link.href} className="relative">
                <Link
                  href={link.href}
                  className={cn(
                    "transition-colors active:translate-y-px active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 hover:text-foreground",
                    isActiveLink(pathname, link.href) ? "text-foreground after:absolute after:-bottom-[14px] after:left-0 after:right-0 after:h-px after:bg-accent" : "text-muted",
                  )}
                >
                  {link.label}
                </Link>
              </div>
            ))}
          </div>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setOpen((v: boolean) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 hover:bg-surface hover:text-foreground lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <span className="sr-only">Menu</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d={
                  open
                    ? "M6 6l12 12M18 6L6 18"
                    : "M4 6h16M4 12h16M4 18h16"
                }
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>

          <RoleSwitcher />

          <ThemeToggleButton />
        </div>
      </div>

      <div className={cn("lg:hidden", open ? "block" : "hidden")} style={{ overscrollBehavior: "contain" }}>
        <div className="mx-auto max-w-5xl px-4 pb-4">
          <div className="rounded-lg border border-border bg-card p-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "block rounded-md px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 hover:bg-surface hover:text-foreground",
                  isActiveLink(pathname, link.href) ? "text-foreground" : "text-muted",
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
