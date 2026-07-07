'use client';

interface KnowledgeTakeawaysProps {
  takeaways?: string[];
}

export function KnowledgeTakeaways({ takeaways }: KnowledgeTakeawaysProps) {
  if (!takeaways || takeaways.length === 0) {
    return null;
  }

  return (
    <div className="bg-zinc-950 px-6 py-8 text-white">
      <div className="mx-auto max-w-[430px]">
        <div className="text-sm font-medium tracking-widest text-white/60 mb-4">KEY TAKEAWAYS</div>
        <ul className="space-y-3 text-sm text-white/80">
          {takeaways.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-1 text-white/50">→</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
