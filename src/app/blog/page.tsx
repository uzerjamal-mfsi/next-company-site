import type { Metadata } from 'next';
import { getBlogPosts, getSiteSettings } from '@/lib/contentful/client';
import BlogList from '../components/BlogList';

export const metadata: Metadata = {
  title: 'Blog | The Company',
  description: 'Blogs from our Team',
};

export default async function BlogPage() {
  const [blogPosts, siteSettings] = await Promise.all([getBlogPosts(), getSiteSettings()]);

  return <BlogList posts={blogPosts} companyName={siteSettings?.companyName ?? 'The Company'} />;
}
