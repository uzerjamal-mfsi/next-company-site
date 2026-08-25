import { expect, test } from 'vitest';
import { contactSchema } from '@/features/contact/schema';

test('accepts a valid contact submission', () => {
  const result = contactSchema.safeParse({
    name: 'Jane Doe',
    email: 'jane@example.com',
    message: 'Hello, I would like to work with you.',
  });

  expect(result.success).toBe(true);
  expect(result.data).toEqual({
    name: 'Jane Doe',
    email: 'jane@example.com',
    message: 'Hello, I would like to work with you.',
  });
});
