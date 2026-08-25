import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    CONTENTFUL_SPACE_ID: z.string().min(1),
    CONTENTFUL_ENVIRONMENT: z.string().min(1),
    CONTENTFUL_DELIVERY_TOKEN: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_BASE_URL: z.url(),
  },
  runtimeEnv: {
    CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
    CONTENTFUL_ENVIRONMENT: process.env.CONTENTFUL_ENVIRONMENT,
    CONTENTFUL_DELIVERY_TOKEN: process.env.CONTENTFUL_DELIVERY_TOKEN,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  },
});
