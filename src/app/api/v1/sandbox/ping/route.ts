export function GET(req: Request) {
  const url = new URL(req.url);
  const sandbox = url.searchParams.get("sandbox") === "true" || req.headers.get("X-Sandbox") === "true";
  return Response.json(
    { pong: true, sandbox: sandbox || true },
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
      "Access-Control-Allow-Headers": "Content-Type, X-Sandbox",
    },
  });
}
