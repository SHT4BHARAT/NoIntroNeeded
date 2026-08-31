/**
 * Serializes a JSON-LD schema object for safe embedding inside a
 * <script type="application/ld+json"> tag via dangerouslySetInnerHTML.
 *
 * Escapes "<" as \u003c so a "</script>" sequence inside any string value
 * (e.g. a blog frontmatter title) can never close the script element early.
 * Defense-in-depth: current content is owner-authored, but this keeps the
 * sink safe even if data sources change.
 */
export function safeJsonLd(schema: unknown): string {
  return JSON.stringify(schema).replace(/</g, "\\u003c");
}