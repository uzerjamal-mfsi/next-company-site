import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <p className="text-sm font-medium">404</p>
      <h1 className="text-2xl font-semibold">Page not found</h1>
      <p>The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link href="/" className="bg-foreground text-background rounded-md px-4 py-2 font-medium">
        Back to home
      </Link>
    </main>
  );
}
