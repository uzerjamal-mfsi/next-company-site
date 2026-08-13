import { createClient } from 'next-sanity';
import 'server-only';
import { env } from '@/env';

export const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2026-08-12',
  useCdn: true,
});
