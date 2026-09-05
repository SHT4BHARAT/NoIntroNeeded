"use client";

import { useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

type TocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

function getHeadingText(el: Element) {
  const clones = Array.from(el.childNodes).map((n) => {
    if (n.nodeType === Node.TEXT_NODE) return n.textContent ?? "";
    return (n as HTMLElement).innerText ?? "";
  });
  return clones.join("").replace(/\s+/g, " ").trim();
}

export function BlogTOC({ className }: { className?: string }) {
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const headings = Array.from(
      document.querySelectorAll<HTMLElement>("article h2[id], article h3[id]")
    );

    const next = headings
      .map((h) => {
        const level = (h.tagName.toLowerCase() === "h2" ? 2 : 3) as 2 | 3;
        return { id: h.id, text: getHeadingText(h), level };
      })
      .filter((x) => x.text.length > 0);

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setItems(next);
  }, []);

  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const headings = Array.from(
      document.querySelectorAll<HTMLElement>("article h2[id], article h3[id]")
    );
    if (prefersReducedMotion) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (a.boundingClientRect.top ?? 0) - (b.boundingClientRect.top ?? 0));
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      {
        root: null,
        threshold: [0, 0.1, 0.2],
        rootMargin: "-20% 0px -70% 0px",
      }
    );

    for (const h of headings) io.observe(h);

    return () => io.disconnect();
  }, [prefersReducedMotion]);

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

  return (
    <nav className={className} aria-label="Table of contents">
      {items.length > 0 && (
        <>
          <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted">
            On this page
          </div>
          <ul className="space-y-1">{toc}</ul>
        </>
      )}
    </nav>
  );
}
