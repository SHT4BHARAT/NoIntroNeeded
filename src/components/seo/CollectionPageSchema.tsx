import type { Project } from "@/types/project";

export function CollectionPageSchema({
  name,
  url,
  jobTitle,
  projects,
}: {
  name: string;
  url: string;
  jobTitle: string;
  projects: { name: string; slug: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    url,
    about: {
      "@type": "Person",
      name: "Shivanshu Tiwari",
      jobTitle,
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: projects.map((p, i) => ({
        "@type": "SoftwareSourceCode",
        position: i + 1,
        name: p.name,
        url: `https://shivanshutiwari.in/projects/${p.slug}`,
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
