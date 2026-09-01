import { SITE_URL, SITE_NAME } from "@/lib/constants";
import { safeJsonLd } from "@/components/seo/jsonLd";

export function ServiceSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI Agent & Backend Systems Development — Shivanshu Tiwari",
    provider: { "@type": "Person", name: SITE_NAME, url: SITE_URL, sameAs: ["https://github.com/SHT4BHARAT", "https://www.linkedin.com/in/shivanshutiwari-"] },
    url: SITE_URL,
    description: "Autonomous AI agents, LLM pipelines, and backend systems — portfolio and hiring context for Shivanshu Tiwari",
    areaServed: "Worldwide (remote)",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: "19",
      bestRating: "5",
      worstRating: "1",
    },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(schema) }} />;
}
