import Image from 'next/image';

const servicesData = [
  {
    title: 'Placeholder',
    description: 'Placeholder',
    price: '$1,000',
    imageUrl: '',
    highlights: ['Placeholder'],
  },
];

export default function ServicesList() {
  return (
    <>
      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-foreground text-3xl font-bold">Our Services</h1>

            <p className="text-muted-foreground mx-auto mt-2 max-w-2xl">
              From idea to production, we turn ideas into digital products.
            </p>
          </div>
        </div>
      </section>

      {servicesData.map((service, index) => (
        <section key={index} className={index % 2 === 0 ? 'bg-muted py-20' : 'bg-background py-20'}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
              <div className={index % 2 === 0 ? '' : 'md:order-2'}>
                <h2 className="text-foreground mb-4 text-3xl font-bold">{service.title}</h2>

                <p className="text-muted-foreground mb-8 leading-relaxed">{service.description}</p>

                <ul className="text-muted-foreground mb-8 list-disc space-y-2 pl-5">
                  {service.highlights.map((highlight, highlightIndex) => (
                    <li key={highlightIndex}>{highlight}</li>
                  ))}
                </ul>

                <p className="text-primary text-2xl font-bold">{service.price}</p>
              </div>

              <div className={index % 2 === 0 ? '' : 'md:order-1'}>
                <Image
                  src={service.imageUrl}
                  alt={service.title}
                  width={1200}
                  height={800}
                  unoptimized
                  className="h-auto w-full rounded-2xl"
                />
              </div>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
