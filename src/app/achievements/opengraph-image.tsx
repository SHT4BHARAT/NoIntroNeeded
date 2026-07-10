import { ImageResponse } from "@vercel/og";

export const runtime = "nodejs";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          padding: 64,
          background: "#0a0a0a",
          color: "#ededed",
          fontFamily: "Inter, sans-serif",
        }}
      >
        <span
          style={{
            background: "#22d3ee",
            color: "#042f2e",
            padding: "4px 12px",
            borderRadius: 6,
            fontSize: 14,
            fontWeight: 600,
            marginBottom: 32,
            width: "auto",
          }}
        >
          Achievements
        </span>
        <h1
          style={{
            fontSize: 56,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
            margin: 0,
            marginBottom: 16,
            color: "#fafafa",
          }}
        >
          Hackathons, Certifications
        </h1>
        <h1
          style={{
            fontSize: 56,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
            margin: 0,
            marginBottom: 24,
            color: "#22d3ee",
          }}
        >
          & Challenge Wins
        </h1>
        <p
          style={{
            fontSize: 20,
            color: "#a1a1aa",
            lineHeight: 1.5,
            margin: 0,
            marginBottom: "auto",
          }}
        >
          Verifiable results from Shivanshu Tiwari's competitive and professional journey
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #27272a",
            paddingTop: 24,
            fontSize: 14,
            color: "#71717a",
          }}
        >
          <span>Shivanshu Tiwari</span>
          <span>sht-portfolio.vercel.app/achievements</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
