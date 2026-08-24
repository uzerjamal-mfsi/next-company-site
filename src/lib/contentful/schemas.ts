import { z } from 'zod';

export const siteSettingsSchema = z.object({
  companyName: z.string(),
  footerText: z.string(),
  heroText: z.string(),
  heroSubtitle: z.string(),
  mainHeading: z.string(),
  subHeading: z.string(),
  logo: z.object({ sys: z.object({ id: z.string() }) }).optional(),
});

export const serviceSchema = z.object({
  title: z.string(),
  slug: z.string(),
  description: z.string(),
  price: z.string(),
  image: z.object({ sys: z.object({ id: z.string() }) }).optional(),
  highlights: z.array(z.string()).optional(),
});

export const teamMemberSchema = z.object({
  name: z.string(),
  designation: z.string(),
  bio: z.string(),
  id: z.string(),
  photo: z.object({ sys: z.object({ id: z.string() }) }).optional(),
});

export const blogPostSchema = z.object({
  title: z.string(),
  slug: z.string(),
  author: z.string(),
  date: z.string(),
  excerpt: z.string(),
  content: z
    .object({
      content: z.array(z.unknown()),
    })
    .passthrough(),
  image: z.object({ sys: z.object({ id: z.string() }) }).optional(),
});
