'use server';

import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, 'Please enter your name.'),
  email: z.email('Please enter a valid email address.'),
  message: z.string().min(10, 'Please enter a message of at least 10 characters.'),
});

export type ContactFormState = {
  success?: boolean;
  message?: string;
  errors?: {
    name?: string[];
    email?: string[];
    message?: string[];
  };
};

export async function submitContact(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const result = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  });

  if (!result.success) {
    return {
      success: false,
      message: 'Please fix the errors below.',
      errors: result.error.flatten().fieldErrors,
    };
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/contact`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(result.data),
    },
  );

  if (!response.ok) {
    return {
      success: false,
      message: 'Please try again later.',
    };
  }

  const data = await response.json();
  return data;
}
