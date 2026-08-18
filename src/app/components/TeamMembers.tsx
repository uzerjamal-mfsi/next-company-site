import Image from 'next/image';
import Link from 'next/link';

export type TeamMember = {
  id: string;
  name: string;
  designation: string;
  bio: string;
  imageUrl: string;
};

export const teamMembersData: TeamMember[] = [
  {
    id: 'uzer-jamal',
    name: 'Uzer Jamal',
    designation: 'Software Engineer',
    bio: 'Placeholder',
    imageUrl: '',
  },
];

export function getTeamMember(id: string): TeamMember | undefined {
  return teamMembersData.find((member) => member.id === id);
}

export default function TeamMembers() {
  return (
    <section className="bg-muted py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h1 className="text-foreground text-3xl font-bold">Our Team</h1>

          <p className="text-muted-foreground mx-auto mt-2 max-w-2xl">
            The people behind our products and services.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {teamMembersData.map((member) => (
            <Link
              key={member.id}
              href={`/team/${member.id}`}
              className="border-border bg-background rounded-2xl border p-8 text-center transition-shadow hover:shadow-lg"
            >
              <Image
                src={member.imageUrl}
                alt={`Portrait of ${member.name}`}
                width={100}
                height={100}
                unoptimized
                className="mx-auto mb-6 h-24 w-24 rounded-full object-cover"
              />

              <h2 className="text-foreground mb-1 text-xl font-bold">{member.name}</h2>

              <p className="text-primary mb-3 text-sm font-medium">{member.designation}</p>

              <p className="text-muted-foreground mb-6 leading-relaxed">{member.bio}</p>

              <span className="text-primary mt-auto font-medium transition-colors hover:opacity-80">
                View profile
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
