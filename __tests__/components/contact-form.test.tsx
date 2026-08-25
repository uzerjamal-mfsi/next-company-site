import { afterEach, beforeEach, expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import ContactForm from '@/app/components/ContactForm';

beforeEach(() => {
  vi.spyOn(globalThis, 'fetch').mockResolvedValue(
    new Response(
      JSON.stringify({
        success: true,
        message: 'Thanks for reaching out! We will get back to you soon.',
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    ),
  );
});

afterEach(() => {
  vi.restoreAllMocks();
});

test('shows success message after a valid submission', async () => {
  const screen = await render(<ContactForm />);

  await screen.getByLabelText('Name').fill('Jane Doe');
  await screen.getByLabelText('Email').fill('jane@example.com');
  await screen.getByLabelText('Message').fill('Hello, I would like to work with you.');
  await screen.getByRole('button', { name: 'Send Message' }).click();

  await expect
    .element(screen.getByRole('status'))
    .toHaveTextContent('Thanks for reaching out! We will get back to you soon.');
});
