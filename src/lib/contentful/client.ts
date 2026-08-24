import { z } from 'zod';
import { env } from '@/env';
import { CONTENT_TYPE_IDS, CONTENTFUL_BASE_URL, DEFAULT_REVALIDATE_SECONDS } from './constants';
import { blogPostSchema, serviceSchema, siteSettingsSchema, teamMemberSchema } from './schemas';
import type { BlogPost, Service, SiteSettings, TeamMember } from './types';
import type { BlogPostFields, ServiceFields, SiteSettingsFields, TeamMemberFields } from './types';

async function getJson(url: string) {
  const res = await fetch(url, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${env.CONTENTFUL_DELIVERY_TOKEN}`,
    },
    next: { revalidate: DEFAULT_REVALIDATE_SECONDS },
  });

  if (!res.ok) {
    throw new Error(`API request failed (HTTP ${res.status})`);
  }

  return res.json();
}

function contentfulUrl(path: string): string {
  return `${CONTENTFUL_BASE_URL}/spaces/${env.CONTENTFUL_SPACE_ID}/environments/${env.CONTENTFUL_ENVIRONMENT}${path}`;
}

function buildAssetUrlMap(includes: {
  Asset?: Array<{ sys: { id: string }; fields: { file: { url: string } } }>;
}): Map<string, string> {
  const map = new Map<string, string>();
  if (includes?.Asset) {
    for (const asset of includes.Asset) {
      const url = asset.fields?.file?.url;
      if (url) {
        map.set(asset.sys.id, url.startsWith('//') ? `https:${url}` : url);
      }
    }
  }
  return map;
}

function extractTextFromRichText(richText: { content: unknown[] }): string[] {
  const paragraphs: string[] = [];
  function traverse(node: Record<string, unknown>): void {
    if (node.nodeType === 'paragraph' && Array.isArray(node.content)) {
      const text = node.content
        .filter(
          (n): n is Record<string, unknown> =>
            typeof n === 'object' && n !== null && n.nodeType === 'text',
        )
        .map((n) => (n.value as string) ?? '')
        .join('');
      if (text.trim()) paragraphs.push(text.trim());
    }
    if (Array.isArray(node.content)) {
      node.content.forEach((child) => {
        if (typeof child === 'object' && child !== null) traverse(child as Record<string, unknown>);
      });
    }
  }
  if (Array.isArray(richText.content)) {
    richText.content.forEach((child) => {
      if (typeof child === 'object' && child !== null) traverse(child as Record<string, unknown>);
    });
  }
  return paragraphs;
}

async function fetchEntriesWithAssets<T>(
  contentType: string,
  schema: z.ZodSchema<T>,
  query = '',
): Promise<{ items: T[]; assetMap: Map<string, string> }> {
  const data = await getJson(
    contentfulUrl(`/entries?content_type=${contentType}${query}&include=2`),
  );
  const assetMap = buildAssetUrlMap(data.includes);
  const results: T[] = [];
  for (const item of data.items) {
    const parsed = schema.safeParse(item.fields);
    if (parsed.success) {
      results.push(parsed.data);
    }
  }
  return { items: results, assetMap };
}

async function fetchEntryWithAssets<T>(
  contentType: string,
  idOrSlug: string,
  schema: z.ZodSchema<T>,
  bySlug = false,
): Promise<{ item: T | null; assetMap: Map<string, string> }> {
  const query = bySlug ? `&fields.slug=${encodeURIComponent(idOrSlug)}` : '';
  const data = await getJson(
    contentfulUrl(`/entries?content_type=${contentType}${query}&limit=1&include=2`),
  );
  const assetMap = buildAssetUrlMap(data.includes);
  if (data.items.length === 0) return { item: null, assetMap };
  const parsed = schema.safeParse(data.items[0].fields);
  return { item: parsed.success ? parsed.data : null, assetMap };
}

function getAssetUrl(
  assetMap: Map<string, string>,
  assetRef: { sys: { id: string } } | undefined,
): string {
  if (!assetRef?.sys?.id) return '';
  return assetMap.get(assetRef.sys.id) ?? '';
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  const { items, assetMap } = await fetchEntriesWithAssets<SiteSettingsFields>(
    CONTENT_TYPE_IDS.SITE_SETTINGS,
    siteSettingsSchema,
  );
  const s = items[0];
  if (!s) return null;
  return {
    companyName: s.companyName,
    footerText: s.footerText,
    heroTitle: s.heroText,
    heroSubtitle: s.heroSubtitle,
    missionStatement: s.mainHeading,
    visionStatement: s.subHeading,
    logoUrl: getAssetUrl(assetMap, s.logo),
  };
}

export async function getServices(): Promise<Service[]> {
  const { items, assetMap } = await fetchEntriesWithAssets<ServiceFields>(
    CONTENT_TYPE_IDS.SERVICE,
    serviceSchema,
  );
  return items.map((svc) => ({
    title: svc.title,
    slug: svc.slug,
    description: svc.description,
    price: `$${Number(svc.price).toLocaleString()}`,
    imageUrl: getAssetUrl(assetMap, svc.image),
    highlights: [],
  }));
}

export async function getFeaturedServices(limit = 3): Promise<Service[]> {
  const all = await getServices();
  return all.slice(0, limit);
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  const { items, assetMap } = await fetchEntriesWithAssets<TeamMemberFields>(
    CONTENT_TYPE_IDS.TEAM_MEMBER,
    teamMemberSchema,
  );
  return items.map((m) => ({
    id: m.id,
    name: m.name,
    designation: m.designation,
    bio: m.bio,
    imageUrl: getAssetUrl(assetMap, m.photo),
  }));
}

export async function getTeamMember(id: string): Promise<TeamMember | null> {
  const { item, assetMap } = await fetchEntryWithAssets<TeamMemberFields>(
    CONTENT_TYPE_IDS.TEAM_MEMBER,
    id,
    teamMemberSchema,
  );
  if (!item) return null;
  return {
    id: item.id,
    name: item.name,
    designation: item.designation,
    bio: item.bio,
    imageUrl: getAssetUrl(assetMap, item.photo),
  };
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const { items, assetMap } = await fetchEntriesWithAssets<BlogPostFields>(
    CONTENT_TYPE_IDS.BLOG_POST,
    blogPostSchema,
    '&order=-sys.createdAt',
  );
  return items.map((p) => ({
    slug: p.slug,
    title: p.title,
    author: p.author,
    date: new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }),
    excerpt: p.excerpt,
    content: extractTextFromRichText(p.content as { content: unknown[] }),
    imageUrl: getAssetUrl(assetMap, p.image),
  }));
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const { item, assetMap } = await fetchEntryWithAssets<BlogPostFields>(
    CONTENT_TYPE_IDS.BLOG_POST,
    slug,
    blogPostSchema,
    true,
  );
  if (!item) return null;
  return {
    slug: item.slug,
    title: item.title,
    author: item.author,
    date: new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }),
    excerpt: item.excerpt,
    content: extractTextFromRichText(item.content as { content: unknown[] }),
    imageUrl: getAssetUrl(assetMap, item.image),
  };
}

export async function getBlogPostSlugs(): Promise<{ slug: string }[]> {
  const data = await getJson(contentfulUrl('/entries?content_type=blogPost&select=fields.slug'));
  return data.items.map((item: { fields: { slug: string } }) => ({ slug: item.fields.slug }));
}
