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
    <h2 className="text-[30px] font-extrabold leading-[1.1] tracking-[0.02em] text-[#E91E8C]">
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
        isBestSeller ? "top-4" : "top-[132px]",
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
      <p className="mt-2 text-[13px] font-semibold leading-[1.3] text-white">
        {item.title}
      </p>
      <p className="mt-[3px] text-[11px] leading-[1.3] text-white/60">
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
      className="mx-4 flex items-center justify-between rounded-[12px] border border-white/8 bg-[#1A1A1A] px-4 py-[14px] min-[1280px]:mx-0"
    >
      <div className="flex flex-col">
        <span className="text-[12px] leading-[1.3] text-white/[0.65]">
          {pricing.label}
        </span>
        <span className="mt-1 text-[32px] font-extrabold leading-none text-[#E91E8C]">
          {pricing.salePrice}
        </span>
      </div>

      <div className="flex flex-col text-right">
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
      className="flex h-14 w-full items-center gap-3 rounded-full bg-[#E91E8C] px-5 text-left text-white shadow-[0_0_20px_rgba(233,30,140,0.4)] transition-[transform,box-shadow,filter] duration-150 ease-out hover:brightness-[1.08] hover:shadow-[0_0_28px_rgba(233,30,140,0.6)] active:scale-[0.98] active:bg-[#C2185B] active:shadow-[0_0_14px_rgba(233,30,140,0.3)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#E91E8C]"
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

export function Section3HeroProduct({ content }: Section3HeroProductProps) {
  return (
    <section
      id="section-3-hero-product"
      aria-label={content.ariaLabel}
      className="bg-[#0A0A0A] min-[1280px]:mx-auto min-[1280px]:grid min-[1280px]:max-w-[1200px] min-[1280px]:grid-cols-[minmax(0,0.48fr)_minmax(0,0.52fr)] min-[1280px]:items-center min-[1280px]:gap-x-8 min-[1280px]:gap-y-0 min-[1280px]:px-10 min-[1280px]:py-12 min-[1366px]:max-w-[1240px] min-[1366px]:px-12 min-[1536px]:max-w-[1320px] min-[1536px]:gap-x-10 min-[1536px]:px-14"
    >
      <div className="px-4 pt-7 pb-4 text-center min-[1280px]:col-start-2 min-[1280px]:row-start-1 min-[1280px]:px-0 min-[1280px]:pt-0 min-[1280px]:pb-0 min-[1280px]:text-left">
        <SectionBadge label={content.sectionLabel} />
        <p className="mt-[10px] text-[18px] font-semibold leading-[1.3] text-white">
          {content.superline}
        </p>
        <div className="mt-1">
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
        <p className="mt-1.5 text-[14px] leading-[1.5] text-white/80">
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
        <div className="relative h-[300px] overflow-hidden bg-[#0A0A0A] min-[1280px]:h-auto min-[1280px]:min-h-[420px] min-[1280px]:rounded-[18px]">
          <Image
            src={content.artwork.src}
            alt={content.artwork.alt}
            fill
            sizes="(max-width: 430px) 100vw, (max-width: 1279px) 430px, 50vw"
            className="object-cover"
            style={{ objectPosition: "center center" }}
          />

          {content.badges.map((badge) => (
            <ProductStageBadge key={badge.type} badge={badge} />
          ))}
        </div>
      </Link>

      <div className="min-[1280px]:col-start-2 min-[1280px]:row-start-2 min-[1280px]:flex min-[1280px]:flex-col min-[1280px]:gap-5">
      <ul className="grid grid-cols-3 gap-x-2 px-4 py-5 min-[1280px]:grid-cols-3 min-[1280px]:gap-4 min-[1280px]:px-0 min-[1280px]:py-0">
        {content.benefits.map((item) => (
          <BenefitGridItem key={item.title} item={item} />
        ))}
      </ul>

      <PriceBlock pricing={content.pricing} />

      <div className="px-4 pt-4 pb-4 min-[1280px]:px-0 min-[1280px]:pt-0 min-[1280px]:pb-0">
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

      <div className="mx-4 mb-4 rounded-[12px] border border-white/8 bg-[#1A1A1A] px-3 py-4 min-[1280px]:mx-0 min-[1280px]:mb-0 min-[1280px]:px-4">
        <ul className="grid grid-cols-4 gap-1">
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
