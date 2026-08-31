import type { RoleConfig } from "@/types/role";

export function RoleHero({ role }: { role: RoleConfig }) {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-5xl px-4 py-28 sm:py-36">
        <p className="font-mono text-xs font-medium uppercase tracking-widest text-muted">
          {role.slug}
        </p>
          <h1 className="mt-4 font-display text-[clamp(2.75rem,6.5vw,4.5rem)] font-bold leading-[1.05] tracking-[-0.03em] sm:text-[clamp(3rem,7vw,5rem)]">
          {role.headline.split("—")[0]}
          {role.headline.includes("—") && (
            <span className="block mt-2 text-muted">{role.headline.split("—")[1].trim()}</span>
          )}
          {!role.headline.includes("—") && (
            <span className="block mt-2 text-3xl sm:text-4xl text-muted font-normal">{role.slug === "ai-engineer" ? "Autonomous agents, LLM pipelines, RL benchmarks" : "APIs, concurrency-safe engines, real-time dispatch"}</span>
          )}
        </h1>
        <div className="mt-6 h-1 w-16 rounded-full bg-accent/60" />
        {role.subheading && (
          <p className="mt-6 max-w-2xl text-balance text-lg text-muted">
            {role.subheading}
          </p>
        )}
        <p className="mt-3 text-base text-muted">
          B.Tech CS &amp; IT, SIRT Bhopal (RGPV CSIT) &middot; Class of 2027
        </p>
      </div>
    </section>
  );
}
