import { beforeEach, expect, test, vi } from 'vitest';
import {
  getBlogPost,
  getBlogPosts,
  getFeaturedServices,
  getSiteSettings,
} from '@/lib/contentful/client';

const fetchMock = vi.fn();
vi.stubGlobal('fetch', fetchMock);

beforeEach(() => {
  fetchMock.mockReset();
});

function jsonResponse(data: unknown) {
  return { ok: true, json: async () => data };
}

function richTextParagraph(text: string) {
  return {
    nodeType: 'document',
    content: [{ nodeType: 'paragraph', content: [{ nodeType: 'text', value: text }] }],
  };
}

function blogPostFields(overrides: Record<string, unknown> = {}) {
  return {
    title: 'First post',
    slug: 'first-post',
    author: 'Jane Doe',
    date: '2026-08-20',
    excerpt: 'A first post.',
    content: richTextParagraph('Hello world.'),
    ...overrides,
  };
}

test('getSiteSettings returns mapped settings', async () => {
  fetchMock.mockResolvedValueOnce(
    jsonResponse({
      items: [
        {
          fields: {
            companyName: 'The Company',
            footerText: 'Copyright',
            heroText: 'We build software',
            heroSubtitle: 'Quick Development',
            mainHeading: 'Mission',
            subHeading: 'Vision',
          },
        },
      ],
      includes: { Asset: [] },
    }),
  );

  const settings = await getSiteSettings();

  expect(settings?.companyName).toBe('The Company');
  expect(settings?.heroTitle).toBe('We build software');
});

test('getBlogPosts maps fields and requests newest-first ordering', async () => {
  fetchMock.mockResolvedValueOnce(
    jsonResponse({
      items: [
        { fields: blogPostFields({ title: 'Second post', slug: 'second-post' }) },
        { fields: blogPostFields() },
      ],
      includes: { Asset: [] },
    }),
  );

  const posts = await getBlogPosts();

  const [url] = fetchMock.mock.calls[0];
  expect(String(url)).toContain('order=-sys.createdAt');

  expect(posts).toHaveLength(2);
  expect(posts[1]).toMatchObject({
    slug: 'first-post',
    title: 'First post',
    author: 'Jane Doe',
    excerpt: 'A first post.',
    content: ['Hello world.'],
  });
  expect(posts[1]?.date).toBe(
    new Date('2026-08-20').toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }),
  );
});

test('getBlogPost returns null when slug is not found', async () => {
  fetchMock.mockResolvedValueOnce(jsonResponse({ items: [], includes: {} }));

  const post = await getBlogPost('missing-slug');

  expect(post).toBeNull();
});

test('getFeaturedServices returns at most the default limit of services', async () => {
  fetchMock.mockResolvedValueOnce(
    jsonResponse({
      items: Array.from({ length: 5 }, (_, i) => ({
        fields: {
          title: `Service ${i + 1}`,
          slug: `service-${i + 1}`,
          description: 'We build software.',
          price: (i + 1) * 100,
        },
      })),
      includes: { Asset: [] },
    }),
  );

  const featured = await getFeaturedServices();

  expect(featured).toHaveLength(3);
  expect(featured.map((service) => service.slug)).toEqual(['service-1', 'service-2', 'service-3']);
});
