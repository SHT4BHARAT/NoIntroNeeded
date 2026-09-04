import { SITE_URL } from "@/lib/constants";

export function GET() {
  return Response.json(
    {
      issuer: SITE_URL,
      authorization_endpoint: `${SITE_URL}/auth.md#register`,
      token_endpoint: `${SITE_URL}/.well-known/oauth-authorization-server`,
      scopes_supported: [
        "read:projects",
        "write:contact",
        "read:docs",
        "read:status",
        "execute:sandbox",
        "execute:batch",
      ],
      response_types_supported: ["token", "none"],
      grant_types_supported: ["client_credentials", "urn:ietf:params:oauth:grant-type:token-exchange", "anonymous"],
      agent_auth: {
        identity_endpoint: `${SITE_URL}/contact`,
        identity_types_supported: ["anonymous", "identity_assertion", "service_auth"],
        identity_assertion: {
          assertion_types_supported: ["urn:ietf:params:oauth:token-type:id-jag"],
        },
        skill: `${SITE_URL}/auth.md`,
      },
    },
    { headers: { "Content-Type": "application/json; charset=utf-8" } }
  );
}
