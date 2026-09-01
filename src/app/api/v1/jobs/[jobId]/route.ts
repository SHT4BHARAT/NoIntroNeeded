export async function GET(_req: Request, { params }: { params: Promise<{ jobId: string }> }) {
  const { jobId } = await params;
  return Response.json({ jobId, status: "complete", result: { ok: true } }, { headers: { "Content-Type": "application/json" } });
}
