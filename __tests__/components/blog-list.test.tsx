import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import BlogList from '@/app/components/BlogList';
import type { BlogPost } from '@/lib/contentful/types';

const posts: BlogPost[] = [
  {
    slug: 'test-post',
    title: 'Test Post',
    author: 'John Doe',
    date: 'Aug 25, 2026',
    excerpt: 'Test',
    content: ['Test'],
    imageUrl: '',
  },
];

test('renders all posts on load', async () => {
  const screen = await render(<BlogList posts={posts} companyName="The Company" />);

  await expect.element(screen.getByText('Test Post')).toBeVisible();
});

test('filters posts when typing in search', async () => {
  const screen = await render(<BlogList posts={posts} companyName="The Company" />);

  await screen.getByRole('searchbox').fill('test');

  await expect.element(screen.getByText('Test Post')).toBeVisible();
  expect(screen.getByText('Dummy').elements()).toHaveLength(0);
});
