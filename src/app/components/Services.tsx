import { CONSTANTS } from '@/constants/constants';
import type { Service } from '@/lib/contentful/types';

interface ServicesProps {
  services: Pick<Service, 'slug' | 'title' | 'description'>[];
}

export default function Services({ services }: ServicesProps) {
  return (
    <section id="services" className="bg-muted py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-foreground text-3xl font-bold">
            {CONSTANTS.sections.services.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.slug}
              className="border-border bg-background rounded-2xl border p-8 text-center"
            >
              <h3 className="text-foreground mb-3 text-xl font-bold">{service.title}</h3>

              <p className="text-muted-foreground leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
