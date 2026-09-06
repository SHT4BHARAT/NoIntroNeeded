"use client";

import { useState, useMemo } from "react";
import { useAgentMode } from "@/components/providers/AgentModeProvider";

export function AgentMarkdownView() {
  const { markdownContent, isLoading, error, currentPath, setMode, refetchMarkdown } =
    useAgentMode();
  const [copied, setCopied] = useState(false);
  const [showLineNumbers, setShowLineNumbers] = useState(true);

  // Compute metrics
  const metrics = useMemo(() => {
    if (!markdownContent) return { tokens: 0, lines: 0, sizeKb: "0 KB" };
    const length = markdownContent.length;
    const tokens = Math.ceil(length / 4);
    const lines = markdownContent.split("\n").length;
    const sizeKb = (new Blob([markdownContent]).size / 1024).toFixed(1) + " KB";
    return { tokens, lines, sizeKb };
  }, [markdownContent]);

  const handleCopy = async () => {
    if (!markdownContent) return;
    try {
      await navigator.clipboard.writeText(markdownContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore clipboard error
    }
  };

  const handleDownload = () => {
    if (!markdownContent) return;
    const filename =
      currentPath === "/"
        ? "index.md"
        : `${currentPath.replace(/^\//, "").replace(/\//g, "-")}.md`;
    const blob = new Blob([markdownContent], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const lines = useMemo(() => {
    if (!markdownContent) return [];
    return markdownContent.split("\n");
  }, [markdownContent]);

  const endpointLabel = currentPath === "/" ? "/?mode=agent" : `${currentPath}.md`;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 animate-in fade-in duration-200">
      {/* Top Banner & Control Bar */}
      <header className="mb-6 rounded-2xl border border-border bg-surface/80 dark:bg-card/70 p-4 md:p-6 backdrop-blur-md shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-xs font-semibold tracking-wider uppercase text-muted-foreground font-mono">
                Agent / Markdown View
              </span>
              <span className="rounded-md border border-border/80 bg-background/60 px-2 py-0.5 text-xs font-mono text-muted">
                GET {endpointLabel}
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold font-mono tracking-tight text-foreground">
              Machine-Readable Markdown Twin
            </h1>
            <p className="text-xs md:text-sm text-muted">
              Live representation served to AI agents, LLMs, and crawlers via content negotiation.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setShowLineNumbers((prev) => !prev)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background/80 px-3 py-1.5 text-xs font-medium text-muted hover:text-foreground transition-colors"
              title="Toggle line numbers"
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
              </svg>
              <span>{showLineNumbers ? "Hide Lines" : "Show Lines"}</span>
            </button>

            <button
              type="button"
              onClick={handleCopy}
              disabled={!markdownContent || isLoading}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background/80 px-3 py-1.5 text-xs font-medium text-muted hover:text-foreground transition-colors disabled:opacity-50"
            >
              {copied ? (
                <>
                  <svg className="h-3.5 w-3.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-emerald-500">Copied!</span>
                </>
              ) : (
                <>
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span>Copy Markdown</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleDownload}
              disabled={!markdownContent || isLoading}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background/80 px-3 py-1.5 text-xs font-medium text-muted hover:text-foreground transition-colors disabled:opacity-50"
              title="Download .md file"
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Export</span>
            </button>

            <button
              type="button"
              onClick={() => setMode("human")}
              className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-3 py-1.5 text-xs font-medium text-accent-foreground shadow-sm hover:opacity-90 transition-opacity"
            >
              <span>Back to Human View</span>
            </button>
          </div>
        </div>

        {/* Metrics Chips */}
        {markdownContent && !isLoading && (
          <div className="mt-4 pt-4 border-t border-border/60 flex flex-wrap items-center gap-3 text-xs font-mono text-muted">
            <span className="flex items-center gap-1">
              <span className="text-foreground font-semibold">~{metrics.tokens.toLocaleString()}</span> tokens
            </span>
            <span className="text-border">•</span>
            <span className="flex items-center gap-1">
              <span className="text-foreground font-semibold">{metrics.lines.toLocaleString()}</span> lines
            </span>
            <span className="text-border">•</span>
            <span className="flex items-center gap-1">
              <span className="text-foreground font-semibold">{metrics.sizeKb}</span> payload
            </span>
            <span className="text-border">•</span>
            <span className="text-muted-foreground">
              <code>Accept: text/markdown</code>
            </span>
          </div>
        )}
      </header>

      {/* Loading State */}
      {isLoading && (
        <div className="rounded-2xl border border-border bg-surface/50 dark:bg-card/40 p-12 text-center">
          <div className="inline-flex items-center justify-center h-10 w-10 rounded-full border-2 border-accent border-t-transparent animate-spin mb-4" />
          <p className="text-sm font-mono text-muted">Resolving agent markdown twin...</p>
        </div>
      )}

      {/* Error / Fallback State */}
      {!isLoading && error && (
        <div
          role="alert"
          className="rounded-2xl border border-amber-500/30 bg-amber-500/5 dark:bg-amber-950/20 p-8 text-center"
        >
          <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-amber-500/10 text-amber-500 mb-4">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold font-mono text-foreground mb-1">
            Agent view isn&apos;t available for this page yet
          </h2>
          <p className="text-sm text-muted max-w-md mx-auto mb-6">
            This route doesn&apos;t have a dedicated markdown twin or agent context document. The standard human interface remains fully active.
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setMode("human")}
              className="rounded-lg bg-accent px-4 py-2 text-xs font-medium text-accent-foreground shadow-sm hover:opacity-90 transition-opacity"
            >
              Switch to Human View
            </button>
            <button
              type="button"
              onClick={refetchMarkdown}
              className="rounded-lg border border-border bg-background px-4 py-2 text-xs font-medium text-muted hover:text-foreground transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Markdown Document Content */}
      {!isLoading && !error && markdownContent && (
        <div className="relative rounded-2xl border border-border bg-surface/60 dark:bg-[#0d0f14] shadow-inner overflow-hidden">
          {/* File Tab Header */}
          <div className="flex items-center justify-between border-b border-border/80 bg-surface/90 dark:bg-[#13161c] px-4 py-2.5 text-xs font-mono text-muted">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-500/70 inline-block" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/70 inline-block" />
              <span className="h-3 w-3 rounded-full bg-emerald-500/70 inline-block" />
              <span className="ml-2 font-medium text-foreground">{endpointLabel}</span>
            </div>
            <div className="text-[11px] text-muted-foreground hidden sm:block">
              curl -H &quot;Accept: text/markdown&quot; https://shivanshutiwari.in{endpointLabel}
            </div>
          </div>

          {/* Document Lines */}
          <div className="overflow-x-auto p-4 md:p-6 font-mono text-xs md:text-sm leading-6">
            {showLineNumbers ? (
              <div className="table w-full border-collapse">
                {lines.map((line, idx) => (
                  <div key={idx} className="table-row hover:bg-surface-hover/30 dark:hover:bg-white/[0.02]">
                    <div className="table-cell pr-4 text-right text-muted-foreground/40 select-none w-10 align-top font-mono text-[11px] pt-[2px]">
                      {idx + 1}
                    </div>
                    <div className="table-cell pl-2 text-foreground break-words whitespace-pre-wrap font-mono">
                      {line || " "}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <pre className="whitespace-pre-wrap break-words font-mono text-foreground">
                {markdownContent}
              </pre>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
