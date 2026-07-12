"use client";

import Image from "next/image";
import type { ComponentType } from "react";
import {
  ChevronRight,
  Crown,
  Droplet,
  FlaskConical,
  Headphones,
  Heart,
  LockKeyhole,
  Package,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";

import type {
  Section4ProductCard,
  Section4ProductCatalogContent,
  Section4ProductFeature,
  Section4ProductFeatureIcon,
  Section4TrustIcon,
  Section4TrustItem,
} from "@/content/section-4-product-catalog";
import { analytics, AnalyticsEvents } from "@/lib/analytics";
import { activateLineCta } from "@/lib/commerce/cta-activation";
import { LineIcon } from "@/components/ui/line-icon";
import { SectionHeader } from "@/components/ui/section-header";
import { IconWrapper } from "@/components/ui/icon-wrapper";
import { products as commerceProducts } from "@/content/products";
import Link from 'next/link';

type LucideLikeIcon = ComponentType<{
  className?: string;
  strokeWidth?: number;
}>;

const featureIconByName: Record<Section4ProductFeatureIcon, LucideLikeIcon> = {
  droplet: Droplet,
  heart: Heart,
  "flask-conical": FlaskConical,
  sparkles: Sparkles,
  "shield-check": ShieldCheck,
};

const trustIconByName: Record<Section4TrustIcon, LucideLikeIcon> = {
  truck: Truck,
  package: Package,
  "lock-keyhole": LockKeyhole,
  headphones: Headphones,
};

function ProductCatalogBadge({ label }: { label: string }) {
  return (
    <div className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full border border-[rgba(233,30,140,0.5)] bg-[rgba(10,10,10,0.9)] px-2.5 py-1 text-[10px] font-bold leading-none tracking-[0.08em] text-white shadow-[0_0_14px_rgba(233,30,140,0.25)] backdrop-blur-sm">
      <Crown aria-hidden="true" className="size-3.5 text-[#E91E8C]" strokeWidth={1.6} />
      <span>{label}</span>
    </div>
  );
}

function ProductCardFeatureItem({
  feature,
  withDivider,
}: {
  feature: Section4ProductFeature;
  withDivider: boolean;
}) {
  const Icon = featureIconByName[feature.iconName];

  return (
    <li
      className={[
        "flex min-w-0 flex-col items-center px-1 text-center",
        withDivider ? "border-l border-white/8" : "",
      ].join(" ")}
    >
      <Icon
        aria-hidden="true"
        className="size-[14px] text-[#E91E8C]"
        strokeWidth={1.5}
      />
      <span className="mt-0.5 block h-[11px] text-[9px] font-semibold leading-[1.15] text-white/90">
        {feature.title}
      </span>
      {feature.sub ? (
        <span className="mt-0.5 block h-[10px] text-[8px] leading-[1.15] text-white/70">
          {feature.sub}
        </span>
      ) : null}
    </li>
  );
}

function ProductCardPriceBlock({
  pricing,
}: {
  pricing: Section4ProductCard["pricing"];
}) {
  return (
    <div
      aria-label={pricing.ariaLabel}
      className="flex h-[26px] items-end justify-between gap-2"
    >
      <span className="text-[20px] font-extrabold leading-none text-[#E91E8C] md:text-[22px]">
        {pricing.salePrice}
      </span>
      <del className="text-[11px] leading-none text-white/[0.45] md:text-[12px]">
        {pricing.originalPrice}
      </del>
    </div>
  );
}

function ProductCardCTA({
  cta,
  product,
}: {
  cta: Section4ProductCard["cta"];
  product: Section4ProductCard;
}) {
  return (
    <a
      aria-label={cta.ariaLabel}
      href={cta.href}
      className="flex h-10 w-full items-center justify-center gap-2 rounded-full border border-[rgba(233,30,140,0.45)] bg-[#171717] px-3 text-[12px] font-bold leading-none text-[#E91E8C] md:text-[13px] transition-[transform,box-shadow,filter] duration-150 ease-out hover:brightness-[1.06] hover:shadow-[0_0_18px_rgba(233,30,140,0.22)] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#E91E8C] min-[1280px]:h-auto min-[1280px]:min-h-[44px] min-[1280px]:text-[14px]"
      onClick={(e) => {
        analytics.track(AnalyticsEvents.PRODUCT_CLICK, {
          surface: "section",
          label: cta.label,
          destination: cta.href,
        });

        const fullProduct = commerceProducts.find((p) => p.slug === product.slug);
        if (fullProduct) {
          activateLineCta({
            product: {
              slug: fullProduct.slug,
              sku: fullProduct.sku,
              title: fullProduct.title,
              cta: fullProduct.cta,
            },
            surface: "product-grid-card",
            landingPage: "/",
            intent: "high_intent",
            source: "product-grid",
          });
        } else {
          // fallback non-product if data not found
          activateLineCta({
            title: cta.label,
            surface: "product-grid-card",
            landingPage: "/",
            intent: "high_intent",
            source: "product-grid",
          });
        }

        // Ensure LINE handoff; prevent any navigation (href is placeholder)
        e.preventDefault();
      }}
    >
      <span>{cta.label}</span>
      <ChevronRight
        aria-hidden="true"
        className="size-4 shrink-0 text-[#E91E8C]"
        strokeWidth={2}
      />
    </a>
  );
}

function ProductCatalogCard({ product }: { product: Section4ProductCard }) {
  return (
    <li className="group flex flex-col overflow-hidden rounded-[20px] border border-white/10 bg-[#121212] min-[1280px]:min-h-[208px] min-[1280px]:flex-row min-[1280px]:gap-4">
      <Link
        href={`/products/${product.slug}`}
        aria-label={`View details for ${product.title}`}
        className="min-[1280px]:w-[46%] min-[1280px]:shrink-0"
        onClick={() =>
          analytics.track(AnalyticsEvents.PRODUCT_CLICK, {
            surface: "section",
            label: product.title,
            destination: `/products/${product.slug}`,
          })
        }
      >
        <div className="relative h-[176px] overflow-hidden bg-[#101010] transition-transform duration-200 group-hover:scale-[1.02] min-[1280px]:h-auto min-[1280px]:min-h-[208px]">
          <Image
            src={product.imageSrc}
            alt={product.imageAlt}
            fill
            sizes="(max-width: 430px) 50vw, (max-width: 768px) 30vw, 200px"
            className="object-cover"
            style={{ objectPosition: "center center" }}
          />
          {product.badge ? <ProductCatalogBadge label={product.badge.label} /> : null}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-3.5 md:p-4 min-[1280px]:w-[54%] min-[1280px]:min-w-0 min-[1280px]:py-4 min-[1280px]:pr-4">
        {/* Region 2: Title + Fit - fixed min-height for identical baseline start of benefits */}
        <div className="min-h-[62px]">
          <h3 className="line-clamp-2 text-center text-[14px] font-extrabold leading-[1.2] text-[#E91E8C] md:text-[15px] min-[1280px]:text-left min-[1280px]:text-[18px]">
            <Link
              href={`/products/${product.slug}`}
              onClick={() =>
                analytics.track(AnalyticsEvents.PRODUCT_CLICK, {
                  surface: "section",
                  label: product.title,
                  destination: `/products/${product.slug}`,
                })
              }
            >
              {product.title}
            </Link>
          </h3>
          <p className="line-clamp-2 mt-1 min-h-[30px] text-center text-[11px] leading-[1.3] text-white/80 md:text-[12px] md:leading-[1.3] min-[1280px]:text-left min-[1280px]:text-[13px]">
            {product.subtitle}
          </p>
        </div>

        {/* Region 3: Benefits - fixed min-height for identical height */}
        <ul className="mt-1.5 grid min-h-[40px] grid-cols-3 gap-1">
          {product.features.map((feature, index) => (
            <ProductCardFeatureItem
              key={`${product.slug}-${feature.title}`}
              feature={feature}
              withDivider={index !== 0}
            />
          ))}
        </ul>

        {/* Region 4: Price + CTA - anchored with fixed price region height for baseline */}
        <div className="mt-auto flex flex-col gap-1.5">
          <ProductCardPriceBlock pricing={product.pricing} />
          <ProductCardCTA cta={product.cta} product={product} />
        </div>
      </div>
    </li>
  );
}

function CatalogTrustItem({ item }: { item: Section4TrustItem }) {
  const Icon = trustIconByName[item.iconName];

  return (
    <li className="flex flex-col items-center px-1 text-center">
      <Icon
        aria-hidden="true"
        className="size-[20px] text-[#E91E8C]"
        strokeWidth={1.6}
      />
      <span className="mt-1.5 block text-[9px] font-semibold leading-[1.2] text-white md:text-[10px] md:leading-[1.2]">
        {item.title}
      </span>
      <span className="mt-0.5 block text-[8px] leading-[1.15] text-white/65">
        {item.sub}
      </span>
    </li>
  );
}

function FinalLineCTA({
  label,
  ariaLabel,
  href,
}: Section4ProductCatalogContent["finalCta"]) {
  return (
    <a
      aria-label={ariaLabel}
      href={href}
      className="flex h-14 w-full items-center gap-3 rounded-full bg-[#E91E8C] px-5 text-left text-white shadow-[0_0_20px_rgba(233,30,140,0.4)] transition-[transform,box-shadow,filter] duration-150 ease-out hover:brightness-[1.08] hover:shadow-[0_0_28px_rgba(233,30,140,0.6)] active:scale-[0.98] active:bg-[#C2185B] active:shadow-[0_0_14px_rgba(233,30,140,0.3)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#E91E8C]"
      onClick={(e) => {
        analytics.track(AnalyticsEvents.PRODUCT_CLICK, {
          surface: "section",
          label,
          destination: href,
        });

        activateLineCta({
          title: label,
          surface: "product-grid-final",
          landingPage: "/",
          intent: "high_intent",
          source: "product-grid",
        });

        // Ensure LINE handoff
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

type Section4ProductCatalogProps = {
  content: Section4ProductCatalogContent;
};

export function Section4ProductCatalog({
  content,
}: Section4ProductCatalogProps) {
  return (
    <section
      id="section-4-product-catalog"
      aria-label={content.ariaLabel}
      className="bg-[#0A0A0A] pb-6"
    >
      <SectionHeader
        label={content.sectionLabel}
        heading={content.heading}
        description={content.subtitle}
      />

      <ul className="grid grid-cols-2 items-stretch gap-3 px-3 md:gap-4 md:px-4 md:grid-cols-3 min-[1280px]:grid-cols-3 min-[1280px]:gap-5 min-[1280px]:px-0 min-[1280px]:[grid-auto-rows:1fr]">
        {content.products.map((product) => (
          <ProductCatalogCard key={product.slug} product={product} />
        ))}
      </ul>

      <div className="mx-4 mt-5 rounded-[14px] border border-white/10 bg-[#161616] px-3 py-3.5 min-[1280px]:mx-0 min-[1280px]:mt-6 min-[1280px]:min-h-[84px] min-[1280px]:px-4 min-[1280px]:py-4">
        <ul className="grid grid-cols-4 gap-1.5 min-[1280px]:gap-6">
          {content.trustItems.map((item) => (
            <CatalogTrustItem key={item.title} item={item} />
          ))}
        </ul>
      </div>

      <div className="px-4 pt-4 min-[1280px]:hidden">
        <FinalLineCTA {...content.finalCta} />
      </div>

      <p className="px-4 pt-4 text-center text-[10px] leading-[1.3] tracking-[0.04em] text-white/45 md:text-[11px] md:leading-[1.3]">
        {content.footerNote}
      </p>
    </section>
  );
}
