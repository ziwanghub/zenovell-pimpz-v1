"use client";

import { useId, useState, type ComponentType } from "react";
import {
  ChevronRight,
  Headset,
  LockKeyhole,
  Minus,
  Plus,
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
import { ctaDestinations } from "@/content/site-navigation";
import { analytics, AnalyticsEvents } from "@/lib/analytics";

type LucideLikeIcon = ComponentType<{
  className?: string;
  strokeWidth?: number;
}>;

const trustIconByName: Record<Section9TrustItem["iconName"], LucideLikeIcon> = {
  "shield-check": ShieldCheck,
  "lock-keyhole": LockKeyhole,
  truck: Truck,
};

function FaqShieldIllustration() {
  return (
    <div
      aria-hidden="true"
      className="relative flex min-h-[112px] items-center justify-center rounded-[18px] border border-[rgba(233,30,140,0.18)] bg-[radial-gradient(circle_at_center,rgba(233,30,140,0.18),rgba(10,10,10,0.98)_72%)] shadow-[0_0_26px_rgba(233,30,140,0.18)]"
    >
      <div className="absolute inset-x-4 bottom-3 h-4 rounded-full bg-[radial-gradient(circle_at_center,rgba(233,30,140,0.22),rgba(233,30,140,0)_72%)]" />
      <div className="absolute inset-4 rounded-[16px] border border-[rgba(233,30,140,0.08)]" />
      <ShieldCheck
        className="size-14 text-[#FF4DA6] drop-shadow-[0_0_12px_rgba(233,30,140,0.55)]"
        strokeWidth={2.1}
      />
    </div>
  );
}

function FaqQuestionBadge() {
  return (
    <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-[rgba(233,30,140,0.3)] bg-[radial-gradient(circle_at_center,rgba(233,30,140,0.15),rgba(10,10,10,0.98)_72%)] text-[20px] font-bold leading-none text-[#FF4DA6] shadow-[0_0_14px_rgba(233,30,140,0.12)]">
      Q
    </div>
  );
}

function FaqSupportCard({
  supportCard,
}: {
  supportCard: Section9FaqContent["supportCard"];
}) {
  const resolvedHref = ctaDestinations.find((d) => d.id === supportCard.destinationId)?.href || "#";
  return (
    <div className="mx-4 mt-4 flex items-center gap-3 rounded-[16px] border border-[rgba(233,30,140,0.18)] bg-[#130D11] px-4 py-3">
      <div className="flex size-12 shrink-0 items-center justify-center rounded-full border border-[rgba(233,30,140,0.24)] bg-[rgba(233,30,140,0.06)]">
        <Headset
          aria-hidden="true"
          className="size-6 text-[#FF4DA6]"
          strokeWidth={1.9}
        />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[18px] font-extrabold leading-[1.1] text-white">
          {supportCard.title}
        </p>
        <div className="mt-1 text-[13px] leading-[1.35] text-white/66">
          {supportCard.descriptionLines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>

      <a
        href={resolvedHref}
        aria-label={supportCard.ctaAriaLabel}
        className="inline-flex h-11 shrink-0 items-center gap-2 rounded-[14px] bg-[#E91E8C] px-3 text-[14px] font-bold leading-none text-white shadow-[0_0_18px_rgba(233,30,140,0.35)] transition-[transform,box-shadow,filter] duration-150 ease-out hover:brightness-[1.06] hover:shadow-[0_0_24px_rgba(233,30,140,0.44)] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#E91E8C]"
        onClick={() =>
          analytics.track(AnalyticsEvents.SUPPORT_CTA_CLICK, {
            surface: "faq",
            label: supportCard.ctaLabel,
            destination: resolvedHref,
          })
        }
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
  destinationId,
}: Section9FaqContent["primaryCta"]) {
  const resolvedHref = ctaDestinations.find((d) => d.id === destinationId)?.href || "#";
  return (
    <a
      aria-label={ariaLabel}
      href={resolvedHref}
      className="flex h-14 w-full items-center gap-3 rounded-full bg-[#E91E8C] px-5 text-left text-white shadow-[0_0_20px_rgba(233,30,140,0.4)] transition-[transform,box-shadow,filter] duration-150 ease-out hover:brightness-[1.08] hover:shadow-[0_0_28px_rgba(233,30,140,0.6)] active:scale-[0.98] active:bg-[#C2185B] active:shadow-[0_0_14px_rgba(233,30,140,0.3)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#E91E8C]"
      onClick={() =>
        analytics.track(AnalyticsEvents.SUPPORT_CTA_CLICK, {
          surface: "faq",
          label,
          destination: resolvedHref,
        })
      }
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
      className={`rounded-[16px] border bg-[#130D11] transition-[border-color,box-shadow] duration-150 ${
        isOpen
          ? "border-[rgba(233,30,140,0.3)] shadow-[0_0_20px_rgba(233,30,140,0.14)]"
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
        className="flex w-full items-center gap-3 px-4 py-3 text-left focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#E91E8C]"
      >
        <FaqQuestionBadge />
        <span
          className={`min-w-0 flex-1 text-[16px] leading-[1.35] ${
            isOpen ? "font-extrabold text-[#FF4DA6]" : "font-medium text-white"
          }`}
        >
          {item.question}
        </span>
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-[rgba(233,30,140,0.24)] bg-[rgba(233,30,140,0.06)]">
          {isOpen ? (
            <Minus
              aria-hidden="true"
              className="size-5 text-[#FF4DA6]"
              strokeWidth={2.3}
            />
          ) : (
            <Plus
              aria-hidden="true"
              className="size-5 text-[#FF4DA6]"
              strokeWidth={2.3}
            />
          )}
        </span>
      </button>

      {isOpen ? (
        <div
          id={panelId}
          role="region"
          aria-labelledby={buttonId}
          className="px-4 pb-4"
        >
          <div className="grid grid-cols-[104px_minmax(0,1fr)] gap-3 border-t border-[rgba(233,30,140,0.12)] pt-4">
            <FaqShieldIllustration />
            <div className="space-y-1.5 pt-1 text-[14px] leading-[1.55] text-white/82">
              {item.answerLines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>
        </div>
      ) : null}
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

      <ul className="space-y-3 px-4">
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

      <div className="px-4 pt-[14px]">
        <FinalLineCTA {...content.primaryCta} />
      </div>

      <ul className="flex items-center justify-center gap-2 px-4 pt-4 text-center">
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
