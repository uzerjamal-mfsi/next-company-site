import { CONSTANTS } from '@/constants/constants';
import type { SiteSettings, TeamMember } from '@/lib/contentful/types';
import { TeamGrid } from './TeamMembers';

interface AboutProps {
  siteSettings: SiteSettings | null;
  teamMembers: TeamMember[];
}

export default function About({ siteSettings, teamMembers }: AboutProps) {
  const companyName = siteSettings?.companyName ?? CONSTANTS.fallback.companyName;
  const mission = siteSettings?.missionStatement ?? CONSTANTS.fallback.mission;
  const vision = siteSettings?.visionStatement ?? CONSTANTS.fallback.vision;

  return (
    <>
      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-foreground text-3xl font-bold">
              {CONSTANTS.sections.about.title} {companyName}
            </h1>

            <p className="text-muted-foreground mx-auto mt-2 max-w-2xl">
              {CONSTANTS.sections.about.subtitle}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-muted py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-foreground mb-4 text-center text-3xl font-bold">
            {CONSTANTS.sections.about.missionTitle}
          </h2>

          <p className="text-muted-foreground text-center leading-relaxed">{mission}</p>
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-foreground mb-4 text-center text-3xl font-bold">
            {CONSTANTS.sections.about.visionTitle}
          </h2>

          <p className="text-muted-foreground text-center leading-relaxed">{vision}</p>
        </div>
      </section>

      <section className="bg-muted py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="text-foreground text-3xl font-bold">
              {CONSTANTS.sections.about.teamTitle}
            </h2>

            <p className="text-muted-foreground mx-auto mt-2 max-w-2xl">
              {CONSTANTS.sections.about.teamSubtitle}
            </p>
          </div>

          <TeamGrid members={teamMembers} />
        </div>
      </section>
    </>
  );
}
