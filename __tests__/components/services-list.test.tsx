import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import ServicesList from '@/app/components/ServicesList';

const services = [
  {
    slug: 'web-development',
    title: 'Web Development',
    description: 'We build websites.',
    price: '$5,000',
    imageUrl: '',
    highlights: [],
  },
  {
    slug: 'consulting',
    title: 'Consulting',
    description: 'We advise teams',
    price: '$1,000',
    imageUrl: '/photo.jpg',
    highlights: [],
  },
];

test('renders the heading with the company name', async () => {
  const screen = await render(<ServicesList services={services} companyName="The Company" />);

  await expect
    .element(screen.getByRole('heading', { level: 1 }))
    .toHaveTextContent('The Company Our Services');
});

test('renders every service with its price and description', async () => {
  const screen = await render(<ServicesList services={services} companyName="The Company" />);

  await expect.element(screen.getByText('$5,000')).toBeVisible();
  await expect.element(screen.getByText('$1,000')).toBeVisible();
  await expect.element(screen.getByText('We advise teams')).toBeVisible();
});

test('shows a placeholder for services without an image', async () => {
  const screen = await render(<ServicesList services={services} companyName="The Company" />);

  await expect.element(screen.getByText('No image')).toBeVisible();
});
