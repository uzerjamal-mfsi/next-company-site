import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import Hero from '@/app/components/Hero';
import type { SiteSettings } from '@/lib/contentful/types';

const siteSettings: SiteSettings = {
  companyName: 'The Company',
  footerText: 'All rights reserved.',
  heroTitle: 'We build software',
  heroSubtitle: 'Any idea can become a reality',
  missionStatement: 'Mission',
  visionStatement: 'Vision',
  logoUrl: '',
};

test('renders the site settings title and subtitle', async () => {
  const screen = await render(<Hero siteSettings={siteSettings} />);

  await expect
    .element(screen.getByRole('heading', { level: 1 }))
    .toHaveTextContent('We build software');
  await expect.element(screen.getByText('Any idea can become a reality')).toBeVisible();
});

test('links to services and contact', async () => {
  const screen = await render(<Hero siteSettings={null} />);

  await expect
    .element(screen.getByRole('link', { name: 'Our Services' }))
    .toHaveAttribute('href', '/services');
  await expect
    .element(screen.getByRole('link', { name: 'Contact Us' }))
    .toHaveAttribute('href', '/contact');
});
