"use client";

import Image from "next/image";
import type { ComponentType } from "react";
import {
  ChevronRight,
  LockKeyhole,
  MessageCircleMore,
  ShieldCheck,
  Star,
  Truck,
} from "lucide-react";

import type {
  Section8DistributionItem,
  Section8ReviewCard,
  Section8ReviewsContent,
  Section8TrustItem,
} from "@/content/section-8-reviews";
import { LineIcon } from "@/components/ui/line-icon";
import { SectionHeader } from "@/components/ui/section-header";
import { IconWrapper } from "@/components/ui/icon-wrapper";
import { activateLineCta } from "@/lib/commerce/cta-activation";
import { LINE_OA_URL } from "@/lib/commerce/cta-contract";

type LucideLikeIcon = ComponentType<{
  className?: string;
  strokeWidth?: number;
}>;

const trustIconByName: Record<Section8TrustItem["iconName"], LucideLikeIcon> = {
  "shield-check": ShieldCheck,
  "lock-keyhole": LockKeyhole,
  truck: Truck,
};

function ReviewDistributionBar({
  item,
}: {
  item: Section8DistributionItem;
}) {
  return (
    <div className="grid grid-cols-[28px_minmax(0,1fr)_36px] items-center gap-2">
      <span className="text-[13px] font-medium leading-none text-white/90">
        {item.label}
      </span>
      <div className="h-2 rounded-full bg-[#22131A]">
        <div
          className="h-full rounded-full bg-[#E91E8C]"
          style={{ width: `${item.percentage}%` }}
        />
      </div>
      <span className="text-right text-[13px] leading-none text-white/72">
        {item.percentageLabel}
      </span>
    </div>
  );
}

function ReviewSummaryCard({
  summary,
}: {
  summary: Section8ReviewsContent["summary"];
}) {
  return (
    <div className="mx-4 rounded-[18px] border border-[rgba(233,30,140,0.18)] bg-[#130D11] p-4 min-[1280px]:mx-0 min-[1280px]:rounded-[22px] min-[1280px]:p-5">
      <div className="grid grid-cols-[40%_60%] gap-3 min-[375px]:grid-cols-[44%_56%] min-[375px]:gap-4">
        <div className="border-r border-[rgba(233,30,140,0.16)] pr-4 text-center">
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/45">
            Reviews
          </p>
          <p className="mt-1 text-[13px] leading-[1.35] text-white/68">
            {summary.title}
          </p>
          <p
            className="mt-2 text-[48px] font-extrabold leading-none tracking-[-0.03em] text-[#FF4DA6] min-[375px]:text-[54px] min-[390px]:text-[56px]"
            aria-label={`คะแนนเฉลี่ย ${summary.score} จาก 5 ดาว ${summary.reviewCountLabel}`}
          >
            {summary.score}
          </p>
          <div className="mt-2 flex justify-center gap-1" aria-hidden="true">
            {Array.from({ length: 5 }, (_, index) => (
              <Star
                key={index}
                className="size-4 fill-yellow-400 text-yellow-400"
                strokeWidth={1.6}
              />
            ))}
          </div>
          <p className="mt-2 text-[13px] leading-none text-white/62">
            {summary.reviewCountLabel}
          </p>
        </div>

        <div className="space-y-2">
          {summary.distribution.map((item) => (
            <ReviewDistributionBar key={item.label} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ReviewAvatar({ initial }: { initial: string }) {
  return (
    <div className="flex size-[48px] shrink-0 items-center justify-center rounded-full border border-[rgba(233,30,140,0.3)] bg-[radial-gradient(circle_at_center,rgba(233,30,140,0.18),rgba(10,10,10,0.98)_72%)] text-[24px] font-bold leading-none text-[#FF6BB7] shadow-[0_0_18px_rgba(233,30,140,0.16)]">
      {initial}
    </div>
  );
}

function ReviewPurchaseBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex rounded-full bg-[rgba(233,30,140,0.12)] px-2.5 py-1 text-[11px] font-semibold leading-none text-[#E91E8C]/90">
      {label}
    </span>
  );
}

function ReviewProductChip({ product }: { product: Section8ReviewCard["product"] }) {
  return (
    <div className="mt-2.5 inline-flex items-center gap-2 rounded-[10px] border border-white/10 bg-white/[0.04] px-2.5 py-1.5">
      <div className="relative size-7 shrink-0 overflow-hidden rounded-[6px]">
        <Image
          src={product.imageSrc}
          alt={product.imageAlt}
          fill
          sizes="28px"
          className="object-contain object-center"
        />
      </div>
      <span className="text-[12px] font-medium leading-none tracking-tight text-white/88">
        {product.label}
      </span>
    </div>
  );
}

function ReviewCard({ review }: { review: Section8ReviewCard }) {
  const ratingLabel = `${review.stars} จาก 5 ดาว`;

  return (
    <li className="flex flex-col rounded-[18px] border border-[rgba(233,30,140,0.16)] bg-[#130D11] p-3.5 min-h-[200px] min-[1280px]:min-h-[248px] min-[1280px]:rounded-[20px] min-[1280px]:p-5">
      <div className="flex gap-3">
        <ReviewAvatar initial={review.initial} />

        <div className="min-w-0 flex-1">
          {/* Authority-aligned metadata: author → meta → rating block */}
          <div className="flex min-h-[40px] items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="text-[15px] font-semibold tracking-tight text-white min-[390px]:text-[16px]">
                {review.name}
              </h3>
              <p className="mt-1 text-[11px] leading-none text-white/55">
                {review.meta}
              </p>
            </div>

            <div className="shrink-0 text-right" aria-label={ratingLabel}>
              <div className="flex justify-end gap-0.5" aria-hidden="true">
                {Array.from({ length: 5 }, (_, index) => (
                  <Star
                    key={index}
                    className={
                      index < review.stars
                        ? "size-3.5 fill-yellow-400 text-yellow-400"
                        : "size-3.5 text-white/18"
                    }
                    strokeWidth={1.6}
                  />
                ))}
              </div>
              <p className="mt-1 text-[11px] leading-none text-white/55">
                {ratingLabel}
              </p>
              <p className="mt-1 text-[11px] leading-none text-white/45">
                {review.dateLabel}
              </p>
            </div>
          </div>

          <div className="mt-2">
            <ReviewPurchaseBadge label={review.purchaseBadge} />
          </div>

          <div className="mt-2.5 min-h-[52px] space-y-1 text-[13px] leading-5 text-white/84 min-[1280px]:mt-3 min-[1280px]:min-h-0 min-[1280px]:space-y-1.5 min-[1280px]:leading-[1.65] min-[1280px]:text-white/80">
            {review.reviewLines.map((line) => (
              <p key={line} className="line-clamp-2 min-[1280px]:line-clamp-none">
                {line}
              </p>
            ))}
          </div>

          <ReviewProductChip product={review.product} />
        </div>
      </div>
    </li>
  );
}

function MoreReviewsRow({
  moreReviewsRow,
}: {
  moreReviewsRow: Section8ReviewsContent["moreReviewsRow"];
}) {
  return (
    <a
      aria-label={moreReviewsRow.ariaLabel}
      href={LINE_OA_URL}
      className="mx-4 mt-3 flex min-h-11 items-center gap-2.5 rounded-[14px] border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-left transition-[transform,background-color,border-color] duration-150 ease-out hover:border-white/16 hover:bg-white/[0.05] active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#E91E8C] min-[1280px]:mx-0 min-[1280px]:mt-5 min-[1280px]:rounded-[16px] min-[1280px]:px-4 min-[1280px]:py-3"
      onClick={(e) => {
        activateLineCta({
          title: moreReviewsRow.ctaLabel,
          surface: "reviews-more-line",
          landingPage: "/",
          intent: "inquiry",
          source: "reviews",
        });
        e.preventDefault();
      }}
    >
      <div className="flex size-9 shrink-0 items-center justify-center rounded-[10px] border border-white/10 bg-white/[0.04]">
        <MessageCircleMore
          aria-hidden="true"
          className="size-[18px] text-white/70"
          strokeWidth={1.8}
        />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[14px] font-semibold leading-[1.2] text-white/90">
          {moreReviewsRow.title}
        </p>
        <p className="mt-0.5 text-[11px] leading-[1.35] text-white/52">
          {moreReviewsRow.description}
        </p>
      </div>

      <ChevronRight
        aria-hidden="true"
        className="size-4 shrink-0 text-white/45"
        strokeWidth={2}
      />
    </a>
  );
}

function FinalLineCTA({
  label,
  ariaLabel,
}: Section8ReviewsContent["finalCta"]) {
  return (
    <a
      aria-label={ariaLabel}
      href={LINE_OA_URL}
      className="flex h-14 w-full items-center gap-3 rounded-full bg-[#E91E8C] px-5 text-left text-white shadow-[0_0_20px_rgba(233,30,140,0.4)] transition-[transform,box-shadow,filter] duration-150 ease-out hover:brightness-[1.08] hover:shadow-[0_0_28px_rgba(233,30,140,0.6)] active:scale-[0.98] active:bg-[#C2185B] active:shadow-[0_0_14px_rgba(233,30,140,0.3)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#E91E8C]"
      onClick={(e) => {
        activateLineCta({
          title: label,
          surface: "reviews-final-line",
          landingPage: "/",
          intent: "high_intent",
          source: "reviews",
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

function ReviewsCompactTrustItem({ item }: { item: Section8TrustItem }) {
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

type Section8ReviewsProps = {
  content: Section8ReviewsContent;
};

export function Section8Reviews({ content }: Section8ReviewsProps) {
  return (
    <section
      id="section-8-reviews"
      aria-label={content.ariaLabel}
      className="bg-[#0A0A0A] pb-6"
    >
      <SectionHeader
        label={content.sectionLabel}
        heading={content.heading}
        description={content.subtitle}
      />

      <ReviewSummaryCard summary={content.summary} />

      <ul className="space-y-2.5 px-4 pt-3 min-[1280px]:grid min-[1280px]:grid-cols-3 min-[1280px]:gap-6 min-[1280px]:space-y-0 min-[1280px]:px-0">
        {content.reviews.map((review) => (
          <ReviewCard key={`${review.initial}-${review.name}`} review={review} />
        ))}
      </ul>

      <p className="mx-4 mt-2.5 text-[11px] leading-4 text-white/42 min-[1280px]:mx-auto min-[1280px]:mt-3.5 min-[1280px]:max-w-[640px] min-[1280px]:px-0 min-[1280px]:leading-[1.55] min-[1280px]:text-white/48">
        ตัวอย่างรีวิวและคะแนนที่แสดงในส่วนนี้ใช้เพื่อช่วยตัดสินใจ
        ผลลัพธ์อาจแตกต่างกันตามบุคคล
      </p>

      <MoreReviewsRow moreReviewsRow={content.moreReviewsRow} />

      <div className="px-4 pt-4 min-[1280px]:px-0 min-[1280px]:pt-6">
        <FinalLineCTA {...content.finalCta} />
      </div>

      <ul className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 px-4 pt-4 text-center">
        {content.trustRow.map((item, index) => (
          <li key={item.label} className="flex items-center gap-2">
            {index > 0 ? (
              <span aria-hidden="true" className="text-white/28">
                •
              </span>
            ) : null}
            <ReviewsCompactTrustItem item={item} />
          </li>
        ))}
      </ul>
    </section>
  );
}
