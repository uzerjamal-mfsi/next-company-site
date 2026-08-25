import { expect, test } from 'vitest';
import { blogPostSchema, serviceSchema } from '@/lib/contentful/schemas';

test('serviceSchema accepts valid service', () => {
  const result = serviceSchema.safeParse({
    title: 'Web Development',
    slug: 'web-development',
    description: 'We build websites.',
    price: 5000,
  });
  expect(result.success).toBe(true);
});

test('blogPostSchema accepts valid post', () => {
  const result = blogPostSchema.safeParse({
    title: 'First post',
    slug: 'first-post',
    author: 'Jane Doe',
    date: '2026-08-20',
    excerpt: 'A first post.',
    content: { content: [] },
  });
  expect(result.success).toBe(true);
});
