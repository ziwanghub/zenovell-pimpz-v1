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
      <span className="text-[14px] font-medium leading-none text-white">
        {item.label}
      </span>
      <div className="h-2 rounded-full bg-[#22131A]">
        <div
          className="h-full rounded-full bg-[#E91E8C]"
          style={{ width: `${item.percentage}%` }}
        />
      </div>
      <span className="text-right text-[14px] leading-none text-white/78">
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
    <div className="mx-4 rounded-[18px] border border-[rgba(233,30,140,0.18)] bg-[#130D11] p-4">
      <div className="grid grid-cols-[44%_56%] gap-4">
        <div className="border-r border-[rgba(233,30,140,0.16)] pr-4 text-center">
          <p className="text-[14px] leading-[1.35] text-white/72">
            {summary.title}
          </p>
          <p className="mt-2 text-[60px] font-extrabold leading-none text-[#FF4DA6]">
            {summary.score}
          </p>
          <div className="mt-2 flex justify-center gap-1">
            {Array.from({ length: 5 }, (_, index) => (
              <Star
                key={index}
                aria-hidden="true"
                className="size-4 fill-[#E91E8C] text-[#E91E8C]"
                strokeWidth={1.8}
              />
            ))}
          </div>
          <p className="mt-2 text-[14px] leading-none text-white/72">
            {summary.reviewCountLabel}
          </p>
        </div>

        <div className="space-y-2.5">
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
    <div className="flex size-[54px] shrink-0 items-center justify-center rounded-full border border-[rgba(233,30,140,0.3)] bg-[radial-gradient(circle_at_center,rgba(233,30,140,0.18),rgba(10,10,10,0.98)_72%)] text-[28px] font-bold leading-none text-[#FF6BB7] shadow-[0_0_18px_rgba(233,30,140,0.16)]">
      {initial}
    </div>
  );
}

function ReviewPurchaseBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex rounded-full bg-[rgba(233,30,140,0.14)] px-2.5 py-1 text-[11px] font-bold leading-none text-[#E91E8C]">
      {label}
    </span>
  );
}

function ReviewProductChip({ product }: { product: Section8ReviewCard["product"] }) {
  return (
    <div className="mt-3 inline-flex items-center gap-2 rounded-[10px] border border-[rgba(233,30,140,0.14)] bg-[#181116] px-2.5 py-2">
      <div className="relative size-7 shrink-0 overflow-hidden rounded-[6px]">
        <Image
          src={product.imageSrc}
          alt={product.imageAlt}
          fill
          sizes="28px"
          className="object-contain object-center"
        />
      </div>
      <span className="text-[12px] font-medium leading-none text-[#E91E8C]">
        {product.label}
      </span>
    </div>
  );
}

function ReviewCard({ review }: { review: Section8ReviewCard }) {
  return (
    <li className="rounded-[16px] border border-[rgba(233,30,140,0.18)] bg-[#130D11] p-4">
      <div className="flex gap-3">
        <ReviewAvatar initial={review.initial} />

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="text-[16px] font-extrabold leading-[1.2] text-white">
                {review.name}
              </h3>
              <p className="mt-1 text-[12px] leading-none text-white/62">
                {review.meta}
              </p>
            </div>

            <div className="shrink-0 text-right">
              <div className="flex justify-end gap-0.5">
                {Array.from({ length: review.stars }, (_, index) => (
                  <Star
                    key={index}
                    aria-hidden="true"
                    className="size-4 fill-[#E91E8C] text-[#E91E8C]"
                    strokeWidth={1.8}
                  />
                ))}
              </div>
              <p className="mt-1 text-[12px] leading-none text-white/62">
                {review.dateLabel}
              </p>
            </div>
          </div>

          <div className="mt-2">
            <ReviewPurchaseBadge label={review.purchaseBadge} />
          </div>

          <div className="mt-3 space-y-1.5 text-[14px] leading-[1.5] text-white/86">
            {review.reviewLines.map((line) => (
              <p key={line}>{line}</p>
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
      href={moreReviewsRow.href}
      className="mx-4 mt-3 flex items-center gap-3 rounded-[16px] border border-[rgba(233,30,140,0.16)] bg-[#130D11] px-4 py-3 text-left transition-[transform,box-shadow,filter] duration-150 ease-out hover:brightness-[1.06] hover:shadow-[0_0_20px_rgba(233,30,140,0.18)] active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#E91E8C]"
    >
      <div className="flex size-10 shrink-0 items-center justify-center rounded-[12px] border border-[rgba(233,30,140,0.24)] bg-[rgba(233,30,140,0.06)]">
        <MessageCircleMore
          aria-hidden="true"
          className="size-5 text-[#FF4DA6]"
          strokeWidth={1.9}
        />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[15px] font-bold leading-[1.2] text-white">
          {moreReviewsRow.title}
        </p>
        <p className="mt-1 text-[12px] leading-[1.35] text-white/62">
          {moreReviewsRow.description}
        </p>
      </div>

      <ChevronRight
        aria-hidden="true"
        className="size-5 shrink-0 text-[#E91E8C]"
        strokeWidth={2.1}
      />
    </a>
  );
}

function FinalLineCTA({
  label,
  ariaLabel,
  href,
}: Section8ReviewsContent["finalCta"]) {
  return (
    <a
      aria-label={ariaLabel}
      href={href}
      className="flex h-14 w-full items-center gap-3 rounded-full bg-[#E91E8C] px-5 text-left text-white shadow-[0_0_20px_rgba(233,30,140,0.4)] transition-[transform,box-shadow,filter] duration-150 ease-out hover:brightness-[1.08] hover:shadow-[0_0_28px_rgba(233,30,140,0.6)] active:scale-[0.98] active:bg-[#C2185B] active:shadow-[0_0_14px_rgba(233,30,140,0.3)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#E91E8C]"
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

      <ul className="space-y-3 px-4 pt-3">
        {content.reviews.map((review) => (
          <ReviewCard key={`${review.initial}-${review.name}`} review={review} />
        ))}
      </ul>

      <MoreReviewsRow moreReviewsRow={content.moreReviewsRow} />

      <div className="px-4 pt-[14px]">
        <FinalLineCTA {...content.finalCta} />
      </div>

      <ul className="flex items-center justify-center gap-2 px-4 pt-4 text-center">
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
