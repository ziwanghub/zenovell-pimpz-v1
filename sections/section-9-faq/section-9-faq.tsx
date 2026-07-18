"use client";

import { useId, useState, type ComponentType } from "react";
import {
  ChevronDown,
  ChevronRight,
  Headset,
  LockKeyhole,
  ShieldCheck,
  Truck,
} from "lucide-react";

import type {
  Section9FaqContent,
  Section9FaqItem,
  Section9TrustItem,
} from "@/content/section-9-faq-content";
import { LineIcon } from "@/components/ui/line-icon";
import { SectionHeader } from "@/components/ui/section-header";
import { IconWrapper } from "@/components/ui/icon-wrapper";
import { analytics, AnalyticsEvents } from "@/lib/analytics";
import { activateLineCta } from "@/lib/commerce/cta-activation";
import { LINE_OA_URL } from "@/lib/commerce/cta-contract";

type LucideLikeIcon = ComponentType<{
  className?: string;
  strokeWidth?: number;
}>;

const trustIconByName: Record<Section9TrustItem["iconName"], LucideLikeIcon> = {
  "shield-check": ShieldCheck,
  "lock-keyhole": LockKeyhole,
  truck: Truck,
};

function FaqQuestionBadge() {
  return (
    <div className="flex size-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-[15px] font-semibold leading-none text-[#FF4DA6]">
      Q
    </div>
  );
}

function FaqSupportCard({
  supportCard,
}: {
  supportCard: Section9FaqContent["supportCard"];
}) {
  return (
    <div className="mx-4 mt-3.5 flex items-center gap-3 rounded-[16px] border border-[rgba(233,30,140,0.16)] bg-[#130D11] px-3.5 py-3 min-[1280px]:mx-auto min-[1280px]:mt-6 min-[1280px]:max-w-[768px] min-[1280px]:rounded-[18px] min-[1280px]:px-5 min-[1280px]:py-4">
      <div className="flex size-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
        <Headset
          aria-hidden="true"
          className="size-5 text-[#FF4DA6]"
          strokeWidth={1.9}
        />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[15px] font-semibold leading-[1.2] tracking-tight text-white min-[390px]:text-[16px]">
          {supportCard.title}
        </p>
        <div className="mt-1 text-[12px] leading-[1.4] text-white/62 min-[390px]:text-[13px] min-[1280px]:mt-1.5 min-[1280px]:max-w-[420px] min-[1280px]:space-y-1 min-[1280px]:leading-[1.55]">
          {supportCard.descriptionLines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>

      <a
        href={LINE_OA_URL}
        aria-label={supportCard.ctaAriaLabel}
        className="inline-flex h-11 shrink-0 items-center gap-2 rounded-[14px] bg-[#E91E8C] px-3 text-[14px] font-bold leading-none text-white shadow-[0_0_18px_rgba(233,30,140,0.35)] transition-[transform,box-shadow,filter] duration-150 ease-out hover:brightness-[1.06] hover:shadow-[0_0_24px_rgba(233,30,140,0.44)] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#E91E8C]"
        onClick={(e) => {
          // Canonical conversion path only: activateLineCta → line_cta_click.
          // SUPPORT_CTA_CLICK removed as legacy dual-fire (see implementation report).
          activateLineCta({
            title: supportCard.ctaLabel,
            surface: "faq-support-line",
            landingPage: "/",
            intent: "inquiry",
            source: "faq-support",
          });
          e.preventDefault();
        }}
      >
        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-white">
          <LineIcon size={18} />
        </span>
        <span className="whitespace-nowrap">{supportCard.ctaLabel}</span>
      </a>
    </div>
  );
}

function FinalLineCTA({
  label,
  ariaLabel,
}: Section9FaqContent["primaryCta"]) {
  return (
    <a
      aria-label={ariaLabel}
      href={LINE_OA_URL}
      className="flex h-14 w-full items-center gap-3 rounded-full bg-[#E91E8C] px-5 text-left text-white shadow-[0_0_20px_rgba(233,30,140,0.4)] transition-[transform,box-shadow,filter] duration-150 ease-out hover:brightness-[1.08] hover:shadow-[0_0_28px_rgba(233,30,140,0.6)] active:scale-[0.98] active:bg-[#C2185B] active:shadow-[0_0_14px_rgba(233,30,140,0.3)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#E91E8C]"
      onClick={(e) => {
        // Canonical conversion path only (no legacy SUPPORT_CTA_CLICK dual-fire).
        activateLineCta({
          title: label,
          surface: "faq-line",
          landingPage: "/",
          intent: "high_intent",
          source: "faq",
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

function FaqTrustItem({ item }: { item: Section9TrustItem }) {
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

function FaqItemRow({
  item,
  isOpen,
  onOpen,
}: {
  item: Section9FaqItem;
  isOpen: boolean;
  onOpen: () => void;
}) {
  const reactId = useId();
  const buttonId = `${item.id}-${reactId}-button`;
  const panelId = `${item.id}-${reactId}-panel`;

  return (
    <li
      className={`overflow-hidden rounded-[18px] border bg-[#130D11] transition-[border-color,box-shadow] duration-150 ${
        isOpen
          ? "border-[rgba(233,30,140,0.28)] shadow-[0_0_16px_rgba(233,30,140,0.12)]"
          : "border-[rgba(233,30,140,0.14)]"
      }`}
    >
      <button
        id={buttonId}
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => {
          const willExpand = !isOpen;
          onOpen();
          // Business UX events for accordion (not conversion dual-fire).
          if (willExpand) {
            analytics.track(AnalyticsEvents.FAQ_EXPAND, {
              surface: "faq",
              label: item.question,
            });
          } else {
            analytics.track(AnalyticsEvents.FAQ_COLLAPSE, {
              surface: "faq",
              label: item.question,
            });
          }
        }}
        className="flex min-h-14 w-full items-center gap-3 px-3.5 py-3.5 text-left transition-colors duration-150 hover:bg-white/[0.03] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#E91E8C] min-[390px]:px-4"
      >
        <FaqQuestionBadge />
        <span
          className={`line-clamp-2 min-w-0 flex-1 text-[15px] leading-[1.35] ${
            isOpen ? "font-semibold text-[#FF4DA6]" : "font-medium text-white"
          }`}
        >
          {item.question}
        </span>
        <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/60">
          <ChevronDown
            aria-hidden="true"
            className={[
              "size-4 transition-transform duration-200",
              isOpen ? "rotate-180 text-[#FF4DA6]" : "",
            ].join(" ")}
            strokeWidth={2.1}
          />
        </span>
      </button>

      {/* Authority-aligned disclosure: animated grid-rows (Product FAQ language) */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        aria-hidden={!isOpen}
        className={[
          "grid transition-[grid-template-rows,opacity] duration-200 ease-out",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-70",
        ].join(" ")}
      >
        <div className="overflow-hidden">
          <div className="border-t border-white/10 px-3.5 pb-3.5 pt-3 min-[390px]:px-4">
            <div className="flex gap-2.5">
              <ShieldCheck
                aria-hidden="true"
                className="mt-0.5 size-5 shrink-0 text-[#FF4DA6]"
                strokeWidth={1.9}
              />
              <div className="min-w-0 flex-1 space-y-1.5 text-[14px] leading-[1.55] text-white/78 min-[1280px]:max-w-[560px] min-[1280px]:space-y-2 min-[1280px]:leading-[1.65]">
                {item.answerLines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

type Section9FaqProps = {
  content: Section9FaqContent;
};

export function Section9Faq({ content }: Section9FaqProps) {
  const defaultOpenItem = content.items.find((item) => item.defaultOpen) ?? content.items[0];
  const [openItemId, setOpenItemId] = useState<string | null>(defaultOpenItem.id);

  return (
    <section
      id="section-9-faq"
      aria-label={content.ariaLabel}
      className="bg-[#0A0A0A] pb-6"
    >
      <SectionHeader
        label={content.sectionLabel}
        heading={content.heading}
        description={content.description}
      />

      <ul className="space-y-2.5 px-3 md:px-4 min-[1280px]:mx-auto min-[1280px]:max-w-[768px] min-[1280px]:space-y-3 min-[1280px]:px-0">
        {content.items.map((item) => (
          <FaqItemRow
            key={item.id}
            item={item}
            isOpen={openItemId === item.id}
            onOpen={() => {
              setOpenItemId(openItemId === item.id ? null : item.id);
            }}
          />
        ))}
      </ul>

      <FaqSupportCard supportCard={content.supportCard} />

      <div className="px-3 pt-3.5 md:px-4 min-[1280px]:mx-auto min-[1280px]:max-w-[768px] min-[1280px]:px-0 min-[1280px]:pt-5">
        <FinalLineCTA {...content.primaryCta} />
      </div>

      <ul className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 px-3 pt-3 md:px-4 md:pt-4 text-center">
        {content.trustItems.map((item, index) => (
          <li key={item.label} className="flex items-center gap-2">
            {index > 0 ? (
              <span aria-hidden="true" className="text-white/28">
                •
              </span>
            ) : null}
            <FaqTrustItem item={item} />
          </li>
        ))}
      </ul>
    </section>
  );
}
