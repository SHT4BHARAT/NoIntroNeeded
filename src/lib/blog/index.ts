import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { blogFrontmatterSchema, type BlogFrontmatter } from "./schema";
import { readingTime } from "./utils";

const BLOG_DIR = path.join(process.cwd(), "src", "content", "blog");

export interface BlogPost {
  frontmatter: BlogFrontmatter;
  content: string;
  readingTime: number;
}

function parsePost(filePath: string): BlogPost | null {
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);
    const parsed = blogFrontmatterSchema.parse(data);
    return {
      frontmatter: parsed,
      content,
      readingTime: readingTime(content),
    };
  } catch {
    return null;
  }
}

export function getAllPosts(lang: "en" | "hi" = "en"): BlogPost[] {
  const dir = lang === "hi" ? path.join(BLOG_DIR, "hi") : BLOG_DIR;

  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));

  const posts: BlogPost[] = [];

  for (const file of files) {
    const post = parsePost(path.join(dir, file));
    if (post) posts.push(post);
  }

  return posts.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
  );
}

export function getPostBySlug(
  slug: string,
  lang: "en" | "hi" = "en"
): BlogPost | null {
  const dir = lang === "hi" ? path.join(BLOG_DIR, "hi") : BLOG_DIR;
  const filePath = path.join(dir, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) return null;

  return parsePost(filePath);
}

export function getAllSlugs(lang: "en" | "hi" = "en"): string[] {
  const dir = lang === "hi" ? path.join(BLOG_DIR, "hi") : BLOG_DIR;

  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getCategoryCounts(lang: "en" | "hi" = "en"): Record<string, number> {
  const posts = getAllPosts(lang);
  const counts: Record<string, number> = {};

  for (const post of posts) {
    const cat = post.frontmatter.category;
    counts[cat] = (counts[cat] || 0) + 1;
  }

  return counts;
}


