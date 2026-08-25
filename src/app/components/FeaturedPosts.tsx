import Image from 'next/image';
import Link from 'next/link';
import { CONSTANTS } from '@/constants/constants';
import type { BlogPost } from '@/lib/contentful/types';

interface FeaturedPostsProps {
  posts: Pick<BlogPost, 'slug' | 'title' | 'excerpt' | 'date' | 'imageUrl'>[];
}

export default function FeaturedPosts({ posts }: FeaturedPostsProps) {
  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <h2 className="text-foreground text-3xl font-bold">
              {CONSTANTS.sections.blog.featuredTitle}
            </h2>

            <p className="text-muted-foreground mt-2">{CONSTANTS.sections.blog.featuredSubtitle}</p>
          </div>

          <Link
            href="/blog"
            className="text-primary hidden font-medium transition-colors hover:opacity-80 md:block"
          >
            {CONSTANTS.sections.blog.viewAll}
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {posts.map((post, index) => (
            <article
              key={index}
              className="border-border bg-background flex flex-col overflow-hidden rounded-2xl border shadow-sm transition-shadow hover:shadow-lg"
            >
              <div className="relative h-48 w-full">
                {post.imageUrl ? (
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="bg-muted flex h-full w-full items-center justify-center">
                    <span className="text-muted-foreground">No image</span>
                  </div>
                )}
              </div>

              <div className="flex grow flex-col p-6">
                <p className="text-muted-foreground mb-2 text-sm">{post.date}</p>

                <h3 className="text-foreground mb-3 text-xl font-bold">{post.title}</h3>

                <p className="text-muted-foreground mb-6 grow">{post.excerpt}</p>

                <Link
                  href={`/blog/${post.slug}`}
                  className="text-primary mt-auto font-medium transition-colors hover:opacity-80"
                >
                  {CONSTANTS.sections.blog.readMore}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
