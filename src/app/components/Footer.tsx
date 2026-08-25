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
        <div className="text-center">
          <h2 className="text-foreground mb-4 text-lg font-semibold">{companyName}</h2>
          <p className="text-muted-foreground">{footerText}</p>
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
