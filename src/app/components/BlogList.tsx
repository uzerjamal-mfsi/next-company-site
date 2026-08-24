import Link from 'next/link';

export type BlogPost = {
  slug: string;
  title: string;
  author: string;
  date: string;
  excerpt: string;
  content: string[];
};

export const blogPostsData: BlogPost[] = [
  {
    slug: 'placeholder-post-one',
    title: 'Placeholder Post One',
    author: 'Placeholder Author',
    date: 'Aug 15, 2026',
    excerpt: 'Placeholder excerpt for the first post.',
    content: ['Placeholder paragraph.', 'Placeholder paragraph.', 'Placeholder paragraph.'],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPostsData.find((post) => post.slug === slug);
}

export default function BlogList() {
  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <header className="mb-16 text-center">
          <h1 className="text-foreground text-3xl font-bold">Blog</h1>

          <p className="text-muted-foreground mx-auto mt-2 max-w-2xl">Blogs from our Team.</p>

          <form
            role="search"
            method="get"
            action="/blog"
            className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <input
              id="blog-search"
              type="search"
              placeholder="Search"
              autoComplete="off"
              className="border-border bg-background text-foreground w-full rounded-lg border px-4 py-3"
            />
            <button
              type="submit"
              className="bg-primary text-primary-foreground rounded-lg px-6 py-3 font-semibold"
            >
              Search
            </button>
          </form>
        </header>

        <div>
          {blogPostsData.map((post) => (
            <article
              key={post.slug}
              className="border-border border-b py-10 first:pt-0 last:border-b-0"
            >
              <h2 className="text-foreground mb-2 text-2xl font-bold">
                <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
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
          ))}
        </div>
      </div>
    </section>
  );
}
