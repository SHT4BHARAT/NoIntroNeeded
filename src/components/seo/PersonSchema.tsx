import { SITE_URL, SITE_NAME, SITE_TITLE, SOCIAL } from "@/lib/constants";

export function PersonSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_NAME,
    jobTitle: SITE_TITLE,
    url: SITE_URL,
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
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
