"use client";

import { useRef, useState, useEffect, useMemo } from "react";

export function RevealOnScroll({
  children,
  className,
  delay,
  index,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  index?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const [reduced] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
  });

  const [visible, setVisible] = useState(() => reduced);

  const computedDelay = useMemo(
    () => delay ?? (index !== undefined ? Math.min(index * 60, 420) : 0),
    [delay, index]
  );

  useEffect(() => {
    if (reduced) return;

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [reduced]);

  const show = reduced || visible;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0)" : "translateY(16px)",
        transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
        transitionDelay: `${computedDelay}ms`,
      }}
    >
      {children}
    </div>
  );
}
