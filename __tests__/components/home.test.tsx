import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import Home from '@/app/page';

test('renders the home page successfully', async () => {
  const screen = await render(<Home />);

  await expect.element(screen.getByText(/edit the/)).toBeInTheDocument();
  await expect.element(screen.getByRole('heading', { level: 1 })).toBeVisible();
});
