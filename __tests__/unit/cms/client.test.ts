import { expect, test, vi } from 'vitest';
import { getSiteSettings } from '@/lib/contentful/client';

const fetchMock = vi.fn();
vi.stubGlobal('fetch', fetchMock);

test('getSiteSettings returns mapped settings', async () => {
  fetchMock.mockResolvedValueOnce({
    ok: true,
    json: async () => ({
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
  });

  const settings = await getSiteSettings();

  expect(settings?.companyName).toBe('The Company');
  expect(settings?.heroTitle).toBe('We build software');
});
