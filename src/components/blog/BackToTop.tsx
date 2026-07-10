"use client";

import { useEffect, useState } from "react";

export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    const onScroll = () => setShow(window.scrollY > 600);

    if (reduce) {
      // Still allow the button, just without extra animation elsewhere.
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href="#top"
      className={[
        "fixed bottom-5 right-5 z-[60] rounded-md border border-border bg-background/80 px-3 py-2 text-xs font-mono",
        "transition-all duration-200",
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none",
        "hover:border-accent/60 hover:text-accent",
        "backdrop-blur-sm",
      ].join(" ")}
      aria-label="Back to top"
    >
      ↑ Top
    </a>
  );
}
