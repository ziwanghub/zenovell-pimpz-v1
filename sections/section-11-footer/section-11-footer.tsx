"use client";

import type { ComponentType } from "react";
import {
  Award,
  ChevronRight,
  Info,
  Lock,
  LockKeyhole,
  Mail,
  MapPin,
  Package,
  Phone,
  ShieldCheck,
} from "lucide-react";

import type {
  Section11FooterContactItem,
  Section11FooterContent,
  Section11FooterLinkColumn,
  Section11FooterPaymentItem,
  Section11FooterSocialItem,
} from "@/content/section-11-footer";
import { ctaDestinations } from "@/content/site-navigation";
import { analytics, AnalyticsEvents } from "@/lib/analytics";
import { SectionBadge } from "@/components/ui/section-badge";
import { activateLineCta } from "@/lib/commerce/cta-activation";
import { LINE_OA_URL } from "@/lib/commerce/cta-contract";

type LucideLikeIcon = ComponentType<{
  className?: string;
  strokeWidth?: number;
}>;

const columnIconByName: Record<
  Section11FooterLinkColumn["iconName"],
  LucideLikeIcon
> = {
  package: Package,
  info: Info,
  "shield-check": ShieldCheck,
};

const contactIconByName: Record<
  Section11FooterContactItem["iconName"],
  LucideLikeIcon
> = {
  line: MessageCircleLineIcon,
  phone: Phone,
  mail: Mail,
  "map-pin": MapPin,
};

const socialIconByPlatform: Record<
  Section11FooterSocialItem["platform"],
  LucideLikeIcon
> = {
  facebook: FacebookApproxIcon,
  instagram: InstagramApproxIcon,
  youtube: YoutubeApproxIcon,
  tiktok: TikTokApproxIcon,
};

function MessageCircleLineIcon({
  className,
}: {
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d="M12 4.75C7.44365 4.75 3.75 7.84004 3.75 11.6516C3.75 13.7534 4.85807 15.6358 6.59887 16.8838L6.15979 19.3913C6.08643 19.8101 6.51664 20.1305 6.89044 19.9267L10.0526 18.2038C10.6715 18.3517 11.3238 18.4282 12 18.4282C16.5563 18.4282 20.25 15.3381 20.25 11.5266C20.25 7.71503 16.5563 4.75 12 4.75Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M8.8 11.4h6.4M8.8 14.15h4.4M8.8 8.65h6.4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TikTokApproxIcon({
  className,
}: {
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d="M14.2 4.5c.52 1.66 1.7 2.9 3.3 3.45v2.37a6.42 6.42 0 0 1-3.3-1.09v5.34a4.86 4.86 0 1 1-4.86-4.86c.36 0 .67.03.98.11v2.53a2.34 2.34 0 1 0 1.35 2.11V4.5h2.53Z"
        fill="currentColor"
      />
    </svg>
  );
}

function FacebookApproxIcon({
  className,
}: {
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d="M13.4 20V12.8h2.42l.36-2.8H13.4V8.21c0-.81.23-1.36 1.38-1.36h1.48V4.34c-.26-.03-1.13-.1-2.14-.1-2.12 0-3.58 1.29-3.58 3.67V10H8.15v2.8h2.39V20h2.86Z"
        fill="currentColor"
      />
    </svg>
  );
}

function InstagramApproxIcon({
  className,
}: {
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <rect
        x="4.25"
        y="4.25"
        width="15.5"
        height="15.5"
        rx="4.25"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.3" cy="6.8" r="1" fill="currentColor" />
    </svg>
  );
}

function YoutubeApproxIcon({
  className,
}: {
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d="M19.6 7.68a2.62 2.62 0 0 0-1.84-1.85C16.15 5.4 12 5.4 12 5.4s-4.15 0-5.76.43A2.62 2.62 0 0 0 4.4 7.68C4 9.3 4 12 4 12s0 2.7.4 4.32a2.62 2.62 0 0 0 1.84 1.85c1.61.43 5.76.43 5.76.43s4.15 0 5.76-.43a2.62 2.62 0 0 0 1.84-1.85c.4-1.62.4-4.32.4-4.32s0-2.7-.4-4.32Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="m10.4 14.8 4.1-2.8-4.1-2.8v5.6Z" fill="currentColor" />
    </svg>
  );
}

function FooterDividerAccent() {
  return (
    <div className="mt-5 flex items-center gap-3 px-4" aria-hidden="true">
      <div className="h-px flex-1 bg-[linear-gradient(90deg,rgba(233,30,140,0),rgba(233,30,140,0.55),rgba(233,30,140,0.08))]" />
      <div className="relative size-5 shrink-0">
        <div className="absolute inset-[3px] rotate-45 rounded-[2px] bg-[#E91E8C] shadow-[0_0_10px_rgba(233,30,140,0.4)]" />
        <div className="absolute inset-[3px] -rotate-45 rounded-[2px] bg-[#E91E8C]/80" />
      </div>
      <div className="h-px flex-1 bg-[linear-gradient(90deg,rgba(233,30,140,0.08),rgba(233,30,140,0.55),rgba(233,30,140,0))]" />
    </div>
  );
}

function FooterLinkColumn({ column }: { column: Section11FooterLinkColumn }) {
  const Icon = columnIconByName[column.iconName];

  return (
    <div className="min-w-0 px-2 first:pl-0 last:pr-0">
      <div className="flex items-center gap-2.5 text-[#FF4DA6]">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-[rgba(233,30,140,0.22)] bg-[rgba(233,30,140,0.06)]">
          <Icon aria-hidden="true" className="size-[18px]" strokeWidth={1.9} />
        </span>
        <h3 className="text-[12px] font-extrabold leading-none tracking-[-0.01em]">
          {column.title}
        </h3>
      </div>

      <ul className="mt-5 space-y-3">
        {column.items.map((item) => {
          const isLineIntent =
            item.id === "line-order" || item.id === "consulting";
          const itemHref = isLineIntent ? LINE_OA_URL : item.href;

          return (
          <li key={item.id}>
            <a
              href={itemHref}
              aria-label={item.ariaLabel}
              className="group flex items-start gap-2 text-[11.5px] leading-[1.45] text-white/76 transition-colors duration-150 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E91E8C]"
              onClick={(e) => {
                analytics.track(AnalyticsEvents.FOOTER_CTA_CLICK, {
                  surface: "footer",
                  label: item.label,
                  destination: itemHref,
                })
                if (item.id === "line-order") {
                  activateLineCta({
                    title: item.label,
                    surface: "footer-line",
                    landingPage: "/",
                    intent: "high_intent",
                    source: "footer",
                  });
                  e.preventDefault();
                } else if (item.id === "consulting") {
                  // RC2 F-02: footer consulting → shared LINE CTA contract
                  activateLineCta({
                    title: item.label,
                    surface: "footer-consulting-line",
                    landingPage: "/",
                    intent: "inquiry",
                    source: "footer",
                  });
                  e.preventDefault();
                }
              }}
            >
              <ChevronRight
                aria-hidden="true"
                className="mt-[1px] size-[13px] shrink-0 text-[#E91E8C] transition-transform duration-150 group-hover:translate-x-0.5"
                strokeWidth={2}
              />
              <span>{item.label}</span>
            </a>
          </li>
          );
        })}
      </ul>
    </div>
  );
}

function ContactItem({ item }: { item: Section11FooterContactItem }) {
  const Icon = contactIconByName[item.iconName];
  const sharedClassName =
    "group flex items-start gap-3.5 rounded-[14px] border border-transparent px-2.5 py-3 transition-[border-color,background-color,color] duration-150";

  const resolvedHref = item.destinationId
    ? ctaDestinations.find((d) => d.id === item.destinationId)?.href || item.href || "#"
    : item.href || "#";

  const content = (
    <>
      <span className="flex size-12 shrink-0 items-center justify-center rounded-[16px] border border-[rgba(233,30,140,0.24)] bg-[linear-gradient(180deg,rgba(233,30,140,0.12),rgba(233,30,140,0.04))] shadow-[0_0_10px_rgba(233,30,140,0.08)]">
        <Icon
          aria-hidden="true"
          className="size-[22px] text-[#FF4DA6]"
          strokeWidth={1.85}
        />
      </span>
      <div className="min-w-0">
        <p className="text-[12px] font-bold leading-none text-white">
          {item.label}
        </p>
        <p className="mt-2.5 break-words text-[13px] font-semibold leading-[1.34] text-white/90">
          {item.value}
        </p>
        {item.subtext ? (
          <p className="mt-2 break-words text-[11px] leading-[1.5] text-white/60">
            {item.subtext}
          </p>
        ) : null}
      </div>
    </>
  );

  if (!item.interactive) {
    return <div className={`${sharedClassName} text-white/78`}>{content}</div>;
  }

  return (
    <a
      href={resolvedHref}
      aria-label={item.ariaLabel}
      className={`${sharedClassName} text-white/78 hover:border-[rgba(233,30,140,0.18)] hover:bg-[rgba(233,30,140,0.04)] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E91E8C]`}
      onClick={(e) => {
        analytics.track(AnalyticsEvents.CONTACT_CLICK, {
          surface: "footer",
          label: item.label,
          destination: resolvedHref,
        })
        if (item.id === "line") {
          activateLineCta({
            title: item.label,
            surface: "footer-line",
            landingPage: "/",
            intent: "high_intent",
            source: "footer",
          });
          e.preventDefault();
        }
      }}
    >
      {content}
    </a>
  );
}

function FooterSocialIconLink({ item }: { item: Section11FooterSocialItem }) {
  const Icon = socialIconByPlatform[item.platform];

  return (
    <a
      href={item.href}
      aria-label={item.ariaLabel}
      className="flex size-12 items-center justify-center rounded-full border border-[rgba(233,30,140,0.28)] bg-[radial-gradient(circle_at_35%_30%,rgba(233,30,140,0.16),rgba(17,17,17,0.94)_72%)] text-[#FF4DA6] shadow-[0_0_12px_rgba(233,30,140,0.1)] transition-[transform,border-color,box-shadow] duration-150 hover:-translate-y-0.5 hover:border-[rgba(233,30,140,0.42)] hover:shadow-[0_0_18px_rgba(233,30,140,0.18)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E91E8C]"
      onClick={() =>
        analytics.track(AnalyticsEvents.SOCIAL_CLICK, {
          surface: "footer",
          label: item.ariaLabel,
          destination: item.href,
        })
      }
    >
      <Icon aria-hidden="true" className="size-[22px]" strokeWidth={1.9} />
    </a>
  );
}

function FooterPaymentBadge({ item }: { item: Section11FooterPaymentItem }) {
  const sharedClassName =
    "flex min-h-[46px] w-full items-center justify-center rounded-[12px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] px-3 py-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]";

  if (item.variant === "visa") {
    return (
      <span className={sharedClassName} aria-label={item.label}>
        <svg aria-hidden="true" viewBox="0 0 64 24" className="h-5 w-[50px]">
          <text x="5" y="17" fill="#2E6BFF" fontSize="14" fontWeight="800" fontFamily="Arial, sans-serif" letterSpacing="1.2">VISA</text>
        </svg>
      </span>
    );
  }

  if (item.variant === "mastercard") {
    return (
      <span className={sharedClassName} aria-label={item.label}>
        <svg aria-hidden="true" viewBox="0 0 64 24" className="h-5 w-[50px]">
          <circle cx="24" cy="12" r="7" fill="#EA5B0C" />
          <circle cx="38" cy="12" r="7" fill="#FFB600" fillOpacity="0.9" />
        </svg>
      </span>
    );
  }

  if (item.variant === "jcb") {
    return (
      <span className={sharedClassName} aria-label={item.label}>
        <svg aria-hidden="true" viewBox="0 0 64 24" className="h-5 w-[50px]">
          <rect x="10" y="4" width="14" height="16" rx="3" fill="#005BAC" />
          <rect x="24" y="4" width="14" height="16" rx="3" fill="#E60012" />
          <rect x="38" y="4" width="14" height="16" rx="3" fill="#009944" />
          <text x="14" y="16" fill="white" fontSize="9" fontWeight="800" fontFamily="Arial, sans-serif">J</text>
          <text x="28" y="16" fill="white" fontSize="9" fontWeight="800" fontFamily="Arial, sans-serif">C</text>
          <text x="42" y="16" fill="white" fontSize="9" fontWeight="800" fontFamily="Arial, sans-serif">B</text>
        </svg>
      </span>
    );
  }

  return (
    <span className={sharedClassName} aria-label={item.label}>
      <svg aria-hidden="true" viewBox="0 0 84 24" className="h-5 w-[58px]">
        <text x="6" y="15" fill="#1C4AA1" fontSize="8.2" fontWeight="700" fontFamily="Arial, sans-serif">PromptPay</text>
        <rect x="56" y="6" width="7" height="7" rx="1.5" fill="#E74C3C" />
        <rect x="62" y="6" width="7" height="7" rx="1.5" fill="#3498DB" />
        <rect x="59" y="12" width="7" height="7" rx="1.5" fill="#2ECC71" />
      </svg>
    </span>
  );
}

export function Section11Footer({
  content,
}: {
  content: Section11FooterContent;
}) {
  return (
    <footer
      id="section-11-footer"
      aria-label={content.ariaLabel}
      className="bg-[#0A0A0A] px-4 pb-8 pt-7 text-white min-[1280px]:px-0 min-[1280px]:pt-10"
    >
      <div className="text-center">
        <SectionBadge label={content.sectionLabel} />
        <h2 className="mt-3 text-[20px] font-extrabold leading-[1.15] tracking-[-0.03em] text-white min-[1280px]:mt-4 min-[1280px]:text-[34px] min-[1280px]:leading-[1.14]">
          {content.heading}
        </h2>
        <p className="mt-2 text-[13px] leading-[1.45] text-white/72 min-[1280px]:mx-auto min-[1280px]:mt-3 min-[1280px]:max-w-[760px] min-[1280px]:text-[15px] min-[1280px]:leading-[1.6]">
          {content.description}
        </p>
      </div>

      <FooterDividerAccent />

      <nav aria-label="เมนูส่วนท้าย" className="mt-6 min-[1280px]:mt-8">
        <div className="grid grid-cols-3 gap-x-3 divide-x divide-[rgba(255,255,255,0.08)] min-[1280px]:gap-x-8">
          {content.navColumns.map((column) => (
            <FooterLinkColumn key={column.id} column={column} />
          ))}
        </div>
      </nav>

      <div className="mt-8 grid grid-cols-2 gap-4 min-[1280px]:mt-10 min-[1280px]:gap-10">
        <section className="min-w-0 rounded-[20px] border border-[rgba(233,30,140,0.14)] bg-[linear-gradient(180deg,rgba(18,18,18,0.98),rgba(10,10,10,0.98))] px-4 py-4.5 shadow-[0_0_16px_rgba(233,30,140,0.05)]">
          <div className="flex items-center gap-2.5 px-2.5">
            <span className="flex size-8 items-center justify-center rounded-full border border-[rgba(233,30,140,0.2)] bg-[rgba(233,30,140,0.06)]">
              <MessageCircleLineIcon
                className="size-[17px] text-[#FF4DA6]"
                strokeWidth={1.85}
              />
            </span>
            <h3 className="text-[12px] font-extrabold text-[#FF4DA6]">
              {content.contactTitle}
            </h3>
          </div>

          <div className="mt-4 space-y-4">
            {content.contacts.map((item) => (
              <ContactItem key={item.id} item={item} />
            ))}
          </div>
        </section>

        <section className="min-w-0 rounded-[20px] border border-[rgba(233,30,140,0.14)] bg-[linear-gradient(180deg,rgba(18,18,18,0.98),rgba(10,10,10,0.98))] px-4 py-4.5 shadow-[0_0_16px_rgba(233,30,140,0.05)]">
          <div className="text-center">
            <h3 className="text-[12px] font-extrabold text-[#FF4DA6]">
              {content.socialCard.title}
            </h3>
            <p className="mt-1.5 text-[11px] leading-[1.3] text-white/65">
              {content.socialCard.description}
            </p>
          </div>

          <div className="mt-6 flex justify-center gap-3.5">
            {content.socialCard.items.map((item) => (
              <FooterSocialIconLink key={item.id} item={item} />
            ))}
          </div>

          <div
            className="mt-6 rounded-[18px] border border-[rgba(233,30,140,0.16)] bg-[linear-gradient(180deg,rgba(233,30,140,0.06),rgba(17,17,17,0.92))] px-4 py-4.5"
          >
            <div className="flex items-start gap-3">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-[14px] border border-[rgba(233,30,140,0.22)] bg-[rgba(233,30,140,0.06)]">
                <LockKeyhole
                  aria-hidden="true"
                  className="size-[22px] text-[#FF4DA6]"
                  strokeWidth={1.9}
                />
              </span>
              <div className="min-w-0">
                <p className="text-[15px] font-extrabold leading-[1.15] text-[#FF4DA6]">
                  {content.privacyPanel.title}
                </p>
                <div className="mt-2.5 space-y-1.5 text-[11px] leading-[1.4] text-white/72">
                  {content.privacyPanel.lines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="mt-5 rounded-[20px] border border-[rgba(233,30,140,0.18)] bg-[linear-gradient(180deg,rgba(22,14,18,0.98),rgba(13,13,13,0.98))] px-4 py-5 shadow-[0_0_16px_rgba(233,30,140,0.07)] min-[1280px]:mt-8 min-[1280px]:px-6">
        <div className="flex items-center gap-3.5">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-[16px] border border-[rgba(233,30,140,0.24)] bg-[rgba(233,30,140,0.06)]">
            <Award
              aria-hidden="true"
              className="size-[24px] text-[#FF4DA6]"
              strokeWidth={1.9}
            />
          </span>
          <div className="min-w-0">
            <p className="text-[16px] font-extrabold leading-[1.15] text-[#FF4DA6]">
              {content.guarantee.title}
            </p>
            <p className="mt-2 text-[13px] leading-[1.45] text-white/78">
              {content.guarantee.description}
            </p>
          </div>
        </div>
      </section>

      <div className="mt-7 border-b border-white/8 pb-5 min-[1280px]:mt-10">
        <div className="flex flex-col gap-4 min-[390px]:flex-row min-[390px]:items-end min-[390px]:justify-between min-[390px]:gap-4">
        <div className="min-w-0">
          <p className="text-[22px] font-extrabold leading-none tracking-[-0.04em] text-[#FF4DA6]">
            {content.brand.name}
          </p>
          <p className="mt-2.5 text-[13px] leading-[1.35] text-white/72">
            {content.brand.tagline}
          </p>
        </div>

        <div className="min-w-0 space-y-1 text-right">
          <p className="text-[12px] leading-[1.4] text-white/70">
            {content.legal.copyright}
          </p>
          <p className="text-[12px] leading-[1.4] text-white/56">
            {content.legal.rights}
          </p>
        </div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 min-[390px]:grid-cols-[minmax(0,1.05fr)_minmax(0,1.95fr)] min-[390px]:items-center min-[1280px]:gap-6">
        <div className="flex min-w-0 items-center gap-2.5 rounded-[14px] border border-white/8 bg-[rgba(255,255,255,0.03)] px-3 py-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-[12px] border border-white/8 bg-[rgba(255,255,255,0.04)]">
            <Lock
              aria-hidden="true"
              className="size-[18px] text-white/80"
              strokeWidth={1.9}
            />
          </span>
          <div className="min-w-0">
            <p className="text-[11px] font-bold leading-none text-white/92">
              {content.security.title}
            </p>
            <p className="mt-1 text-[10px] leading-[1.2] text-white/58">
              {content.security.description}
            </p>
          </div>
        </div>

        <div
          aria-label="วิธีชำระเงินที่รองรับ"
          className="grid grid-cols-2 gap-2.5 min-[390px]:grid-cols-4 min-[414px]:grid-cols-4 min-[1280px]:gap-4"
        >
          {content.payments.map((item) => (
            <FooterPaymentBadge key={item.id} item={item} />
          ))}
        </div>
      </div>
    </footer>
  );
}
