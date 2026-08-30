import Link from "next/link";
import type { Project } from "@/types/project";

export function RoleProjectCard({
  project,
}: {
  project: Project;
}) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block rounded-lg border border-accent/10 bg-card p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-accent/50 hover:bg-surface focus-visible:-translate-y-1 focus-visible:border-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 motion-reduce:transform-none motion-reduce:transition-none"
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold tracking-tight">
            {project.title}
          </h3>
          {project.featured && (
            <span className="shrink-0 rounded bg-accent-bg px-2 py-0.5 font-mono text-[11px] text-accent">
              Featured ★
            </span>
          )}
        </div>
        <p className="text-sm text-muted leading-relaxed line-clamp-2">{project.description}</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-sm bg-surface px-2 py-0.5 font-mono text-[11px] text-muted"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
