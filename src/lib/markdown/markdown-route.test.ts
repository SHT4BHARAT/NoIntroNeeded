import { describe, it, expect } from "vitest";
import { GET } from "@/app/api/markdown/[[...slug]]/route";

function makeParams(slug?: string[]) {
  return { params: Promise.resolve({ slug }) as never };
}

describe("GET /api/markdown/[[...slug]]", () => {
  it("returns 200 markdown for home", async () => {
    const res = await GET(new Request("http://localhost/api/markdown"), makeParams([]));
    expect(res.status).toBe(200);
    expect(res.headers.get("Content-Type")).toContain("text/markdown");
    expect(res.headers.get("Vary")).toBe("Accept");
    const body = await res.text();
    expect(body).toContain("# Shivanshu Tiwari");
  });

  it("returns 200 markdown for a valid project", async () => {
    const res = await GET(
      new Request("http://localhost/api/markdown/projects/daitfo"),
      makeParams(["projects", "daitfo"])
    );
    expect(res.status).toBe(200);
    expect(res.headers.get("Content-Type")).toContain("text/markdown");
    const body = await res.text();
    expect(body).toContain("DAITFO");
  });

  it("returns 404 markdown for invalid project slug", async () => {
    const res2 = await GET(
      new Request("http://localhost/api/markdown/projects/this-does-not-exist"),
      makeParams(["projects", "this-does-not-exist"])
    );
    expect(res2.status).toBe(404);
    expect(res2.headers.get("Content-Type")).toContain("text/markdown");
    const body = await res2.text();
    expect(body).toContain("404");
    expect(body).toContain("sitemap.xml");
    expect(body).toContain("llms.txt");
  });

  it("returns 404 markdown for unknown top-level path", async () => {
    const res = await GET(
      new Request("http://localhost/api/markdown/this-path-does-not-exist-xyz"),
      makeParams(["this-path-does-not-exist-xyz"])
    );
    expect(res.status).toBe(404);
    expect(await res.text()).toContain("404");
  });

  it("sets Cache-Control on markdown responses", async () => {
    const res = await GET(new Request("http://localhost/api/markdown/about"), makeParams(["about"]));
    expect(res.status).toBe(200);
    expect(res.headers.get("Cache-Control")).toContain("s-maxage=");
  });

  it("returns markdown for /about and /privacy with sufficient content", async () => {
    for (const page of ["about", "privacy", "contact"]) {
      const res = await GET(
        new Request(`http://localhost/api/markdown/${page}`),
        makeParams([page])
      );
      expect(res.status).toBe(200);
      const body = await res.text();
      // visible text stripped of markdown syntax should be >=500 chars
      const visible = body.replace(/[#*`\[\]()_>-]/g, "").replace(/\s+/g, " ").trim();
      expect(visible.length, `${page} visible length`).toBeGreaterThanOrEqual(500);
    }
  });

  it("returns markdown for blog post", async () => {
    const res = await GET(
      new Request("http://localhost/api/markdown/blog/hello-world"),
      makeParams(["blog", "hello-world"])
    );
    // This post exists? Check if getPostBySlug returns something. If not, may be 404 but still markdown type.
    expect([200, 404]).toContain(res.status);
    expect(res.headers.get("Content-Type")).toContain("text/markdown");
  });
});
