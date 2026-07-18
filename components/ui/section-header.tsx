import { ReactNode } from "react";
import { SectionBadge } from "./section-badge";

interface SectionHeaderProps {
  label: string;
  heading: ReactNode;
  description: string;
}

export function SectionHeader({ label, heading, description }: SectionHeaderProps) {
  return (
    <div className="px-4 pt-7 pb-4 text-center min-[1280px]:px-0 min-[1280px]:pt-10 min-[1280px]:pb-6">
      <SectionBadge label={label} />
      <h2 className="mt-3 text-[26px] font-extrabold leading-[1.25] tracking-[-0.01em] text-white min-[1280px]:mt-4 min-[1280px]:text-[34px] min-[1280px]:leading-[1.18] min-[1536px]:text-[36px]">
        {heading}
      </h2>
      <p className="mt-2 text-[14px] leading-[1.5] text-white/65 min-[1280px]:mx-auto min-[1280px]:mt-3 min-[1280px]:max-w-[640px] min-[1280px]:text-[15px] min-[1280px]:leading-[1.6]">
        {description}
      </p>
    </div>
  );
}
