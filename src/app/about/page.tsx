import type { Metadata } from 'next';
import About from '../components/About';

export const metadata: Metadata = {
  title: 'About | The Company',
  description: 'Learn more about The Company',
};

export default function AboutPage() {
  return <About />;
}
