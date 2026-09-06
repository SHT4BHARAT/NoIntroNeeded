// Cap batch size so a multi-megabyte request can't be mirrored back
// as an even larger response (free bandwidth amplification + serverless cost).
const MAX_BATCH_ITEMS = 100;

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const idem = req.headers.get("Idempotency-Key");

  // Handle direct array, operations array, requests array, or JSON-RPC batch
  let results: Array<{ id: string | number; status: string; data?: unknown }> = [];

  if (Array.isArray(body)) {
    results = body.slice(0, MAX_BATCH_ITEMS).map((item, idx) => ({
      id: item?.id ?? idx,
      status: "ok",
      data: item?.jsonrpc ? { jsonrpc: "2.0", id: item.id, result: { status: "ok" } } : { executed: true },
    }));
  } else {
    const list = body.operations || body.requests || body.batch || [];
    results = list.slice(0, MAX_BATCH_ITEMS).map((item: { id?: string | number; op?: string; path?: string }, idx: number) => ({
      id: item?.id ?? idx,
      status: "ok",
      data: { op: item?.op ?? item?.path ?? "unknown", executed: true },
    }));
  }

  const totalSubmitted = Array.isArray(body)
    ? body.length
    : (body.operations || body.requests || body.batch || []).length;
  const skipped = Math.max(0, totalSubmitted - results.length);

  return Response.json(
    {
      results,
      count: results.length,
      ...(skipped > 0 ? { skipped, note: `Batch limited to ${MAX_BATCH_ITEMS} items; ${skipped} skipped` } : {}),
      idempotencyKey: idem ?? null,
      status: "success",
    },
    {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "RateLimit-Limit": "60",
        "RateLimit-Remaining": "59",
      },
    }
  );
}

export function GET() {
  return Response.json({
    name: "batch-api",
    description: "Submit POST /api/v1/batch with { operations: [...] } or an array of requests for bulk execution",
    status: "healthy",
  });
}

export function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      Allow: "GET, POST, OPTIONS",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Idempotency-Key, Authorization",
    },
  });
}
