import type { Metadata } from 'next';
import ServicesList from '../components/ServicesList';

export const metadata: Metadata = {
  title: 'Services | The Company',
  description: 'Explore our services',
};

export default function ServicesPage() {
  return <ServicesList />;
}
