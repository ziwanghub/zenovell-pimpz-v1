'use client';

interface InformationTrustProps {
  highlights?: string[];
}

export function InformationTrust({ highlights }: InformationTrustProps) {
  if (!highlights || highlights.length === 0) {
    return null;
  }

  return (
    <div className="bg-zinc-950 px-6 py-8 text-white min-[690px]:px-0">
      <div className="platform-shell-frame">
        <div className="text-sm font-medium tracking-widest text-white/60 mb-4">TRUST &amp; COMPLIANCE</div>
        <div className="grid grid-cols-1 gap-3">
          {highlights.map((text, i) => (
            <div key={i} className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/80">
              {text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
