export async function POST() {
  const apiKey = `sht_test_${Math.random().toString(36).substring(2, 12)}_${Date.now()}`;
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

  return Response.json(
    {
      apiKey,
      tier: "sandbox",
      rateLimit: 120,
      expiresAt,
      message: "Ephemeral sandbox API key generated for automated AI agent integration testing. Valid for 24 hours.",
    },
    {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
}

export async function GET() {
  return POST();
}

export function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      Allow: "GET, POST, OPTIONS",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
