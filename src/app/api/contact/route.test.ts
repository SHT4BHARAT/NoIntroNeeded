import { beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { appendToSheet } from "@/lib/contact/sheets";
import { POST } from "./route";

vi.mock("@/lib/contact/sheets", () => ({
  appendToSheet: vi.fn(),
}));

const validBody = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  message: "This is a test message that is long enough.",
};

function buildRequest(body: string, ip: string): NextRequest {
  return new NextRequest("http://localhost:3000/api/contact", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-forwarded-for": ip,
    },
    body,
  });
}

describe("POST /api/contact", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 400 for malformed JSON", async () => {
    const res = await POST(buildRequest("{not json", "203.0.113.10"));
    expect(res.status).toBe(400);
    expect(await res.json()).toMatchObject({ error: "Invalid JSON payload" });
  });

  it("returns 400 when fields fail validation", async () => {
    const res = await POST(
      buildRequest(
        JSON.stringify({ name: "", email: "nope", message: "x" }),
        "203.0.113.11"
      )
    );
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toBe("Validation failed");
  });

  it("silently succeeds for honeypot-filled submissions without calling the sheet", async () => {
    const res = await POST(
      buildRequest(
        JSON.stringify({ ...validBody, _name: "bot" }),
        "203.0.113.12"
      )
    );
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ success: true });
    expect(appendToSheet).not.toHaveBeenCalled();
  });

  it("returns 500 when the spreadsheet backend fails", async () => {
    vi.mocked(appendToSheet).mockRejectedValue(new Error("sheet down"));
    const res = await POST(
      buildRequest(JSON.stringify(validBody), "203.0.113.13")
    );
    expect(res.status).toBe(500);
    expect(await res.json()).toEqual({
      error: "Failed to submit message to spreadsheet",
    });
    expect(appendToSheet).toHaveBeenCalledTimes(1);
  });

  it("rate-limits after 5 requests from the same IP", async () => {
    for (let i = 0; i < 5; i++) {
      const res = await POST(
        buildRequest(
          JSON.stringify({ ...validBody, _name: "bot" }),
          "203.0.113.99"
        )
      );
      expect(res.status).toBe(200);
    }
    const res = await POST(
      buildRequest(JSON.stringify(validBody), "203.0.113.99")
    );
    expect(res.status).toBe(429);
    expect(await res.json()).toMatchObject({
      error: "Too many requests. Try again later.",
    });
  });
});
