import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import FeaturedPosts from '@/app/components/FeaturedPosts';

const posts = [
  {
    slug: 'test-post',
    title: 'Test Post',
    excerpt: 'A test post.',
    date: 'Aug 25, 2026',
    imageUrl: '',
  },
  {
    slug: 'other-post',
    title: 'Other Post',
    excerpt: 'Another post.',
    date: 'Aug 24, 2026',
    imageUrl: '/photo.jpg',
  },
];

test('renders all featured posts with their details', async () => {
  const screen = await render(<FeaturedPosts posts={posts} />);

  await expect.element(screen.getByText('Test Post', { exact: true })).toBeVisible();
  await expect.element(screen.getByText('Other Post', { exact: true })).toBeVisible();
  expect(screen.getByText('Read more').elements()).toHaveLength(2);
});

test('shows a placeholder for posts without an image', async () => {
  const screen = await render(<FeaturedPosts posts={posts} />);

  await expect.element(screen.getByText('No image')).toBeVisible();
});

test('links to the blog overview', async () => {
  const screen = await render(<FeaturedPosts posts={posts} />);

  await expect
    .element(screen.getByRole('link', { name: 'View all posts' }))
    .toHaveAttribute('href', '/blog');
});
