import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { projects } from "@/lib/projects/config";
import { SITE_URL } from "@/lib/constants";

const BASE_URL = SITE_URL;

const staticRoutes = [
  "",
  "/about",
  "/privacy",
  "/ai-engineer",
  "/backend-systems",
  "/blog",
  "/achievements",
  "/contact",
  "/education",
  "/experience",
  "/faq",
  "/volunteer",
  "/search",
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

  const projectPages = projects.map((p) => ({
    url: `${BASE_URL}/projects/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7 as const,
  }));

  const apiDocs = [
    { url: `${BASE_URL}/openapi.json`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.3 as const },
    { url: `${BASE_URL}/api/openapi.json`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.3 as const },
    { url: `${BASE_URL}/developers`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 as const },
    { url: `${BASE_URL}/developers/cli`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 as const },
    { url: `${BASE_URL}/developers/sdk`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 as const },
    { url: `${BASE_URL}/developers/deprecation`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.5 as const },
    { url: `${BASE_URL}/pricing`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 as const },
    { url: `${BASE_URL}/mcp`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.4 as const },
    { url: `${BASE_URL}/mcp/docs`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.4 as const },
    { url: `${BASE_URL}/auth.md`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.4 as const },
    { url: `${BASE_URL}/llms.txt`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.5 as const },
    { url: `${BASE_URL}/AGENTS.md`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.4 as const },
    { url: `${BASE_URL}/SKILL.md`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.4 as const },
    { url: `${BASE_URL}/openapi.yaml`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.3 as const },
    { url: `${BASE_URL}/.well-known/mcp/server-card.json`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.3 as const },
    { url: `${BASE_URL}/.well-known/mcp/docs/server-card.json`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.3 as const },
  ];

  return [...staticPages, ...englishPosts, ...hindiPosts, ...projectPages, ...apiDocs];
}
