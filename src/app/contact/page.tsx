import type { Metadata } from 'next';
import ContactForm from '../components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact | The Company',
  description: 'Get in touch with The Company',
};

export default function ContactPage() {
  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h1 className="text-foreground text-3xl font-bold">Contact Us</h1>

          <p className="text-muted-foreground mx-auto mt-2 max-w-2xl">Get in Touch</p>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
