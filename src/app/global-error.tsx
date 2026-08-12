'use client';

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="flex min-h-screen flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-semibold">Something went wrong</h1>
        <p className="max-w-md">An unexpected error occurred. Please try again.</p>
        <button
          type="button"
          onClick={reset}
          className="bg-foreground text-background rounded-md px-4 py-2 text-sm"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
