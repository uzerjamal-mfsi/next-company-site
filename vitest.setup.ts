import { vi } from 'vitest';

vi.stubGlobal('process', {
  env: { NODE_ENV: 'test' },
  browser: true,
  version: '',
  versions: {},
  platform: 'browser',
  nextTick: () => undefined,
  cwd: () => '',
});
