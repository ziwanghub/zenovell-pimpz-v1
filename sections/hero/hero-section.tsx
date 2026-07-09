'use client';

import Image from "next/image";
import type { CSSProperties, ComponentType } from "react";
import {
  ChevronDown,
  ChevronRight,
  Droplet,
  FlaskConical,
  Flower2,
  Heart,
  Lock,
  Package,
  ShieldCheck,
} from "lucide-react";

import type { HeroBenefit, HeroContent, HeroTrustItem } from "@/content/hero";
import { analytics, AnalyticsEvents } from "@/lib/analytics";
import { activateLineCta } from "@/lib/commerce/cta-activation";
import { LineIcon } from "@/components/ui/line-icon";

const BACKGROUND_IMAGE_SRC = "/images/hero/bg-ph6d-section-1-hero-v2.jpeg";

const ctaButtonStyle: CSSProperties = {
  boxShadow:
    "0 0 0 1px rgba(233,30,140,0.18), 0 0 32px rgba(233,30,140,0.32), inset 0 0 24px rgba(233,30,140,0.05)",
  backdropFilter: "blur(4px)",
  WebkitBackdropFilter: "blur(4px)",
};

const dividerStyle: CSSProperties = {
  boxShadow: "0 0 8px rgba(233,30,140,0.4)",
};

type LucideLikeIcon = ComponentType<{
  className?: string;
  strokeWidth?: number;
}>;

const iconByBenefit: Record<HeroBenefit["icon"], LucideLikeIcon> = {
  flower: Flower2,
  droplet: Droplet,
  heart: Heart,
};

const iconByTrustItem: Record<HeroTrustItem["icon"], LucideLikeIcon> = {
  shield: ShieldCheck,
  flask: FlaskConical,
  package: Package,
  lock: Lock,
};

type HeroSectionProps = {
  content: HeroContent;
};

function BenefitListItem({ item }: { item: HeroBenefit }) {
  const Icon = iconByBenefit[item.icon];

  return (
    <li className="flex items-center gap-3">
      <div className="flex size-[38px] shrink-0 items-center justify-center rounded-full border-[1.5px] border-[rgba(233,30,140,0.5)] bg-[rgba(233,30,140,0.12)] shadow-[0_0_10px_rgba(233,30,140,0.12)]">
        <Icon className="size-[17px] text-[#E91E8C]" />
      </div>
      <div>
        <p className="text-[14px] font-semibold leading-[1.3] text-white">
          {item.title}
        </p>
        <p className="text-[12px] leading-[1.3] text-white/75">{item.sub}</p>
      </div>
    </li>
  );
}

function TrustStrip({ items }: { items: HeroTrustItem[] }) {
  return (
    <section
      className="hero-trust-strip border-t border-[rgba(233,30,140,0.12)] bg-[#171717] px-2 py-5"
      aria-label="จุดเด่นด้านความปลอดภัยและบริการ"
    >
      <div className="grid grid-cols-4 gap-2">
        {items.map((item) => {
          const Icon = iconByTrustItem[item.icon];

          return (
            <div
              key={item.icon}
              className="flex flex-col items-center px-[2px] text-center"
            >
              <div className="flex h-[30px] items-center">
                <Icon className="size-[26px] text-[#E91E8C]" strokeWidth={1.5} />
              </div>
              <div className="mt-[7px] flex flex-col gap-px">
                {item.lines.map((line, index) => (
                  <span
                    key={line}
                    className={index === 0 ? "text-[10px] font-semibold leading-[1.4] text-white" : "text-[10px] leading-[1.4] text-white/75"}
                  >
                    {line}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function ScrollIndicator() {
  return (
    <div className="hero-scroll-indicator flex flex-col items-center bg-[#0A0A0A] px-0 pt-[10px] pb-4">
      <ChevronDown
        aria-hidden="true"
        className="size-[22px] animate-[hero-bob_2.1s_ease-in-out_infinite] text-[#E91E8C] opacity-80"
        style={{ marginBottom: "-6px" }}
      />
      <ChevronDown
        aria-hidden="true"
        className="size-[22px] animate-[hero-bob_2.1s_ease-in-out_infinite_150ms] text-[#E91E8C] opacity-35"
      />
    </div>
  );
}

export function HeroSection({ content }: HeroSectionProps) {
  return (
    <>
      <section
        aria-label="Hero - Nicky Pimpz Boss"
        className="hero-root relative overflow-hidden bg-[#0A0A0A]"
      >
        <Image
          src={BACKGROUND_IMAGE_SRC}
          alt=""
          aria-hidden="true"
          fill
          priority
          fetchPriority="high"
          sizes="(max-width: 430px) 100vw, 430px"
          className="hero-background scale-[0.94] object-cover"
          style={{ objectPosition: "74% 18%" }}
        />

        <div
          aria-hidden="true"
          className="hero-scrim-left pointer-events-none absolute inset-0 z-[1]"
          style={{
            background:
              "linear-gradient(90deg, rgba(10,10,10,0.78) 0%, rgba(10,10,10,0.62) 28%, rgba(10,10,10,0.34) 45%, rgba(10,10,10,0.1) 63%, rgba(10,10,10,0.02) 79%, transparent 100%)",
          }}
        />
        <div
          aria-hidden="true"
          className="hero-scrim-top pointer-events-none absolute top-0 right-0 left-0 z-[1] h-24"
          style={{
            background:
              "linear-gradient(to bottom, rgba(10,10,10,0.72) 0%, rgba(10,10,10,0.16) 58%, transparent 100%)",
          }}
        />
        <div
          aria-hidden="true"
          className="hero-scrim-bottom pointer-events-none absolute right-0 bottom-0 left-0 z-[1] h-[196px]"
          style={{
            background:
              "linear-gradient(to top, rgba(10,10,10,0.88) 0%, rgba(10,10,10,0.56) 34%, rgba(10,10,10,0.18) 58%, transparent 100%)",
          }}
        />

        <div className="hero-content-wrapper relative z-[2]">
          <div className="hero-content-column max-w-[52%] px-4 pt-[12px] min-[375px]:max-w-[51%] min-[375px]:pt-[16px] min-[414px]:max-w-[50%] min-[414px]:pt-[20px]">
            <p className="hero-subbrand mb-[10px] text-[10px] font-bold tracking-[0.22em] text-[#E91E8C] uppercase">
              {content.brand.subbrand}
            </p>

            <h1
              className="hero-headline mb-4 font-extrabold tracking-[0em] text-[clamp(28px,8.4vw,36px)] leading-[1.24] [text-shadow:0_2px_12px_rgba(0,0,0,0.18)] min-[375px]:mb-[18px] min-[375px]:text-[clamp(30px,8.5vw,39px)] min-[375px]:leading-[1.2] min-[414px]:mb-5 min-[414px]:tracking-[-0.004em] min-[414px]:text-[clamp(33px,8.4vw,43px)] min-[414px]:leading-[1.16]"
            >
              {content.headline.map((line) => (
                <span
                  key={line.text}
                  className={line.tone === "accent" ? "block text-[#E91E8C]" : "block text-white"}
                >
                  {line.text}
                </span>
              ))}
            </h1>

            <p className="hero-subheadline mb-6 max-w-[90%] text-[13px] leading-[1.68] text-white/78 min-[375px]:mb-7 min-[375px]:max-w-[88%] min-[375px]:text-[14px] min-[375px]:leading-[1.62]">
              {content.subheadline.map((line, index) => (
                <span key={line} className="block">
                  {line}
                  {index === content.subheadline.length - 1 ? null : null}
                </span>
              ))}
            </p>

            <div
              aria-hidden="true"
              className="hero-divider mb-6 h-[2.5px] w-[34px] rounded-[2px] bg-[#E91E8C] min-[375px]:mb-7"
              style={dividerStyle}
            />

            <ul className="hero-benefits flex list-none flex-col gap-[16px] p-0 min-[375px]:gap-[18px]">
              {content.benefits.map((item) => (
                <BenefitListItem key={item.title} item={item} />
              ))}
            </ul>
          </div>

          <div className="hero-cta-block px-[14px] pt-[30px] pb-[28px] min-[375px]:pt-[34px] min-[414px]:pt-[38px]">
            <button
              aria-label={content.cta.label}
              className="hero-primary-cta flex w-full items-center gap-[14px] rounded-full border-[1.5px] border-[rgba(233,30,140,0.5)] bg-[rgba(8,8,8,0.72)] px-[14px] py-3 text-left"
              style={ctaButtonStyle}
              type="button"
              onClick={() => {
                // Preserve / add analytics consistent with other CTAs
                analytics.track(AnalyticsEvents.HERO_CTA_CLICK, {
                  surface: "hero",
                  label: content.cta.label,
                });

                // Activate using Batch 1 shared pattern
                activateLineCta({
                  title: content.cta.label,
                  surface: "hero-line",
                  landingPage: "/",
                  intent: "high_intent",
                  source: "hero",
                });
              }}
            >
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white">
                <LineIcon size={28} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-[12px] leading-[1.3] text-white/75">
                  {content.cta.eyebrow}
                </p>
                <p className="text-[20px] font-bold leading-[1.2] text-white">
                  {content.cta.primary}
                </p>
              </div>

              <div className="flex size-[34px] shrink-0 items-center justify-center rounded-full border-[1.5px] border-[rgba(233,30,140,0.5)]">
                <ChevronRight aria-hidden="true" className="size-[18px] text-[#E91E8C]" />
              </div>
            </button>
          </div>
        </div>
      </section>

      <TrustStrip items={content.trustItems} />
      <ScrollIndicator />
    </>
  );
}
