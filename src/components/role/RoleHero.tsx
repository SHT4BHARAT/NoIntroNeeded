import type { RoleConfig } from "@/types/role";

export function RoleHero({ role }: { role: RoleConfig }) {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-5xl px-4 py-28 sm:py-36">
        <p className="font-mono text-xs font-medium uppercase tracking-widest text-muted">
          {role.slug}
        </p>
        <h1 className="mt-4 font-display text-5xl font-bold leading-tight tracking-tight sm:text-6xl">
          {role.headline}
        </h1>
        {role.subheading && (
          <p className="mt-4 max-w-2xl text-balance text-lg text-muted">
            {role.subheading}
          </p>
        )}
        <p className="mt-2 text-base text-muted">
          B.Tech CS &amp; IT, SIRT Bhopal (RGPV CSIT) &middot; Class of 2027
        </p>
      </div>
    </section>
  );
}
