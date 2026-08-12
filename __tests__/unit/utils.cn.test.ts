import { describe, expect, it } from 'vitest';
import { cn } from '@/lib/utils';

describe('cn', () => {
  it('joins class names and drops falsy values', () => {
    expect(cn('a', false, 'b', undefined, null, 'c')).toBe('a b c');
  });

  it('resolves tailwind class conflicts in favor of the last class', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4');
  });
});
