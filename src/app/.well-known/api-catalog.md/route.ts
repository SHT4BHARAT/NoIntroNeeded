import { SITE_URL } from "@/lib/constants";

export function GET() {
  const body = `---
title: "RFC 9727 API Catalog — Shivanshu Tiwari"
description: "RFC 9727 API catalog linkset for Shivanshu Tiwari portfolio APIs."
canonical: "${SITE_URL}/.well-known/api-catalog"
lastUpdated: "${new Date().toISOString().split("T")[0]}"
---

# RFC 9727 API Catalog — Shivanshu Tiwari

Machine-readable API catalog linkset for Shivanshu Tiwari portfolio APIs.

## Available API Specifications

- **OpenAPI Specification (JSON):** [${SITE_URL}/openapi.json](${SITE_URL}/openapi.json)
- **OpenAPI Specification (YAML):** [${SITE_URL}/openapi.yaml](${SITE_URL}/openapi.yaml)
- **Developer Portal:** [${SITE_URL}/developers](${SITE_URL}/developers)
- **Authentication Guide:** [${SITE_URL}/auth.md](${SITE_URL}/auth.md)
- **API Deprecation Policy:** [${SITE_URL}/developers/deprecation](${SITE_URL}/developers/deprecation)
- **Product Actions MCP Server:** [${SITE_URL}/mcp](${SITE_URL}/mcp)
- **Documentation MCP Server:** [${SITE_URL}/mcp/docs](${SITE_URL}/mcp/docs)
- **XML Sitemap:** [${SITE_URL}/sitemap.xml](${SITE_URL}/sitemap.xml)

---
*Source: ${SITE_URL}/.well-known/api-catalog*
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
      Vary: "Accept",
    },
  });
}
