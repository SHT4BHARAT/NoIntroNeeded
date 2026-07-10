import { ImageResponse } from "@vercel/og";
import { getPostBySlug } from "@/lib/blog";

export default async function OGImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return new Response("Not found", { status: 404 });
  }

  const { frontmatter } = post;

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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 32,
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
            }}
          >
            {frontmatter.category.replace(/-/g, " ")}
          </span>
          <span style={{ color: "#71717a", fontSize: 14 }}>
            {frontmatter.date}
          </span>
        </div>
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
          {frontmatter.title}
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
          {frontmatter.excerpt}
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
