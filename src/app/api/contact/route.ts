import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact/validation";
import { appendToSheet } from "@/lib/contact/sheets";
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    if (!(await checkRateLimit(ip))) {
      return NextResponse.json(
        { error: "Too many requests. Try again later." },
        { status: 429 }
      );
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON payload" },
        { status: 400 }
      );
    }

    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    if (parsed.data._name) {
      return NextResponse.json({ success: true });
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
        { error: "Failed to submit message to spreadsheet" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    console.error("[api/contact] Global handler error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
