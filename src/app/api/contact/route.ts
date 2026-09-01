import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact/validation";
import { appendToSheet } from "@/lib/contact/sheets";
import { checkRateLimit } from "@/lib/rate-limit";

export function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      Allow: "POST, OPTIONS",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    // Idempotency-Key support (echo back for retry safety; store check omitted for portfolio)
    const _idemKey = request.headers.get("Idempotency-Key") ?? request.headers.get("idempotency-key");
    void _idemKey;
    if (!(await checkRateLimit(ip))) {
      return NextResponse.json(
        { error: "Too many requests. Try again later.", code: "rate_limited", message: "Too many requests. Try again later.", hint: "Retry after 60s", requestId: `req_${Date.now()}` },
        { status: 429, headers: { "Retry-After": "60", "RateLimit-Limit": "5", "RateLimit-Remaining": "0", "RateLimit-Reset": "60" } }
      );
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON payload", code: "invalid_json", message: "Invalid JSON payload", hint: "Send valid JSON with name,email,message" },
        { status: 400, headers: { "RateLimit-Limit": "5" } }
      );
    }

    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", code: "validation_error", message: "Validation failed", hint: "Check name/email/message", details: parsed.error.flatten(), requestId: `req_${Date.now()}` },
        { status: 400, headers: { "RateLimit-Limit": "5" } }
      );
    }

    if (parsed.data._name) {
      return NextResponse.json({ success: true }, { headers: { "RateLimit-Limit": "5", "RateLimit-Remaining": "4", "RateLimit-Reset": "60" } });
    }

    try {
      const appendPromise = appendToSheet(parsed.data);
      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("Timeout appending to sheet")), 8000)
      );
      await Promise.race([appendPromise, timeoutPromise]);
    } catch (err: unknown) {
      console.error("[api/contact] Error appending to sheet:", err);
      return NextResponse.json(
        { error: "Failed to submit message to spreadsheet", code: "sheet_error", message: "Failed to submit message to spreadsheet", hint: "Retry with Idempotency-Key", requestId: `req_${Date.now()}` },
        { status: 500, headers: { "RateLimit-Limit": "5" } }
      );
    }

    return NextResponse.json({ success: true }, { headers: { "RateLimit-Limit": "5", "RateLimit-Remaining": "4", "RateLimit-Reset": "60" } });
  } catch (err: unknown) {
    console.error("[api/contact] Global handler error:", err);
    return NextResponse.json(
      { error: "Internal server error", code: "internal_error", message: "Internal server error", hint: "Try again", requestId: `req_${Date.now()}` },
      { status: 500, headers: { "RateLimit-Limit": "5" } }
    );
  }
}
