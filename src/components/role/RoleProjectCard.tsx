import Link from "next/link";
import type { Project } from "@/types/project";

export function RoleProjectCard({
  project,
  framing,
}: {
  project: Project;
  framing?: string;
}) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block rounded-lg border border-border bg-card p-5 transition-[transform,box-shadow,border-color,background-color] duration-150 ease-out hover:-translate-y-4 hover:border-accent/70 hover:bg-surface/50 hover:shadow-[0_12px_30px_-18px_rgba(34,211,238,0.40)] focus-visible:-translate-y-4 focus-visible:border-accent/70 focus-visible:shadow-[0_12px_30px_-18px_rgba(34,211,238,0.40)] focus-visible:outline-none motion-reduce:transform-none motion-reduce:shadow-none motion-reduce:transition-none"
    >
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold group-hover:text-accent transition-colors">
          {project.title}
        </h3>
        {framing && (
          <p className="text-sm text-muted">{framing}</p>
        )}
        <p className="text-sm text-muted line-clamp-2">{project.description}</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-md bg-surface px-2 py-0.5 font-mono text-[11px] text-muted"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
