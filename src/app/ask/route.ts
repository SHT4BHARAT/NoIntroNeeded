export async function POST(req: Request) {
  const url = new URL(req.url);
  const isStream = req.headers.get("prefer")?.includes("streaming") || url.searchParams.get("streaming") === "true";
  const body = await req.json().catch(() => ({}));
  const query = (body as { query?: string }).query ?? (body as { q?: string }).q ?? "portfolio";

  const meta = { response_type: "answer", version: "1.0", query };

  if (isStream || body.prefer?.streaming) {
    const stream = new ReadableStream({
      start(controller) {
        const enc = new TextEncoder();
        controller.enqueue(enc.encode(`event: start\ndata: ${JSON.stringify({ _meta: meta })}\n\n`));
        controller.enqueue(enc.encode(`event: result\ndata: ${JSON.stringify({ text: `Shivanshu Tiwari — ${query}: see /llms.txt and /developers`, _meta: meta })}\n\n`));
        controller.enqueue(enc.encode(`event: complete\ndata: ${JSON.stringify({ _meta: meta })}\n\n`));
        controller.close();
      },
    });
    return new Response(stream, { headers: { "Content-Type": "text/event-stream; charset=utf-8", "Cache-Control": "no-cache" } });
  }

  return Response.json({ _meta: meta, answer: `Shivanshu Tiwari — query: ${query}. See /llms.txt, /sitemap.xml, /developers.` });
}

export function GET(req: Request) { return POST(req as unknown as Request); }
