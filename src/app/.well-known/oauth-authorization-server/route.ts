import { SITE_URL } from "@/lib/constants";
export function GET() {
  return Response.json(
    {
      issuer: SITE_URL,
      authorization_endpoint: `${SITE_URL}/auth.md#register`,
      token_endpoint: `${SITE_URL}/.well-known/oauth-authorization-server`,
      scopes_supported: [],
      response_types_supported: ["none"],
      // WorkOS auth.md agent_auth block — portfolio is anonymous-only
      agent_auth: {
        identity_endpoint: `${SITE_URL}/contact`,
        identity_types_supported: ["anonymous"],
        skill: `${SITE_URL}/auth.md`,
      },
    },
    { headers: { "Content-Type": "application/json; charset=utf-8" } }
  );
}
