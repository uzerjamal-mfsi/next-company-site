import Link from 'next/link';
import { CONSTANTS } from '@/constants/constants';
import type { SiteSettings } from '@/lib/contentful/types';

interface FooterProps {
  siteSettings: SiteSettings | null;
}

export default function Footer({ siteSettings }: FooterProps) {
  const companyName = siteSettings?.companyName ?? CONSTANTS.fallback.companyName;
  const footerText = siteSettings?.footerText ?? CONSTANTS.fallback.footerText;

  return (
    <footer className="bg-muted border-border border-t py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-foreground mb-4 text-lg font-semibold">{companyName}</h3>
            <p className="text-muted-foreground">{footerText}</p>
          </div>

          <nav>
            <h3 className="text-foreground mb-4 text-lg font-semibold">
              {CONSTANTS.sections.footer.quickLinks}
            </h3>
            <ul className="text-muted-foreground space-y-2">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  {CONSTANTS.sections.nav.home}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  {CONSTANTS.sections.nav.about}
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-primary transition-colors">
                  {CONSTANTS.sections.nav.services}
                </Link>
              </li>
              <li>
                <Link href="/team" className="hover:text-primary transition-colors">
                  {CONSTANTS.sections.nav.team}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-primary transition-colors">
                  {CONSTANTS.sections.nav.blog}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors">
                  {CONSTANTS.sections.nav.contact}
                </Link>
              </li>
            </ul>
          </nav>

          <nav>
            <h3 className="text-foreground mb-4 text-lg font-semibold">
              {CONSTANTS.sections.footer.legal}
            </h3>
            <ul className="text-muted-foreground space-y-2">
              <li>
                <Link href="/privacy" className="hover:text-primary transition-colors">
                  {CONSTANTS.sections.footer.privacy}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary transition-colors">
                  {CONSTANTS.sections.footer.terms}
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="border-border text-muted-foreground mt-8 border-t pt-8 text-center">
          <p>
            &copy; {new Date().getFullYear()} {companyName}. {CONSTANTS.sections.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
