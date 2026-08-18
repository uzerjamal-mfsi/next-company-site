import type { Metadata } from 'next';
import TeamMembers from '../components/TeamMembers';

export const metadata: Metadata = {
  title: 'Team | The Company',
  description: 'Meet the team behind The Company',
};

export default function TeamPage() {
  return <TeamMembers />;
}
