"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRole } from "@/components/providers/RoleProvider";
import { ShieldIcon } from "@/components/icons/ShieldIcon";

const roleLabels: Record<string, string> = {
  "ai-engineer": "AI / Agentic",
  "backend-systems": "Backend / Systems",
};

export function RoleSwitcher() {
  const { currentRole, selectRole } = useRole();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) close();
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape" && open) {
        close();
        triggerRef.current?.focus();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [close, open]);

  function handleSelect(role: string | null) {
    selectRole(role);
    close();
    triggerRef.current?.focus();
  }

  return (
    <div className="relative" ref={ref}>
      <button
        ref={triggerRef}
        onClick={() => setOpen((v) => !v)}
        className="flex h-8 items-center gap-1.5 rounded-md border border-border px-2.5 text-xs font-mono text-muted transition-colors hover:bg-surface hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
        aria-label="Switch role view"
        aria-expanded={open}
        aria-haspopup="true"
      >
        <ShieldIcon />
        {currentRole ? roleLabels[currentRole] ?? currentRole : "Role View"}
      </button>

      {open && (
        <div
          className="absolute right-0 top-full mt-1 w-56 rounded-lg border border-border bg-card p-1.5 shadow-lg"
          role="menu"
        >
          <p className="px-2.5 py-1.5 text-xs text-muted">Switch role view</p>
          <button
            onClick={() => handleSelect("ai-engineer")}
            className="flex w-full items-center rounded-md px-2.5 py-2 text-left text-sm transition-colors hover:bg-surface focus-visible:bg-surface focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent/50"
            role="menuitem"
          >
            <div>
              <div className="font-medium">AI / Agentic Engineer</div>
              <div className="text-xs text-muted">
                Scam-detection agents, RL benchmarks, voice intelligence
              </div>
            </div>
          </button>
          <button
            onClick={() => handleSelect("backend-systems")}
            className="flex w-full items-center rounded-md px-2.5 py-2 text-left text-sm transition-colors hover:bg-surface focus-visible:bg-surface focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent/50"
            role="menuitem"
          >
            <div>
              <div className="font-medium">Backend / Systems Engineer</div>
              <div className="text-xs text-muted">
                Concurrency-safe engines, real-time dispatch, event-driven infra
              </div>
            </div>
          </button>
          <button
            onClick={() => handleSelect(null)}
            className="flex w-full items-center rounded-md px-2.5 py-2 text-left text-sm transition-colors hover:bg-surface focus-visible:bg-surface focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent/50"
            role="menuitem"
          >
            <div>
              <div className="font-medium">Show me everything</div>
              <div className="text-xs text-muted">No role framing, ranked by what&apos;s working</div>
            </div>
          </button>
        </div>
      )}
    </div>
  );
}
