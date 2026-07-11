"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

type Platform = "linkedin" | "x";

export type PersonMentionProps = {
  name: string;
  role?: string;
  platform: Platform;
  profileUrl: string;
};

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d="M18.9 2H22l-6.8 7.78L23 22h-6.2l-4.85-6.2L5.9 22H2l7.36-8.43L1 2h6.3l4.4 5.64L18.9 2Zm-1.1 18h1.7L6.3 3.9H4.5L17.8 20Z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.476-.9 1.637-1.85 3.37-1.85 3.6 0 4.265 2.37 4.265 5.455v6.286ZM5.337 7.433c-1.084 0-1.959-.875-1.959-1.96 0-1.084.875-1.959 1.959-1.959 1.085 0 1.96.875 1.96 1.959 0 1.085-.875 1.96-1.96 1.96ZM7.114 20.452H3.56V9h3.554v11.452Z" />
    </svg>
  );
}

export function PersonMention({
  name,
  role,
  platform,
  profileUrl,
}: PersonMentionProps) {
  const rootRef = useRef<HTMLSpanElement | null>(null);

  const [open, setOpen] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia?.("(pointer: fine)");
    if (!mq) return;

    const update = () => setIsFinePointer(!!mq.matches);
    update();

    // Safari fallback: some browsers may not support addEventListener on MediaQueryList
    if (typeof mq.addEventListener === "function") {
      mq.addEventListener("change", update);
      return () => mq.removeEventListener("change", update);
    } else {
      const legacyMq = mq as unknown as {
        addListener: (cb: () => void) => void;
        removeListener: (cb: () => void) => void;
      };
      legacyMq.addListener(update);
      return () => legacyMq.removeListener(update);
    }
  }, []);

  const label = useMemo(() => {
    const rolePart = role ? ` — ${role}` : "";
    return `Follow ${name}${rolePart} on ${platform === "x" ? "X" : "LinkedIn"}`;
  }, [name, role, platform]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current) return;
      if (e.target instanceof Node && rootRef.current.contains(e.target)) return;
      setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointerdown", onPointerDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  const Icon = platform === "x" ? XIcon : LinkedInIcon;

  return (
    <span
      ref={rootRef}
      className="relative inline-flex"
      aria-label={label}
    >
      <button
        type="button"
        className="inline-flex cursor-pointer items-baseline gap-1 rounded px-0.5 text-inherit underline decoration-dotted decoration-accent/60 underline-offset-4 transition-colors hover:decoration-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
        aria-haspopup="dialog"
        aria-expanded={open}
        onMouseEnter={() => {
          if (isFinePointer) setOpen(true);
        }}
        onMouseLeave={() => {
          if (isFinePointer) setOpen(false);
        }}
        onBlur={(e) => {
          // blur should dismiss when focus moves outside the component
          const next = e.relatedTarget as Node | null;
          if (next && rootRef.current?.contains(next)) return;
          setOpen(false);
        }}
        onFocus={() => {
          // Always show on keyboard focus (accessibility requirement)
          setOpen(true);
        }}
        onClick={() => {
          // Tap-to-toggle on coarse pointers (mobile)
          if (!isFinePointer) setOpen((v) => !v);
        }}
      >
        {name}
      </button>

      {open && (
        <div
          role="dialog"
          aria-label={`Profile card for ${name}`}
          className={[
            "absolute z-50 mt-2 w-56 rounded-lg border border-border bg-surface p-3 shadow-lg",
            "origin-top-left",
            "transition-transform transition-opacity duration-150 ease-out",
            "motion-safe:scale-100 motion-safe:opacity-100",
          ].join(" ")}
          style={{ transformOrigin: "top left" }}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold">{name}</div>
              {role ? (
                <div className="mt-1 truncate text-xs text-muted-foreground">
                  {role}
                </div>
              ) : null}
            </div>

            <div className="mt-0.5 inline-flex items-center justify-center">
              <Icon className="h-4 w-4 text-accent" />
            </div>
          </div>

          <div className="mt-3">
            <a
              href={profileUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center justify-center rounded-md bg-accent px-3 py-2 text-xs font-semibold text-accent-foreground transition-colors hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
            >
              Follow
            </a>
          </div>

          <div className="mt-2 text-[11px] text-muted-foreground">
            Press <span className="font-mono">Esc</span> to close
          </div>
        </div>
      )}

      {/* If user prefers reduced motion, still show/hide but without transition */}
      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          .transition-transform,
          .transition-opacity {
            transition: none !important;
          }
        }
      `}</style>
    </span>
  );
}
