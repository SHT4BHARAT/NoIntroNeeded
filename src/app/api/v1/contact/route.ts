import { NextRequest } from "next/server";
import { POST as basePOST, OPTIONS as baseOPTIONS } from "@/app/api/contact/route";
export const OPTIONS = baseOPTIONS;
export async function POST(req: NextRequest) {
  const res = await basePOST(req);
  res.headers.set("Deprecation", "false");
  res.headers.set("Sunset", new Date(Date.now() + 31536000000).toUTCString());
  res.headers.set("API-Version", "v1");
  return res;
}
