import { SITE_URL } from "@/lib/constants";
export function GET() {
  const catalog = {
    linkset: [{ anchor: SITE_URL, item: [{ href: `${SITE_URL}/sitemap.xml`, rel: "sitemap" }] }],
  };
  return Response.json(catalog, {
    headers: { "Content-Type": 'application/linkset+json;profile="https://www.rfc-editor.org/info/rfc9727"' },
  });
}
