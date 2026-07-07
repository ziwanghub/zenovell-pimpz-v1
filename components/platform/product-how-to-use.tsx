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
    <div className="bg-zinc-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-[430px]">
        <h2 className="mb-6 text-2xl font-semibold tracking-tight">How To Use</h2>

        <ol className="space-y-4">
          {howToUse.map((item, index) => (
            <li
              key={index}
              className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <span className="mt-0.5 inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-white/10 text-sm font-medium">
                {index + 1}
              </span>
              <div>
                <div className="font-medium">{item.step}</div>
                <p className="mt-1 text-sm text-white/70">{item.instruction}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
