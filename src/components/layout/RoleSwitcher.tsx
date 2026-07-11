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

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) close();
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [close]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen((v) => !v);
    }
  }

  function handleSelect(role: string | null) {
    selectRole(role);
    close();
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        onKeyDown={handleKeyDown}
        className="flex h-8 items-center gap-1.5 rounded-md border border-border px-2.5 text-xs font-mono text-muted transition-colors hover:bg-surface hover:text-foreground"
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
            onKeyDown={(e) => e.key === "Escape" && close()}
            className="flex w-full items-center rounded-md px-2.5 py-2 text-left text-sm transition-colors hover:bg-surface"
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
            onKeyDown={(e) => e.key === "Escape" && close()}
            className="flex w-full items-center rounded-md px-2.5 py-2 text-left text-sm transition-colors hover:bg-surface"
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
            onKeyDown={(e) => e.key === "Escape" && close()}
            className="flex w-full items-center rounded-md px-2.5 py-2 text-left text-sm transition-colors hover:bg-surface"
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
