import type { Metadata } from 'next';
import { getSiteSettings, getTeamMembers } from '@/lib/contentful/client';
import About from '../components/About';

export const metadata: Metadata = {
  title: 'About | The Company',
  description: 'Learn more about The Company',
};

export default async function AboutPage() {
  const [siteSettings, teamMembers] = await Promise.all([getSiteSettings(), getTeamMembers()]);

  return <About siteSettings={siteSettings} teamMembers={teamMembers} />;
}
