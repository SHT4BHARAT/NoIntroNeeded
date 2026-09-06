"use client";

import { useState } from "react";

interface KeyResponse {
  apiKey: string;
  tier: string;
  freeTier: boolean;
  rateLimit: number;
  expiresAt: string;
  message: string;
}

interface PingResponse {
  pong: boolean;
  sandbox: boolean;
  latencyMs?: number;
}

export function SandboxInteractiveWidget() {
  const [keyData, setKeyData] = useState<KeyResponse | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [keyError, setKeyError] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState(false);

  const [pingData, setPingData] = useState<PingResponse | null>(null);
  const [isPinging, setIsPinging] = useState(false);
  const [pingError, setPingError] = useState<string | null>(null);

  async function handleGenerateKey() {
    setIsGenerating(true);
    setKeyError(null);
    try {
      const res = await fetch("/api/v1/keys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ client: "interactive-sandbox-visitor" }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setKeyData(data);
    } catch (err) {
      setKeyError(err instanceof Error ? err.message : "Failed to generate key");
    } finally {
      setIsGenerating(false);
    }
  }

  async function handleTestPing() {
    setIsPinging(true);
    setPingError(null);
    const start = performance.now();
    try {
      const res = await fetch("/api/v1/sandbox/ping");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const latencyMs = Math.round(performance.now() - start);
      setPingData({ ...data, latencyMs });
    } catch (err) {
      setPingError(err instanceof Error ? err.message : "Ping failed");
    } finally {
      setIsPinging(false);
    }
  }

  function handleCopy() {
    if (keyData?.apiKey) {
      navigator.clipboard.writeText(keyData.apiKey);
      setCopiedKey(true);
      setTimeout(() => setCopiedKey(false), 2000);
    }
  }

  return (
    <div className="my-8 rounded-2xl border border-border/80 bg-surface/50 p-6 sm:p-8 backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-6 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live Self-Serve Onboarding
            </span>
            <span className="font-mono text-xs text-muted">Zero Friction · No Auth Required</span>
          </div>
          <h2 className="mt-2 font-display text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            Interactive Agent Sandbox Console
          </h2>
          <p className="mt-1 text-xs text-muted">
            Test the complete onboarding flow live right now: generate an ephemeral test API key with 1 click and verify sandbox ping connectivity.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Test Key Generator */}
        <div className="rounded-xl border border-border bg-card p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">Step 1: Get API Key</span>
              <span className="text-[11px] font-mono text-muted">POST /api/v1/keys</span>
            </div>
            <h3 className="text-base font-semibold text-foreground mb-1">Instant Self-Serve Key</h3>
            <p className="text-xs text-muted mb-4">
              Free 24-hour sandbox credential with 120 req/min quota. Generated instantly without signup, emails, or human approval.
            </p>

            {keyData && (
              <div className="rounded-lg bg-surface p-3 mb-4 border border-border text-xs font-mono">
                <div className="flex items-center justify-between text-muted mb-1 text-[11px]">
                  <span>Tier: {keyData.tier} ({keyData.rateLimit} req/min)</span>
                  <span className="text-emerald-400">Active</span>
                </div>
                <div className="flex items-center justify-between gap-2 bg-background/80 p-2 rounded border border-border/60">
                  <span className="truncate text-foreground select-all">{keyData.apiKey}</span>
                  <button
                    onClick={handleCopy}
                    type="button"
                    className="shrink-0 px-2 py-1 text-[11px] rounded bg-surface hover:bg-surface/80 text-accent font-sans transition-colors border border-border"
                  >
                    {copiedKey ? "Copied!" : "Copy"}
                  </button>
                </div>
                <div className="mt-2 text-[10px] text-muted">
                  Expires: {new Date(keyData.expiresAt).toLocaleTimeString()} · Free Tier Guaranteed
                </div>
              </div>
            )}

            {keyError && (
              <div className="p-3 mb-4 rounded-lg bg-red-500/10 text-red-400 text-xs font-mono border border-red-500/20">
                Error: {keyError}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={handleGenerateKey}
            disabled={isGenerating}
            className="w-full inline-flex items-center justify-center rounded-lg bg-accent px-4 py-2.5 text-xs font-medium text-background transition-colors hover:bg-accent/90 disabled:opacity-60"
          >
            {isGenerating ? "Generating Key..." : keyData ? "Generate Another Key" : "1-Click Generate Sandbox API Key"}
          </button>
        </div>

        {/* Sandbox Ping Connectivity */}
        <div className="rounded-xl border border-border bg-card p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">Step 2: Verify Connectivity</span>
              <span className="text-[11px] font-mono text-muted">GET /api/v1/sandbox/ping</span>
            </div>
            <h3 className="text-base font-semibold text-foreground mb-1">Sandbox Ping Test</h3>
            <p className="text-xs text-muted mb-4">
              Pings the live sandbox cluster to ensure agent routing, latency budgets, and CORS headers are functioning properly.
            </p>

            {pingData && (
              <div className="rounded-lg bg-surface p-3 mb-4 border border-border text-xs font-mono">
                <div className="flex items-center justify-between text-[11px] text-emerald-400 mb-2">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                    Sandbox Cluster Reachable
                  </span>
                  <span>{pingData.latencyMs} ms</span>
                </div>
                <pre className="p-2 rounded bg-background/80 border border-border/60 text-[11px] text-muted overflow-x-auto">
{`{
  "pong": true,
  "sandbox": true,
  "latency": "${pingData.latencyMs}ms"
}`}
                </pre>
              </div>
            )}

            {pingError && (
              <div className="p-3 mb-4 rounded-lg bg-red-500/10 text-red-400 text-xs font-mono border border-red-500/20">
                Error: {pingError}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={handleTestPing}
            disabled={isPinging}
            className="w-full inline-flex items-center justify-center rounded-lg border border-border bg-surface px-4 py-2.5 text-xs font-medium text-foreground transition-colors hover:bg-surface/80 hover:border-accent disabled:opacity-60"
          >
            {isPinging ? "Testing Ping..." : pingData ? "Retest Connectivity" : "Test Live Sandbox Ping"}
          </button>
        </div>
      </div>
    </div>
  );
}
