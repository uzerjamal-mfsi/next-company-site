import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import TeamPage from '@/app/team/page';

test('renders the team page successfully', async () => {
  const screen = await render(<TeamPage />);

  await expect.element(screen.getByRole('heading', { level: 1 })).toBeVisible();
});
