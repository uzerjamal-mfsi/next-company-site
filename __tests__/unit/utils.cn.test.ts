import { expect, test } from 'vitest';
import { cn } from '@/lib/utils';

test('cn merges classes and handles conflicts', () => {
  expect(cn('flex px-2', false, 'px-4')).toBe('flex px-4');
});
