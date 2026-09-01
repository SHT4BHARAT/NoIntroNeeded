import { SITE_URL } from "@/lib/constants";

// Honest auth guide for a public, read-only portfolio site.
// Most of the site (pages, llms.txt, sitemap, OpenAPI, MCP) needs no credentials.
const body = `# Authentication — Shivanshutiwari.in

This site is public and read-only. Browsing the site, fetching \`/llms.txt\`, the XML \`sitemap.xml\`, the OpenAPI spec at \`/openapi.json\`, or talking to the MCP server at \`/mcp\` requires **no credentials, API keys, or OAuth** — they are open to everyone.

The only operation that is not purely read-only is the contact form (\`POST /api/v1/contact\`). It is authenticated implicitly — it works with anonymous HTTP with no bearer token — but it is rate-limited to prevent spam and expects a JSON body of \`{name, email, message}\`. There are no API keys to issue, no tokens to refresh, and no scoped authorization flows on this site.

In short: **there is no authentication scheme** for the public portfolio API. If a tool reports a 401 or missing-credential error against this domain, that is a configuration mistake on the caller's side — the endpoints deliberately require nothing.

## Machine-readable metadata

Although no auth is required, discovery metadata is still published for standards-completeness:

- Protected resource metadata: \`${SITE_URL}/.well-known/oauth-protected-resource\`
- Authorization server metadata: \`${SITE_URL}/.well-known/oauth-authorization-server\`
- API catalog (RFC 9727): \`${SITE_URL}/.well-known/api-catalog\`

## Contact form

\`\`\`bash
curl -X POST ${SITE_URL}/api/v1/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Aria","email":"aria@example.com","message":"Question about a project"}'
\`\`\`

The contact endpoint is rate-limited per IP (see \`RateLimit-*\` response headers). No token is required.
`;

export function GET() {
  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

export function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: { Allow: "GET, OPTIONS", "Cache-Control": "public, max-age=3600" },
  });
}
