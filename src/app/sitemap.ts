import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { SITE_URL } from "@/lib/constants";

const BASE_URL = SITE_URL;

const staticRoutes = [
  "",
  "/ai-engineer",
  "/backend-systems",
  "/blog",
  "/achievements",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = staticRoutes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const englishPosts = getAllPosts("en").map((post) => ({
    url: `${BASE_URL}/blog/${post.frontmatter.slug}`,
    lastModified: new Date(post.frontmatter.updated ?? post.frontmatter.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const hindiPosts = getAllPosts("hi").map((post) => ({
    url: `${BASE_URL}/blog/hi/${post.frontmatter.slug}`,
    lastModified: new Date(post.frontmatter.updated ?? post.frontmatter.date),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticPages, ...englishPosts, ...hindiPosts];
}
