import { ImageResponse } from "@vercel/og";
import { getProjectBySlug } from "@/lib/projects/config";

export const runtime = "nodejs";

export default async function OGImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return new Response("Not found", { status: 404 });
  }

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
            background: "#D4913A",
            color: "#14171C",
            padding: "4px 12px",
            borderRadius: 6,
            fontSize: 14,
            fontWeight: 600,
            marginBottom: 32,
            width: "auto",
          }}
        >
          {project.date}
        </span>
        <h1
          style={{
            fontSize: 48,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
            margin: 0,
            marginBottom: 24,
            color: "#fafafa",
          }}
        >
          {project.title}
        </h1>
        <p
          style={{
            fontSize: 20,
            color: "#a1a1aa",
            lineHeight: 1.5,
            margin: 0,
            marginBottom: 32,
          }}
        >
          {project.description}
        </p>
        <div
          style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
            marginBottom: "auto",
          }}
        >
          {project.stack.slice(0, 6).map((tech) => (
            <span
              key={tech}
              style={{
                padding: "4px 10px",
                borderRadius: 6,
                border: "1px solid #27272a",
                fontSize: 14,
                color: "#a1a1aa",
              }}
            >
              {tech}
            </span>
          ))}
        </div>
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
          <span>sht-portfolio.vercel.app</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
