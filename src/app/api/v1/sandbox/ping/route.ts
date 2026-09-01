export function GET(req: Request) {
  const url = new URL(req.url);
  const sandbox = url.searchParams.get("sandbox") === "true" || req.headers.get("X-Sandbox") === "true";
  return Response.json({ pong: true, sandbox: sandbox || true }, { headers: { "Content-Type": "application/json", "X-Sandbox": "true" } });
}
