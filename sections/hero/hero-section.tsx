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
  Menu,
  Package,
  ShieldCheck,
} from "lucide-react";

import type { HeroBenefit, HeroContent, HeroTrustItem } from "@/content/hero";

const BACKGROUND_IMAGE_SRC = "/images/hero/bg-hero-section1.jpeg";

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

function LineIcon({ size = 28 }: { size?: number }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
    >
      <rect width="40" height="40" rx="9" fill="#06C755" />
      <path
        d="M20 8.5C12.82 8.5 7 13.28 7 19.18c0 5.29 4.7 9.72 11.04 10.56.43.09 1.01.28 1.16.64.13.32.09.82.05 1.15l-.18 1.07c-.05.32-.26 1.26 1.1.69 1.36-.57 7.35-4.33 10.02-7.41C31.95 23.8 33 21.6 33 19.18 33 13.28 27.18 8.5 20 8.5z"
        fill="white"
      />
    </svg>
  );
}

function HeroHeader({ content }: { content: HeroContent }) {
  return (
    <header
      className="sticky top-0 z-[50] border-b border-white/8 bg-[#0A0A0A] px-4"
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div className="flex min-h-[60px] items-center justify-between gap-2 py-[10px]">
        <div className="min-w-0 flex-1">
          <p className="text-[17px] font-extrabold leading-none tracking-[0.04em] text-[#E91E8C]">
            {content.brand.wordmark}
          </p>
          <p className="mt-0.5 text-[10px] leading-[1.4] text-white/50">
            {content.brand.tagline}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-1.5">
          <button
            aria-label={content.header.lineCta}
            className="inline-flex h-10 w-[168px] items-center gap-1 rounded-full bg-[#E91E8C] pr-3 pl-1.5 text-[11px] font-semibold whitespace-nowrap text-white shadow-[0_0_16px_rgba(233,30,140,0.4)]"
            type="button"
          >
            <span className="flex h-7 min-w-7 items-center justify-center rounded-full bg-white px-1">
              <LineIcon size={15} />
            </span>
            <span>{content.header.lineCta}</span>
          </button>

          <button
            aria-label={content.header.menuLabel}
            className="flex size-9 items-center justify-center rounded-full text-white"
            type="button"
          >
            <Menu className="size-5" strokeWidth={2.1} />
          </button>
        </div>
      </div>
    </header>
  );
}

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
      <HeroHeader content={content} />

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
          sizes="(max-width: 430px) 100vw, 430px"
          className="hero-background scale-[1.05] object-cover"
          style={{ objectPosition: "61% top" }}
        />

        <div
          aria-hidden="true"
          className="hero-scrim-left pointer-events-none absolute inset-0 z-[1]"
          style={{
            background:
              "linear-gradient(90deg, rgba(10,10,10,0.84) 0%, rgba(10,10,10,0.70) 30%, rgba(10,10,10,0.40) 50%, rgba(10,10,10,0.08) 76%, transparent 100%)",
          }}
        />
        <div
          aria-hidden="true"
          className="hero-scrim-top pointer-events-none absolute top-0 right-0 left-0 z-[1] h-20"
          style={{
            background:
              "linear-gradient(to bottom, rgba(10,10,10,0.7) 0%, transparent 100%)",
          }}
        />
        <div
          aria-hidden="true"
          className="hero-scrim-bottom pointer-events-none absolute right-0 bottom-0 left-0 z-[1] h-[220px]"
          style={{
            background:
              "linear-gradient(to top, rgba(10,10,10,0.88) 0%, rgba(10,10,10,0.58) 46%, transparent 100%)",
          }}
        />

        <div className="hero-content-wrapper relative z-[2]">
          <div className="hero-content-column max-w-[62%] px-4 pt-[22px]">
            <p className="hero-subbrand mb-[6px] text-[10px] font-bold tracking-[0.22em] text-[#E91E8C] uppercase">
              {content.brand.subbrand}
            </p>

            <h1
              className="hero-headline mb-[10px] font-extrabold tracking-[-0.01em]"
              style={{
                fontSize: "clamp(38px, 11.5vw, 50px)",
                lineHeight: 1.07,
              }}
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

            <p className="hero-subheadline mb-4 text-[14px] leading-[1.55] text-white/75">
              {content.subheadline.map((line, index) => (
                <span key={line} className="block">
                  {line}
                  {index === content.subheadline.length - 1 ? null : null}
                </span>
              ))}
            </p>

            <div
              aria-hidden="true"
              className="hero-divider mb-[18px] h-[2.5px] w-[34px] rounded-[2px] bg-[#E91E8C]"
              style={dividerStyle}
            />

            <ul className="hero-benefits flex list-none flex-col gap-[14px] p-0">
              {content.benefits.map((item) => (
                <BenefitListItem key={item.title} item={item} />
              ))}
            </ul>
          </div>

          <div className="hero-cta-block px-[14px] pt-[28px] pb-[28px]">
            <button
              aria-label={content.cta.label}
              className="hero-primary-cta flex w-full items-center gap-[14px] rounded-full border-[1.5px] border-[rgba(233,30,140,0.5)] bg-[rgba(8,8,8,0.72)] px-[14px] py-3 text-left"
              style={ctaButtonStyle}
              type="button"
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
