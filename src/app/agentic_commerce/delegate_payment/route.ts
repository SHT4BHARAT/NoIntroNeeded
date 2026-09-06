export function OPTIONS() {
  return Response.json(
    {
      status: "not_implemented",
      demo_only: true,
      placeholder: true,
      message: "This endpoint is a placeholder. No live payment processing is connected yet.",
      documentation: "https://shivanshutiwari.in/pricing.md",
    },
    {
      status: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Allow: "GET, POST, OPTIONS",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, Idempotency-Key",
      },
    }
  );
}

export function POST() {
  return Response.json(
    {
      status: "not_implemented",
      demo_only: true,
      placeholder: true,
      message: "This endpoint is a placeholder. No live payment processing is connected yet.",
      documentation: "https://shivanshutiwari.in/pricing.md",
    },
    {
      status: 501,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-store",
      },
    }
  );
}

export function GET() {
  return POST();
}
