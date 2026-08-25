import type { Metadata } from 'next';
import { getTeamMembers } from '@/lib/contentful/client';
import TeamMembers from '../components/TeamMembers';

export const metadata: Metadata = {
  title: 'Team',
  description: 'Meet the team behind The Company',
};

export default async function TeamPage() {
  const teamMembers = await getTeamMembers();
  return <TeamMembers members={teamMembers} />;
}
