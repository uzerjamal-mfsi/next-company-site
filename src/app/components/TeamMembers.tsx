import Image from 'next/image';
import Link from 'next/link';
import { CONSTANTS } from '@/constants/constants';
import type { TeamMember } from '@/lib/contentful/types';

export function TeamGrid({ members }: { members: TeamMember[] }) {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
      {members.map((member) => (
        <Link
          key={member.id}
          href={`/team/${member.id}`}
          className="border-border bg-background rounded-2xl border p-8 text-center transition-shadow hover:shadow-lg"
        >
          {member.imageUrl ? (
            <Image
              src={member.imageUrl}
              alt={`Portrait of ${member.name}`}
              width={100}
              height={100}
              className="mx-auto mb-6 h-24 w-24 rounded-full object-cover"
            />
          ) : (
            <div className="bg-muted text-muted-foreground mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full">
              <span className="text-sm">No photo</span>
            </div>
          )}

          <h2 className="text-foreground mb-1 text-xl font-bold">{member.name}</h2>

          <p className="text-primary mb-3 text-sm font-medium">{member.designation}</p>

          <p className="text-muted-foreground mb-6 leading-relaxed">{member.bio}</p>

          <span className="text-primary mt-auto font-medium transition-colors hover:opacity-80">
            {CONSTANTS.sections.team.viewProfile}
          </span>
        </Link>
      ))}
    </div>
  );
}

export default function TeamMembers({ members }: { members: TeamMember[] }) {
  return (
    <section className="bg-muted py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h1 className="text-foreground text-3xl font-bold">{CONSTANTS.sections.team.title}</h1>

          <p className="text-muted-foreground mx-auto mt-2 max-w-2xl">
            {CONSTANTS.sections.team.subtitle}
          </p>
        </div>

        <TeamGrid members={members} />
      </div>
    </section>
  );
}
