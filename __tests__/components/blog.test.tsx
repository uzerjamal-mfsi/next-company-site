import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import BlogPage from '@/app/blog/page';

test('renders the blog page', async () => {
  const screen = await render(<BlogPage />);

  await expect.element(screen.getByRole('searchbox')).toBeVisible();
  await expect.element(screen.getByRole('button', { name: 'Search' })).toBeVisible();
});
