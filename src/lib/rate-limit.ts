const WINDOW_MS = 60_000;
const MAX_REQUESTS = 5;

const env = process.env.VERCEL_ENV ?? "development";
const hasKvUrl = !!(process.env.KV_URL ?? process.env.KV_REST_API_URL);

let kv: { get: <T>(key: string) => Promise<T | null>; setex: (key: string, seconds: number, value: number) => Promise<"OK">; incr: (key: string) => Promise<number> } | null = null;

async function getKv() {
  if (kv !== null) return kv;
  if (!hasKvUrl) return null;
  try {
    const mod = await import("@vercel/kv");
    kv = mod.kv;
    return kv;
  } catch {
    if (env === "production") {
      console.warn(
        "[rate-limit] @vercel/kv not found. Install with: npm install @vercel/kv"
      );
    }
    return null;
  }
}

const ipRequests = new Map<string, { count: number; resetAt: number }>();

export async function checkRateLimit(ip: string): Promise<boolean> {
  const client = await getKv();

  if (client) {
    const key = `ratelimit:${ip}`;
    const current = await client.get<number>(key);
    if (current === null) {
      await client.setex(key, WINDOW_MS / 1000, 1);
      return true;
    }
    if (current >= MAX_REQUESTS) return false;
    await client.incr(key);
    return true;
  }

  if (env === "production") {
    console.warn(
      "[rate-limit] No KV store configured — rate limiting is a no-op in multi-instance production."
    );
  }

  const now = Date.now();
  const entry = ipRequests.get(ip);

  if (!entry || now > entry.resetAt) {
    ipRequests.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }

  if (entry.count >= MAX_REQUESTS) return false;

  entry.count++;
  return true;
}
