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
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);

  const computedDelay = useMemo(
    () => delay ?? (index !== undefined ? Math.min(index * 60, 420) : 0),
    [delay, index]
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    if (mq.matches) {
      setVisible(true);
      return;
    }

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
  }, []);

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
