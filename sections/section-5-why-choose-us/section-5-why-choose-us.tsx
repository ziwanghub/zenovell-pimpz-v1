import Image from "next/image";
import type { ComponentType } from "react";
import {
  ChevronRight,
  Headphones,
  LineChart,
  LockKeyhole,
  Package,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";

import type {
  Section5BenefitIcon,
  Section5BenefitItem,
  Section5TrustIcon,
  Section5TrustItem,
  Section5WhyChooseUsContent,
} from "@/content/section-5-why-choose-us";
import { LineIcon } from "@/components/ui/line-icon";
import { SectionBadge } from "@/components/ui/section-badge";

type LucideLikeIcon = ComponentType<{
  className?: string;
  strokeWidth?: number;
}>;

const benefitIconByName: Record<Section5BenefitIcon, LucideLikeIcon> = {
  "shield-check": ShieldCheck,
  sparkles: Sparkles,
  "lock-keyhole": LockKeyhole,
  truck: Truck,
  headphones: Headphones,
};

const trustIconByName: Record<Section5TrustIcon, LucideLikeIcon> = {
  "shield-check": ShieldCheck,
  "lock-keyhole": LockKeyhole,
  package: Package,
};

function WhyChooseBenefitIcon({
  iconName,
}: {
  iconName: Section5BenefitIcon;
}) {
  const Icon = benefitIconByName[iconName];

  return (
    <div className="relative flex size-[72px] shrink-0 items-center justify-center rounded-full border border-[rgba(233,30,140,0.35)] bg-[radial-gradient(circle_at_center,rgba(233,30,140,0.22),rgba(10,10,10,0.96)_68%)] shadow-[0_0_24px_rgba(233,30,140,0.28)]">
      {iconName === "sparkles" ? (
        <LineChart
          aria-hidden="true"
          className="size-8 text-[#FF4DA6]"
          strokeWidth={1.9}
        />
      ) : (
        <Icon
          aria-hidden="true"
          className="size-8 text-[#FF4DA6]"
          strokeWidth={1.9}
        />
      )}
    </div>
  );
}

function WhyChooseBenefitItem({ item }: { item: Section5BenefitItem }) {
  return (
    <li className="grid min-h-[96px] grid-cols-[72px_minmax(0,1fr)_20px] items-center gap-4 rounded-[16px] border border-[rgba(233,30,140,0.18)] bg-[#130D11] px-4 py-[14px]">
      <WhyChooseBenefitIcon iconName={item.iconName} />

      <div className="min-w-0">
        <h3 className="text-[15px] font-extrabold leading-[1.25] text-white">
          {item.title}
        </h3>
        <p className="mt-1 text-[11px] leading-[1.5] text-white/68">
          {item.description}
        </p>
      </div>

      <ChevronRight
        aria-hidden="true"
        className="size-5 shrink-0 text-[#E91E8C]"
        strokeWidth={2.2}
      />
    </li>
  );
}

function WhyChoosePromoCard({
  promo,
}: {
  promo: Section5WhyChooseUsContent["promo"];
}) {
  return (
    <div className="relative mx-4 mt-3 min-h-[132px] overflow-hidden rounded-[18px] border border-[rgba(233,30,140,0.18)] bg-[#160B11]">
      <div className="absolute inset-0">
        <Image
          src={promo.imageSrc}
          alt={promo.imageAlt}
          fill
          sizes="(max-width: 430px) 100vw, 430px"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(22,11,17,0.96)_0%,rgba(22,11,17,0.84)_38%,rgba(22,11,17,0.2)_72%,rgba(22,11,17,0.08)_100%)]" />
      </div>

      <div className="relative flex min-h-[132px] items-center">
        <div className="flex max-w-[62%] min-w-0 flex-col justify-center px-5 py-4">
          <p className="text-[14px] font-bold leading-[1.3] text-white">
            {promo.title}
          </p>
          <p className="mt-1 text-[14px] font-bold leading-[1.3] text-[#E91E8C]">
            {promo.highlight}
          </p>
          <p className="mt-2 text-[12px] leading-[1.45] text-white/72">
            {promo.description}
          </p>
        </div>
      </div>
    </div>
  );
}

function FinalLineCTA({
  label,
  ariaLabel,
  href,
}: Section5WhyChooseUsContent["finalCta"]) {
  return (
    <a
      aria-label={ariaLabel}
      href={href}
      className="flex h-14 w-full items-center gap-3 rounded-full bg-[#E91E8C] px-5 text-left text-white shadow-[0_0_20px_rgba(233,30,140,0.4)] transition-[transform,box-shadow,filter] duration-150 ease-out hover:brightness-[1.08] hover:shadow-[0_0_28px_rgba(233,30,140,0.6)] active:scale-[0.98] active:bg-[#C2185B] active:shadow-[0_0_14px_rgba(233,30,140,0.3)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#E91E8C]"
    >
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white">
        <LineIcon size={24} />
      </span>

      <span className="min-w-0 flex-1 text-[17px] font-bold leading-none">
        {label}
      </span>

      <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-white/35">
        <ChevronRight
          aria-hidden="true"
          className="size-5 text-white"
          strokeWidth={2}
        />
      </span>
    </a>
  );
}

function WhyChooseCompactTrustItem({
  item,
}: {
  item: Section5TrustItem;
}) {
  const Icon = trustIconByName[item.iconName];

  return (
    <div className="inline-flex items-center gap-1.5 text-[11px] leading-none text-white/62">
      <Icon
        aria-hidden="true"
        className="size-3.5 shrink-0 text-[#E91E8C]"
        strokeWidth={1.8}
      />
      <span>{item.label}</span>
    </div>
  );
}

type Section5WhyChooseUsProps = {
  content: Section5WhyChooseUsContent;
};

export function Section5WhyChooseUs({
  content,
}: Section5WhyChooseUsProps) {
  return (
    <section
      id="section-5-why-choose-us"
      aria-label={content.ariaLabel}
      className="bg-[#0A0A0A] pb-6"
    >
      <div className="px-4 pt-7 pb-[18px] text-center">
        <SectionBadge label={content.sectionLabel} />
        <h2 className="mt-3 text-[26px] font-extrabold leading-[1.25] tracking-[-0.01em] text-white">
          {content.heading}
        </h2>
        <p className="mt-2 text-[14px] leading-[1.5] text-white/65">
          {content.subtitle}
        </p>
      </div>

      <ul className="space-y-2.5 px-4">
        {content.benefits.map((item) => (
          <WhyChooseBenefitItem key={item.title} item={item} />
        ))}
      </ul>

      <WhyChoosePromoCard promo={content.promo} />

      <div className="px-4 pt-[14px]">
        <FinalLineCTA {...content.finalCta} />
      </div>

      <ul className="flex items-center justify-center gap-2 px-4 pt-4 text-center">
        {content.trustRow.map((item, index) => (
          <li key={item.label} className="flex items-center gap-2">
            {index > 0 ? <span aria-hidden="true" className="text-white/28">•</span> : null}
            <WhyChooseCompactTrustItem item={item} />
          </li>
        ))}
      </ul>
    </section>
  );
}
