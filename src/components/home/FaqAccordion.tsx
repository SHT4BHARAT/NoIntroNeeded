"use client";

import { useEffect, useState } from "react";

export type FaqItem = { question: string; answer: string };

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const m = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!m) return;
    const update = () => setReduced(!!m.matches);
    update();
    if (typeof m.addEventListener === "function") m.addEventListener("change", update);
    else m.addListener(update);
    return () => {
      if (typeof m.removeEventListener === "function") m.removeEventListener("change", update);
      else m.removeListener(update);
    };
  }, []);

  return reduced;
}

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const reducedMotion = usePrefersReducedMotion();
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  return (
    <div className="mt-4 space-y-4">
      {items.map((item) => {
        const isOpen = openQuestion === item.question;
        const contentId = `faq_${encodeURIComponent(item.question)}`;

        return (
          <div key={item.question} className="group rounded-lg border border-border">
            <button
              type="button"
              className="flex w-full cursor-pointer items-center justify-between gap-4 px-4 py-3 text-left text-sm font-medium transition-colors hover:bg-surface"
              aria-expanded={isOpen}
              aria-controls={contentId}
              onClick={() => setOpenQuestion((q) => (q === item.question ? null : item.question))}
            >
              <span>{item.question}</span>
              <span
                aria-hidden="true"
                className="inline-flex h-4 w-4 items-center justify-center text-muted-foreground transition-transform duration-200 ease-out motion-reduce:transition-none"
                style={{
                  transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: reducedMotion ? "none" : undefined,
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </span>
            </button>

            <div
              id={contentId}
              className="border-t border-border overflow-hidden transition-[max-height] duration-200 ease-out motion-reduce:transition-none"
              style={{
                maxHeight: isOpen ? "300px" : "0px",
                transition: reducedMotion ? "none" : undefined,
              }}
            >
              <div className="px-4 py-3 text-sm text-muted">
                {item.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
