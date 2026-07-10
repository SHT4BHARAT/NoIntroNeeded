"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto flex max-w-2xl flex-1 flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl font-bold tracking-tight">Something went wrong</h1>
      <p className="mt-4 text-lg text-muted">
        {error.message || "An unexpected error occurred."}
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 rounded-md border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
      >
        Try again
      </button>
    </div>
  );
}
