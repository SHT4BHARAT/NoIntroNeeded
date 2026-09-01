export async function POST(req: Request) {
  const body = await req.json().catch(() => ({ operations: [] }));
  const ops = (body.operations ?? []) as { op: string; id: string }[];
  // Idempotency-Key header check
  const idem = req.headers.get("Idempotency-Key");
  return Response.json(
    { results: ops.map((o) => ({ id: o.id, status: "ok", op: o.op })), idempotencyKey: idem ?? null },
    { headers: { "Content-Type": "application/json", "RateLimit-Limit": "60" } }
  );
}
export function OPTIONS() { return new Response(null, { status: 204, headers: { Allow: "POST, OPTIONS" } }); }
