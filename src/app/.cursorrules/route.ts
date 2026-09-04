import { AGENTS_MD_CONTENT } from "../AGENTS.md/route";

export function GET() {
  return new Response(AGENTS_MD_CONTENT, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
