"use client";

/* eslint-disable react-hooks/set-state-in-effect -- intentional hydration/observer pattern */
import { useRef, useState, useEffect, useMemo } from "react";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

type Direction = "up" | "down" | "left" | "right" | "scale";

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  index?: number;
  direction?: Direction;
}

const directionStyles: Record<Direction, { hidden: string; visible: string }> = {
  up: { hidden: "translateY(24px)", visible: "translateY(0)" },
  down: { hidden: "translateY(-24px)", visible: "translateY(0)" },
  left: { hidden: "translateX(-24px)", visible: "translateX(0)" },
  right: { hidden: "translateX(24px)", visible: "translateX(0)" },
  scale: { hidden: "scale(0.95)", visible: "scale(1)" },
};

export function RevealOnScroll({
  children,
  className,
  delay,
  index,
  direction = "up",
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  // Hydration-safe pattern: server & first client render are identical (visible).
  // After hydration, we enable the observer-based reveal logic.
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (reduced) setVisible(true);
  }, [reduced]);

  const computedDelay = useMemo(
    () => delay ?? (index !== undefined ? Math.min(index * 80, 560) : 0),
    [delay, index]
  );

  useEffect(() => {
    if (!hydrated || reduced) return;

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hydrated, reduced]);

  // Not hydrated yet → render fully visible (matches server)
  if (!hydrated) {
    return <div className={className}>{children}</div>;
  }

  const show = reduced || visible;
  const dir = directionStyles[direction];

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: show ? 1 : 0,
        transform: show ? dir.visible : dir.hidden,
        transition: "opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1), transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
        transitionDelay: show ? "0ms" : `${computedDelay}ms`,
      }}
    >
      {children}
    </div>
  );
}
