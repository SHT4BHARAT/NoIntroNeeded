export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const { name, email, message } = body as { name?: string; email?: string; message?: string };

  if (!name || !email || !message || message.length < 10) {
    return Response.json(
      {
        code: "validation_error",
        message: "Fields 'name', 'email', and 'message' (min 10 chars) are required",
        sandbox: true,
      },
      {
        status: 400,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "X-Sandbox": "true",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }

  return Response.json(
    {
      success: true,
      sandbox: true,
      message: "Sandbox contact submission validated successfully. No real email was dispatched.",
      received: { name, email, messageLength: message.length },
    },
    {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "X-Sandbox": "true",
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
}

export function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      Allow: "POST, OPTIONS",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type, X-Sandbox, Idempotency-Key",
    },
  });
}
