export default function ProjectsLoading() {
  return (
    <main className="mx-auto max-w-4xl flex-1 px-4 py-12">
      <style>{`
        @keyframes shimmer {
          0% { background-position: 100% 0; }
          100% { background-position: 0 0; }
        }
        .shimmer {
          background-image: linear-gradient(
            90deg,
            rgba(39,39,42,0.35) 0%,
            rgba(39,39,42,0.12) 50%,
            rgba(39,39,42,0.35) 100%
          );
          background-size: 200% 100%;
          animation: shimmer 1.2s ease-in-out infinite;
        }
      `}</style>

      <div className="mb-4 h-4 w-24 rounded bg-surface shimmer" />
      <div className="mb-3 h-10 w-3/4 rounded bg-surface shimmer" />
      <div className="mb-4 h-6 w-full rounded bg-surface shimmer" />

      <div className="mb-4 flex gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-6 w-20 rounded-md bg-surface shimmer" />
        ))}
      </div>

      <div className="mb-8 flex gap-3">
        <div className="h-5 w-24 rounded bg-surface shimmer" />
        <div className="h-5 w-24 rounded bg-surface shimmer" />
      </div>

      <div className="space-y-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-5 w-full rounded bg-surface shimmer" />
        ))}
      </div>
    </main>
  );
}
