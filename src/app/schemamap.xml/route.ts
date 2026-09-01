import { SITE_URL } from "@/lib/constants";

export function GET() {
  // Minimal NLWeb Schema Map — lists structured data feeds (JSON-LD is inline, but we expose conceptual map)
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<schemaMap xmlns="https://nlweb.ai/schemamap">
  <feed type="Person" url="${SITE_URL}/#person" format="json-ld" />
  <feed type="WebSite" url="${SITE_URL}/#website" format="json-ld" />
  <feed type="BlogPosting" url="${SITE_URL}/blog" format="json-ld" />
  <feed type="FAQPage" url="${SITE_URL}/faq" format="json-ld" />
</schemaMap>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
