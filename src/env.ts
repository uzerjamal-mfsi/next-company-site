import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    CMS_API_KEY: z.string().min(1),
    CMS_ENDPOINT: z.url(),
  },
  client: {
    NEXT_PUBLIC_SITE_URL: z.url(),
  },
  runtimeEnv: {
    CMS_API_KEY: process.env.CMS_API_KEY,
    CMS_ENDPOINT: process.env.CMS_ENDPOINT,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  },
});
