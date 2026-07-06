import Image from "next/image";
import type { ComponentType } from "react";
import {
  ChevronRight,
  EyeOff,
  Headphones,
  LockKeyhole,
  Package,
  PackageCheck,
  ShieldCheck,
  UserCheck,
} from "lucide-react";

import type {
  Section2MicroTrustIcon,
  Section2MicroTrustItem,
  Section2TrustBarContent,
  Section2TrustCardIcon,
  Section2TrustCardItem,
} from "@/content/section-2-trust-bar";
import { LineIcon } from "@/components/ui/line-icon";
import { SectionBadge } from "@/components/ui/section-badge";

type LucideLikeIcon = ComponentType<{
  className?: string;
  strokeWidth?: number;
}>;

const trustCardIconByName: Record<Section2TrustCardIcon, LucideLikeIcon> = {
  package: Package,
  "lock-keyhole": LockKeyhole,
  "package-check": PackageCheck,
  "user-check": UserCheck,
};

const microTrustIconByName: Record<Section2MicroTrustIcon, LucideLikeIcon> = {
  "shield-check": ShieldCheck,
  "eye-off": EyeOff,
  headphones: Headphones,
};

function SectionHeading({ lines }: { lines: [string, string] }) {
  return (
    <h2 className="text-[26px] font-extrabold leading-[1.25] tracking-[-0.01em] text-white">
      <span className="block">{lines[0]}</span>
      <span className="block">{lines[1]}</span>
    </h2>
  );
}

function SectionDescription({ text }: { text: string }) {
  return (
    <p className="text-[14px] leading-[1.5] text-white/65">
      {text}
    </p>
  );
}

function TrustCardItem({ item }: { item: Section2TrustCardItem }) {
  const Icon = trustCardIconByName[item.icon];

  return (
    <li className="flex flex-col items-center px-[2px] text-center">
      <div className="mb-2 flex h-[34px] items-center justify-center">
        <Icon className="size-7 text-[#E91E8C]" strokeWidth={1.65} />
      </div>

      <div className="min-h-[34px]">
        <p className="text-[12px] font-bold leading-[1.3] text-white">
          {item.title[0]}
        </p>
        {item.title[1] ? (
          <p className="text-[12px] font-bold leading-[1.3] text-white">
            {item.title[1]}
          </p>
        ) : (
          <p className="text-[12px] font-bold leading-[1.3] text-transparent" aria-hidden="true">
            &nbsp;
          </p>
        )}
      </div>

      <div className="mt-1 flex flex-col gap-px">
        {item.subText.map((line) => (
          <p key={line} className="text-[10px] leading-[1.4] text-white/55">
            {line}
          </p>
        ))}
      </div>
    </li>
  );
}

function TrustStatement({
  label,
  highlight,
}: {
  label: string;
  highlight: string;
}) {
  return (
    <div className="border-t border-white/8 pt-[14px] text-center">
      <p className="flex items-center justify-center gap-1.5 text-[11px] leading-[1.4] text-white/75">
        <ShieldCheck
          aria-hidden="true"
          className="size-[15px] text-[#E91E8C]"
          strokeWidth={1.7}
        />
        <span>{label}</span>
      </p>
      <p className="mt-1 text-[13px] font-semibold leading-[1.4] text-[#E91E8C]">
        {highlight}
      </p>
    </div>
  );
}

function TrustCard({
  items,
  statement,
}: {
  items: Section2TrustCardItem[];
  statement: Section2TrustBarContent["trustStatement"];
}) {
  return (
    <div className="mx-4 rounded-[14px] border border-white/8 bg-[#1A1A1A] p-4 shadow-[0_0_24px_rgba(0,0,0,0.2)]">
      <ul className="grid grid-cols-4 gap-[6px] pb-[14px]">
        {items.map((item) => (
          <TrustCardItem key={`${item.icon}-${item.title[0]}`} item={item} />
        ))}
      </ul>

      <TrustStatement
        label={statement.label}
        highlight={statement.highlight}
      />
    </div>
  );
}

function ProductArtwork({
  src,
  alt,
  width,
  height,
}: Section2TrustBarContent["artwork"]) {
  return (
    <div className="mt-1">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(max-width: 430px) 100vw, 430px"
        className="h-auto w-full"
      />
    </div>
  );
}

function SolidLineCTA({ label }: { label: string }) {
  return (
    <button
      aria-label={label}
      className="flex h-14 w-full items-center gap-3 rounded-full bg-[#E91E8C] px-5 text-left text-white shadow-[0_0_20px_rgba(233,30,140,0.4)]"
      type="button"
    >
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white">
        <LineIcon size={24} />
      </span>

      <span className="min-w-0 flex-1 text-[17px] font-bold leading-none">
        {label}
      </span>

      <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-white/35">
        <ChevronRight aria-hidden="true" className="size-5 text-white" strokeWidth={2.2} />
      </span>
    </button>
  );
}

function MicroTrustItem({ item }: { item: Section2MicroTrustItem }) {
  const Icon = microTrustIconByName[item.icon];

  return (
    <span className="inline-flex items-center gap-1.5 whitespace-nowrap text-[11px] leading-none text-white/65">
      <Icon aria-hidden="true" className="size-[14px] text-[#E91E8C]" strokeWidth={1.8} />
      <span>{item.text}</span>
    </span>
  );
}

function MicroTrustRow({ items }: { items: Section2MicroTrustItem[] }) {
  return (
    <div className="flex items-center justify-center gap-2 overflow-x-auto px-4 pt-[14px] pb-6">
      {items.map((item, index) => (
        <div key={item.text} className="flex items-center gap-2">
          <MicroTrustItem item={item} />
          {index === items.length - 1 ? null : (
            <span aria-hidden="true" className="text-[#E91E8C]">
              •
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

type Section2TrustBarProps = {
  content: Section2TrustBarContent;
};

export function Section2TrustBar({ content }: Section2TrustBarProps) {
  return (
    <section
      aria-label={content.ariaLabel}
      className="bg-[#0A0A0A]"
    >
      <div className="px-4 pt-7 pb-5 text-center">
        <SectionBadge label={content.sectionLabel} />
        <div className="mt-3">
          <SectionHeading lines={content.heading} />
        </div>
        <div className="mt-2">
          <SectionDescription text={content.description} />
        </div>
      </div>

      <TrustCard
        items={content.trustCardItems}
        statement={content.trustStatement}
      />

      <ProductArtwork {...content.artwork} />

      <div className="px-4 pt-6">
        <SolidLineCTA label={content.cta.label} />
      </div>

      <MicroTrustRow items={content.microTrustItems} />
    </section>
  );
}
