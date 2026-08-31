import type { Project } from "@/types/project";
import { safeJsonLd } from "@/components/seo/jsonLd";

export function SoftwareSourceCodeSchema({ project }: { project: Project }) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: project.title,
    description: project.description,
    programmingLanguage: project.stack.filter((s) =>
      ["Python", "JavaScript", "TypeScript", "Kotlin", "SQL", "Dart", "Java"].includes(s)
    ),
  };

  if (project.repoUrl) {
    schema.codeRepository = project.repoUrl;
  }

  if (project.demoUrl) {
    schema.url = project.demoUrl;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJsonLd(schema) }}
    />
  );
}
