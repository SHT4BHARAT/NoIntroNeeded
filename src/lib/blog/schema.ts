import { z } from "zod";

const blogCategoryEnum = z.enum([
  "model-tool-drops",
  "repo-notes",
  "field-notes",
  "article-reactions",
]);

export const blogFrontmatterSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  updated: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  category: blogCategoryEnum,
  tags: z.array(z.string()).default([]),
  excerpt: z.string().min(1),
  lang: z.enum(["en", "hi"]).default("en"),
  translationOf: z.string().optional(),
});

export type BlogCategory = z.infer<typeof blogCategoryEnum>;
export { blogCategoryEnum };
export type BlogFrontmatter = z.infer<typeof blogFrontmatterSchema>;
