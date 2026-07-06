import { ReactNode } from "react";
import { SectionBadge } from "./section-badge";

interface SectionHeaderProps {
  label: string;
  heading: ReactNode;
  description: string;
}

export function SectionHeader({ label, heading, description }: SectionHeaderProps) {
  return (
    <div className="px-4 pt-7 pb-4 text-center">
      <SectionBadge label={label} />
      <h2 className="mt-3 text-[26px] font-extrabold leading-[1.25] tracking-[-0.01em] text-white">
        {heading}
      </h2>
      <p className="mt-2 text-[14px] leading-[1.5] text-white/65">
        {description}
      </p>
    </div>
  );
}
