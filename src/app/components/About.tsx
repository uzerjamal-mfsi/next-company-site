import { TeamGrid } from './TeamMembers';

export default function About() {
  return (
    <>
      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-foreground text-3xl font-bold">About Us</h1>

            <p className="text-muted-foreground mx-auto mt-2 max-w-2xl">Learn more about us.</p>
          </div>
        </div>
      </section>

      <section className="bg-muted py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-foreground mb-4 text-center text-3xl font-bold">Our Mission</h2>

          <p className="text-muted-foreground text-center leading-relaxed">Placeholder.</p>
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-foreground mb-4 text-center text-3xl font-bold">Our Vision</h2>

          <p className="text-muted-foreground text-center leading-relaxed">Placeholder.</p>
        </div>
      </section>

      <section className="bg-muted py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="text-foreground text-3xl font-bold">Our Team</h2>

            <p className="text-muted-foreground mx-auto mt-2 max-w-2xl">
              The people behind our products and services.
            </p>
          </div>

          <TeamGrid />
        </div>
      </section>
    </>
  );
}
