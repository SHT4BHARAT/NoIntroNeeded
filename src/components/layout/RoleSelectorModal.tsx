"use client";

import { useEffect, useRef } from "react";
import { useRole } from "@/components/providers/RoleProvider";

export function RoleSelectorModal() {
  const { showSelector, selectRole, dismissSelector } = useRole();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showSelector) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        dismissSelector();
      }
      if (e.key === "Tab" && containerRef.current) {
        const focusable = containerRef.current.querySelectorAll<HTMLElement>(
          "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [showSelector, dismissSelector]);

  if (!showSelector) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" role="presentation">
      <div
        ref={containerRef}
        className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <h2 id="modal-title" className="text-lg font-semibold">
          What are you exploring my work for?
        </h2>
        <p className="mt-1 text-sm text-muted">
          Choose a path or see everything.
        </p>

        <div className="mt-5 flex flex-col gap-3">
          <button
            onClick={() => selectRole("ai-engineer")}
            className="group flex flex-col items-start rounded-lg border border-border bg-surface/50 p-4 text-left transition-colors hover:bg-surface hover:border-accent/50"
          >
            <span className="font-mono text-sm font-medium text-accent">
              AI / Agentic Engineer
            </span>
            <span className="mt-1 text-sm text-muted">
              Scam-detection agents, RL benchmarks, voice intelligence
            </span>
          </button>

          <button
            onClick={() => selectRole("backend-systems")}
            className="group flex flex-col items-start rounded-lg border border-border bg-surface/50 p-4 text-left transition-colors hover:bg-surface hover:border-accent/50"
          >
            <span className="font-mono text-sm font-medium text-accent">
              Backend / Systems Engineer
            </span>
            <span className="mt-1 text-sm text-muted">
              Concurrency-safe engines, real-time dispatch, event-driven infra
            </span>
          </button>

          <button
            onClick={() => selectRole(null)}
            className="group flex flex-col items-start rounded-lg border border-border bg-surface/50 p-4 text-left transition-colors hover:bg-surface"
          >
            <span className="font-mono text-sm font-medium">
              Something else — show me everything
            </span>
            <span className="mt-1 text-sm text-muted">
              No role framing, ranked by what's actually working
            </span>
          </button>
        </div>

        <button
          onClick={dismissSelector}
          className="mt-4 w-full rounded-md py-2 text-sm text-muted transition-colors hover:text-foreground"
        >
          Skip — go to homepage
        </button>
      </div>
    </div>
  );
}
