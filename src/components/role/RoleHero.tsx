import type { RoleConfig } from "@/types/role";

export function RoleHero({ role }: { role: RoleConfig }) {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-4xl px-4 py-20 sm:py-28">
        <p className="font-mono text-xs font-medium uppercase tracking-widest text-muted">
          {role.slug}
        </p>
        <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
          {role.headline}
        </h1>
        {role.subheading && (
          <p className="mt-4 max-w-2xl text-lg text-muted">
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
