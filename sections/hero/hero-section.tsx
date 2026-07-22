'use client';

import { getImageProps } from "next/image";
import { type CSSProperties, type ComponentType } from "react";
import {
  ChevronDown,
  ChevronRight,
  Crown,
  Droplet,
  FlaskConical,
  Flower2,
  Heart,
  Lock,
  Package,
  ShieldCheck,
} from "lucide-react";

import type { HeroBenefit, HeroContent, HeroTrustItem } from "@/content/hero";
import { featuredProduct } from "@/content/products";
import { analytics, AnalyticsEvents } from "@/lib/analytics";
import { activateLineCta } from "@/lib/commerce/cta-activation";
import { LineIcon } from "@/components/ui/line-icon";

const MOBILE_BACKGROUND_IMAGE_SRC = "/images/hero/bg-ph6d-section-1-hero-v2.jpeg";
const DESKTOP_BACKGROUND_IMAGE_SRC = "/images/hero/desktop-section-01-hero-desktop.jpeg";

/**
 * H1.2 — Browser-native art direction (no useMinWidth / matchMedia image swap).
 * Official Next.js 16 pattern: getImageProps + <picture> + <source media>.
 * Mobile (<690): bg-ph6d… · Tablet/Desktop (≥690): desktop-section-01…
 */
const MOBILE_HERO_SIZES = "100vw";
const DESKTOP_HERO_SIZES =
  "(max-width: 1023px) 100vw, (max-width: 1279px) 100vw, (max-width: 1535px) 1280px, 1440px";

const {
  props: { srcSet: desktopHeroSrcSet },
} = getImageProps({
  alt: "",
  fill: true,
  sizes: DESKTOP_HERO_SIZES,
  src: DESKTOP_BACKGROUND_IMAGE_SRC,
});

const {
  props: {
    srcSet: mobileHeroSrcSet,
    style: mobileHeroFillStyle,
    ...mobileHeroImgProps
  },
} = getImageProps({
  alt: "",
  fill: true,
  sizes: MOBILE_HERO_SIZES,
  src: MOBILE_BACKGROUND_IMAGE_SRC,
});

/** Fill-box styles from getImageProps + cover crop (object-position via className). */
const heroBackgroundImgStyle: CSSProperties = {
  ...(typeof mobileHeroFillStyle === "object" && mobileHeroFillStyle
    ? mobileHeroFillStyle
    : {}),
  objectFit: "cover",
};

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
    <li className="flex items-start gap-3 min-[690px]:gap-3.5 min-[1280px]:gap-3.5">
      <div className="flex size-[38px] shrink-0 items-center justify-center rounded-full border-[1.5px] border-[rgba(233,30,140,0.5)] bg-[rgba(233,30,140,0.12)] shadow-[0_0_10px_rgba(233,30,140,0.12)] min-[690px]:size-[40px] min-[1280px]:size-auto min-[1280px]:rounded-none min-[1280px]:border-0 min-[1280px]:bg-transparent min-[1280px]:shadow-none">
        <Icon className="size-[17px] text-[#E91E8C] min-[690px]:size-[18px] min-[1280px]:size-[18px]" strokeWidth={1.8} />
      </div>
      <div className="min-w-0">
        <p className="text-[14px] font-semibold leading-[1.3] text-white min-[690px]:text-[14px] min-[820px]:text-[15px] min-[1280px]:text-[15px] min-[1280px]:font-medium min-[1280px]:leading-[1.45]">
          {item.title}
        </p>
        <p className="text-[12px] leading-[1.3] text-white/75 min-[690px]:mt-0.5 min-[690px]:text-[13px] min-[690px]:leading-[1.38] min-[820px]:text-[14px] min-[1280px]:mt-0.5 min-[1280px]:text-[15px] min-[1280px]:leading-[1.45] min-[1280px]:text-white/82">
          {item.sub}
        </p>
      </div>
    </li>
  );
}

function TrustStrip({ items }: { items: HeroTrustItem[] }) {
  return (
    <section
      className="hero-trust-strip border-t border-[rgba(233,30,140,0.12)] bg-[#171717] px-2 py-5 min-[690px]:px-[var(--platform-shell-gutter)] min-[690px]:py-6 min-[820px]:py-7 min-[1280px]:hidden"
      aria-label="จุดเด่นด้านความปลอดภัยและบริการ"
    >
      <div className="grid grid-cols-4 gap-2 min-[690px]:gap-3 min-[820px]:gap-4">
        {items.map((item) => {
          const Icon = iconByTrustItem[item.icon];

          return (
            <div
              key={item.icon}
              className="flex flex-col items-center px-[2px] text-center min-[690px]:px-1"
            >
              <div className="flex h-[30px] items-center min-[690px]:h-8 min-[820px]:h-9">
                <Icon className="size-[26px] text-[#E91E8C] min-[690px]:size-[28px] min-[820px]:size-[30px]" strokeWidth={1.5} />
              </div>
              <div className="mt-[7px] flex flex-col gap-px min-[690px]:mt-2">
                {item.lines.map((line, index) => (
                  <span
                    key={line}
                    className={
                      index === 0
                        ? "text-[10px] font-semibold leading-[1.4] text-white min-[690px]:text-[11px] min-[820px]:text-[12px]"
                        : "text-[10px] leading-[1.4] text-white/75 min-[690px]:text-[11px] min-[820px]:text-[12px]"
                    }
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
    <div className="hero-scroll-indicator flex flex-col items-center bg-[#0A0A0A] px-0 pt-[10px] pb-4 min-[1280px]:hidden">
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
  const heroBadgeLabel = featuredProduct.badge?.label;
  const headlineLightLine = content.headline
    .filter((line) => line.tone === "light")
    .map((line) => line.text)
    .join("");
  const headlineAccentLine = content.headline
    .filter((line) => line.tone === "accent")
    .map((line) => line.text)
    .join("");

  return (
    <>
      <section
        id="hero"
        aria-label="Hero - Nicky Pimpz Boss"
        className="hero-root relative overflow-hidden bg-[#0A0A0A] min-[690px]:min-h-[540px] min-[768px]:min-h-[560px] min-[820px]:min-h-[580px] min-[1024px]:min-h-[600px] min-[1280px]:mx-auto min-[1280px]:max-w-[1200px] min-[1280px]:px-10 min-[1280px]:pt-[72px] min-[1280px]:pb-[64px] min-[1280px]:min-h-[580px] min-[1366px]:max-w-[1280px] min-[1366px]:px-12 min-[1366px]:pt-[78px] min-[1366px]:pb-[70px] min-[1536px]:max-w-[1400px] min-[1536px]:px-14 min-[1536px]:pt-[84px] min-[1536px]:pb-[76px] min-[1536px]:min-h-[620px] min-[1920px]:max-w-[1440px] min-[1920px]:px-16"
      >
        {/*
          H1.2 Browser-native art direction (Next.js getImageProps + picture).
          ≥690 → desktop/tablet master · <690 → mobile master.
          No React matchMedia swap — correct asset on first paint.
          object-position ladder remains CSS (authority preserved).
        */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0"
        >
          <picture>
            <source
              media="(min-width: 690px)"
              srcSet={desktopHeroSrcSet}
              sizes={DESKTOP_HERO_SIZES}
            />
            <img
              {...mobileHeroImgProps}
              alt=""
              aria-hidden="true"
              srcSet={mobileHeroSrcSet}
              sizes={MOBILE_HERO_SIZES}
              // Override getImageProps default lazy — Hero is LCP / above-the-fold
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className={[
                "hero-background",
                // Mobile crop authority
                "object-cover object-[74%_18%]",
                // Tablet + Desktop object-position ladder (unchanged authority)
                "min-[690px]:object-[86%_40%]",
                "min-[768px]:object-[88%_42%]",
                "min-[820px]:object-[89%_44%]",
                "min-[1024px]:object-[90%_46%]",
                "min-[1280px]:object-[92%_50%]",
                "min-[1366px]:object-[90%_50%]",
                "min-[1536px]:object-[86%_48%]",
                "min-[1920px]:object-[82%_46%]",
              ].join(" ")}
              style={heroBackgroundImgStyle}
            />
          </picture>
        </div>

        {/* Mobile-only scrims (<690) — frozen */}
        <div
          aria-hidden="true"
          className="hero-scrim-left pointer-events-none absolute inset-0 z-[1] min-[690px]:hidden"
          style={{
            background:
              "linear-gradient(90deg, rgba(10,10,10,0.78) 0%, rgba(10,10,10,0.62) 28%, rgba(10,10,10,0.34) 45%, rgba(10,10,10,0.1) 63%, rgba(10,10,10,0.02) 79%, transparent 100%)",
          }}
        />
        <div
          aria-hidden="true"
          className="hero-scrim-top pointer-events-none absolute top-0 right-0 left-0 z-[1] h-24 min-[690px]:hidden"
          style={{
            background:
              "linear-gradient(to bottom, rgba(10,10,10,0.72) 0%, rgba(10,10,10,0.16) 58%, transparent 100%)",
          }}
        />
        <div
          aria-hidden="true"
          className="hero-scrim-bottom pointer-events-none absolute right-0 bottom-0 left-0 z-[1] h-[196px] min-[690px]:hidden"
          style={{
            background:
              "linear-gradient(to top, rgba(10,10,10,0.88) 0%, rgba(10,10,10,0.56) 34%, rgba(10,10,10,0.18) 58%, transparent 100%)",
          }}
        />

        {/* Tablet + Desktop scrims (>=690) — text-safe left field + light brand glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-[6] hidden min-[690px]:block min-[690px]:right-[8%] min-[1024px]:right-[6%] min-[1280px]:right-[6%]"
          style={{
            background:
              "linear-gradient(90deg, #0A0A0A 0%, rgba(10,10,10,0.96) 20%, rgba(10,10,10,0.84) 34%, rgba(10,10,10,0.36) 52%, rgba(10,10,10,0) 100%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 right-0 left-0 z-[7] hidden h-24 min-[690px]:block"
          style={{
            background:
              "linear-gradient(to bottom, rgba(10,10,10,0.7) 0%, rgba(10,10,10,0.16) 56%, transparent 100%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 bottom-0 left-0 z-[7] hidden h-28 min-[690px]:block min-[690px]:h-32"
          style={{
            background:
              "linear-gradient(to top, rgba(10,10,10,0.62) 0%, rgba(10,10,10,0.18) 52%, transparent 100%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[8] hidden min-[690px]:block"
          style={{
            background:
              "radial-gradient(ellipse at 78% 56%, rgba(233,30,140,0.14) 0%, rgba(233,30,140,0.07) 24%, rgba(233,30,140,0.02) 46%, transparent 64%)",
          }}
        />

        {heroBadgeLabel ? (
          <div
            aria-label={heroBadgeLabel}
            className="absolute top-[108px] right-10 z-[15] hidden size-[96px] flex-col items-center justify-center rounded-full border-[1.5px] border-[rgba(233,30,140,0.55)] bg-[rgba(10,10,10,0.82)] shadow-[0_0_0_1px_rgba(233,30,140,0.18),0_0_24px_rgba(233,30,140,0.28)] min-[1280px]:flex min-[1366px]:right-12 min-[1536px]:right-14"
          >
            <Crown aria-hidden="true" className="mb-1 size-4 text-[#E91E8C]" strokeWidth={1.8} />
            <span className="text-[14px] font-extrabold leading-none tracking-[0.08em] text-white">
              BEST
            </span>
            <span className="mt-1 text-[11px] font-semibold leading-none tracking-[0.08em] text-white">
              SELLER
            </span>
          </div>
        ) : null}

        {/*
          T1B Tablet (690–1279): deliberate content measure + rhythm.
          Desktop (>=1280) authorities restored explicitly — do not inherit tablet % widths.
        */}
        <div className="hero-content-wrapper relative z-[20] min-[690px]:max-w-[60%] min-[768px]:max-w-[58%] min-[820px]:max-w-[56%] min-[912px]:max-w-[54%] min-[1024px]:max-w-[52%] min-[1180px]:max-w-[50%] min-[1280px]:max-w-[520px]">
          <div className="contents min-[1280px]:block">
            <div className="hero-content-column max-w-[52%] px-4 pt-[12px] min-[375px]:max-w-[51%] min-[375px]:pt-[16px] min-[414px]:max-w-[50%] min-[414px]:pt-[20px] min-[690px]:max-w-none min-[690px]:px-[var(--platform-shell-gutter)] min-[690px]:pt-9 min-[768px]:pt-10 min-[820px]:pt-11 min-[1024px]:pt-12 min-[1280px]:max-w-[520px] min-[1280px]:px-0 min-[1280px]:pt-0">
              <p className="hero-subbrand mb-[10px] text-[10px] font-bold tracking-[0.22em] text-[#E91E8C] uppercase min-[690px]:mb-3.5 min-[690px]:text-[11px] min-[690px]:tracking-[0.16em] min-[820px]:text-[12px] min-[820px]:tracking-[0.12em] min-[1280px]:mb-[14px] min-[1280px]:text-[13px] min-[1280px]:tracking-[0.08em]">
                {content.brand.subbrand}
              </p>

              <h1
                className="hero-headline mb-4 font-extrabold tracking-[0em] text-[clamp(28px,8.4vw,36px)] leading-[1.24] [text-shadow:0_2px_12px_rgba(0,0,0,0.18)] min-[375px]:mb-[18px] min-[375px]:text-[clamp(30px,8.5vw,39px)] min-[375px]:leading-[1.2] min-[414px]:mb-5 min-[414px]:tracking-[-0.004em] min-[414px]:text-[clamp(33px,8.4vw,43px)] min-[414px]:leading-[1.16] min-[690px]:mb-5 min-[690px]:max-w-[16ch] min-[690px]:text-[clamp(36px,5.2vw,42px)] min-[690px]:leading-[1.22] min-[690px]:tracking-[-0.006em] min-[768px]:max-w-[17ch] min-[768px]:text-[clamp(38px,4.9vw,44px)] min-[820px]:mb-6 min-[820px]:max-w-[18ch] min-[820px]:text-[clamp(40px,4.6vw,46px)] min-[820px]:leading-[1.2] min-[1024px]:max-w-[19ch] min-[1024px]:text-[clamp(42px,4.2vw,48px)] min-[1024px]:leading-[1.18] min-[1180px]:max-w-none min-[1280px]:mb-6 min-[1280px]:max-w-none min-[1280px]:text-[clamp(48px,3.8vw,54px)] min-[1280px]:leading-[1.14] min-[1280px]:tracking-[-0.01em] min-[1366px]:text-[clamp(52px,4vw,58px)] min-[1536px]:text-[clamp(56px,3.9vw,62px)]"
              >
                <span className="block text-white min-[1280px]:mb-[4px]">{headlineLightLine}</span>
                <span className="block text-[#E91E8C]">{headlineAccentLine}</span>
              </h1>

              <p className="hero-subheadline mb-6 max-w-[90%] text-[13px] leading-[1.68] text-white/78 min-[375px]:mb-7 min-[375px]:max-w-[88%] min-[375px]:text-[14px] min-[375px]:leading-[1.62] min-[690px]:mb-8 min-[690px]:max-w-[34ch] min-[690px]:text-[15px] min-[690px]:leading-[1.58] min-[820px]:mb-8 min-[820px]:max-w-[36ch] min-[820px]:text-[16px] min-[820px]:leading-[1.56] min-[1024px]:max-w-[38ch] min-[1024px]:text-[17px] min-[1024px]:leading-[1.54] min-[1280px]:mb-8 min-[1280px]:max-w-[440px] min-[1280px]:text-[17px] min-[1280px]:leading-[1.5] min-[1366px]:max-w-[480px] min-[1366px]:text-[18px]">
                {content.subheadline.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>

              <div
                aria-hidden="true"
                className="hero-divider mb-6 h-[2.5px] w-[34px] rounded-[2px] bg-[#E91E8C] min-[375px]:mb-7 min-[690px]:mb-8 min-[690px]:w-10 min-[820px]:mb-8 min-[820px]:w-11 min-[1280px]:mb-8 min-[1280px]:w-12"
                style={dividerStyle}
              />

              <ul className="hero-benefits flex list-none flex-col gap-[16px] p-0 min-[375px]:gap-[18px] min-[690px]:max-w-[360px] min-[690px]:gap-[16px] min-[820px]:max-w-[400px] min-[820px]:gap-[18px] min-[1024px]:max-w-[420px] min-[1024px]:gap-[18px] min-[1280px]:max-w-[420px] min-[1280px]:gap-3">
                {content.benefits.map((item) => (
                  <BenefitListItem key={item.title} item={item} />
                ))}
              </ul>
            </div>

            <div className="hero-cta-block px-[14px] pt-[30px] pb-[28px] min-[375px]:pt-[34px] min-[414px]:pt-[38px] min-[690px]:max-w-[340px] min-[690px]:px-[var(--platform-shell-gutter)] min-[690px]:pt-9 min-[690px]:pb-9 min-[820px]:max-w-[360px] min-[820px]:pt-9 min-[1024px]:max-w-[380px] min-[1280px]:max-w-[440px] min-[1280px]:px-0 min-[1280px]:pt-9 min-[1280px]:pb-0">
              <button
                aria-label={content.cta.label}
                className="hero-primary-cta flex min-h-[52px] w-full items-center gap-[14px] rounded-full border-[1.5px] border-[rgba(233,30,140,0.5)] bg-[rgba(8,8,8,0.72)] px-[14px] py-3 text-left min-[690px]:min-h-[54px] min-[690px]:max-w-[300px] min-[820px]:min-h-[56px] min-[820px]:max-w-[318px] min-[1024px]:max-w-[332px] min-[1280px]:inline-flex min-[1280px]:min-h-[52px] min-[1280px]:w-auto min-[1280px]:min-w-[190px] min-[1280px]:max-w-none min-[1280px]:gap-3 min-[1280px]:bg-[#E91E8C] min-[1280px]:px-6 min-[1280px]:py-0"
                style={ctaButtonStyle}
                type="button"
                onClick={() => {
                  analytics.track(AnalyticsEvents.HERO_CTA_CLICK, {
                    surface: "hero",
                    label: content.cta.label,
                  });

                  activateLineCta({
                    title: content.cta.label,
                    surface: "hero-line",
                    landingPage: "/",
                    intent: "high_intent",
                    source: "hero",
                  });
                }}
              >
                <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white min-[690px]:size-[46px] min-[820px]:size-[44px] min-[1280px]:size-8 min-[1280px]:bg-transparent">
                  <LineIcon size={28} />
                </div>

                <div className="min-w-0 flex-1 min-[1280px]:flex-none">
                  <p className="text-[12px] leading-[1.3] text-white/75 min-[690px]:text-[12px] min-[820px]:text-[13px] min-[1280px]:hidden">
                    {content.cta.eyebrow}
                  </p>
                  <p className="text-[20px] font-bold leading-[1.2] text-white min-[690px]:text-[20px] min-[820px]:text-[21px] min-[1280px]:text-[15px] min-[1280px]:leading-none">
                    <span className="hidden min-[1280px]:inline">ปรึกษาผ่าน LINE</span>
                    <span className="min-[1280px]:hidden">{content.cta.primary}</span>
                  </p>
                </div>

                <div className="flex size-[34px] shrink-0 items-center justify-center rounded-full border-[1.5px] border-[rgba(233,30,140,0.5)] min-[690px]:size-9 min-[820px]:size-10 min-[1280px]:size-7 min-[1280px]:border-white/35">
                  <ChevronRight aria-hidden="true" className="size-[18px] text-[#E91E8C] min-[1280px]:text-white" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      <TrustStrip items={content.trustItems} />
      <ScrollIndicator />
    </>
  );
}
