import { z } from 'zod';
import { blogPostSchema, serviceSchema, siteSettingsSchema, teamMemberSchema } from './schemas';

export type SiteSettingsFields = z.infer<typeof siteSettingsSchema>;
export type ServiceFields = z.infer<typeof serviceSchema>;
export type TeamMemberFields = z.infer<typeof teamMemberSchema>;
export type BlogPostFields = z.infer<typeof blogPostSchema>;

export interface SiteSettings {
  companyName: string;
  footerText: string;
  heroTitle: string;
  heroSubtitle: string;
  missionStatement: string;
  visionStatement: string;
  logoUrl: string;
}

export interface Service {
  title: string;
  slug: string;
  description: string;
  price: string;
  imageUrl: string;
  highlights: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  designation: string;
  bio: string;
  imageUrl: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  author: string;
  date: string;
  excerpt: string;
  content: string[];
  imageUrl: string;
}
