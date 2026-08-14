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
          include: ['__tests__/unit/cms/**/*.test.ts'],
        },
      },
      {
        resolve: { alias },
        test: {
          name: 'browser',
          setupFiles: ['./vitest.setup.ts'],
          include: ['__tests__/**/*.test.{ts,tsx}'],
          exclude: ['__tests__/unit/cms/**/*.test.ts'],
          browser: {
            enabled: true,
            provider: playwright(),
            instances: [{ browser: 'chromium' }],
          },
        },
      },
    ],
  },
});
