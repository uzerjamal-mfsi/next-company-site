import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import ServicesPage from '@/app/services/page';

test('renders the services page successfully', async () => {
  const screen = await render(<ServicesPage />);

  await expect.element(screen.getByRole('heading', { level: 1 })).toBeVisible();
});
