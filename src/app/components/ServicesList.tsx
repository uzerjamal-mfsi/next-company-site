import Image from 'next/image';
import { CONSTANTS } from '@/constants/constants';
import type { Service } from '@/lib/contentful/types';

interface ServicesListProps {
  services: Service[];
  companyName: string;
}

export default function ServicesList({ services, companyName }: ServicesListProps) {
  return (
    <>
      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-foreground text-3xl font-bold">
              {companyName} {CONSTANTS.sections.services.title}
            </h1>

            <p className="text-muted-foreground mx-auto mt-2 max-w-2xl">
              {CONSTANTS.sections.services.subtitle}
            </p>
          </div>
        </div>
      </section>

      {services.map((service, index) => (
        <section
          key={service.slug}
          className={index % 2 === 0 ? 'bg-muted py-20' : 'bg-background py-20'}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
              <div className={index % 2 === 0 ? '' : 'md:order-2'}>
                <h2 className="text-foreground mb-4 text-3xl font-bold">{service.title}</h2>

                <p className="text-muted-foreground mb-8 leading-relaxed">{service.description}</p>

                <p className="text-primary text-2xl font-bold">{service.price}</p>
              </div>

              <div className={index % 2 === 0 ? '' : 'md:order-1'}>
                {service.imageUrl ? (
                  <Image
                    src={service.imageUrl}
                    alt={service.title}
                    width={1200}
                    height={800}
                    className="h-auto w-full rounded-2xl"
                  />
                ) : (
                  <div className="bg-muted flex aspect-video items-center justify-center rounded-2xl">
                    <span className="text-muted-foreground">No image</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
