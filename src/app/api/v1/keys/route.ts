import { randomBytes } from "node:crypto";

export async function POST() {
  // 128-bit CSPRNG token. Math.random() is not a key generator — its output
  // is predictable from ~50 bits of internal state (v8 xorshift128+), which
  // would make these keys forgeable the moment anything starts validating them.
  const apiKey = `sht_test_${randomBytes(16).toString("hex")}`;
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

  return Response.json(
    {
      apiKey,
      tier: "sandbox",
      freeTier: true,
      free_tier: true,
      sandbox: true,
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
