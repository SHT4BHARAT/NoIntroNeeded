import * as fs from "fs";
import * as path from "path";

export function GET() {
  // Serve the canonical spec from public/openapi.json so /openapi.json and /api/openapi.json are identical
  const p = path.join(process.cwd(), "public", "openapi.json");
  const raw = fs.readFileSync(p, "utf-8");
  return new Response(raw, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
      // Discovery hint for Link header scanners
      Link: '</openapi.json>; rel="service-desc"; type="application/json"',
    },
  });
}
