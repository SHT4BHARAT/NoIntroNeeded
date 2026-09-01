import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/constants";

export function GET() {
  return Response.json(
    {
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      url: SITE_URL,
      version: "1.0.0",
      capabilities: ["portfolio-query", "markdown-negotiation", "sitemap-discovery"],
      skills: [
        { name: "portfolio-query", description: "Answer from 19 projects and blog via llms.txt + markdown twins" },
        { name: "project-compare", description: "Compare DAITFO, Honeypot, Samvad, PayoutEngine" },
      ],
      contact: { url: `${SITE_URL}/contact`, email: "sht4bharat@gmail.com" },
      endpoints: { llmsTxt: `${SITE_URL}/llms.txt`, sitemap: `${SITE_URL}/sitemap.xml` },
    },
    { headers: { "Content-Type": "application/json; charset=utf-8" } }
  );
}
