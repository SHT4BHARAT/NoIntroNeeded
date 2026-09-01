import { SITE_URL } from "@/lib/constants";

const body = `# Auth — shivanshutiwari.in

Public portfolio — read-only. No API keys. For write (contact), use anonymous POST.

## Discover

* Protected resource metadata: \`${SITE_URL}/.well-known/oauth-protected-resource\`
* Authorization server metadata: \`${SITE_URL}/.well-known/oauth-authorization-server\`
* This file (\`/auth.md\`) is the prose walkthrough — lead with heading, >200 chars, Content-Type: text/markdown.

## Pick a method

* \`anonymous\` — default for all read endpoints (sitemap, llms.txt, markdown twins). No token.
* \`identity_assertion\` (ID-JAG \`urn:ietf:params:oauth:token-type:id-jag\`) — if you must identify, send anonymous with assertion_types_supported containing id-jag.
* \`service_auth\` — not required for portfolio.

## Register

No registration. For contact, no client_id.

## Claim

No claim endpoint for read. For contact: POST \`${SITE_URL}/api/contact\` with {name,email,message}.

## Exchange

No token exchange — read is anonymous. If server returns 401, see WWW-Authenticate: Bearer resource_metadata="<prm>".

## Use the access_token

Not needed. Example:

\`\`\`bash
curl -H "Accept: text/markdown" ${SITE_URL}/about
curl -X POST ${SITE_URL}/api/contact -H "Content-Type: application/json" -d '{"name":"...","email":"...","message":"hello"}'
\`\`\`

## Errors

* 401 missing WWW-Authenticate → check \`.well-known/oauth-protected-resource\`
* 429 Too Many Requests → contact rate limit (5/window per IP)

## Revocation

No tokens to revoke. Contact submissions are append-only to Google Sheet.

## agent_auth

* identity_endpoint: \`${SITE_URL}/contact\`
* identity_types_supported: ["anonymous","identity_assertion","service_auth"]
* identity_assertion.assertion_types_supported: ["urn:ietf:params:oauth:token-type:id-jag"]
* skill: \`${SITE_URL}/auth.md\`
* claim_endpoint: \`${SITE_URL}/api/contact\` (OPTIONS 204)
* events_endpoint: \`${SITE_URL}/.well-known/oauth-protected-resource\`
`;

export function GET() {
  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

// Ensure OPTIONS preflight for agent_auth endpoints is not 404
export function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: { Allow: "GET, OPTIONS", "Cache-Control": "public, max-age=3600" },
  });
}
