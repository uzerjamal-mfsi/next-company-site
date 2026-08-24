import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { type BlogPost, blogPostsData, getBlogPost } from '../../components/BlogList';

export function generateStaticParams() {
  return blogPostsData.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return { title: 'Blog Post | The Company' };
  }

  return {
    title: `${post.title} | The Company`,
    description: post.excerpt,
  };
}

export function BlogPostView({ post }: { post: BlogPost }) {
  return (
    <article className="bg-background py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <p className="text-muted-foreground mb-4 text-sm">
          By {post.author} · {post.date}
        </p>

        <h1 className="text-foreground mb-8 text-3xl font-bold">{post.title}</h1>

        <div className="space-y-6">
          {post.content.map((paragraph, index) => (
            <p key={index} className="text-muted-foreground">
              {paragraph}
            </p>
          ))}
        </div>

        <Link href="/blog" className="text-primary mt-10 inline-block font-medium">
          ← Back to blog
        </Link>
      </div>
    </article>
  );
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return <BlogPostView post={post} />;
}
