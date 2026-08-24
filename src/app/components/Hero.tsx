import Link from 'next/link';

export default function Hero() {
  return (
    <section className="bg-hero relative">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-4 lg:px-8 lg:py-32">
        <div className="text-center">
          <h1 className="text-hero-foreground mb-6 text-5xl font-extrabold tracking-tight md:text-6xl">
            Build Faster with <span className="text-primary">The Company</span>
          </h1>

          <p className="text-muted-foreground mx-auto mt-4 mb-10 max-w-2xl text-xl">
            From idea to production, we turn ideas into digital products.
          </p>

          <div className="flex justify-center gap-4">
            <Link
              href="/services"
              className="bg-primary text-primary-foreground rounded-lg px-8 py-3 font-semibold"
            >
              Our Services
            </Link>

            <Link
              href="/contact"
              className="bg-background text-primary rounded-lg px-8 py-3 font-semibold"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
