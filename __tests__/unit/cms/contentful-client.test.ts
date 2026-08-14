import { beforeEach, describe, expect, it, vi } from 'vitest';
import { getAsset, getEntry, listAssets, listEntries } from '@/lib/cms/client';
import { ContentfulApiError, ContentfulError } from '@/lib/cms/errors';
import type { ContentfulEntry } from '@/lib/cms/types';

const fetchMock = vi.fn();

function jsonResponse(body: unknown, status = 200, statusText?: string): Response {
  return new Response(JSON.stringify(body), {
    status,
    statusText,
    headers: { 'Content-Type': 'application/json' },
  });
}

function lastFetchCall(): [URL, RequestInit] {
  return fetchMock.mock.calls.at(-1) as [URL, RequestInit];
}

describe('Contentful REST client', () => {
  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal('fetch', fetchMock);
  });

  it('returns parsed JSON for a successful request', async () => {
    const body = {
      sys: { type: 'Array' },
      total: 1,
      skip: 0,
      limit: 100,
      items: [{ sys: { type: 'Entry', id: '5fM4Z5uL2AgQ8m6kQyW0gK' }, fields: { title: 'Hello' } }],
    };
    fetchMock.mockResolvedValueOnce(jsonResponse(body));

    const result = await listEntries<ContentfulEntry<{ title: string }>>();

    expect(result.total).toBe(1);
    expect(result.items[0].fields.title).toBe('Hello');
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('builds the Contentful CDN URL with space, environment and path', async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({ sys: { type: 'Array' } }));
    fetchMock.mockResolvedValueOnce(
      jsonResponse({ sys: { type: 'Entry', id: 'abc123' }, fields: {} }),
    );

    await listEntries();
    await getEntry('abc123');

    const calls = fetchMock.mock.calls;
    const [listUrl] = calls[0] as [URL, RequestInit];
    expect(listUrl.hostname).toBe('cdn.contentful.com');
    expect(decodeURIComponent(listUrl.pathname)).toBe(
      '/spaces/test-space/environments/master/entries',
    );

    const [entryUrl] = calls[1] as [URL, RequestInit];
    expect(entryUrl.hostname).toBe('cdn.contentful.com');
    expect(decodeURIComponent(entryUrl.pathname)).toBe(
      '/spaces/test-space/environments/master/entries/abc123',
    );
  });

  it('uses the configured space and environment from validated env', async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({ sys: { type: 'Array' } }));

    await listAssets();

    const [url] = lastFetchCall();
    expect(decodeURIComponent(url.pathname)).toBe('/spaces/test-space/environments/master/assets');
  });

  it('sends the Authorization Bearer header', async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({ sys: { type: 'Array' } }));

    await listEntries();

    const [, init] = lastFetchCall();
    expect(init.headers).toMatchObject({
      Authorization: 'Bearer test-delivery-token',
    });
  });

  it('sends the Accept application/json header', async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({ sys: { type: 'Array' } }));

    await listEntries();

    const [, init] = lastFetchCall();
    expect(init.headers).toMatchObject({
      Accept: 'application/json',
    });
  });

  it('encodes query parameters and skips undefined values', async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({ sys: { type: 'Array' } }));

    await listEntries({
      query: {
        content_type: 'blogPost',
        'fields.title[in]': 'a&b c',
        limit: 3,
        skip: undefined,
      },
    });

    const [url] = lastFetchCall();
    expect(url.searchParams.get('content_type')).toBe('blogPost');
    expect(url.searchParams.get('fields.title[in]')).toBe('a&b c');
    expect(url.searchParams.get('limit')).toBe('3');
    expect(url.searchParams.has('skip')).toBe(false);
  });

  it('forwards Next.js caching and revalidation options to fetch', async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({ sys: { type: 'Array' } }));

    await listEntries({ next: { revalidate: 60, tags: ['cms'] }, cache: 'no-store' });

    const [, init] = lastFetchCall();
    expect(init.next).toEqual({ revalidate: 60, tags: ['cms'] });
    expect(init.cache).toBe('no-store');
  });

  it.each([
    ['HTTP 400', 400, 'Bad Request'],
    ['HTTP 401', 401, 'Unauthorized'],
    ['HTTP 404', 404, 'Not Found'],
    ['HTTP 429', 429, 'Too Many Requests'],
    ['HTTP 500', 500, 'Internal Server Error'],
  ])('throws a typed ContentfulApiError for %s', async (_label, status, statusText) => {
    fetchMock.mockResolvedValueOnce(
      jsonResponse(
        { sys: { type: 'Error' }, message: `server says ${status}` },
        status,
        statusText,
      ),
    );

    const error = await listEntries().catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ContentfulApiError);
    expect(error).toBeInstanceOf(ContentfulError);
    if (error instanceof ContentfulApiError) {
      expect(error.code).toBe('http');
      expect(error.status).toBe(status);
      expect(error.requestPath).toBe('/spaces/test-space/environments/master/entries');
      expect(error.message).toContain(`HTTP ${status}`);
      expect(error.message).toContain(`server says ${status}`);
    }
  });

  it('wraps network failures in a typed ContentfulError', async () => {
    fetchMock.mockRejectedValueOnce(new TypeError('Failed to fetch'));

    const error = await listEntries().catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ContentfulError);
    expect(error).not.toBeInstanceOf(ContentfulApiError);
    if (error instanceof ContentfulError) {
      expect(error.code).toBe('network');
    }
  });

  it('classifies timeout aborts', async () => {
    fetchMock.mockRejectedValueOnce(new DOMException('The operation timed out', 'TimeoutError'));

    const error = await listEntries({ timeoutMs: 10 }).catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ContentfulError);
    if (error instanceof ContentfulError) {
      expect(error.code).toBe('timeout');
      expect(error.message).not.toContain('test-delivery-token');
    }
  });

  it('classifies caller aborts', async () => {
    fetchMock.mockRejectedValueOnce(new DOMException('The user aborted a request', 'AbortError'));

    const controller = new AbortController();
    const error = await listEntries({ signal: controller.signal }).catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ContentfulError);
    if (error instanceof ContentfulError) {
      expect(error.code).toBe('abort');
    }
  });

  it('throws a typed error for an invalid JSON response body', async () => {
    fetchMock.mockResolvedValueOnce(
      new Response('<html>not json</html>', { status: 200, statusText: 'OK' }),
    );

    const error = await listEntries().catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ContentfulError);
    if (error instanceof ContentfulError) {
      expect(error.code).toBe('invalid_json');
    }
  });

  it('throws a typed error for an unexpected response structure', async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse([1, 2, 3]));

    const error = await listEntries().catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ContentfulError);
    if (error instanceof ContentfulError) {
      expect(error.code).toBe('invalid_response');
    }
  });

  it('never leaks the delivery token in thrown errors', async () => {
    fetchMock.mockRejectedValueOnce(new TypeError('Failed to fetch'));
    const networkError = await listEntries().catch((e: unknown) => e);

    fetchMock.mockResolvedValueOnce(
      jsonResponse({ sys: { type: 'Error' }, message: 'token rejected' }, 401, 'Unauthorized'),
    );
    const httpError = await listEntries().catch((e: unknown) => e);

    expect(String((networkError as Error).message)).not.toContain('test-delivery-token');
    expect(String((httpError as Error).message)).not.toContain('test-delivery-token');
    expect(JSON.stringify(httpError)).not.toContain('test-delivery-token');
  });

  it('fetches a single asset by id', async () => {
    fetchMock.mockResolvedValueOnce(
      jsonResponse({ sys: { type: 'Asset', id: 'asset1' }, fields: { title: 'Logo' } }),
    );

    const asset = await getAsset('asset1');

    expect(asset.sys.id).toBe('asset1');
    const [url] = lastFetchCall();
    expect(decodeURIComponent(url.pathname)).toBe(
      '/spaces/test-space/environments/master/assets/asset1',
    );
  });
});
