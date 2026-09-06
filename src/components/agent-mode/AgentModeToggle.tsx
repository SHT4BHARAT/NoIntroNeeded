"use client";

import { useAgentMode } from "@/components/providers/AgentModeProvider";

export function AgentModeToggle() {
  const { mode, setMode } = useAgentMode();

  return (
    <aside
      id="agent-mode-toggle"
      aria-label="View mode selection"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 print:hidden select-none"
    >
      <div className="flex items-center gap-1 rounded-full border border-border/80 bg-surface/90 dark:bg-surface/85 p-1 shadow-lg backdrop-blur-md transition-all duration-200 hover:border-accent/40 hover:shadow-xl opacity-90 hover:opacity-100">
        {/* Human Mode Button */}
        <button
          type="button"
          onClick={() => setMode("human")}
          aria-pressed={mode === "human"}
          className={`relative flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
            mode === "human"
              ? "bg-foreground text-background shadow-sm"
              : "text-muted hover:text-foreground"
          }`}
        >
          <svg
            className="h-3.5 w-3.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <span>Human</span>
        </button>

        {/* Agent Mode Button */}
        <button
          type="button"
          onClick={() => setMode("agent")}
          aria-pressed={mode === "agent"}
          className={`relative flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
            mode === "agent"
              ? "bg-accent text-accent-foreground shadow-sm"
              : "text-muted hover:text-foreground"
          }`}
        >
          <svg
            className="h-3.5 w-3.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect width="18" height="12" x="3" y="6" rx="2" />
            <path d="M9 12h.01" />
            <path d="M15 12h.01" />
            <path d="M12 2v4" />
            <path d="M8 22v-4" />
            <path d="M16 22v-4" />
          </svg>
          <span>Agent</span>
          {mode === "agent" && (
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          )}
        </button>
      </div>
    </aside>
  );
}
