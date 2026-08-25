import { playwright } from '@vitest/browser-playwright';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

const alias = {
  '@': fileURLToPath(new URL('./src', import.meta.url)),
};

export default defineConfig({
  test: {
    projects: [
      {
        resolve: { alias },
        test: {
          name: 'node',
          environment: 'node',
          setupFiles: ['./vitest.setup.ts'],
          include: ['__tests__/unit/**/*.test.ts'],
        },
      },
      {
        resolve: { alias },
        test: {
          name: 'browser',
          setupFiles: ['./vitest.setup.ts'],
          include: ['__tests__/components/**/*.test.{ts,tsx}'],
          browser: {
            enabled: true,
            provider: playwright(),
            api: 64100,
            instances: [{ browser: 'chromium' }],
          },
        },
      },
    ],
  },
});
