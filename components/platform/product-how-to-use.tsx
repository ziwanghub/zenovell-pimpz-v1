'use client';

interface HowToUseStep {
  step: string;
  instruction: string;
}

interface ProductHowToUseProps {
  howToUse?: HowToUseStep[];
}

export function ProductHowToUse({ howToUse }: ProductHowToUseProps) {
  // Safe empty state when rich content is absent
  if (!howToUse || howToUse.length === 0) {
    return (
      <div className="bg-zinc-950 px-6 py-10 text-center text-sm text-white/50">
        How to Use data not available yet.
      </div>
    );
  }

  return (
    <section className="px-4 py-5 text-white md:px-0">
      <div className="mx-auto max-w-[430px]">
        <div className="mb-4">
          <div className="text-[11px] font-medium uppercase tracking-[0.24em] text-white/45">
            How To Use
          </div>
          <h2 className="mt-2 text-[22px] font-semibold tracking-[-0.02em] text-white">
            วิธีใช้ที่ช่วยลดความลังเลก่อนเริ่มต้น
          </h2>
        </div>

        <ol className="space-y-4">
          {howToUse.map((item, index) => (
            <li
              key={index}
              className="flex gap-4 rounded-[26px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-5"
            >
              <span className="mt-0.5 inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-2xl border border-fuchsia-400/20 bg-fuchsia-500/10 text-sm font-medium text-fuchsia-100">
                {index + 1}
              </span>
              <div>
                <div className="font-medium">{item.step}</div>
                <p className="mt-1 text-sm leading-6 text-white/70">{item.instruction}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
