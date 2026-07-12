'use client';

import type { Information } from '@/content/information';

interface InformationHeroProps {
  info: Information;
}

export function InformationHero({ info }: InformationHeroProps) {
  return (
    <div className="bg-zinc-950 px-6 py-12 text-white min-[690px]:px-0">
      <div className="platform-shell-frame">
        <div className="mb-3 inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-medium tracking-widest text-white/80">
          INFORMATION
        </div>
        <h1 className="text-3xl font-semibold tracking-tight">{info.title}</h1>
        {info.subtitle && (
          <p className="mt-3 text-lg text-white/80">{info.subtitle}</p>
        )}
        {info.description && (
          <p className="mt-4 text-sm text-white/70">{info.description}</p>
        )}
      </div>
    </div>
  );
}
