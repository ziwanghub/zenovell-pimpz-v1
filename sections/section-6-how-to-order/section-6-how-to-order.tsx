"use client";

import Image from "next/image";
import type { ComponentType } from "react";
import {
  ChevronRight,
  ClipboardCheck,
  LockKeyhole,
  MessageCircleMore,
  MessageSquareMore,
  Package,
  Package2,
  ShieldCheck,
  Truck,
} from "lucide-react";

import type {
  Section6HowToOrderContent,
  Section6StepIcon,
  Section6StepItem,
  Section6TrustIcon,
  Section6TrustItem,
} from "@/content/section-6-how-to-order";
import { LineIcon } from "@/components/ui/line-icon";
import { SectionHeader } from "@/components/ui/section-header";
import { IconWrapper } from "@/components/ui/icon-wrapper";
import { activateLineCta } from "@/lib/commerce/cta-activation";
import { LINE_OA_URL } from "@/lib/commerce/cta-contract";

type LucideLikeIcon = ComponentType<{
  className?: string;
  strokeWidth?: number;
}>;

const stepIconByName: Record<Section6StepIcon, LucideLikeIcon> = {
  "line-message": MessageCircleMore,
  "message-square": MessageSquareMore,
  package2: Package2,
  "clipboard-check": ClipboardCheck,
  package: Package,
  truck: Truck,
};

const trustIconByName: Record<Section6TrustIcon, LucideLikeIcon> = {
  "shield-check": ShieldCheck,
  "lock-keyhole": LockKeyhole,
  package: Package,
};

function HowToOrderStepNumber({ value }: { value: string }) {
  return (
    <div className="relative z-10 flex size-[54px] shrink-0 items-center justify-center rounded-full border border-[rgba(233,30,140,0.45)] bg-[radial-gradient(circle_at_center,rgba(233,30,140,0.24),rgba(10,10,10,0.98)_70%)] text-[22px] font-extrabold leading-none text-white shadow-[0_0_20px_rgba(233,30,140,0.24)]">
      {value}
    </div>
  );
}

function HowToOrderStepItem({
  item,
  isLast,
  showDesktopConnector,
}: {
  item: Section6StepItem;
  isLast: boolean;
  showDesktopConnector: boolean;
}) {
  const Icon = stepIconByName[item.iconName];

  return (
    <li className="grid grid-cols-[56px_minmax(0,1fr)] gap-3">
      <div className="relative flex justify-center">
        {!isLast ? (
          <span
            aria-hidden="true"
            className="absolute top-[54px] bottom-[-10px] left-1/2 w-px -translate-x-1/2 bg-[linear-gradient(180deg,rgba(233,30,140,0.55)_0%,rgba(233,30,140,0.18)_100%)] min-[1280px]:hidden"
          />
        ) : null}
        {showDesktopConnector ? (
          <span
            aria-hidden="true"
            className="hidden min-[1280px]:absolute min-[1280px]:top-1/2 min-[1280px]:left-full min-[1280px]:z-0 min-[1280px]:h-px min-[1280px]:w-5 min-[1280px]:bg-[linear-gradient(90deg,rgba(233,30,140,0.55)_0%,rgba(233,30,140,0.18)_100%)] min-[1280px]:translate-x-1/2"
          />
        ) : null}
        <HowToOrderStepNumber value={item.stepNumber} />
      </div>

      <div className="flex min-h-[96px] items-center gap-4 rounded-[16px] border border-[rgba(233,30,140,0.18)] bg-[#130D11] px-4 py-[14px]">
        <div className="flex size-[54px] shrink-0 items-center justify-center rounded-[14px] border border-[rgba(233,30,140,0.14)] bg-[#171017]">
          <Icon
            aria-hidden="true"
            className="size-8 text-[#FF4DA6]"
            strokeWidth={1.9}
          />
        </div>

        <div className="min-w-0">
          <h3 className="text-[15px] font-extrabold leading-[1.25] text-white">
            {item.title}
          </h3>
          <p className="mt-1 text-[11px] leading-[1.45] text-white/68">
            {item.description}
          </p>
        </div>
      </div>
    </li>
  );
}

function HowToOrderPromoCard({
  promo,
}: {
  promo: Section6HowToOrderContent["promo"];
}) {
  return (
    <div className="relative mx-4 mt-3 min-h-[126px] overflow-hidden rounded-[18px] border border-[rgba(233,30,140,0.18)] bg-[#160B11]">
      <div className="absolute inset-0">
        <Image
          src={promo.imageSrc}
          alt={promo.imageAlt}
          fill
          sizes="(max-width: 430px) 100vw, 430px"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(22,11,17,0.96)_0%,rgba(22,11,17,0.82)_40%,rgba(22,11,17,0.18)_74%,rgba(22,11,17,0.06)_100%)]" />
      </div>

      <div className="relative flex min-h-[126px] items-center">
        <div className="flex max-w-[65%] min-w-0 flex-col justify-center px-4 py-4 md:max-w-[62%] md:px-5">
          <div className="flex items-center gap-3">
            <ShieldCheck
              aria-hidden="true"
              className="size-8 shrink-0 text-[#FF4DA6]"
              strokeWidth={1.9}
            />
            <div className="min-w-0">
              <p className="text-[15px] font-bold leading-[1.25] text-white">
                {promo.title}
              </p>
              <p className="mt-1 text-[15px] font-bold leading-[1.25] text-[#E91E8C]">
                {promo.highlight}
              </p>
            </div>
          </div>
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
}: Section6HowToOrderContent["finalCta"]) {
  return (
    <a
      aria-label={ariaLabel}
      href={LINE_OA_URL}
      className="flex h-14 w-full items-center gap-3 rounded-full bg-[#E91E8C] px-5 text-left text-white shadow-[0_0_20px_rgba(233,30,140,0.4)] transition-[transform,box-shadow,filter] duration-150 ease-out hover:brightness-[1.08] hover:shadow-[0_0_28px_rgba(233,30,140,0.6)] active:scale-[0.98] active:bg-[#C2185B] active:shadow-[0_0_14px_rgba(233,30,140,0.3)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#E91E8C]"
      onClick={(e) => {
        activateLineCta({
          title: label,
          surface: "how-to-order-line",
          landingPage: "/",
          intent: "high_intent",
          source: "how-to-order",
        });
        e.preventDefault();
      }}
    >
      <IconWrapper size={10} className="bg-white">
        <LineIcon size={24} />
      </IconWrapper>

      <span className="min-w-0 flex-1 text-[17px] font-bold leading-none">
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

function HowToOrderCompactTrustItem({
  item,
}: {
  item: Section6TrustItem;
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

type Section6HowToOrderProps = {
  content: Section6HowToOrderContent;
};

export function Section6HowToOrder({
  content,
}: Section6HowToOrderProps) {
  return (
    <section
      id="section-6-how-to-order"
      aria-label={content.ariaLabel}
      className="bg-[#0A0A0A] pb-6 min-[1280px]:mx-auto min-[1280px]:max-w-[1280px] min-[1280px]:px-10 min-[1366px]:max-w-[1336px] min-[1366px]:px-12 min-[1536px]:max-w-[1432px] min-[1536px]:px-14"
    >
      <SectionHeader
        label={content.sectionLabel}
        heading={
          <>
            {content.heading.split(" ผ่าน LINE")[0]}
            <span className="text-[#E91E8C]"> ผ่าน LINE</span>
          </>
        }
        description={content.subtitle}
      />

      <ol className="space-y-2.5 px-4 min-[1280px]:grid min-[1280px]:grid-cols-3 min-[1280px]:gap-5 min-[1280px]:space-y-0 min-[1280px]:px-0">
        {content.steps.map((item, index) => (
          <HowToOrderStepItem
            key={item.stepNumber}
            item={item}
            isLast={index === content.steps.length - 1}
            showDesktopConnector={index % 3 !== 2 && index !== content.steps.length - 1}
          />
        ))}
      </ol>

      <HowToOrderPromoCard promo={content.promo} />

      <div className="px-4 pt-[14px]">
        <FinalLineCTA {...content.finalCta} />
      </div>

      <ul className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 px-4 pt-4 text-center">
        {content.trustRow.map((item, index) => (
          <li key={item.label} className="flex items-center gap-2">
            {index > 0 ? (
              <span aria-hidden="true" className="text-white/28">
                •
              </span>
            ) : null}
            <HowToOrderCompactTrustItem item={item} />
          </li>
        ))}
      </ul>
    </section>
  );
}
