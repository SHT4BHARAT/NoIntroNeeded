import { SITE_URL } from "@/lib/constants";
import { projects } from "@/lib/projects/config";
import { getAllPosts } from "@/lib/blog";
import { developerResources, searchDeveloperResources, type DeveloperResourceItem } from "./resources";

export type { DeveloperResourceItem };

export interface SearchResultItem {
  title: string;
  url: string;
  markdownUrl: string;
  category: "developer" | "project" | "blog";
  description: string;
  tags: string[];
}

export interface SearchResults {
  query: string;
  total: number;
  developerResources: DeveloperResourceItem[];
  projects: SearchResultItem[];
  blogPosts: SearchResultItem[];
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length >= 2);
}

export function searchSite(query: string): SearchResults {
  const tokens = tokenize(query);

  if (tokens.length === 0) {
    return {
      query,
      total: developerResources.length + projects.length,
      developerResources,
      projects: projects.slice(0, 10).map((p) => ({
        title: p.title,
        url: `${SITE_URL}/projects/${p.slug}`,
        markdownUrl: `${SITE_URL}/projects/${p.slug}.md`,
        category: "project",
        description: p.description,
        tags: [...p.stack, p.slug],
      })),
      blogPosts: [],
    };
  }

  // 1. Search Developer Resources
  const scoredDev = searchDeveloperResources(query);

  // 2. Search Projects
  const scoredProjects = projects
    .map((p) => {
      let score = 0;
      const title = p.title.toLowerCase();
      const desc = p.description.toLowerCase();
      const stack = p.stack.join(" ").toLowerCase();
      const slug = p.slug.toLowerCase();

      for (const t of tokens) {
        if (title.includes(t)) score += 5;
        if (stack.includes(t)) score += 4;
        if (desc.includes(t)) score += 3;
        if (slug.includes(t)) score += 2;
      }

      return {
        item: {
          title: p.title,
          url: `${SITE_URL}/projects/${p.slug}`,
          markdownUrl: `${SITE_URL}/projects/${p.slug}.md`,
          category: "project" as const,
          description: p.description,
          tags: [...p.stack, p.slug],
        },
        score,
      };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((s) => s.item);

  // 3. Search Blog Posts
  const allPosts = getAllPosts("en");
  const scoredBlog = allPosts
    .map((post) => {
      let score = 0;
      const title = post.frontmatter.title.toLowerCase();
      const excerpt = (post.frontmatter.excerpt || "").toLowerCase();
      const tags = (post.frontmatter.tags || []).join(" ").toLowerCase();

      for (const t of tokens) {
        if (title.includes(t)) score += 5;
        if (tags.includes(t)) score += 4;
        if (excerpt.includes(t)) score += 3;
      }

      return {
        item: {
          title: post.frontmatter.title,
          url: `${SITE_URL}/blog/${post.frontmatter.slug}`,
          markdownUrl: `${SITE_URL}/blog/${post.frontmatter.slug}.md`,
          category: "blog" as const,
          description: post.frontmatter.excerpt || "",
          tags: post.frontmatter.tags || [],
        },
        score,
      };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((s) => s.item);

  return {
    query,
    total: scoredDev.length + scoredProjects.length + scoredBlog.length,
    developerResources: scoredDev,
    projects: scoredProjects,
    blogPosts: scoredBlog,
  };
}
