import { vi } from 'vitest';

vi.stubGlobal('process', {
  env: {
    NODE_ENV: 'test',
    CONTENTFUL_SPACE_ID: 'test-space',
    CONTENTFUL_ENVIRONMENT: 'master',
    CONTENTFUL_DELIVERY_TOKEN: 'test-delivery-token',
    NEXT_PUBLIC_BASE_URL: 'https://example.com',
  },
  browser: true,
  version: '',
  versions: {},
  platform: 'browser',
  nextTick: () => undefined,
  cwd: () => '',
});
