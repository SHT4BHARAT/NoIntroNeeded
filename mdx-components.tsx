import type { MDXComponents } from "mdx/types";

function slugify(input: string) {
  return input
    .trim()
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function extractText(node: unknown): string {
  if (node === null || node === undefined) return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (typeof node === "object") {
    // React element: try to read its children
    const maybeChildren = (node as { props?: { children?: unknown } })?.props?.children;
    return extractText(maybeChildren);
  }
  return "";
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children, ...props }) => (
      <h1 className="mb-4 mt-8 text-3xl font-bold tracking-tight" {...props}>
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => {
      const text = extractText(children);
      const id = slugify(text);
      return (
        <h2
          id={id}
          className="mb-3 mt-6 scroll-mt-24 text-2xl font-semibold tracking-tight"
          {...props}
        >
          {children}
        </h2>
      );
    },
    h3: ({ children, ...props }) => {
      const text = extractText(children);
      const id = slugify(text);
      return (
        <h3
          id={id}
          className="mb-2 mt-5 scroll-mt-24 text-xl font-semibold tracking-tight"
          {...props}
        >
          {children}
        </h3>
      );
    },
    p: ({ children, ...props }) => (
      <p className="mb-4 leading-relaxed text-muted" {...props}>
        {children}
      </p>
    ),
    a: ({ children, ...props }) => (
      <a className="text-accent underline decoration-accent/30 underline-offset-2 transition-colors hover:decoration-accent" {...props}>
        {children}
      </a>
    ),
    ul: ({ children, ...props }) => (
      <ul className="mb-4 list-disc space-y-1 pl-6 text-muted" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol className="mb-4 list-decimal space-y-1 pl-6 text-muted" {...props}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => (
      <li className="leading-relaxed" {...props}>
        {children}
      </li>
    ),
    code: ({ children, ...props }) => (
      <code
        className="rounded border border-border bg-surface px-1.5 py-0.5 font-mono text-sm"
        {...props}
      >
        {children}
      </code>
    ),
    pre: ({ children, ...props }) => (
      <pre
        className="mb-4 overflow-x-auto rounded-lg border border-border bg-surface p-4 font-mono text-sm"
        {...props}
      >
        {children}
      </pre>
    ),
    blockquote: ({ children, ...props }) => (
      <blockquote
        className="mb-4 border-l-2 border-accent pl-4 italic text-muted"
        {...props}
      >
        {children}
      </blockquote>
    ),
    hr: (props) => (
      <hr className="my-8 border-border" {...props} />
    ),
    img: ({ alt, ...props }) => (
      // eslint-disable-next-line @next/next/no-img-element
      <img className="my-6 rounded-lg border border-border" alt={alt} loading="lazy" {...props} />
    ),
    ...components,
  };
}
