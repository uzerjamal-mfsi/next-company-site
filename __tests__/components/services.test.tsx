import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import Services from '@/app/components/Services';

const services = [
  { slug: 'web-development', title: 'Web Development', description: 'We build websites.' },
  { slug: 'consulting', title: 'Consulting', description: 'We advise teams.' },
];

test('renders all services', async () => {
  const screen = await render(<Services services={services} />);

  await expect.element(screen.getByText('Web Development')).toBeVisible();
  await expect.element(screen.getByText('We build websites.')).toBeVisible();
  await expect.element(screen.getByText('Consulting')).toBeVisible();
  await expect.element(screen.getByText('We advise teams.')).toBeVisible();
});

test('renders the section title', async () => {
  const screen = await render(<Services services={services} />);

  await expect.element(screen.getByText('Our Services')).toBeVisible();
});
