import { SITE_URL } from "@/lib/constants";
export async function POST(req: Request) {
  const id = `job_${Date.now()}`;
  const body = await req.json().catch(() => ({}));
  return Response.json(
    { jobId: id, status: "pending", pollUrl: `${SITE_URL}/api/v1/jobs/${id}`, task: (body as { task?: string }).task ?? null },
    { status: 202, headers: { Location: `${SITE_URL}/api/v1/jobs/${id}`, "Content-Type": "application/json" } }
  );
}
