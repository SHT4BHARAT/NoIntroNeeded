import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const isDev = process.env.NODE_ENV === "development";

// Content-Security-Policy built from actual app needs (audited 2026-08-31):
// - Fonts are self-hosted by next/font, images are local, no third-party
//   scripts. Hence default-src 'self' with narrow exceptions only.
// - script-src 'unsafe-inline': Next.js injects inline bootstrap/flight-data
//   scripts; a nonce-based policy would force every page dynamic. Vercel
//   Analytics falls back to va.vercel-scripts.com when self-hosted.
// - style-src 'unsafe-inline': React style props (spotlight, marquee, etc.).
// - Dev adds 'unsafe-eval' for Turbopack HMR.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${
    isDev ? " 'unsafe-eval'" : ""
  } https://va.vercel-scripts.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self' https://va.vercel-scripts.com",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
  },
  pageExtensions: ["ts", "tsx", "mdx"],
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.shivanshutiwari.in" }],
        destination: "https://shivanshutiwari.in/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|jpeg|png|gif|ico|webp|avif)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: csp,
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Link",
            value:
              '</sitemap.xml>; rel="sitemap", </llms.txt>; rel="describedby", </.well-known/api-catalog>; rel="api-catalog", </openapi.json>; rel="service-desc"; type="application/json", </auth.md>; rel="describedby"; type="text/markdown", </index.md>; rel="alternate"; type="text/markdown"',
          },
        ],
      },
    ];
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
