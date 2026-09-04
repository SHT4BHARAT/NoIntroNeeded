import { SITE_URL } from "@/lib/constants";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ jobId: string }> }
) {
  const { jobId } = await params;
  return Response.json(
    {
      jobId,
      status: "completed",
      pollUrl: `${SITE_URL}/api/v1/jobs/${jobId}`,
      createdAt: new Date(Date.now() - 5000).toISOString(),
      result: { ok: true, message: "Task completed successfully" },
    },
    {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
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
