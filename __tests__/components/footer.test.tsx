import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import Footer from '@/app/components/Footer';
import type { SiteSettings } from '@/lib/contentful/types';

const siteSettings: SiteSettings = {
  companyName: 'The Company',
  footerText: 'All rights reserved.',
  heroTitle: '',
  heroSubtitle: '',
  missionStatement: '',
  visionStatement: '',
  logoUrl: '',
};

test('renders the company name from site settings', async () => {
  const screen = await render(<Footer siteSettings={siteSettings} />);

  await expect.element(screen.getByText('The Company')).toBeVisible();
});
