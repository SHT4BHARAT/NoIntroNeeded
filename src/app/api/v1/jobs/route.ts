import { SITE_URL } from "@/lib/constants";

export async function POST(req: Request) {
  const id = `job_${Date.now()}`;
  const body = await req.json().catch(() => ({}));
  const pollUrl = `${SITE_URL}/api/v1/jobs/${id}`;

  return Response.json(
    {
      jobId: id,
      status: "pending",
      pollUrl,
      task: (body as { task?: string }).task ?? "benchmark-evaluation",
      createdAt: new Date().toISOString(),
      result: null,
    },
    {
      status: 202,
      headers: {
        Location: pollUrl,
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Expose-Headers": "Location",
      },
    }
  );
}

export function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      Allow: "POST, OPTIONS",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
