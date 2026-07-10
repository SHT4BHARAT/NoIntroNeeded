import type { BlogCategory } from "./schema";

export const CATEGORY_LABELS: Record<BlogCategory, string> = {
  "model-tool-drops": "Model & Tool Drops",
  "repo-notes": "Repo Notes",
  "field-notes": "Field Notes",
  "article-reactions": "Article Reactions",
};

export const CATEGORY_ORDER: BlogCategory[] = [
  "field-notes",
  "repo-notes",
  "model-tool-drops",
  "article-reactions",
];
