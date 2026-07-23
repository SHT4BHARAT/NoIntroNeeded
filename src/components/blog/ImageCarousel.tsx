'use client';

import { useRef, type ReactNode } from "react";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

interface ImageCarouselProps {
  children: ReactNode;
}

export function ImageCarousel({ children }: ImageCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const scroll = (direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;
    const scrollAmount = container.clientWidth;
    container.scrollBy({
      left: direction === "right" ? scrollAmount : -scrollAmount,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <div className="relative group my-6">
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/80"
        aria-label="Previous"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
      </button>
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/80"
        aria-label="Next"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
      </button>
      <div
        ref={scrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth gap-4 no-scrollbar"
        style={{ scrollbarWidth: "none" }}
      >
        {Array.isArray(children) ? (
          chunks(children as ReactNode[], 2).map((pair, i) => (
            <div key={i} className="flex gap-4 snap-start shrink-0 w-full">
              {pair.map((child, j) => (
                <div key={j} className="flex-1 min-w-0">{child}</div>
              ))}
            </div>
          ))
        ) : (
          <div className="flex gap-4 snap-start shrink-0 w-full">
            <div className="flex-1 min-w-0">{children}</div>
          </div>
        )}
      </div>
    </div>
  );
}

function chunks<T>(arr: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}
