"use client";

import { track as vercelTrack } from "@vercel/analytics";

export function track(event: string, data?: Record<string, string | number | boolean>) {
  try {
    vercelTrack(event, data);
  } catch {
    // Analytics failures should never block the user experience
  }
}
