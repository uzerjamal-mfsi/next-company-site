export default function Loading() {
  return (
    <main className="flex flex-1 flex-col gap-4 px-6 py-12" aria-busy="true">
      <span className="sr-only" role="status">
        Loading...
      </span>
      <div
        aria-hidden="true"
        className="h-6 w-48 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800"
      />
      <div
        aria-hidden="true"
        className="h-4 w-full max-w-xl animate-pulse rounded bg-zinc-200 dark:bg-zinc-800"
      />
      <div
        aria-hidden="true"
        className="h-4 w-full max-w-lg animate-pulse rounded bg-zinc-200 dark:bg-zinc-800"
      />
    </main>
  );
}
