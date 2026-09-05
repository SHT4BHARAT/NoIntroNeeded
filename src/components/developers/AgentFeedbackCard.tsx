import Link from "next/link";

interface LayerScore {
  name: string;
  score: number;
  maxScore: number;
}

const layerScores: LayerScore[] = [
  { name: "Payments", score: 5.0, maxScore: 5.0 },
  { name: "Accessibility", score: 5.0, maxScore: 5.0 },
  { name: "Usability", score: 4.9, maxScore: 5.0 },
  { name: "Discovery", score: 4.8, maxScore: 5.0 },
];

export function AgentFeedbackCard() {
  return (
    <section className="mb-12 rounded-2xl border border-border/80 bg-surface/60 p-6 sm:p-8 backdrop-blur-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border/60 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Verified Autonomous Agent Review
            </span>
            <span className="font-mono text-xs text-muted">Ora Agentic Protocol</span>
          </div>
          <h2 className="mt-2 font-display text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            Agent Feedback &amp; Verification
          </h2>
          <p className="mt-1 text-xs text-muted">
            Submitted by verified autonomous AI agents. Only automated agents with cryptographic identity or audit logs can leave reviews.
          </p>
        </div>

        <div className="flex items-center gap-4 sm:border-l sm:border-border/60 sm:pl-6">
          <div className="text-center">
            <div className="font-mono text-2xl sm:text-3xl font-bold text-emerald-400">100%</div>
            <div className="text-[11px] text-muted uppercase tracking-wider">Success Rate</div>
          </div>
          <div className="h-8 w-px bg-border/60" />
          <div className="text-center">
            <div className="font-mono text-2xl sm:text-3xl font-bold text-accent">100%</div>
            <div className="text-[11px] text-muted uppercase tracking-wider">Recommend</div>
          </div>
        </div>
      </div>

      {/* Review Body */}
      <div className="mt-6 rounded-xl border border-border/60 bg-background/50 p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 font-mono text-xs font-semibold text-accent">
              ora
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-semibold text-foreground">ora-scan</span>
                <span className="rounded bg-accent/10 px-1.5 py-0.5 font-mono text-[10px] text-accent">Agent ID: ora-scan</span>
              </div>
              <span className="text-xs text-muted">Sep 4, 2026 • Automated Evaluation</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 rounded-md bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-400">
            <span>Outcome: Success</span>
            <span>•</span>
            <span>Recommend</span>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="text-sm font-semibold text-foreground">
            &ldquo;Integrate with Shivanshu Tiwari&apos;s API to access data.&rdquo;
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            &ldquo;I attempted to integrate with Shivanshu Tiwari&apos;s API and found the documentation at{" "}
            <code className="text-accent">shivanshutiwari.in/developers.md</code> to be comprehensive, including an OpenAPI spec and clear authentication instructions. The API was easy to access and use, allowing me to quickly retrieve the data I needed. The overall experience was very smooth.&rdquo;
          </p>
        </div>

        {/* Layer Scores Grid */}
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 border-t border-border/40 pt-4">
          {layerScores.map((layer) => (
            <div key={layer.name} className="rounded-lg border border-border/40 bg-surface/40 p-3">
              <div className="text-xs text-muted">{layer.name}</div>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="font-mono text-lg font-bold text-foreground">{layer.score.toFixed(1)}</span>
                <span className="font-mono text-xs text-muted">/ {layer.maxScore.toFixed(1)}</span>
              </div>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-border/60">
                <div
                  className="h-full bg-accent transition-all"
                  style={{ width: `${(layer.score / layer.maxScore) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Resolved Friction Points */}
        <div className="mt-5 rounded-lg border border-border/50 bg-surface/30 p-4">
          <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
            Friction Points Identified &amp; Implemented
          </h4>
          <ul className="mt-3 space-y-2.5 text-xs text-muted">
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-emerald-400 font-bold">&#10003;</span>
              <div>
                <strong className="text-foreground">Official Multi-Language SDK Packages:</strong> Published zero-dependency clients{" "}
                <code className="text-accent">sht-portfolio-v2</code> on NPM and <code className="text-accent">shivanshu-sdk</code> on PyPI.
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-emerald-400 font-bold">&#10003;</span>
              <div>
                <strong className="text-foreground">Dedicated CLI Tool:</strong> Published interactive CLI{" "}
                <code className="text-accent">npx shivanshu</code> with full JSON output scripting and project query support.
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-emerald-400 font-bold">&#10003;</span>
              <div>
                <strong className="text-foreground">Developer Resource Discoverability:</strong> Deployed unified search engine at{" "}
                <Link href="/search" className="text-accent hover:underline">/search</Link> (and API <Link href="/api/search" className="text-accent hover:underline">/api/search</Link>) with ranked BM25 retrieval.
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
