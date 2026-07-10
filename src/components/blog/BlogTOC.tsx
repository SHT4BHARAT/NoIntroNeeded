"use client";

import { useEffect, useMemo, useState } from "react";

type TocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

function getHeadingText(el: Element) {
  const clones = Array.from(el.childNodes).map((n) => {
    if (n.nodeType === Node.TEXT_NODE) return n.textContent ?? "";
    // ignore nested elements (icons/links), keep their text
    return (n as HTMLElement).innerText ?? "";
  });
  return clones.join("").replace(/\s+/g, " ").trim();
}

export function BlogTOC({ className }: { className?: string }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const items = useMemo<TocItem[]>(() => {
    if (typeof document === "undefined") return [];
    const headings = Array.from(
      document.querySelectorAll<HTMLElement>("article h2[id], article h3[id]")
    );

    const next = headings
      .map((h) => {
        const level = (h.tagName.toLowerCase() === "h2" ? 2 : 3) as 2 | 3;
        return {
          id: h.id,
          text: getHeadingText(h),
          level,
        };
      })
      .filter((x) => x.text.length > 0);

    return next;
  }, []);

  useEffect(() => {
    const headings = Array.from(
      document.querySelectorAll<HTMLElement>("article h2[id], article h3[id]")
    );
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduce) return;

    const io = new IntersectionObserver(
      (entries) => {
        // pick the first intersecting one closest to top
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (a.boundingClientRect.top ?? 0) - (b.boundingClientRect.top ?? 0));
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      {
        // Activate when heading crosses top-ish viewport
        root: null,
        threshold: [0, 0.1, 0.2],
        rootMargin: "-20% 0px -70% 0px",
      }
    );

    for (const h of headings) io.observe(h);

    return () => io.disconnect();
  }, []);

  const toc = useMemo(() => {
    return items.map((item) => {
      const isActive = activeId === item.id;
      return (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            className={[
              "block rounded-md px-2 py-1 text-xs transition-colors",
              item.level === 3 ? "pl-4" : "pl-0",
              isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
            ].join(" ")}
          >
            {item.text}
          </a>
        </li>
      );
    });
  }, [items, activeId]);

  if (!items.length) return null;

  return (
    <nav className={className} aria-label="Table of contents">
      <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted">
        On this page
      </div>
      <ul className="space-y-1">{toc}</ul>
    </nav>
  );
}
