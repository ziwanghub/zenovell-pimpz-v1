export function SectionBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex rounded-full bg-[#E91E8C] px-5 py-2 text-[11px] font-bold leading-none tracking-[0.08em] text-white uppercase shadow-[0_0_14px_rgba(233,30,140,0.35)]">
      {label}
    </span>
  );
}
