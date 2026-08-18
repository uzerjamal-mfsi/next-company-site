const servicesData = [
  {
    title: 'Placeholder',
    description: 'Placeholder',
    icon: '🌐',
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-muted py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-foreground text-3xl font-bold">Our Services</h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {servicesData.map((service, index) => (
            <div
              key={index}
              className="border-border bg-background rounded-2xl border p-8 text-center"
            >
              <div className="mb-6 text-5xl">{service.icon}</div>

              <h3 className="text-foreground mb-3 text-xl font-bold">{service.title}</h3>

              <p className="text-muted-foreground leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
