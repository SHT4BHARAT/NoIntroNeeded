'use client';

import { useRef, useCallback, useMemo, Children, isValidElement, type ReactNode } from "react";
import Image from "next/image";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

interface Photo {
  src: string;
  alt: string;
}

interface PhotoStripProps {
  photos?: Photo[];
  category?: string;
  children?: ReactNode;
}

function getIsTouchDevice(): boolean {
  if (typeof window === "undefined") return false;
  return "ontouchstart" in window;
}

export function PhotoStrip({ photos, children }: PhotoStripProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({ isDown: false, startX: 0, scrollLeft: 0 });

  const prefersReducedMotion = useReducedMotion();
  const isTouchDevice = getIsTouchDevice();

  const resolvedPhotos = useMemo<Photo[]>(() => {
    if (photos) return photos;
    if (!children) return [];

    const photosList: Photo[] = [];
    const traverse = (node: ReactNode) => {
      if (!node) return;
      if (Array.isArray(node)) {
        node.forEach(traverse);
        return;
      }
      if (isValidElement(node)) {
        const props = node.props as Record<string, unknown>;
        if (typeof props.src === "string") {
          photosList.push({
            src: props.src,
            alt: typeof props.alt === "string" ? props.alt : "",
          });
        } else if (props.children) {
          Children.toArray(props.children as ReactNode).forEach(traverse);
        }
      }
    };

    Children.toArray(children).forEach(traverse);
    return photosList;
  }, [photos, children]);

  const scroll = useCallback(
    (direction: "left" | "right") => {
      const container = scrollRef.current;
      if (!container) return;
      container.scrollBy({
        left: direction === "right" ? container.clientWidth : -container.clientWidth,
        behavior: prefersReducedMotion ? "instant" : "smooth",
      });
    },
    [prefersReducedMotion],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft") { e.preventDefault(); scroll("left"); }
      if (e.key === "ArrowRight") { e.preventDefault(); scroll("right"); }
    },
    [scroll],
  );

  const onMouseDown = (e: React.MouseEvent) => {
    const container = scrollRef.current;
    if (!container) return;
    dragState.current = {
      isDown: true,
      startX: e.pageX - container.offsetLeft,
      scrollLeft: container.scrollLeft,
    };
  };

  const onMouseUp = () => { dragState.current.isDown = false; };
  const onMouseLeave = () => { dragState.current.isDown = false; };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragState.current.isDown) return;
    e.preventDefault();
    const container = scrollRef.current;
    if (!container) return;
    const x = e.pageX - container.offsetLeft;
    const walk = (x - dragState.current.startX) * 1.5;
    container.scrollLeft = dragState.current.scrollLeft - walk;
  };

  if (resolvedPhotos.length === 0) return null;

  const showArrows = !isTouchDevice && resolvedPhotos.length > 2;

  return (
    <div
      className="relative group my-6"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Photo gallery"
    >
      {showArrows && (
        <>
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-black/40 text-white opacity-70 hover:opacity-100 transition-opacity hover:bg-black/60 focus-visible:opacity-100"
            aria-label="Previous photos"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-black/40 text-white opacity-70 hover:opacity-100 transition-opacity hover:bg-black/60 focus-visible:opacity-100"
            aria-label="Next photos"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </>
      )}

      <div
        ref={scrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory gap-4 cursor-grab active:cursor-grabbing"
        style={{ scrollbarWidth: "none", scrollBehavior: prefersReducedMotion ? "auto" : "smooth" }}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
        onMouseMove={onMouseMove}
      >
        {resolvedPhotos.map((photo, idx) => (
          <div
            key={idx}
            className="relative snap-start shrink-0 w-[280px] sm:w-[320px] lg:w-[380px] h-[200px] sm:h-[250px] lg:h-[300px] rounded-lg overflow-hidden border border-border"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 70vw, 320px"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
