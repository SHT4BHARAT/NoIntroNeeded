import { SITE_URL, SITE_NAME, SITE_TITLE, SITE_DESCRIPTION, SOCIAL } from "@/lib/constants";

export function PersonSchema() {
  const profilePageSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    dateCreated: "2024-01-01T00:00:00Z",
    dateModified: new Date().toISOString(),
    mainEntity: {
      "@type": "Person",
      name: SITE_NAME,
      alternateName: ["Shivanshu", "SHT4BHARAT"],
      jobTitle: SITE_TITLE,
      description: SITE_DESCRIPTION,
      url: SITE_URL,
      image: `${SITE_URL}/og-image.png`,
      sameAs: [SOCIAL.github, SOCIAL.linkedin],
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "SIRT Bhopal",
      },
      knowsAbout: [
        "AI Agents",
        "LLM Pipelines",
        "Backend Systems",
        "Reinforcement Learning",
        "Python",
        "TypeScript",
        "Distributed Systems",
      ],
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
