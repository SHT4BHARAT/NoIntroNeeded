import { SITE_URL } from "@/lib/constants";

export function GET() {
  return Response.json(
    {
      environment: "sandbox",
      freeTier: true,
      free_tier: true,
      selfServeKeys: true,
      selfServeKeyGeneration: true,
      description: "Shivanshu Tiwari Portfolio API Sandbox Environment — test API integrations, contact submissions, and agent flows safely without touching production data.",
      baseUrl: `${SITE_URL}/api/v1`,
      headersRequired: {
        "X-Sandbox": "true",
      },
      endpoints: {
        ping: `${SITE_URL}/api/v1/sandbox/ping`,
        contact: `${SITE_URL}/api/v1/sandbox/contact`,
        keys: `${SITE_URL}/api/v1/keys`,
        jobs: `${SITE_URL}/api/v1/jobs`,
        projects: `${SITE_URL}/api/v1/projects`,
      },
      documentation: `${SITE_URL}/developers`,
    },
    {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "X-Sandbox": "true",
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
}

export function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      Allow: "GET, OPTIONS",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
