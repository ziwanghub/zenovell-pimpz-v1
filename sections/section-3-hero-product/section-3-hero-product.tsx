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
import Link from "next/link";

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

/**
 * Product name scale:
 * Mobile/stack base 30 · Tablet two-column intermediate · Desktop 42 frozen.
 * Tailwind v4: max-[Npx] ≡ width < N → use max-[1280px] for inclusive 1279.
 */
function ProductNameHeading({ text }: { text: string }) {
  return (
    <h2
      className={[
        "text-[30px] font-extrabold leading-[1.1] tracking-[0.02em] text-[#E91E8C]",
        // Tablet two-column intermediate (below Desktop 42)
        "min-[768px]:max-[1280px]:text-[34px] min-[768px]:max-[1280px]:leading-[1.05]",
        "min-[1024px]:max-[1280px]:text-[36px]",
        // Desktop frozen
        "min-[1280px]:text-[42px] min-[1280px]:leading-[1.02] min-[1536px]:text-[46px]",
      ].join(" ")}
    >
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
        "absolute right-3 flex flex-col items-center min-[690px]:right-4",
        isBestSeller
          ? "top-4"
          : [
              "top-[132px]",
              // Stack tablet only
              "min-[690px]:max-[768px]:top-[156px]",
              // Two-column stage placement
              "min-[768px]:max-[1280px]:top-[42%]",
              // Desktop frozen
              "min-[1280px]:top-[148px]",
              "min-[1536px]:top-[160px]",
            ].join(" "),
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
      <div className="flex h-5 items-center justify-center min-[768px]:max-[1280px]:h-7">
        <Icon
          aria-hidden="true"
          className="size-5 text-[#E91E8C] min-[768px]:max-[1280px]:size-[26px]"
          strokeWidth={1.5}
        />
      </div>
      <p
        className={[
          "mt-2 text-[13px] font-semibold leading-[1.3] text-white",
          "min-[690px]:mt-2.5",
          "min-[768px]:max-[1280px]:mt-2.5 min-[768px]:max-[1280px]:text-[14px] min-[768px]:max-[1280px]:leading-[1.35]",
          "min-[1280px]:mt-2.5 min-[1280px]:leading-[1.35]",
        ].join(" ")}
      >
        {item.title}
      </p>
      <p
        className={[
          "mt-[3px] text-[11px] leading-[1.3] text-white/60",
          "min-[690px]:mt-1",
          "min-[768px]:max-[1280px]:mt-1 min-[768px]:max-[1280px]:text-[12px] min-[768px]:max-[1280px]:leading-[1.35]",
          "min-[1280px]:mt-1 min-[1280px]:leading-[1.45] min-[1280px]:text-white/62",
        ].join(" ")}
      >
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
        // Stack / purchase-row from 690
        "min-[690px]:mx-0 min-[690px]:min-h-[80px] min-[690px]:px-4 min-[690px]:py-3.5",
        // Tablet two-column denser price module
        "min-[768px]:max-[1280px]:min-h-[76px] min-[768px]:max-[1280px]:gap-2 min-[768px]:max-[1280px]:px-3 min-[768px]:max-[1280px]:py-3",
        // Desktop frozen
        "min-[1280px]:min-h-[84px] min-[1280px]:px-4 min-[1280px]:py-3.5",
      ].join(" ")}
    >
      <div className="flex min-w-0 flex-col">
        <span className="text-[12px] leading-[1.3] text-white/[0.65]">
          {pricing.label}
        </span>
        <span
          className={[
            "mt-1 text-[32px] font-extrabold leading-none text-[#E91E8C]",
            "min-[768px]:max-[1280px]:text-[30px]",
            "min-[1024px]:max-[1280px]:text-[32px]",
            "min-[1280px]:text-[36px]",
          ].join(" ")}
        >
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
        "min-[690px]:h-[52px] min-[690px]:w-full min-[690px]:min-w-0 min-[690px]:shrink-0 min-[690px]:px-4",
        "min-[768px]:max-[1280px]:h-[52px] min-[768px]:max-[1280px]:px-3.5",
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
 * Section 3 — Featured Product
 *
 * Mobile <690: frozen stack (stage h-300, stacked Price→CTA).
 * 690–767: transitional stack + purchase row (no 2-column).
 * P8C-TABLET-S3-01 768–1279: Tablet 2-column (image left · info right).
 * Desktop ≥1280: frozen two-column authority — do not mutate.
 */
export function Section3HeroProduct({ content }: Section3HeroProductProps) {
  return (
    <section
      id="section-3-hero-product"
      aria-label={content.ariaLabel}
      className={[
        "bg-[#0A0A0A]",
        // --- P8C Tablet 2-column (768–1279 only; max-[1280px] = width < 1280) ---
        // 768–819: 43 / 57
        "min-[768px]:max-[1280px]:mx-auto min-[768px]:max-[1280px]:grid min-[768px]:max-[1280px]:max-w-[1200px] min-[768px]:max-[1280px]:grid-cols-[minmax(0,0.43fr)_minmax(0,0.57fr)] min-[768px]:max-[1280px]:items-center min-[768px]:max-[1280px]:gap-x-4 min-[768px]:max-[1280px]:gap-y-0 min-[768px]:max-[1280px]:px-[var(--platform-shell-gutter,1rem)] min-[768px]:max-[1280px]:py-7",
        // 820–1023: 46 / 54
        "min-[820px]:max-[1280px]:grid-cols-[minmax(0,0.46fr)_minmax(0,0.54fr)] min-[820px]:max-[1280px]:gap-x-5 min-[820px]:max-[1280px]:py-8",
        // 1024–1279: 48 / 52
        "min-[1024px]:max-[1280px]:grid-cols-[minmax(0,0.48fr)_minmax(0,0.52fr)] min-[1024px]:max-[1280px]:gap-x-6 min-[1024px]:max-[1280px]:py-9",
        // --- Desktop frozen ≥1280 ---
        "min-[1280px]:mx-auto min-[1280px]:grid min-[1280px]:max-w-[1200px] min-[1280px]:grid-cols-[minmax(0,0.52fr)_minmax(0,0.48fr)] min-[1280px]:items-center min-[1280px]:gap-x-8 min-[1280px]:gap-y-0 min-[1280px]:px-10 min-[1280px]:py-12",
        "min-[1366px]:max-w-[1280px] min-[1366px]:grid-cols-[minmax(0,0.52fr)_minmax(0,0.48fr)] min-[1366px]:gap-x-10 min-[1366px]:px-12",
        "min-[1536px]:max-w-[1400px] min-[1536px]:gap-x-12 min-[1536px]:px-14",
        "min-[1920px]:max-w-[1440px] min-[1920px]:px-16",
      ].join(" ")}
    >
      {/* Identity: stack first; tablet 2-col / Desktop → content column top */}
      <div
        className={[
          "px-4 pt-7 pb-4 text-center",
          // Stack gutters 690–767 only
          "min-[690px]:max-[768px]:px-[var(--platform-shell-gutter,1rem)]",
          // Tablet 2-column content column
          "min-[768px]:max-[1280px]:col-start-2 min-[768px]:max-[1280px]:row-start-1 min-[768px]:max-[1280px]:px-0 min-[768px]:max-[1280px]:pt-0 min-[768px]:max-[1280px]:pb-0 min-[768px]:max-[1280px]:text-left",
          // Desktop frozen
          "min-[1280px]:col-start-2 min-[1280px]:row-start-1 min-[1280px]:px-0 min-[1280px]:pt-0 min-[1280px]:pb-0 min-[1280px]:text-left",
        ].join(" ")}
      >
        <SectionBadge label={content.sectionLabel} />
        <p
          className={[
            "mt-[10px] text-[18px] font-semibold leading-[1.3] text-white",
            "min-[768px]:max-[1280px]:mt-2.5 min-[768px]:max-[1280px]:text-[19px] min-[768px]:max-[1280px]:leading-[1.35]",
            "min-[1280px]:mt-3 min-[1280px]:text-[19px] min-[1280px]:leading-[1.4]",
          ].join(" ")}
        >
          {content.superline}
        </p>
        <div className="mt-1 min-[768px]:max-[1280px]:mt-1 min-[1280px]:mt-1.5">
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
        <p
          className={[
            "mt-1.5 text-[14px] leading-[1.5] text-white/80",
            "min-[768px]:max-[1280px]:mt-2 min-[768px]:max-[1280px]:max-w-none min-[768px]:max-[1280px]:text-[15px] min-[768px]:max-[1280px]:leading-[1.55]",
            "min-[1280px]:mt-3.5 min-[1280px]:max-w-[420px] min-[1280px]:text-[16px] min-[1280px]:leading-[1.65] min-[1280px]:text-white/78",
          ].join(" ")}
        >
          {content.productTagline}
        </p>
      </div>

      {/* Product stage: stack full-bleed; tablet/desktop left column */}
      <Link
        href={`/products/${featuredProduct.slug}`}
        aria-label={`View details for ${content.productName}`}
        className={[
          "min-[768px]:max-[1280px]:col-start-1 min-[768px]:max-[1280px]:row-start-1 min-[768px]:max-[1280px]:row-span-2",
          "min-[1280px]:col-start-1 min-[1280px]:row-start-1 min-[1280px]:row-span-2",
        ].join(" ")}
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
            // Stack-only 690–767
            "min-[690px]:max-[768px]:h-[360px]",
            // Tablet 2-column product stage (not landscape banner)
            "min-[768px]:max-[1280px]:h-auto min-[768px]:max-[1280px]:min-h-[340px] min-[768px]:max-[1280px]:max-h-[440px] min-[768px]:max-[1280px]:rounded-[18px]",
            "min-[820px]:max-[1280px]:min-h-[380px] min-[820px]:max-[1280px]:max-h-[480px]",
            "min-[1024px]:max-[1280px]:min-h-[400px] min-[1024px]:max-[1280px]:max-h-[500px] min-[1024px]:max-[1280px]:rounded-[20px]",
            // Desktop frozen stage
            "min-[1280px]:h-auto min-[1280px]:min-h-[420px] min-[1280px]:max-h-[500px] min-[1280px]:rounded-[22px]",
            "min-[1366px]:min-h-[440px] min-[1366px]:max-h-[520px]",
            "min-[1536px]:min-h-[460px] min-[1536px]:max-h-[540px]",
            "min-[1920px]:min-h-[460px] min-[1920px]:max-h-[540px]",
          ].join(" ")}
        >
          <div
            className={[
              "absolute inset-0",
              "min-[768px]:max-[1280px]:inset-2.5 min-[768px]:max-[1280px]:overflow-hidden min-[768px]:max-[1280px]:rounded-[14px]",
              "min-[1024px]:max-[1280px]:inset-3 min-[1024px]:max-[1280px]:rounded-[16px]",
              "min-[1280px]:inset-3 min-[1280px]:overflow-hidden min-[1280px]:rounded-[18px] min-[1536px]:inset-4",
            ].join(" ")}
          >
            <Image
              src={content.artwork.src}
              alt={content.artwork.alt}
              fill
              sizes="(max-width: 689px) 100vw, (max-width: 767px) 100vw, (max-width: 1279px) 48vw, (max-width: 1535px) 52vw, 640px"
              className={[
                "object-cover object-[center_42%]",
                // Stack crop only
                "min-[690px]:max-[768px]:object-[center_40%]",
                // Tablet 2-col product-first
                "min-[768px]:max-[1280px]:object-[center_42%]",
                // Desktop frozen
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

      {/* Benefits + purchase + trust */}
      <div
        className={[
          "min-[768px]:max-[1280px]:col-start-2 min-[768px]:max-[1280px]:row-start-2 min-[768px]:max-[1280px]:flex min-[768px]:max-[1280px]:flex-col min-[768px]:max-[1280px]:gap-4",
          "min-[820px]:max-[1280px]:gap-5",
          "min-[1280px]:col-start-2 min-[1280px]:row-start-2 min-[1280px]:flex min-[1280px]:flex-col min-[1280px]:gap-6",
        ].join(" ")}
      >
        <ul
          className={[
            "grid grid-cols-3 gap-x-2 px-4 py-5",
            // Stack 690–767
            "min-[690px]:max-[768px]:gap-x-4 min-[690px]:max-[768px]:px-[var(--platform-shell-gutter,1rem)] min-[690px]:max-[768px]:py-6",
            // Tablet 2-col content
            "min-[768px]:max-[1280px]:gap-x-3 min-[768px]:max-[1280px]:px-0 min-[768px]:max-[1280px]:py-0",
            "min-[820px]:max-[1280px]:gap-x-4",
            "min-[1024px]:max-[1280px]:gap-x-5",
            // Desktop frozen
            "min-[1280px]:grid-cols-3 min-[1280px]:gap-6 min-[1280px]:px-0 min-[1280px]:py-0",
          ].join(" ")}
        >
          {content.benefits.map((item) => (
            <BenefitGridItem key={item.title} item={item} />
          ))}
        </ul>

        {/*
          Purchase Action Row
          Mobile: display:contents → stacked Price → CTA
          ≥690: Price | CTA cluster
        */}
        <div
          className={[
            "contents",
            "min-[690px]:grid min-[690px]:items-center",
            // Stack purchase 690–767
            "min-[690px]:max-[768px]:grid-cols-[minmax(0,1fr)_minmax(250px,280px)] min-[690px]:max-[768px]:gap-4 min-[690px]:max-[768px]:px-[var(--platform-shell-gutter,1rem)]",
            // Tablet 2-col purchase module
            "min-[768px]:max-[1280px]:grid-cols-[minmax(150px,1fr)_minmax(170px,210px)] min-[768px]:max-[1280px]:gap-3 min-[768px]:max-[1280px]:px-0",
            "min-[820px]:max-[1280px]:grid-cols-[minmax(160px,1fr)_minmax(190px,230px)] min-[820px]:max-[1280px]:gap-3.5",
            "min-[1024px]:max-[1280px]:grid-cols-[minmax(170px,1fr)_minmax(210px,250px)] min-[1024px]:max-[1280px]:gap-4",
            // Desktop frozen
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
            "min-[690px]:max-[768px]:mx-[var(--platform-shell-gutter,1rem)] min-[690px]:max-[768px]:mb-5 min-[690px]:max-[768px]:px-4 min-[690px]:max-[768px]:py-5",
            "min-[768px]:max-[1280px]:mx-0 min-[768px]:max-[1280px]:mb-0 min-[768px]:max-[1280px]:rounded-[14px] min-[768px]:max-[1280px]:px-3 min-[768px]:max-[1280px]:py-3.5",
            "min-[1024px]:max-[1280px]:rounded-[16px] min-[1024px]:max-[1280px]:px-4 min-[1024px]:max-[1280px]:py-4",
            // Desktop frozen
            "min-[1280px]:mx-0 min-[1280px]:mb-0 min-[1280px]:rounded-[18px] min-[1280px]:px-5 min-[1280px]:py-4.5",
          ].join(" ")}
        >
          <ul
            className={[
              "grid grid-cols-4 gap-1",
              "min-[690px]:max-[768px]:gap-2",
              "min-[768px]:max-[1280px]:gap-2",
              "min-[1280px]:gap-3.5",
            ].join(" ")}
          >
            {content.miniTrust.map((item) => (
              <MiniTrustCardItem key={item.title.join("-")} item={item} />
            ))}
          </ul>
        </div>
      </div>

      {/* Scroll: stack mobile/transitional only — hide on tablet 2-col + Desktop */}
      <div className="min-[768px]:hidden">
        <ScrollIndicator />
      </div>
    </section>
  );
}
