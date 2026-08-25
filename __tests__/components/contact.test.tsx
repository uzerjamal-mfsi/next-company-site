import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import ContactPage from '@/app/contact/page';

test('renders the contact page', async () => {
  const screen = await render(<ContactPage />);

  await expect.element(screen.getByRole('heading', { level: 1 })).toBeVisible();
});
