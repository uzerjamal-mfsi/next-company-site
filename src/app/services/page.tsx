import type { Metadata } from 'next';
import { getServices, getSiteSettings } from '@/lib/contentful/client';
import ServicesList from '../components/ServicesList';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Explore our services',
};

export default async function ServicesPage() {
  const [services, siteSettings] = await Promise.all([getServices(), getSiteSettings()]);

  return (
    <ServicesList services={services} companyName={siteSettings?.companyName ?? 'The Company'} />
  );
}
