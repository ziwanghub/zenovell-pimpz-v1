import Image from "next/image";
import type { ComponentType } from "react";
import {
  ChevronRight,
  Flame,
  Headset,
  Heart,
  LockKeyhole,
  Package,
  ShieldCheck,
  Star,
  Truck,
  Users,
} from "lucide-react";

import type {
  Section10AvatarItem,
  Section10BenefitItem,
  Section10FinalCtaContent,
  Section10TrustItem,
} from "@/content/section-10-final-cta";
import { LineIcon } from "@/components/ui/line-icon";
import { SectionBadge } from "@/components/ui/section-badge";

type LucideLikeIcon = ComponentType<{
  className?: string;
  strokeWidth?: number;
}>;

const benefitIconByName: Record<
  Section10BenefitItem["iconName"],
  LucideLikeIcon
> = {
  heart: Heart,
  flame: Flame,
  users: Users,
  "shield-check": ShieldCheck,
};

const trustIconByName: Record<Section10TrustItem["iconName"], LucideLikeIcon> = {
  "shield-check": ShieldCheck,
  "lock-keyhole": LockKeyhole,
  truck: Truck,
  headset: Headset,
};

const avatarToneClassByName: Record<Section10AvatarItem["tone"], string> = {
  neutral:
    "bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.24),rgba(55,55,55,0.95)_74%)] text-white",
  gold:
    "bg-[radial-gradient(circle_at_30%_30%,rgba(255,228,170,0.35),rgba(120,75,18,0.96)_74%)] text-[#FFF4D6]",
  pink:
    "bg-[radial-gradient(circle_at_30%_30%,rgba(255,150,210,0.4),rgba(130,18,70,0.96)_74%)] text-white",
};

function HeadingLine({
  line,
  highlightedWord,
}: {
  line: string;
  highlightedWord?: string;
}) {
  if (!highlightedWord || !line.includes(highlightedWord)) {
    return <span>{line}</span>;
  }

  const [before, after] = line.split(highlightedWord);

  return (
    <span>
      {before}
      <span className="text-[#E91E8C]">{highlightedWord}</span>
      {after}
    </span>
  );
}

function FinalBenefitItem({ item }: { item: Section10BenefitItem }) {
  const Icon = benefitIconByName[item.iconName];

  return (
    <li className="flex items-center gap-3.5 border-b border-[rgba(233,30,140,0.14)] py-3.5 last:border-b-0 last:pb-0 first:pt-0">
      <div className="flex size-[46px] shrink-0 items-center justify-center rounded-full border border-[rgba(233,30,140,0.28)] bg-[radial-gradient(circle_at_center,rgba(233,30,140,0.1),rgba(233,30,140,0.03)_72%)] shadow-[0_0_14px_rgba(233,30,140,0.09)]">
        <Icon
          aria-hidden="true"
          className="size-[22px] text-[#FF4DA6]"
          strokeWidth={1.9}
        />
      </div>
      <div className="min-w-0">
        <p className="text-[15px] font-extrabold leading-[1.15] text-white">
          {item.title}
        </p>
        <p className="mt-1.5 text-[12px] leading-[1.4] text-white/70">
          {item.description}
        </p>
      </div>
    </li>
  );
}

function AvatarCluster({
  avatars,
  overflowLabel,
}: Section10FinalCtaContent["socialProof"]) {
  return (
    <div className="flex items-center">
      {avatars.map((avatar, index) => (
        <div
          key={avatar.id}
          aria-hidden="true"
          className={`relative flex size-[46px] items-center justify-center overflow-hidden rounded-full border-[2.5px] border-[#130D11] text-[15px] font-bold leading-none ring-1 ring-[rgba(255,255,255,0.08)] shadow-[0_0_14px_rgba(233,30,140,0.18)] ${avatarToneClassByName[avatar.tone]} ${
            index > 0 ? "-ml-2" : ""
          }`}
        >
          {avatar.initials}
        </div>
      ))}
      <div className="-ml-2 flex size-[46px] items-center justify-center rounded-full border-[2.5px] border-[#130D11] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),rgba(18,13,16,1)_72%)] text-[12px] font-bold leading-none text-white ring-1 ring-[rgba(255,255,255,0.08)] shadow-[0_0_14px_rgba(233,30,140,0.18)]">
        {overflowLabel}
      </div>
    </div>
  );
}

function SocialProofStrip({
  socialProof,
}: {
  socialProof: Section10FinalCtaContent["socialProof"];
}) {
  return (
    <div className="mx-4 mt-4 rounded-[18px] border border-[rgba(233,30,140,0.28)] bg-[linear-gradient(180deg,rgba(19,13,17,0.98),rgba(15,10,13,0.98))] px-4 py-[18px] shadow-[0_0_22px_rgba(233,30,140,0.1)]">
      <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3.5">
        <AvatarCluster
          avatars={socialProof.avatars}
          overflowLabel={socialProof.overflowLabel}
          trustCountLabel={socialProof.trustCountLabel}
          trustDescription={socialProof.trustDescription}
          starsLabel={socialProof.starsLabel}
        />

        <div className="min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-2.5">
            <div className="min-w-0">
              <p className="text-[16px] font-extrabold leading-[1.15] tracking-[-0.01em] text-[#FF4DA6]">
                {socialProof.trustCountLabel}
              </p>
              <p className="mt-1 text-[12px] leading-[1.35] text-white/80">
                {socialProof.trustDescription}
              </p>
            </div>

            <div
              aria-label={socialProof.starsLabel}
              className="flex shrink-0 gap-1.5 rounded-full border border-[rgba(233,30,140,0.18)] bg-[rgba(233,30,140,0.05)] px-2.5 py-1.5 shadow-[inset_0_0_10px_rgba(233,30,140,0.08)]"
            >
              {Array.from({ length: 5 }, (_, index) => (
                <Star
                  key={index}
                  aria-hidden="true"
                  className="size-[15px] fill-[#E91E8C] text-[#E91E8C] drop-shadow-[0_0_5px_rgba(233,30,140,0.35)]"
                  strokeWidth={1.8}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function GuaranteeShield() {
  return (
    <div
      aria-hidden="true"
      className="relative flex size-[96px] shrink-0 items-center justify-center rounded-[24px] border border-[rgba(233,30,140,0.24)] bg-[radial-gradient(circle_at_center,rgba(233,30,140,0.18),rgba(10,10,10,0.98)_72%)] shadow-[0_0_22px_rgba(233,30,140,0.16)]"
    >
      <div className="absolute inset-3 rounded-[20px] border border-[rgba(233,30,140,0.12)]" />
      <ShieldCheck
        className="size-12 text-[#FF4DA6] drop-shadow-[0_0_10px_rgba(233,30,140,0.45)]"
        strokeWidth={2.1}
      />
    </div>
  );
}

function GuaranteeCard({
  guaranteeCard,
}: {
  guaranteeCard: Section10FinalCtaContent["guaranteeCard"];
}) {
  return (
    <div className="mx-4 mt-4 rounded-[18px] border border-[rgba(233,30,140,0.24)] bg-[#130D11] px-[18px] py-[18px] shadow-[0_0_16px_rgba(233,30,140,0.06)]">
      <div className="grid grid-cols-[1.2fr_1px_0.95fr] items-center gap-[18px]">
        <div className="flex min-w-0 items-center gap-3.5">
          <GuaranteeShield />
          <div className="min-w-0">
            <p className="text-[18px] font-extrabold leading-[1.15] text-white">
              {guaranteeCard.title}
            </p>
            <p className="mt-2 text-[14px] font-bold leading-[1.35] text-[#E91E8C]">
              {guaranteeCard.highlight}
            </p>
            <p className="mt-1.5 text-[12px] leading-[1.35] text-white/72">
              {guaranteeCard.description}
            </p>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="h-full min-h-[104px] w-px bg-[linear-gradient(180deg,rgba(233,30,140,0.02),rgba(233,30,140,0.24),rgba(233,30,140,0.02))]"
        />

        <div className="min-w-0">
          <div className="flex items-center gap-3.5">
            <div className="flex size-[58px] shrink-0 items-center justify-center rounded-[16px] border border-[rgba(233,30,140,0.2)] bg-[rgba(233,30,140,0.05)]">
              <Package
                aria-hidden="true"
                className="size-8 text-[#FF4DA6]"
                strokeWidth={1.8}
              />
            </div>
            <div className="min-w-0">
              <p className="text-[17px] font-extrabold leading-[1.1] text-white">
                {guaranteeCard.shippingTitle}
              </p>
              <div className="mt-1.5 text-[12px] leading-[1.35] text-white/72">
                {guaranteeCard.shippingLines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FinalLineCta({
  primaryCta,
}: {
  primaryCta: Section10FinalCtaContent["primaryCta"];
}) {
  return (
    <a
      href={primaryCta.href}
      aria-label={primaryCta.ariaLabel}
      className="block rounded-[22px] bg-[#E91E8C] px-5 py-4 text-white shadow-[0_0_24px_rgba(233,30,140,0.38)] transition-[transform,box-shadow,filter] duration-150 ease-out hover:brightness-[1.08] hover:shadow-[0_0_30px_rgba(233,30,140,0.48)] active:scale-[0.98] active:bg-[#C2185B] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#E91E8C]"
    >
      <div className="flex items-center gap-3">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white">
          <LineIcon size={28} />
        </span>

        <div className="min-w-0 flex-1">
          <p className="text-[17px] font-extrabold leading-[1.15]">
            {primaryCta.label}
          </p>
          <p className="mt-1 text-[12px] leading-[1.35] text-white/88">
            {primaryCta.description}
          </p>
        </div>

        <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/35">
          <ChevronRight
            aria-hidden="true"
            className="size-6 text-white"
            strokeWidth={2}
          />
        </span>
      </div>
    </a>
  );
}

function FinalTrustItem({ item }: { item: Section10TrustItem }) {
  const Icon = trustIconByName[item.iconName];

  return (
    <div className="flex min-w-0 items-start gap-2.5">
      <Icon
        aria-hidden="true"
        className="mt-0.5 size-5 shrink-0 text-[#E91E8C]"
        strokeWidth={1.9}
      />
      <div className="min-w-0">
        <p className="text-[12px] font-bold leading-[1.2] text-white">
          {item.title}
        </p>
        <p className="mt-1 text-[11px] leading-[1.3] text-white/65">
          {item.description}
        </p>
      </div>
    </div>
  );
}

type Section10FinalCtaProps = {
  content: Section10FinalCtaContent;
};

export function Section10FinalCta({ content }: Section10FinalCtaProps) {
  return (
    <section
      id="section-10-final-cta"
      aria-label={content.ariaLabel}
      className="bg-[#0A0A0A] pb-7"
    >
      <div className="px-4 pt-7 pb-4 text-center">
        <SectionBadge label={content.sectionLabel} />
        <h2 className="mt-3 text-[24px] font-extrabold leading-[1.15] tracking-[-0.02em] text-white sm:text-[26px]">
          <span className="block">
            <HeadingLine line={content.headingLines[0]} />
          </span>
          <span className="mt-1 block">
            <HeadingLine
              line={content.headingLines[1]}
              highlightedWord={content.highlightedWord}
            />
          </span>
        </h2>
        <p className="mt-3 text-[14px] leading-[1.5] text-white/68">
          {content.description}
        </p>
      </div>

      <div className="px-4">
        <div className="grid grid-cols-[1.08fr_0.92fr] items-center gap-4">
          <div className="relative min-h-[312px] overflow-hidden rounded-[24px]">
            <Image
              src={content.heroArtwork.src}
              alt={content.heroArtwork.alt}
              fill
              sizes="(max-width: 430px) 52vw, 223px"
              className="object-contain object-center drop-shadow-[0_0_12px_rgba(233,30,140,0.12)]"
              priority
            />
          </div>

          <ul className="space-y-0">
            {content.benefits.map((item) => (
              <FinalBenefitItem key={item.id} item={item} />
            ))}
          </ul>
        </div>
      </div>

      <SocialProofStrip socialProof={content.socialProof} />
      <GuaranteeCard guaranteeCard={content.guaranteeCard} />

      <div className="px-4 pt-5">
        <FinalLineCta primaryCta={content.primaryCta} />
      </div>

      <div className="px-4 pt-5">
        <div className="grid grid-cols-2 gap-x-5 gap-y-4.5 rounded-[18px] px-1 py-1">
          {content.trustItems.map((item) => (
            <FinalTrustItem key={item.id} item={item} />
          ))}
        </div>
      </div>

      <div className="px-4 pt-5 text-center">
        <p className="text-[15px] leading-[1.45] text-white/82">
          {content.finalReassurance.prefix}{" "}
          <span className="font-bold text-[#E91E8C]">
            {content.finalReassurance.highlight}
          </span>
        </p>
      </div>
    </section>
  );
}
