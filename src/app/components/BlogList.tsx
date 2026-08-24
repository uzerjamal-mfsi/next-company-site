'use client';

import Link from 'next/link';
import { useState } from 'react';

export type BlogPost = {
  slug: string;
  title: string;
  author: string;
  date: string;
  excerpt: string;
  content: string[];
  imageUrl: string;
};

interface BlogListProps {
  posts: BlogPost[];
  companyName: string;
}

export default function BlogList({ posts, companyName }: BlogListProps) {
  const [query, setQuery] = useState('');

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(query.toLowerCase()) ||
      post.author.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <header className="mb-16 text-center">
          <h1 className="text-foreground text-3xl font-bold">{companyName} Blog</h1>

          <p className="text-muted-foreground mx-auto mt-2 max-w-2xl">Blogs from our Team.</p>

          <div role="search" className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
            <input
              id="blog-search"
              type="search"
              placeholder="Search"
              autoComplete="off"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="border-border bg-background text-foreground w-full rounded-lg border px-4 py-3"
            />
          </div>
        </header>

        <div>
          {filteredPosts.length === 0 ? (
            <p className="text-muted-foreground py-8 text-center">No posts found.</p>
          ) : (
            filteredPosts.map((post) => (
              <article
                key={post.slug}
                className="border-border border-b py-10 first:pt-0 last:border-b-0"
              >
                <h2 className="text-foreground mb-2 text-2xl font-bold">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="hover:text-primary transition-colors"
                  >
                    {post.title}
                  </Link>
                </h2>

                <p className="text-muted-foreground mb-4 text-sm">
                  By {post.author} · {post.date}
                </p>

                <p className="text-muted-foreground mb-6 leading-relaxed">{post.excerpt}</p>

                <Link href={`/blog/${post.slug}`} className="text-primary font-medium">
                  Continue reading
                </Link>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
