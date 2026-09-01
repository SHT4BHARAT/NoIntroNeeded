export function GET() {
  // Web Bot Auth directory — minimal honest stub (no real signing keys for portfolio, but structure present)
  const now = Math.floor(Date.now() / 1000);
  return Response.json(
    {
      keys: [
        {
          kty: "OKP",
          crv: "Ed25519",
          kid: "portfolio-2026-01",
          nbf: now - 3600,
          exp: now + 31536000,
          // x: placeholder — real JWK would go here if Web Bot Auth were enforced
          x: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        },
      ],
    },
    { headers: { "Content-Type": "application/json; charset=utf-8" } }
  );
}
