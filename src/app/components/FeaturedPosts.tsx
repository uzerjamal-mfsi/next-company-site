import Image from 'next/image';
import Link from 'next/link';

const blogPosts = [
  {
    title: 'Placeholder',
    excerpt: 'Placeholder.',
    date: 'Aug 15, 2026',
    imageUrl: '',
    href: '/',
  },
];

export default function FeaturedPosts() {
  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <h2 className="text-foreground text-3xl font-bold">Featured Articles</h2>

            <p className="text-muted-foreground mt-2">
              Insights, updates, and tutorials from our team.
            </p>
          </div>

          <Link
            href="/blog"
            className="text-primary hidden font-medium transition-colors hover:opacity-80 md:block"
          >
            View all posts
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {blogPosts.map((post, index) => (
            <article
              key={index}
              className="border-border bg-background flex flex-col overflow-hidden rounded-2xl border shadow-sm transition-shadow hover:shadow-lg"
            >
              <div className="relative h-48 w-full">
                <Image src={post.imageUrl} alt={post.title} fill className="object-cover" />
              </div>

              <div className="flex flex-grow flex-col p-6">
                <p className="text-muted-foreground mb-2 text-sm">{post.date}</p>

                <h3 className="text-foreground mb-3 text-xl font-bold">{post.title}</h3>

                <p className="text-muted-foreground mb-6 flex-grow">{post.excerpt}</p>

                <Link
                  href={post.href}
                  className="text-primary mt-auto font-medium transition-colors hover:opacity-80"
                >
                  Read more
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
