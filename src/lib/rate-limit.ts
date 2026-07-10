// In-memory rate limiter — effective for single-instance deployments.
// On Vercel serverless (multiple instances), each function has its own memory,
// so this is a no-op (a new Map is created per cold start).
// TODO: Replace with Vercel KV or database-backed rate limiting for production.

const ipRequests = new Map<string, { count: number; resetAt: number }>();

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 5;

export function checkRateLimit(ip: string): boolean {
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
