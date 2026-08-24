import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTeamMember, type TeamMember, teamMembersData } from '../../components/TeamMembers';

export function generateStaticParams() {
  return teamMembersData.map((member) => ({ id: member.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const member = getTeamMember(id);

  if (!member) {
    return { title: 'Team Member | The Company' };
  }

  return {
    title: `${member.name} | The Company`,
    description: `${member.designation} at The Company. ${member.bio}`,
  };
}

export function TeamMemberProfile({ member }: { member: TeamMember }) {
  return (
    <section className="bg-muted py-20">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <Image
          src={member.imageUrl}
          alt={`Portrait of ${member.name}`}
          width={160}
          height={160}
          unoptimized
          className="mx-auto mb-6 h-40 w-40 rounded-full object-cover"
        />

        <h1 className="text-foreground text-3xl font-bold">{member.name}</h1>

        <p className="text-primary mt-2 font-medium">{member.designation}</p>

        <p className="text-muted-foreground mt-6 leading-relaxed">{member.bio}</p>

        <Link
          href="/team"
          className="text-primary mt-10 inline-block font-medium transition-colors hover:opacity-80"
        >
          ← Back to team
        </Link>
      </div>
    </section>
  );
}

export default async function TeamMemberPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const member = getTeamMember(id);

  if (!member) {
    notFound();
  }

  return <TeamMemberProfile member={member} />;
}
