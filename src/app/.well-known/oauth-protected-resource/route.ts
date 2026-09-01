import { SITE_URL } from "@/lib/constants";
export function GET() {
  return Response.json(
    {
      resource: SITE_URL,
      authorization_servers: [],
      scopes_supported: [],
      bearer_methods_supported: ["header"],
      // Portfolio is public read-only — anonymous access per auth.md
      allow_anonymous: true,
    },
    { headers: { "Content-Type": "application/json; charset=utf-8" } }
  );
}
