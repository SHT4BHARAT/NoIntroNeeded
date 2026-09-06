"use client";

import { type ReactNode } from "react";
import { useAgentMode } from "@/components/providers/AgentModeProvider";
import { AgentMarkdownView } from "./AgentMarkdownView";

export function AgentModeContainer({ children }: { children: ReactNode }) {
  const { mode } = useAgentMode();

  return (
    <div className="relative flex flex-1 flex-col min-h-[60vh] w-full">
      {/* Human View */}
      <div
        className={`flex flex-1 flex-col transition-opacity duration-200 ease-in-out ${
          mode === "human"
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none absolute inset-0 -z-10 h-0 overflow-hidden"
        }`}
        aria-hidden={mode !== "human"}
      >
        {children}
      </div>

      {/* Agent Markdown View */}
      {mode === "agent" && (
        <div
          className="flex flex-1 flex-col transition-opacity duration-200 ease-in-out opacity-100"
          aria-hidden={mode !== "agent"}
        >
          <AgentMarkdownView />
        </div>
      )}
    </div>
  );
}
