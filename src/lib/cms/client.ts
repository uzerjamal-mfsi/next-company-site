import { env } from '@/env';
import { ContentfulApiError, ContentfulError } from './errors';
import type {
  ContentfulAsset,
  ContentfulCollectionResponse,
  ContentfulEntry,
  ContentfulQueryParams,
} from './types';

const CONTENTFUL_CDN_BASE_URL = 'https://cdn.contentful.com';
const DEFAULT_REQUEST_TIMEOUT_MS = 15_000;

export interface ContentfulFetchOptions {
  query?: ContentfulQueryParams;
  next?: { revalidate?: number | false; tags?: string[] };
  cache?: RequestCache;
  signal?: AbortSignal;
  timeoutMs?: number;
}

interface ContentfulClientConfig {
  spaceId: string;
  environment: string;
  deliveryToken: string;
}

function getClientConfig(): ContentfulClientConfig {
  return {
    spaceId: env.CONTENTFUL_SPACE_ID,
    environment: env.CONTENTFUL_ENVIRONMENT,
    deliveryToken: env.CONTENTFUL_DELIVERY_TOKEN,
  };
}

function buildUrl(
  path: string,
  config: ContentfulClientConfig,
  query?: ContentfulQueryParams,
): URL {
  const url = new URL(
    `/spaces/${config.spaceId}/environments/${config.environment}${path}`,
    CONTENTFUL_CDN_BASE_URL,
  );

  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value === undefined) {
        continue;
      }
      url.searchParams.set(key, String(value));
    }
  }

  return url;
}

function createRequestSignal(
  timeoutMs: number,
  callerSignal?: AbortSignal,
): AbortSignal | undefined {
  const timeoutSignal = AbortSignal.timeout(timeoutMs);
  if (!callerSignal) {
    return timeoutSignal;
  }
  return AbortSignal.any([callerSignal, timeoutSignal]);
}

function mapFetchError(error: unknown, url: URL): ContentfulError {
  if (error instanceof Error) {
    if (error.name === 'TimeoutError') {
      return new ContentfulError(`Contentful request timed out (${url.pathname})`, 'timeout', {
        cause: error,
      });
    }
    if (error.name === 'AbortError') {
      return new ContentfulError('Contentful request was aborted', 'abort', { cause: error });
    }
  }
  return new ContentfulError('Network error while calling the Contentful API', 'network', {
    cause: error,
  });
}

async function readErrorMessage(response: Response): Promise<string | undefined> {
  try {
    const body: unknown = await response.json();
    if (isJsonObject(body) && typeof body.message === 'string') {
      return body.message;
    }
  } catch {
    // Ignore unparseable error bodies
  }
  return undefined;
}

async function createHttpError(response: Response, url: URL): Promise<ContentfulApiError> {
  const apiMessage = await readErrorMessage(response);
  const statusText = response.statusText ? ` ${response.statusText}` : '';
  const detail = apiMessage ? `: ${apiMessage}` : '';
  return new ContentfulApiError(
    response.status,
    response.statusText,
    url.pathname,
    `Contentful API request failed (HTTP ${response.status}${statusText})${detail}`,
  );
}

function isJsonObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

async function requestJson<T>(path: string, options: ContentfulFetchOptions = {}): Promise<T> {
  const config = getClientConfig();
  const url = buildUrl(path, config, options.query);
  const timeoutMs = options.timeoutMs ?? DEFAULT_REQUEST_TIMEOUT_MS;

  let response: Response;
  try {
    response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${config.deliveryToken}`,
        Accept: 'application/json',
      },
      next: options.next,
      cache: options.cache,
      signal: createRequestSignal(timeoutMs, options.signal),
    });
  } catch (error) {
    throw mapFetchError(error, url);
  }

  if (!response.ok) {
    throw await createHttpError(response, url);
  }

  let payload: unknown;
  try {
    payload = await response.json();
  } catch {
    throw new ContentfulError('Contentful API returned an invalid JSON response', 'invalid_json');
  }

  if (!isJsonObject(payload)) {
    throw new ContentfulError(
      'Contentful API returned an unexpected response structure',
      'invalid_response',
    );
  }

  return payload as T;
}

export async function listEntries<
  ItemType extends ContentfulEntry<unknown> = ContentfulEntry<unknown>,
>(options?: ContentfulFetchOptions): Promise<ContentfulCollectionResponse<ItemType>> {
  return requestJson('/entries', options);
}

export async function getEntry<ItemType extends ContentfulEntry = ContentfulEntry<unknown>>(
  entryId: string,
  options?: ContentfulFetchOptions,
): Promise<ItemType> {
  return requestJson(`/entries/${encodeURIComponent(entryId)}`, options);
}

export async function listAssets(
  options?: ContentfulFetchOptions,
): Promise<ContentfulCollectionResponse<ContentfulAsset>> {
  return requestJson('/assets', options);
}

export async function getAsset(
  assetId: string,
  options?: ContentfulFetchOptions,
): Promise<ContentfulAsset> {
  return requestJson(`/assets/${encodeURIComponent(assetId)}`, options);
}
