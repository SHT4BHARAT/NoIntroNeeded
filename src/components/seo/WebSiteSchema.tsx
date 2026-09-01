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
    sameAs: [SOCIAL.github, SOCIAL.linkedin, "https://github.com/SHT4BHARAT/NoIntroNeeded"],
    author: {
      "@type": "Person",
      name: SITE_NAME,
      url: SITE_URL,
      sameAs: [SOCIAL.github, SOCIAL.linkedin, "https://github.com/SHT4BHARAT/NoIntroNeeded"],
    },
    publisher: {
      "@type": "Person",
      name: SITE_NAME,
      url: SITE_URL,
      sameAs: [SOCIAL.github, SOCIAL.linkedin, "https://github.com/SHT4BHARAT/NoIntroNeeded"],
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
