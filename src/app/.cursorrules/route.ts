import fs from "fs";
import path from "path";

export function GET() {
  const content = fs.readFileSync(path.join(process.cwd(), "public/.cursorrules"), "utf-8");
  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
