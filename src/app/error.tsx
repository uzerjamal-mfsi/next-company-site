'use client';

import { useEffect } from 'react';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
      <h1 className="text-2xl font-semibold">Something went wrong</h1>
      <p className="text max-w-md">An unexpected error occurred. Please try again.</p>
      <button
        type="button"
        onClick={reset}
        className="bg-foreground text-background rounded-md px-4 py-2 text-sm font-medium"
      >
        Try again
      </button>
    </main>
  );
}
