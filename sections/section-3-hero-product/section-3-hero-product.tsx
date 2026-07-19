'use client';

import Image from "next/image";
import type { ComponentType } from "react";
import {
  ChevronDown,
  ChevronRight,
  Crown,
  Droplet,
  FlaskConical,
  Flower2,
  Headphones,
  Heart,
  Package,
  ShieldCheck,
} from "lucide-react";

import type {
  Section3Badge,
  Section3Benefit,
  Section3BenefitIcon,
  Section3Content,
  Section3MiniTrust,
  Section3MiniTrustIcon,
} from "@/content/section-3-hero-product";
import { LineIcon } from "@/components/ui/line-icon";
import { SectionBadge } from "@/components/ui/section-badge";
import { IconWrapper } from "@/components/ui/icon-wrapper";
import { activateLineCta } from "@/lib/commerce/cta-activation";
import { analytics, AnalyticsEvents } from "@/lib/analytics";
import { featuredProduct } from "@/content/products";
import Link from 'next/link';

type LucideLikeIcon = ComponentType<{
  className?: string;
  strokeWidth?: number;
}>;

const benefitIconByName: Record<Section3BenefitIcon, LucideLikeIcon> = {
  Flower2,
  Droplet,
  Heart,
};

const miniTrustIconByName: Record<Section3MiniTrustIcon, LucideLikeIcon> = {
  ShieldCheck,
  FlaskConical,
  Package,
  Headphones,
};

function ProductNameHeading({ text }: { text: string }) {
  return (
    <h2 className="text-[30px] font-extrabold leading-[1.1] tracking-[0.02em] text-[#E91E8C] min-[1280px]:text-[42px] min-[1280px]:leading-[1.02] min-[1536px]:text-[46px]">
      {text}
    </h2>
  );
}

function ProductStageBadge({ badge }: { badge: Section3Badge }) {
  const isBestSeller = badge.type === "bestSeller";

  return (
    <div
      aria-label={badge.caption}
      className={[
        "absolute right-4 flex flex-col items-center",
        // Mobile top offsets frozen; tablet/desktop track taller image stages
        isBestSeller
          ? "top-4"
          : "top-[132px] min-[690px]:top-[156px] min-[820px]:top-[168px] min-[1024px]:top-[180px] min-[1280px]:top-[148px] min-[1536px]:top-[160px]",
      ].join(" ")}
    >
      <div className="flex size-[74px] flex-col items-center justify-center rounded-full border-[1.5px] border-[rgba(233,30,140,0.5)] bg-[rgba(0,0,0,0.55)]">
        {isBestSeller ? (
          <Crown
            aria-hidden="true"
            className="mb-0.5 size-5 text-[#E91E8C]"
            strokeWidth={1.5}
          />
        ) : null}

        <span
          className={[
            "text-center font-extrabold leading-none tracking-[0.04em] text-white",
            isBestSeller ? "text-[15px]" : "text-[22px]",
          ].join(" ")}
        >
          {badge.topLine}
        </span>
        <span
          className={[
            "mt-0.5 text-center font-bold leading-none tracking-[0.06em] text-white",
            isBestSeller ? "text-[11px]" : "text-[10px]",
          ].join(" ")}
        >
          {badge.bottomLine}
        </span>
      </div>
      <p className="mt-1 text-center text-[10px] leading-[1.3] text-white/80">
        {badge.caption}
      </p>
    </div>
  );
}

function BenefitGridItem({ item }: { item: Section3Benefit }) {
  const Icon = benefitIconByName[item.iconName];

  return (
    <li className="flex flex-col items-center text-center">
      <div className="flex h-5 items-center justify-center">
        <Icon
          aria-hidden="true"
          className="size-5 text-[#E91E8C]"
          strokeWidth={1.5}
        />
      </div>
      <p className="mt-2 text-[13px] font-semibold leading-[1.3] text-white min-[690px]:mt-2.5 min-[1280px]:mt-2.5 min-[1280px]:leading-[1.35]">
        {item.title}
      </p>
      <p className="mt-[3px] text-[11px] leading-[1.3] text-white/60 min-[690px]:mt-1 min-[1280px]:mt-1 min-[1280px]:leading-[1.45] min-[1280px]:text-white/62">
        {item.sub}
      </p>
    </li>
  );
}

function PriceBlock({
  pricing,
}: {
  pricing: Section3Content["pricing"];
}) {
  return (
    <div
      aria-label={pricing.ariaLabel}
      className={[
        // Mobile frozen card chrome
        "mx-4 flex items-center justify-between rounded-[12px] border border-white/8 bg-[#1A1A1A] px-4 py-[14px]",
        // ZZ-03A: inside purchase row at >=690 — no outer margin (row owns gutters)
        "min-[690px]:mx-0 min-[690px]:min-h-[80px] min-[690px]:px-4 min-[690px]:py-3.5",
        "min-[1280px]:min-h-[84px] min-[1280px]:px-4 min-[1280px]:py-3.5",
      ].join(" ")}
    >
      <div className="flex min-w-0 flex-col">
        <span className="text-[12px] leading-[1.3] text-white/[0.65]">
          {pricing.label}
        </span>
        <span className="mt-1 text-[32px] font-extrabold leading-none text-[#E91E8C] min-[1280px]:text-[36px]">
          {pricing.salePrice}
        </span>
      </div>

      <div className="flex shrink-0 flex-col text-right">
        <del
          aria-label={`ราคาปกติ ${pricing.originalPrice.replace(/[.-]/g, "")} บาท`}
          className="text-[16px] leading-none text-white/[0.45]"
        >
          {pricing.originalPrice}
        </del>
        <span className="mt-1 text-[10px] leading-[1.3] text-white/[0.45]">
          {pricing.originalPriceLabel}
        </span>
      </div>
    </div>
  );
}

function SolidLineCTA({
  href,
  label,
  ariaLabel,
  onClick,
}: Section3Content["cta"] & { onClick?: () => void }) {
  return (
    <a
      aria-label={ariaLabel}
      className={[
        // Mobile frozen pill CTA
        "flex h-14 w-full items-center gap-3 rounded-full bg-[#E91E8C] px-5 text-left text-white shadow-[0_0_20px_rgba(233,30,140,0.4)] transition-[transform,box-shadow,filter] duration-150 ease-out hover:brightness-[1.08] hover:shadow-[0_0_28px_rgba(233,30,140,0.6)] active:scale-[0.98] active:bg-[#C2185B] active:shadow-[0_0_14px_rgba(233,30,140,0.3)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#E91E8C]",
        // ZZ-03A: fill purchase-row track; keep pill height (not a tall card)
        "min-[690px]:h-[52px] min-[690px]:w-full min-[690px]:min-w-0 min-[690px]:shrink-0 min-[690px]:px-4",
        "min-[1280px]:h-[52px] min-[1280px]:px-5",
      ].join(" ")}
      href={href || "#"}
      onClick={(e) => {
        if (onClick) {
          onClick();
          e.preventDefault();
        }
      }}
    >
      <IconWrapper size={10} className="bg-white">
        <LineIcon size={24} />
      </IconWrapper>

      <span className="min-w-0 flex-1 whitespace-nowrap text-[17px] font-bold leading-none">
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

function MiniTrustCardItem({ item }: { item: Section3MiniTrust }) {
  const Icon = miniTrustIconByName[item.iconName];

  return (
    <li className="flex flex-col items-center text-center">
      <div className="flex h-[26px] items-center justify-center">
        <Icon
          aria-hidden="true"
          className="size-[22px] text-[#E91E8C]"
          strokeWidth={1.5}
        />
      </div>
      <div className="mt-[7px] flex min-h-[29px] flex-col gap-px">
        <span className="text-[11px] font-semibold leading-[1.3] text-white">
          {item.title[0]}
        </span>
        <span className="text-[10px] leading-[1.3] text-white/60">
          {item.title[1]}
        </span>
      </div>
    </li>
  );
}

function ScrollIndicator() {
  return (
    <div className="flex flex-col items-center bg-[#0A0A0A] px-0 pt-[10px] pb-4">
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

type Section3HeroProductProps = {
  content: Section3Content;
};

/**
 * ZZ-03 / ZZ-03A: Tablet/Desktop product presentation polish.
 * Mobile <690 frozen (stage h-300, object-position center 42%, stacked Price→CTA).
 * ZZ-03A: Price + LINE CTA share one purchase row from 690px (CSS only).
 */
export function Section3HeroProduct({ content }: Section3HeroProductProps) {
  return (
    <section
      id="section-3-hero-product"
      aria-label={content.ariaLabel}
      className={[
        "bg-[#0A0A0A]",
        // Desktop two-column (unchanged activation threshold 1280); slight image bias + Wide Canvas ladder
        "min-[1280px]:mx-auto min-[1280px]:grid min-[1280px]:max-w-[1200px] min-[1280px]:grid-cols-[minmax(0,0.52fr)_minmax(0,0.48fr)] min-[1280px]:items-center min-[1280px]:gap-x-8 min-[1280px]:gap-y-0 min-[1280px]:px-10 min-[1280px]:py-12",
        "min-[1366px]:max-w-[1280px] min-[1366px]:grid-cols-[minmax(0,0.52fr)_minmax(0,0.48fr)] min-[1366px]:gap-x-10 min-[1366px]:px-12",
        "min-[1536px]:max-w-[1400px] min-[1536px]:gap-x-12 min-[1536px]:px-14",
        "min-[1920px]:max-w-[1440px] min-[1920px]:px-16",
      ].join(" ")}
    >
      <div className="px-4 pt-7 pb-4 text-center min-[690px]:px-[var(--platform-shell-gutter,1rem)] min-[1280px]:col-start-2 min-[1280px]:row-start-1 min-[1280px]:px-0 min-[1280px]:pt-0 min-[1280px]:pb-0 min-[1280px]:text-left">
        <SectionBadge label={content.sectionLabel} />
        <p className="mt-[10px] text-[18px] font-semibold leading-[1.3] text-white min-[1280px]:mt-3 min-[1280px]:text-[19px] min-[1280px]:leading-[1.4]">
          {content.superline}
        </p>
        <div className="mt-1 min-[1280px]:mt-1.5">
          <Link
            href={`/products/${featuredProduct.slug}`}
            onClick={() =>
              analytics.track(AnalyticsEvents.PRODUCT_CLICK, {
                surface: "section",
                label: content.productName,
                destination: `/products/${featuredProduct.slug}`,
              })
            }
          >
            <ProductNameHeading text={content.productName} />
          </Link>
        </div>
        <p className="mt-1.5 text-[14px] leading-[1.5] text-white/80 min-[1280px]:mt-3.5 min-[1280px]:max-w-[420px] min-[1280px]:text-[16px] min-[1280px]:leading-[1.65] min-[1280px]:text-white/78">
          {content.productTagline}
        </p>
      </div>

      <Link
        href={`/products/${featuredProduct.slug}`}
        aria-label={`View details for ${content.productName}`}
        className="min-[1280px]:col-start-1 min-[1280px]:row-start-1 min-[1280px]:row-span-2"
        onClick={() =>
          analytics.track(AnalyticsEvents.PRODUCT_CLICK, {
            surface: "section",
            label: content.productName,
            destination: `/products/${featuredProduct.slug}`,
          })
        }
      >
        <div
          className={[
            // Mobile frozen stage
            "relative h-[300px] overflow-hidden bg-[#0A0A0A]",
            // ZZ-03 tablet stage ladder — more vertical room so cover crop is less aggressive
            "min-[690px]:h-[360px] min-[768px]:h-[380px] min-[820px]:h-[400px] min-[912px]:h-[420px] min-[1024px]:h-[440px]",
            // Desktop stage with quality ceiling (do not grow unbounded at 1920)
            "min-[1280px]:h-auto min-[1280px]:min-h-[420px] min-[1280px]:max-h-[500px] min-[1280px]:rounded-[22px]",
            "min-[1366px]:min-h-[440px] min-[1366px]:max-h-[520px]",
            "min-[1536px]:min-h-[460px] min-[1536px]:max-h-[540px]",
            "min-[1920px]:min-h-[460px] min-[1920px]:max-h-[540px]",
          ].join(" ")}
        >
          <div className="absolute inset-0 min-[1280px]:inset-3 min-[1280px]:overflow-hidden min-[1280px]:rounded-[18px] min-[1536px]:inset-4">
            <Image
              src={content.artwork.src}
              alt={content.artwork.alt}
              fill
              // Accurate candidates: full shell on tablet stack; ~half shell on desktop two-column
              sizes="(max-width: 689px) 100vw, (max-width: 1279px) 100vw, (max-width: 1535px) 52vw, 640px"
              className={[
                "object-cover object-[center_42%]",
                // Breakpoint art direction (CSS only) — keep bottle/cap/ingredients/stone in frame
                "min-[690px]:object-[center_40%]",
                "min-[768px]:object-[center_38%]",
                "min-[820px]:object-[center_36%]",
                "min-[1024px]:object-[center_35%]",
                "min-[1280px]:object-[center_40%]",
                "min-[1366px]:object-[center_42%]",
                "min-[1536px]:object-[center_44%]",
                "min-[1920px]:object-[center_46%]",
              ].join(" ")}
            />
          </div>

          {content.badges.map((badge) => (
            <ProductStageBadge key={badge.type} badge={badge} />
          ))}
        </div>
      </Link>

      <div className="min-[1280px]:col-start-2 min-[1280px]:row-start-2 min-[1280px]:flex min-[1280px]:flex-col min-[1280px]:gap-6">
        <ul
          className={[
            "grid grid-cols-3 gap-x-2 px-4 py-5",
            "min-[690px]:gap-x-4 min-[690px]:px-[var(--platform-shell-gutter,1rem)] min-[690px]:py-6",
            "min-[820px]:gap-x-5",
            "min-[1280px]:grid-cols-3 min-[1280px]:gap-6 min-[1280px]:px-0 min-[1280px]:py-0",
          ].join(" ")}
        >
          {content.benefits.map((item) => (
            <BenefitGridItem key={item.title} item={item} />
          ))}
        </ul>

        {/*
          ZZ-03A Purchase Action Row
          Mobile: display:contents → Price + CTA remain stacked siblings (baseline).
          >=690: wrapper becomes grid → Price | CTA as one purchase cluster.
        */}
        <div
          className={[
            "contents",
            "min-[690px]:grid min-[690px]:grid-cols-[minmax(0,1fr)_minmax(250px,280px)] min-[690px]:items-center min-[690px]:gap-4 min-[690px]:px-[var(--platform-shell-gutter,1rem)]",
            "min-[768px]:grid-cols-[minmax(0,1fr)_minmax(260px,290px)] min-[768px]:gap-5",
            "min-[1024px]:grid-cols-[minmax(0,1fr)_minmax(270px,300px)]",
            "min-[1280px]:grid-cols-[minmax(0,1fr)_minmax(240px,260px)] min-[1280px]:gap-4 min-[1280px]:px-0",
          ].join(" ")}
        >
          <PriceBlock pricing={content.pricing} />

          <div className="px-4 pt-4 pb-4 min-[690px]:flex min-[690px]:items-center min-[690px]:px-0 min-[690px]:py-0">
            <SolidLineCTA
              {...content.cta}
              onClick={() =>
                activateLineCta({
                  product: {
                    slug: featuredProduct.slug,
                    sku: featuredProduct.sku,
                    title: featuredProduct.title,
                    cta: featuredProduct.cta,
                  },
                  surface: "featured-product-line",
                  landingPage: "/",
                  intent: "high_intent",
                  source: "featured-product",
                })
              }
            />
          </div>
        </div>

        <div
          className={[
            "mx-4 mb-4 rounded-[12px] border border-white/8 bg-[#1A1A1A] px-3 py-4",
            "min-[690px]:mx-[var(--platform-shell-gutter,1rem)] min-[690px]:mb-5 min-[690px]:px-4 min-[690px]:py-5",
            "min-[1280px]:mx-0 min-[1280px]:mb-0 min-[1280px]:rounded-[18px] min-[1280px]:px-5 min-[1280px]:py-4.5",
          ].join(" ")}
        >
          <ul className="grid grid-cols-4 gap-1 min-[690px]:gap-2 min-[1280px]:gap-3.5">
            {content.miniTrust.map((item) => (
              <MiniTrustCardItem key={item.title.join("-")} item={item} />
            ))}
          </ul>
        </div>
      </div>

      <div className="min-[1280px]:col-span-2 min-[1280px]:hidden">
        <ScrollIndicator />
      </div>
    </section>
  );
}
