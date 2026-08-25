import Link from 'next/link';
import { CONSTANTS } from '@/constants/constants';
import type { SiteSettings } from '@/lib/contentful/types';
import ThemeToggle from './ThemeToggle';

interface NavBarProps {
  siteSettings: SiteSettings | null;
}

export default function NavBar({ siteSettings }: NavBarProps) {
  const companyName = siteSettings?.companyName ?? CONSTANTS.fallback.companyName;

  return (
    <nav className="bg-background border-border sticky top-0 z-50 w-full border-b">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6">
        <div>
          <Link href="/" className="text-primary flex items-center text-2xl font-bold">
            {companyName}
          </Link>
        </div>

        <div className="flex space-x-8">
          <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
            {CONSTANTS.sections.nav.home}
          </Link>
          <Link
            href="/about"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {CONSTANTS.sections.nav.about}
          </Link>
          <Link
            href="/services"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {CONSTANTS.sections.nav.services}
          </Link>
          <Link
            href="/team"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {CONSTANTS.sections.nav.team}
          </Link>
          <Link
            href="/blog"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {CONSTANTS.sections.nav.blog}
          </Link>
          <Link
            href="/contact"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {CONSTANTS.sections.nav.contact}
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Link
            href="/contact"
            className="bg-primary text-primary-foreground rounded-lg px-4 py-2 font-medium transition-opacity hover:opacity-90"
          >
            {CONSTANTS.sections.nav.getStarted}
          </Link>
        </div>
      </div>
    </nav>
  );
}
