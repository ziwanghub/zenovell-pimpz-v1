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
        className="size-[16px] text-[#E91E8C]"
        strokeWidth={1.5}
      />
      <span className="mt-1 block text-[10px] font-semibold leading-[1.2] text-white">
        {feature.title}
      </span>
      {feature.sub ? (
        <span className="mt-0.5 block text-[10px] leading-[1.2] text-white/60">
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
      className="mt-3 flex items-end justify-between gap-2"
    >
      <span className="text-[20px] font-extrabold leading-none text-[#E91E8C]">
        {pricing.salePrice}
      </span>
      <del className="text-[12px] leading-none text-white/[0.45]">
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
      className="mt-[10px] flex h-10 w-full items-center justify-center gap-2 rounded-full border border-[rgba(233,30,140,0.45)] bg-[#171717] px-3 text-[13px] font-bold leading-none text-[#E91E8C] transition-[transform,box-shadow,filter] duration-150 ease-out hover:brightness-[1.06] hover:shadow-[0_0_18px_rgba(233,30,140,0.22)] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#E91E8C]"
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
    <li className="overflow-hidden rounded-[16px] border border-[rgba(233,30,140,0.18)] bg-[#131313]">
      <div className="relative h-[176px] overflow-hidden bg-[#101010]">
        <Image
          src={product.imageSrc}
          alt={product.imageAlt}
          fill
          sizes="(max-width: 430px) 50vw, 215px"
          className="object-cover"
          style={{ objectPosition: "center center" }}
        />
        {product.badge ? <ProductCatalogBadge label={product.badge.label} /> : null}
      </div>

      <div className="p-3">
        <h3 className="text-center text-[16px] font-extrabold leading-[1.2] text-[#E91E8C]">
          {product.title}
        </h3>
        <p className="mt-1 min-h-[31px] text-center text-[11px] leading-[1.35] text-white/80">
          {product.subtitle}
        </p>

        <ul className="mt-3 grid grid-cols-3">
          {product.features.map((feature, index) => (
            <ProductCardFeatureItem
              key={`${product.slug}-${feature.title}`}
              feature={feature}
              withDivider={index !== 0}
            />
          ))}
        </ul>

        <ProductCardPriceBlock pricing={product.pricing} />
        <ProductCardCTA cta={product.cta} product={product} />
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
      <span className="mt-2 block text-[11px] font-semibold leading-[1.3] text-white">
        {item.title}
      </span>
      <span className="mt-0.5 block text-[10px] leading-[1.3] text-white/60">
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

      <ul className="grid grid-cols-2 gap-[10px] px-4">
        {content.products.map((product) => (
          <ProductCatalogCard key={product.slug} product={product} />
        ))}
      </ul>

      <div className="mx-4 mt-4 rounded-[12px] border border-white/8 bg-[#1A1A1A] px-3 py-4">
        <ul className="grid grid-cols-4 gap-1">
          {content.trustItems.map((item) => (
            <CatalogTrustItem key={item.title} item={item} />
          ))}
        </ul>
      </div>

      <div className="px-4 pt-4">
        <FinalLineCTA {...content.finalCta} />
      </div>

      <p className="px-4 pt-4 text-center text-[11px] leading-[1.4] tracking-[0.04em] text-white/45">
        {content.footerNote}
      </p>
    </section>
  );
}
