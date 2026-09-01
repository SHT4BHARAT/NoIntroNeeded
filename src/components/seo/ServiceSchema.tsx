import { SITE_URL, SITE_NAME } from "@/lib/constants";
import { safeJsonLd } from "@/components/seo/jsonLd";

export function ServiceSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI Agent & Backend Systems Development",
    provider: { "@type": "Person", name: SITE_NAME, url: SITE_URL },
    url: SITE_URL,
    description: "Autonomous AI agents, LLM pipelines, and backend systems — portfolio and hiring context",
    areaServed: "Worldwide (remote)",
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(schema) }} />;
}
