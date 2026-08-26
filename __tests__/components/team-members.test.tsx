import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import TeamMembers, { TeamGrid } from '@/app/components/TeamMembers';
import type { TeamMember } from '@/lib/contentful/types';

const members: TeamMember[] = [
  {
    id: 'jane-doe',
    name: 'Jane Doe',
    designation: 'Engineer',
    bio: 'Writes code.',
    imageUrl: '',
  },
];

test('renders member details and links to their profile', async () => {
  const screen = await render(<TeamGrid members={members} />);

  await expect.element(screen.getByText('Jane Doe')).toBeVisible();
  await expect.element(screen.getByText('Engineer')).toBeVisible();

  await expect
    .element(screen.getByRole('link', { name: /Jane Doe/ }))
    .toHaveAttribute('href', '/team/jane-doe');
});

test('shows a placeholder for members without a photo', async () => {
  const screen = await render(<TeamGrid members={members} />);

  await expect.element(screen.getByText('No photo')).toBeVisible();
});

test('renders the team section with a heading', async () => {
  const screen = await render(<TeamMembers members={members} />);

  await expect.element(screen.getByRole('heading', { name: 'Our Team' })).toBeVisible();
  await expect.element(screen.getByText('Jane Doe')).toBeVisible();
});
