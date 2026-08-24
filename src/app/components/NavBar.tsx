import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

export default function NavBar() {
  return (
    <nav className="bg-background border-border sticky top-0 z-50 w-full border-b">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6">
        <div>
          <Link href="/" className="text-primary text-2xl font-bold">
            The Company
          </Link>
        </div>

        <div className="flex space-x-8">
          <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
            Home
          </Link>
          <Link
            href="/about"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            About
          </Link>
          <Link
            href="/services"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Services
          </Link>
          <Link
            href="/team"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Team
          </Link>
          <Link
            href="/blog"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Blog
          </Link>
          <Link
            href="/contact"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Contact
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Link
            href="contact"
            className="bg-primary text-primary-foreground rounded-lg px-4 py-2 font-medium transition-opacity hover:opacity-90"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
