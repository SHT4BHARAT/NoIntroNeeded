import type { Project } from "@/types/project";
import { RoleProjectCard } from "./RoleProjectCard";

export function RoleProjectList({
  projects,
}: {
  projects: Project[];
}) {
  return (
    <section>
      <h2 className="text-sm font-semibold uppercase tracking-widest text-muted">
        Projects
      </h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <RoleProjectCard
            key={project.slug}
            project={project}
          />
        ))}
      </div>
    </section>
  );
}
