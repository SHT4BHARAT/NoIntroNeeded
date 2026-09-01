import { SITE_URL } from "@/lib/constants";
export function GET() {
  return Response.json(
    {
      resource: SITE_URL,
      authorization_servers: [SITE_URL],
      scopes_supported: [],
      bearer_methods_supported: ["header"],
      allow_anonymous: true,
    },
    { headers: { "Content-Type": "application/json; charset=utf-8" } }
  );
}
