import { env } from '@/env';

const CONTENTFUL_BASE_URL = 'https://cdn.contentful.com';

async function getJson(url: string, token?: string) {
  const headers: Record<string, string> = { Accept: 'application/json' };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(url, { headers });

  if (!res.ok) {
    throw new Error(`API request failed (HTTP ${res.status})`);
  }

  return res.json();
}

function contentfulUrl(path: string): string {
  const { CONTENTFUL_SPACE_ID, CONTENTFUL_ENVIRONMENT } = env;
  return `${CONTENTFUL_BASE_URL}/spaces/${CONTENTFUL_SPACE_ID}/environments/${CONTENTFUL_ENVIRONMENT}${path}`;
}

export async function listEntries() {
  return getJson(contentfulUrl('/entries'), env.CONTENTFUL_DELIVERY_TOKEN);
}

export async function getEntry(entryId: string) {
  return getJson(
    contentfulUrl(`/entries/${encodeURIComponent(entryId)}`),
    env.CONTENTFUL_DELIVERY_TOKEN,
  );
}

export async function listAssets() {
  return getJson(contentfulUrl('/assets'), env.CONTENTFUL_DELIVERY_TOKEN);
}

export async function getAsset(assetId: string) {
  return getJson(
    contentfulUrl(`/assets/${encodeURIComponent(assetId)}`),
    env.CONTENTFUL_DELIVERY_TOKEN,
  );
}
