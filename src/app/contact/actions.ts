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

  // TODO: persist submission to CMS/backend when available.
  return {
    success: true,
    message: 'Thanks for reaching out! We will get back to you soon.',
  };
}
