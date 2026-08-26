import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import About from '@/app/components/About';
import type { SiteSettings, TeamMember } from '@/lib/contentful/types';

const siteSettings: SiteSettings = {
  companyName: 'The Company',
  footerText: '',
  heroTitle: '',
  heroSubtitle: '',
  missionStatement: 'Our mission.',
  visionStatement: 'Our vision.',
  logoUrl: '',
};

const teamMembers: TeamMember[] = [
  {
    id: 'jane',
    name: 'Jane Doe',
    designation: 'Engineer',
    bio: 'Writes code',
    imageUrl: '',
  },
];

test('renders the mission and vision from site settings', async () => {
  const screen = await render(<About siteSettings={siteSettings} teamMembers={teamMembers} />);

  await expect.element(screen.getByText('Our mission.')).toBeVisible();
  await expect.element(screen.getByText('Our vision.')).toBeVisible();
});

test('falls back to default statements without site settings', async () => {
  const screen = await render(<About siteSettings={null} teamMembers={teamMembers} />);

  await expect.element(screen.getByText('To help companies ship software faster')).toBeVisible();
  await expect.element(screen.getByText('Every idea can become a reality')).toBeVisible();
});

test('renders the team members', async () => {
  const screen = await render(<About siteSettings={null} teamMembers={teamMembers} />);

  await expect.element(screen.getByText('Jane Doe')).toBeVisible();
});
