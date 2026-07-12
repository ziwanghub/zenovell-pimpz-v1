"use client";

import type { ComponentType } from "react";
import {
  ChevronRight,
  CircleCheck,
  Headphones,
  House,
  LockKeyhole,
  Package,
  ShieldCheck,
  Truck,
  UserRound,
} from "lucide-react";

import type {
  Section7PrivacyCard,
  Section7PrivacyIcon,
  Section7PrivacyShippingContent,
  Section7TrustIcon,
  Section7TrustItem,
} from "@/content/section-7-privacy-shipping";
import { LineIcon } from "@/components/ui/line-icon";
import { SectionHeader } from "@/components/ui/section-header";
import { IconWrapper } from "@/components/ui/icon-wrapper";
import { activateLineCta } from "@/lib/commerce/cta-activation";
import { LINE_OA_URL } from "@/lib/commerce/cta-contract";

type LucideLikeIcon = ComponentType<{
  className?: string;
  strokeWidth?: number;
}>;

const trustIconByName: Record<Section7TrustIcon, LucideLikeIcon> = {
  "shield-check": ShieldCheck,
  "lock-keyhole": LockKeyhole,
  truck: Truck,
};

function PrivacyIconCircle({ iconName }: { iconName: Section7PrivacyIcon }) {
  const sharedClassName = "absolute text-[#FF4DA6]";
  const sharedStrokeWidth = 1.9;

  return (
    <div className="relative mx-auto flex size-[82px] items-center justify-center rounded-full border border-[rgba(233,30,140,0.42)] bg-[radial-gradient(circle_at_center,rgba(233,30,140,0.18),rgba(10,10,10,0.98)_72%)] shadow-[0_0_24px_rgba(233,30,140,0.24)]">
      {iconName === "package-lock" ? (
        <div className="relative size-9">
          <Package className={sharedClassName} strokeWidth={sharedStrokeWidth} />
          <LockKeyhole
            className="absolute -right-1 -bottom-1 size-4 text-[#FF4DA6]"
            strokeWidth={1.9}
          />
        </div>
      ) : null}

      {iconName === "user-shield" ? (
        <div className="relative size-9">
          <UserRound className={sharedClassName} strokeWidth={sharedStrokeWidth} />
          <ShieldCheck
            className="absolute -right-1 -bottom-1 size-4 text-[#FF4DA6]"
            strokeWidth={1.9}
          />
        </div>
      ) : null}

      {iconName === "truck-shield" ? (
        <div className="relative size-9">
          <Truck className={sharedClassName} strokeWidth={sharedStrokeWidth} />
          <ShieldCheck
            className="absolute -right-1 -bottom-1 size-4 text-[#FF4DA6]"
            strokeWidth={1.9}
          />
        </div>
      ) : null}

      {iconName === "house" ? (
        <House className="size-9 text-[#FF4DA6]" strokeWidth={1.9} />
      ) : null}
    </div>
  );
}

function PrivacyShippingInfoCard({ card }: { card: Section7PrivacyCard }) {
  return (
    <li className="flex flex-col rounded-[16px] border border-[rgba(233,30,140,0.18)] bg-[#130D11] px-[14px] py-4 text-center min-h-[170px] min-[1280px]:min-h-0 min-[1280px]:px-4 min-[1280px]:py-5">
      <PrivacyIconCircle iconName={card.iconName} />
      <h3 className="mt-4 text-[15px] font-extrabold leading-[1.3] text-white line-clamp-2">
        {card.title}
      </h3>
      <div className="mt-2 space-y-1 text-[11px] leading-[1.45] text-white/68 min-h-[52px]">
        {card.lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </li>
  );
}

function PrivacyShippingShieldCard({
  shieldCard,
}: {
  shieldCard: Section7PrivacyShippingContent["shieldCard"];
}) {
  return (
    <div className="relative mx-4 mt-[14px] overflow-hidden rounded-[18px] border border-[rgba(233,30,140,0.18)] bg-[#130B11] px-4 py-4 min-[1280px]:mx-0 min-[1280px]:mt-6 min-[1280px]:px-6 min-[1280px]:py-5">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_18%_70%,rgba(233,30,140,0.22),transparent_28%),radial-gradient(circle_at_72%_20%,rgba(233,30,140,0.12),transparent_26%)]"
      />
      <div className="relative flex items-center gap-4">
        <div className="relative flex min-h-[160px] w-[38%] min-w-[100px] items-center justify-center rounded-[16px] bg-[radial-gradient(circle_at_center,rgba(233,30,140,0.22),rgba(10,10,10,0.06)_58%,transparent_74%)] md:min-h-[188px] md:w-[40%] md:min-w-[112px]">
          <ShieldCheck
            aria-hidden="true"
            className="size-[110px] text-[#FF4DA6] drop-shadow-[0_0_18px_rgba(233,30,140,0.46)]"
            strokeWidth={1.4}
          />
          <LockKeyhole
            aria-hidden="true"
            className="absolute size-9 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.24)]"
            strokeWidth={2.1}
          />
          <div className="absolute bottom-5 h-4 w-24 rounded-full bg-[#E91E8C]/20 blur-md" />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-[15px] font-extrabold leading-[1.25] text-[#FF4DA6]">
            {shieldCard.title}
          </h3>

          <ul className="mt-3 space-y-2">
            {shieldCard.checklist.map((item) => (
              <li
                key={item.label}
                className="flex items-start gap-2 text-[12px] leading-[1.45] text-white/76"
              >
                <CircleCheck
                  aria-hidden="true"
                  className="mt-0.5 size-4 shrink-0 text-[#E91E8C]"
                  strokeWidth={1.9}
                />
                <span>{item.label}</span>
              </li>
            ))}
          </ul>

          <div className="mt-4 rounded-[14px] border border-[rgba(233,30,140,0.24)] bg-[rgba(233,30,140,0.06)] px-3 py-2">
            <p className="text-[11px] font-bold leading-[1.35] text-[#FF4DA6]">
              {shieldCard.privacyNote.title}
            </p>
            <p className="mt-1 text-[11px] leading-[1.35] text-white/72">
              {shieldCard.privacyNote.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PrivacyShippingSupportRow({
  supportRow,
}: {
  supportRow: Section7PrivacyShippingContent["supportRow"];
}) {
  return (
    <div className="mx-4 mt-3 flex items-center gap-3 rounded-[18px] border border-[rgba(233,30,140,0.16)] bg-[#130D11] p-4 min-[1280px]:mx-0 min-[1280px]:mt-5 min-[1280px]:px-5">
      <div className="flex size-[52px] shrink-0 items-center justify-center rounded-full border border-[rgba(233,30,140,0.3)] bg-[radial-gradient(circle_at_center,rgba(233,30,140,0.16),rgba(10,10,10,0.98)_72%)]">
        <Headphones
          aria-hidden="true"
          className="size-7 text-[#FF4DA6]"
          strokeWidth={1.9}
        />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[15px] font-extrabold leading-[1.2] text-white">
          {supportRow.title}
        </p>
        <p className="mt-1 text-[12px] leading-[1.45] text-white/68">
          {supportRow.description}
        </p>
      </div>

      <a
        aria-label={supportRow.cta.ariaLabel}
        href={LINE_OA_URL}
        className="flex h-11 shrink-0 items-center gap-2 rounded-full bg-[#E91E8C] px-4 text-[14px] font-bold leading-none text-white shadow-[0_0_16px_rgba(233,30,140,0.34)] transition-[transform,box-shadow,filter] duration-150 ease-out hover:brightness-[1.08] hover:shadow-[0_0_24px_rgba(233,30,140,0.48)] active:scale-[0.98] active:bg-[#C2185B] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#E91E8C]"
        onClick={(e) => {
          activateLineCta({
            title: supportRow.cta.label,
            surface: "privacy-support-line",
            landingPage: "/",
            intent: "inquiry",
            source: "privacy-shipping",
          });
          e.preventDefault();
        }}
      >
        <LineIcon size={20} />
        <span className="hidden min-[390px]:inline">{supportRow.cta.label}</span>
        <ChevronRight aria-hidden="true" className="size-4" strokeWidth={2.1} />
      </a>
    </div>
  );
}

function FinalLineCTA({
  label,
  ariaLabel,
}: Section7PrivacyShippingContent["finalCta"]) {
  return (
    <a
      aria-label={ariaLabel}
      href={LINE_OA_URL}
      className="flex h-14 w-full items-center gap-3 rounded-full bg-[#E91E8C] px-5 text-left text-white shadow-[0_0_20px_rgba(233,30,140,0.4)] transition-[transform,box-shadow,filter] duration-150 ease-out hover:brightness-[1.08] hover:shadow-[0_0_28px_rgba(233,30,140,0.6)] active:scale-[0.98] active:bg-[#C2185B] active:shadow-[0_0_14px_rgba(233,30,140,0.3)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#E91E8C] min-[1280px]:h-12 min-[1280px]:border min-[1280px]:border-[rgba(233,30,140,0.45)] min-[1280px]:bg-[#171717] min-[1280px]:text-[#E91E8C] min-[1280px]:shadow-none"
      onClick={(e) => {
        activateLineCta({
          title: label,
          surface: "privacy-final-line",
          landingPage: "/",
          intent: "high_intent",
          source: "privacy-shipping",
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

function PrivacyShippingCompactTrustItem({
  item,
}: {
  item: Section7TrustItem;
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

type Section7PrivacyShippingProps = {
  content: Section7PrivacyShippingContent;
};

export function Section7PrivacyShipping({
  content,
}: Section7PrivacyShippingProps) {
  return (
    <section
      id="section-7-privacy-shipping"
      aria-label={content.ariaLabel}
      className="bg-[#0A0A0A] pb-6"
    >
      <SectionHeader
        label={content.sectionLabel}
        heading={content.heading}
        description={content.subtitle}
      />

      <ul className="grid grid-cols-2 items-stretch gap-[10px] px-4 min-[1280px]:grid-cols-4 min-[1280px]:gap-5 min-[1280px]:px-0">
        {content.cards.map((card) => (
          <PrivacyShippingInfoCard key={card.title} card={card} />
        ))}
      </ul>

      <PrivacyShippingShieldCard shieldCard={content.shieldCard} />
      <PrivacyShippingSupportRow supportRow={content.supportRow} />

      <div className="px-4 pt-[14px] min-[1280px]:px-0 min-[1280px]:pt-5">
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
            <PrivacyShippingCompactTrustItem item={item} />
          </li>
        ))}
      </ul>
    </section>
  );
}
