import * as fs from "fs";
import * as path from "path";
export function GET() {
  const p = path.join(process.cwd(), "public", "openapi.yaml");
  const raw = fs.readFileSync(p, "utf-8");
  return new Response(raw, { headers: { "Content-Type": "text/yaml; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
