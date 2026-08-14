import { beforeEach, describe, expect, it, vi } from 'vitest';
import { getEntry, listEntries } from '@/lib/cms/client';

const fetchMock = vi.fn();

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

describe('cms client', () => {
  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal('fetch', fetchMock);
  });

  it('hits the Contentful CDN with the delivery token', async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({ total: 1, items: [] }));

    await listEntries();

    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toContain('/spaces/test-space/environments/master/entries');
    expect(init.headers).toMatchObject({
      Authorization: 'Bearer test-delivery-token',
    });
  });

  it('encodes the entry id in the path', async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({ sys: { id: 'abc 123' } }));

    await getEntry('abc 123');

    const [url] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toContain('/spaces/test-space/environments/master/entries/abc%20123');
  });

  it('throws when the API returns an error status', async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({}, 500));

    await expect(listEntries()).rejects.toThrow(/HTTP 500/);
  });
});
