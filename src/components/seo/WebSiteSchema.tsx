import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, SOCIAL } from "@/lib/constants";
import { safeJsonLd } from "@/components/seo/jsonLd";

export function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    alternateName: ["SHT4BHARAT", "Shivanshu Tiwari Portfolio"],
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    author: {
      "@type": "Person",
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Person",
      name: SITE_NAME,
      url: SITE_URL,
      sameAs: [SOCIAL.github, SOCIAL.linkedin],
    },
    inLanguage: "en-US",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJsonLd(schema) }}
    />
  );
}
