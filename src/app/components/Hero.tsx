import Link from 'next/link';
import { CONSTANTS } from '@/constants/constants';
import type { SiteSettings } from '@/lib/contentful/types';

interface HeroProps {
  siteSettings: SiteSettings | null;
}

export default function Hero({ siteSettings }: HeroProps) {
  const title = siteSettings?.heroTitle ?? null;
  const subtitle = siteSettings?.heroSubtitle ?? null;

  return (
    <section className="bg-hero relative">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-4 lg:px-8 lg:py-32">
        <div className="text-center">
          <h1 className="text-hero-foreground mb-6 text-5xl font-extrabold tracking-tight md:text-6xl">
            {title}
          </h1>

          <p className="text-muted-foreground mx-auto mt-4 mb-10 max-w-2xl text-xl">{subtitle}</p>

          <div className="flex justify-center gap-4">
            <Link
              href="/services"
              className="bg-primary text-primary-foreground rounded-lg px-8 py-3 font-semibold"
            >
              {CONSTANTS.sections.hero.ctaServices}
            </Link>

            <Link
              href="/contact"
              className="bg-background text-primary rounded-lg px-8 py-3 font-semibold"
            >
              {CONSTANTS.sections.hero.ctaContact}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
