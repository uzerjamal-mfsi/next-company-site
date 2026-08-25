import { getBlogPosts, getFeaturedServices, getSiteSettings } from '@/lib/contentful/client';
import FeaturedPosts from './components/FeaturedPosts';
import Hero from './components/Hero';
import Services from './components/Services';

export default async function Home() {
  const [siteSettings, featuredServices, blogPosts] = await Promise.all([
    getSiteSettings(),
    getFeaturedServices(3),
    getBlogPosts(),
  ]);

  return (
    <>
      <Hero siteSettings={siteSettings} />
      <Services services={featuredServices} />
      <FeaturedPosts posts={blogPosts.slice(0, 3)} />
    </>
  );
}
