import Link from 'next/link';
import type { SiteSettings } from '@/lib/contentful/types';

interface FooterProps {
  siteSettings: SiteSettings | null;
}

export default function Footer({ siteSettings }: FooterProps) {
  const companyName = siteSettings?.companyName ?? 'The Company';
  const footerText = siteSettings?.footerText ?? 'All rights reserved.';

  return (
    <footer className="bg-muted border-border border-t py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-foreground mb-4 text-lg font-semibold">{companyName}</h3>
            <p className="text-muted-foreground">{footerText}</p>
          </div>

          <nav>
            <h3 className="text-foreground mb-4 text-lg font-semibold">Quick Links</h3>
            <ul className="text-muted-foreground space-y-2">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-primary transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/team" className="hover:text-primary transition-colors">
                  Team
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          <nav>
            <h3 className="text-foreground mb-4 text-lg font-semibold">Legal</h3>
            <ul className="text-muted-foreground space-y-2">
              <li>
                <Link href="/privacy" className="hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="border-border text-muted-foreground mt-8 border-t pt-8 text-center">
          <p>
            &copy; {new Date().getFullYear()} {companyName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
