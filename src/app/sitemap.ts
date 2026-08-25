import type { MetadataRoute } from 'next';
import { env } from '@/env';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['', '/about', '/services', '/team', '/blog', '/contact'];

  return pages.map((page) => ({
    url: `${env.NEXT_PUBLIC_BASE_URL}${page}`,
  }));
}
