import { expect, test } from 'vitest';
import { getTeamMember } from '@/app/components/TeamMembers';

test('returns no member for an unknown id', () => {
  expect(getTeamMember('unknown-member')).toBeUndefined();
});
