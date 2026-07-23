"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

export function CursorSpotlight() {
  const ref = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if ("ontouchstart" in window) return;

    if (prefersReducedMotion) {
      el.style.setProperty("--x", "50vw");
      el.style.setProperty("--y", "50vh");
      return;
    }

    const handleMouse = (e: MouseEvent) => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        el.style.setProperty("--x", `${e.clientX}px`);
        el.style.setProperty("--y", `${e.clientY}px`);
      });
    };

    window.addEventListener("mousemove", handleMouse, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouse);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-[3] pointer-events-none"
      aria-hidden="true"
      style={{
        backgroundImage:
          "radial-gradient(circle 400px at var(--x) var(--y), rgba(124,111,224,0.08), transparent 80%)",
      }}
    />
  );
}
