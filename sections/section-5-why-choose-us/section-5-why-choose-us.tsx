"use client";

import Image from "next/image";
import type { ComponentType } from "react";
import {
  ChevronRight,
  Headphones,
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
import { IconWrapper } from "@/components/ui/icon-wrapper";
import { activateLineCta } from "@/lib/commerce/cta-activation";
import { LINE_OA_URL } from "@/lib/commerce/cta-contract";

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
      <Icon
        aria-hidden="true"
        className="size-8 text-[#FF4DA6]"
        strokeWidth={1.9}
      />
    </div>
  );
}

function WhyChooseBenefitItem({
  item,
  desktopPlacement = "",
}: {
  item: Section5BenefitItem;
  desktopPlacement?: string;
}) {
  return (
    <li
      className={`grid min-h-[96px] grid-cols-[72px_minmax(0,1fr)] items-center gap-[14px] rounded-[18px] border border-[rgba(233,30,140,0.2)] bg-[linear-gradient(180deg,#160D12_0%,#120B10_100%)] px-4 py-3.5 shadow-[0_0_0_1px_rgba(233,30,140,0.02),0_14px_34px_rgba(0,0,0,0.18)] min-[1280px]:min-h-[118px] min-[1280px]:rounded-[22px] min-[1280px]:gap-4 min-[1280px]:px-5 min-[1280px]:py-4.5 ${desktopPlacement}`}
    >
      <WhyChooseBenefitIcon iconName={item.iconName} />

      <div className="min-w-0">
        <h3 className="text-[15px] font-extrabold leading-[1.28] text-white min-[390px]:text-[16px]">
          {item.title}
        </h3>
        <p className="mt-1 text-[12px] leading-[1.58] text-white/72 min-[390px]:text-[12.5px]">
          {item.description}
        </p>
      </div>
    </li>
  );
}

function WhyChoosePromoCard({
  promo,
}: {
  promo: Section5WhyChooseUsContent["promo"];
}) {
  return (
    <div className="relative mx-4 mt-3 min-h-[148px] overflow-hidden rounded-[20px] border border-[rgba(233,30,140,0.18)] bg-[#160B11] shadow-[0_16px_36px_rgba(0,0,0,0.22)] min-[1280px]:mx-0 min-[1280px]:mt-5 min-[1280px]:min-h-[200px] min-[1280px]:rounded-[24px]">
      <div className="absolute inset-0">
        <Image
          src={promo.imageSrc}
          alt={promo.imageAlt}
          fill
          sizes="(max-width: 430px) 100vw, (max-width: 1279px) 430px, 1200px"
          className="object-cover"
          style={{ objectPosition: "76% center" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(22,11,17,0.97)_0%,rgba(22,11,17,0.92)_34%,rgba(22,11,17,0.4)_62%,rgba(22,11,17,0.1)_100%)]" />
      </div>

      <div className="relative flex min-h-[148px] items-center">
        <div className="flex max-w-[56%] min-w-0 flex-col justify-center px-5 py-4.5 min-[390px]:max-w-[54%] min-[1280px]:max-w-[44%] min-[1280px]:px-7">
          <p className="text-[14px] font-bold leading-[1.32] text-white min-[390px]:text-[15px]">
            {promo.title}
          </p>
          <p className="mt-1.5 text-[15px] font-extrabold leading-[1.28] text-[#E91E8C] min-[390px]:text-[16px]">
            {promo.highlight}
          </p>
          <p className="mt-2 max-w-[92%] text-[12px] leading-[1.5] text-white/72">
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
}: Section5WhyChooseUsContent["finalCta"]) {
  return (
    <a
      aria-label={ariaLabel}
      href={LINE_OA_URL}
      className="flex h-[58px] w-full items-center gap-3 rounded-full bg-[#E91E8C] px-5 text-left text-white shadow-[0_0_20px_rgba(233,30,140,0.42),0_10px_30px_rgba(0,0,0,0.18)] transition-[transform,box-shadow,filter] duration-150 ease-out hover:brightness-[1.08] hover:shadow-[0_0_28px_rgba(233,30,140,0.6)] active:scale-[0.98] active:bg-[#C2185B] active:shadow-[0_0_14px_rgba(233,30,140,0.3)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#E91E8C]"
      onClick={(e) => {
        activateLineCta({
          title: label,
          surface: "why-choose-us-line",
          landingPage: "/",
          intent: "high_intent",
          source: "why-choose-us",
        });
        e.preventDefault();
      }}
    >
      <IconWrapper size={10} className="bg-white">
        <LineIcon size={24} />
      </IconWrapper>

      <span className="min-w-0 flex-1 text-[16px] font-bold leading-none min-[390px]:text-[17px]">
        {label}
      </span>

      <IconWrapper size={8} className="border border-white/35">
        <ChevronRight
          aria-hidden="true"
          className="size-5 text-white"
          strokeWidth={2}
        />
      </IconWrapper>
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
      <div className="px-4 pt-7 pb-4 text-center min-[1280px]:px-0 min-[1280px]:pt-9 min-[1280px]:pb-5">
        <SectionBadge label={content.sectionLabel} />
        <h2 className="mt-3 text-[26px] font-extrabold leading-[1.22] tracking-[-0.01em] text-white min-[390px]:text-[28px] min-[1280px]:mt-3.5 min-[1280px]:text-[34px] min-[1280px]:leading-[1.18]">
          {content.heading}
        </h2>
        <p className="mt-2 text-[14px] leading-[1.55] text-white/65 min-[1280px]:mx-auto min-[1280px]:mt-2.5 min-[1280px]:max-w-[760px] min-[1280px]:text-[15px] min-[1280px]:leading-[1.6]">
          {content.subtitle}
        </p>
      </div>

      <ul className="space-y-2.5 px-4 min-[1280px]:grid min-[1280px]:grid-cols-6 min-[1280px]:gap-5 min-[1280px]:space-y-0 min-[1280px]:px-0">
        {content.benefits.map((item, index) => (
          <WhyChooseBenefitItem
            key={item.title}
            item={item}
            desktopPlacement={
              index === 3
                ? "min-[1280px]:col-start-2 min-[1280px]:col-span-2"
                : index === 4
                  ? "min-[1280px]:col-start-4 min-[1280px]:col-span-2"
                  : "min-[1280px]:col-span-2"
            }
          />
        ))}
      </ul>

      <WhyChoosePromoCard promo={content.promo} />

      {/* Desktop ≥1280: mid-page CTA density reduction — keep Mobile/Adaptive */}
      <div className="px-4 pt-3.5 min-[1280px]:hidden">
        <FinalLineCTA {...content.finalCta} />
      </div>

      <ul className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 px-4 pt-3 text-center">
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
