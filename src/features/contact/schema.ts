import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, 'Please enter your name.'),
  email: z.email('Please enter a valid email address.'),
  message: z.string().min(10, 'Please enter a message of at least 10 characters.'),
});

export type ContactMessage = z.infer<typeof contactSchema>;
