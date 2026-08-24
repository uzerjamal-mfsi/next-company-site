import type { Metadata } from 'next';
import BlogList from '../components/BlogList';

export const metadata: Metadata = {
  title: 'Blog | The Company',
  description: 'Blogs from our Team',
};

export default function BlogPage() {
  return <BlogList />;
}
