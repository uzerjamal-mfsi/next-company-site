import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import NavBar from '@/app/components/NavBar';

test('renders the company name and navigation links', async () => {
  const screen = await render(<NavBar siteSettings={null} />);

  await expect
    .element(screen.getByRole('link', { name: 'The Company' }))
    .toHaveAttribute('href', '/');

  for (const [name, href] of [
    ['Home', '/'],
    ['About', '/about'],
    ['Services', '/services'],
    ['Team', '/team'],
    ['Blog', '/blog'],
    ['Contact', '/contact'],
  ]) {
    await expect
      .element(screen.getByRole('link', { name, exact: true }))
      .toHaveAttribute('href', href);
  }
});

test('renders a get started call to action', async () => {
  const screen = await render(<NavBar siteSettings={null} />);

  await expect
    .element(screen.getByRole('link', { name: 'Get Started' }))
    .toHaveAttribute('href', '/contact');
});
