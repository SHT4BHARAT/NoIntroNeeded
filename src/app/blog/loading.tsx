export default function BlogLoading() {
  return (
    <div className="mx-auto max-w-3xl flex-1 px-4 py-20">
      <div className="mb-2 h-9 w-32 rounded bg-surface shimmer" />
      <div className="mb-8 h-5 w-64 rounded bg-surface shimmer" />

      <div className="mb-8 flex flex-wrap gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-8 w-20 rounded-md bg-surface shimmer"
          />
        ))}
      </div>

      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-lg border border-border bg-card p-5">
            <div className="mb-2 flex items-center gap-3">
              <div className="h-5 w-24 rounded bg-surface shimmer" />
              <div className="h-4 w-20 rounded bg-surface shimmer" />
            </div>
            <div className="mb-1 h-6 w-64 rounded bg-surface shimmer" />
            <div className="mt-3 h-4 w-full rounded bg-surface shimmer" />
            <div className="mt-2 h-4 w-3/4 rounded bg-surface shimmer" />
            <div className="mt-4 h-4 w-28 rounded bg-surface shimmer" />
          </div>
        ))}
      </div>
    </div>
  );
}
