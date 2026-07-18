"use client";

import Link from "next/link";
import {
  type CSSProperties,
  type MouseEvent,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { Menu, X } from "lucide-react";

import type { GlobalHeaderNavItem, GlobalHeaderProps } from "@/lib/global-header-mapper";
import { analytics, AnalyticsEvents } from "@/lib/analytics";
import { activateLineCta } from "@/lib/commerce/cta-activation";
import { LineIcon } from "@/components/ui/line-icon";
import { useActiveSection } from "@/lib/navigation/use-active-section";

const DRAWER_TITLE_ID_PREFIX = "global-header-drawer-title";
const DRAWER_PANEL_ID_PREFIX = "global-header-drawer-panel";
const DRAWER_NAV_HEADING_ID_PREFIX = "global-header-drawer-nav-heading";
const STICKY_HEADER_SCROLL_OFFSET_PX = 72;

const LINE_NAV_IDS = new Set(["consulting", "line-order"]);

/** Presentation-only labels for drawer LINE actions (canonical nav labels unchanged). */
const DRAWER_LINE_PRESENTATION: Record<
  "line-order" | "consulting",
  { label: string; ariaLabel: string; intent: "high_intent" | "inquiry"; surface: string }
> = {
  "line-order": {
    label: "สั่งซื้อผ่าน LINE",
    ariaLabel: "สั่งซื้อผ่าน LINE",
    intent: "high_intent",
    surface: "drawer-line-order",
  },
  consulting: {
    label: "ปรึกษาทีมงาน",
    ariaLabel: "ต้องการคำแนะนำ? ปรึกษาทีมงานผ่าน LINE",
    intent: "inquiry",
    surface: "drawer-consulting",
  },
};

function isHashHref(href: string): boolean {
  return href.startsWith("#") && href.length > 1;
}

function scrollToHashTarget(href: string) {
  if (!isHashHref(href)) return;
  const id = href.slice(1);
  const target = document.getElementById(id);
  if (!target) return;

  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const top =
    target.getBoundingClientRect().top + window.scrollY - STICKY_HEADER_SCROLL_OFFSET_PX;

  window.scrollTo({
    top: Math.max(0, top),
    behavior: reduceMotion ? "auto" : "smooth",
  });
}

export function GlobalHeader({
  ariaLabel,
  brand,
  lineCta,
  menuTrigger,
  visibility,
  drawerItems,
}: GlobalHeaderProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const activeLinkRef = useRef<HTMLAnchorElement | null>(null);
  const firstPrimaryLinkRef = useRef<HTMLAnchorElement | null>(null);
  const drawerPanelRef = useRef<HTMLDivElement | null>(null);
  const navScrollRef = useRef<HTMLElement | null>(null);
  const instanceId = useId();
  const drawerTitleId = `${DRAWER_TITLE_ID_PREFIX}-${instanceId}`;
  const drawerPanelId = `${DRAWER_PANEL_ID_PREFIX}-${instanceId}`;
  const drawerNavHeadingId = `${DRAWER_NAV_HEADING_ID_PREFIX}-${instanceId}`;
  const canUsePortal = typeof document !== "undefined";

  const primaryNavItems = useMemo(
    () => drawerItems.filter((item) => !LINE_NAV_IDS.has(item.id)),
    [drawerItems],
  );

  const lineOrderItem = drawerItems.find((item) => item.id === "line-order");
  const consultingItem = drawerItems.find((item) => item.id === "consulting");

  const validNavIds = useMemo(
    () => new Set(primaryNavItems.map((item) => item.id)),
    [primaryNavItems],
  );

  const activeNavId = useActiveSection(true, validNavIds);

  const activeNavItem = useMemo(
    () => primaryNavItems.find((item) => item.id === activeNavId) ?? primaryNavItems[0] ?? null,
    [primaryNavItems, activeNavId],
  );

  const desktopNavItems = primaryNavItems;

  const closeDrawer = useCallback(() => {
    setIsDrawerOpen(false);
    analytics.track(AnalyticsEvents.DRAWER_CLOSE, { surface: "header" });
  }, []);

  const lockBodyScroll = (lock: boolean) => {
    if (lock) {
      const scrollY = window.scrollY;
      document.body.dataset.drawerScrollY = String(scrollY);
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
      return;
    }

    const stored = document.body.dataset.drawerScrollY;
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.width = "";
    document.body.style.overflow = "";
    delete document.body.dataset.drawerScrollY;

    if (stored != null) {
      const y = Number.parseInt(stored, 10);
      if (!Number.isNaN(y)) {
        window.scrollTo(0, y);
      }
    }
  };

  useEffect(() => {
    if (!visibility.showShadowOnScroll) {
      return;
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [visibility.showShadowOnScroll]);

  const wasOpenRef = useRef(false);

  useEffect(() => {
    if (!isDrawerOpen) {
      lockBodyScroll(false);
      if (wasOpenRef.current) {
        menuButtonRef.current?.focus();
      }
      wasOpenRef.current = false;
      return;
    }

    wasOpenRef.current = true;
    lockBodyScroll(true);

    // Focus active link if present, else first primary, else close button.
    const focusTarget =
      activeLinkRef.current ?? firstPrimaryLinkRef.current ?? closeButtonRef.current;
    focusTarget?.focus();

    // Ensure active item is visible inside drawer nav only (not page scroll).
    requestAnimationFrame(() => {
      const activeEl = activeLinkRef.current;
      const navEl = navScrollRef.current;
      if (activeEl && navEl) {
        const navRect = navEl.getBoundingClientRect();
        const itemRect = activeEl.getBoundingClientRect();
        if (itemRect.top < navRect.top || itemRect.bottom > navRect.bottom) {
          activeEl.scrollIntoView({ block: "nearest", inline: "nearest" });
        }
      }
    });

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        closeDrawer();
        return;
      }

      if (event.key !== "Tab" || !drawerPanelRef.current) {
        return;
      }

      const focusableElements = Array.from(
        drawerPanelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => !element.hasAttribute("aria-hidden"));

      if (focusableElements.length === 0) {
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement as HTMLElement | null;

      if (event.shiftKey && activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      lockBodyScroll(false);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isDrawerOpen, closeDrawer]);

  const handlePrimaryNavClick = (
    item: GlobalHeaderNavItem,
    event: MouseEvent<HTMLAnchorElement>,
  ) => {
    analytics.track(AnalyticsEvents.NAVIGATION_CLICK, {
      surface: "drawer",
      label: item.label,
      destination: item.href,
    });

    if (isHashHref(item.href)) {
      event.preventDefault();
    }

    closeDrawer();

    if (isHashHref(item.href)) {
      // Wait for body-scroll unlock / position restore, then offset-scroll.
      window.setTimeout(() => {
        scrollToHashTarget(item.href);
      }, 0);
    }
  };

  const handleLineAction = (
    kind: "line-order" | "consulting",
    item: GlobalHeaderNavItem | undefined,
    event: MouseEvent<HTMLAnchorElement>,
  ) => {
    const presentation = DRAWER_LINE_PRESENTATION[kind];
    const href = item?.href ?? lineCta.href;

    analytics.track(AnalyticsEvents.NAVIGATION_CLICK, {
      surface: "drawer",
      label: presentation.label,
      destination: href,
    });

    activateLineCta({
      title: presentation.label,
      surface: presentation.surface,
      landingPage: "/",
      intent: presentation.intent,
      source: "drawer",
    });

    event.preventDefault();
    closeDrawer();
  };

  const headerStyle: CSSProperties = {
    paddingTop: visibility.safeAreaTop ? "env(safe-area-inset-top)" : undefined,
  };

  const primaryLinkClass = (isActive: boolean) =>
    [
      "group relative flex min-h-11 items-center gap-3 rounded-xl border px-3.5 py-2.5 text-[14px] font-medium transition-colors",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E91E8C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]",
      isActive
        ? "border-[rgba(233,30,140,0.35)] bg-[rgba(233,30,140,0.10)] text-white"
        : "border-transparent bg-transparent text-white/78 hover:bg-white/[0.05] hover:text-white",
    ].join(" ");

  return (
    <>
      <div
        aria-hidden="true"
        style={{
          height: visibility.safeAreaTop
            ? "calc(var(--platform-header-offset, 66px) + env(safe-area-inset-top))"
            : "var(--platform-header-offset, 66px)",
        }}
      />

      <div className="fixed inset-x-0 top-0 z-[50]">
        <header
          aria-label={ariaLabel}
          className="platform-header-frame border-b border-white/8 bg-[#0A0A0A]"
          style={headerStyle}
        >
          <div
            className={`flex min-h-[var(--platform-header-min-height,60px)] items-center justify-between gap-2.5 py-2 transition-shadow min-[690px]:gap-3 min-[820px]:gap-3.5 min-[1280px]:grid min-[1280px]:grid-cols-[minmax(150px,180px)_minmax(0,1fr)_auto] min-[1280px]:items-center min-[1280px]:gap-x-6 min-[1366px]:gap-x-8 ${
              isScrolled ? "shadow-[0_12px_32px_rgba(0,0,0,0.28)]" : ""
            }`}
          >
            <div className="min-w-0 flex-1 min-[1280px]:min-w-[150px] min-[1280px]:flex-none">
              <p className="text-[17px] font-extrabold leading-none tracking-[0.04em] text-[#E91E8C] min-[1280px]:text-[19px]">
                {brand.wordmark}
              </p>
              <p className="mt-0.5 text-[10px] leading-[1.4] text-white/50 min-[820px]:text-[11px] min-[820px]:leading-[1.35] min-[1280px]:text-[9px] min-[1280px]:leading-[1.35]">
                {brand.tagline}
              </p>
            </div>

            <nav
              aria-label="เมนูนำทางหลักสำหรับเดสก์ท็อป"
              className="hidden min-w-0 flex-1 items-center justify-center min-[1280px]:flex min-[1280px]:gap-[18px] min-[1366px]:gap-6 min-[1536px]:gap-7"
            >
              {desktopNavItems.map((item) => {
                const isActive = item.id === activeNavId;
                return (
                  <Link
                    key={item.id}
                    aria-current={isActive ? "location" : undefined}
                    aria-label={item.ariaLabel}
                    className={`whitespace-nowrap text-[12px] font-medium leading-[1.25] transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E91E8C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A] min-[1366px]:text-[13px] ${
                      isActive ? "text-white" : "text-white/75"
                    }`}
                    href={item.href}
                    onClick={(e) => {
                      analytics.track(AnalyticsEvents.NAVIGATION_CLICK, {
                        surface: "header",
                        label: item.label,
                        destination: item.href,
                      });
                      if (isHashHref(item.href)) {
                        e.preventDefault();
                        scrollToHashTarget(item.href);
                      }
                    }}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex shrink-0 items-center gap-1.5 min-[690px]:gap-2 min-[1280px]:justify-self-end">
              <Link
                aria-label={lineCta.ariaLabel}
                className="inline-flex h-10 w-[168px] items-center gap-1 rounded-full bg-[#E91E8C] pr-3 pl-1.5 text-[11px] font-semibold whitespace-nowrap text-white shadow-[0_0_20px_rgba(233,30,140,0.45)] min-[690px]:h-11 min-[690px]:w-auto min-[690px]:min-w-[160px] min-[690px]:gap-1.5 min-[690px]:pr-3.5 min-[690px]:pl-1.5 min-[690px]:text-[11px] min-[820px]:min-w-[172px] min-[820px]:gap-2 min-[820px]:pr-4 min-[820px]:pl-2 min-[820px]:text-[12px] min-[1280px]:min-w-[174px] min-[1280px]:text-[13px] min-[1280px]:font-semibold"
                href={lineCta.href}
                onClick={(e) => {
                  analytics.track(AnalyticsEvents.HEADER_CTA_CLICK, {
                    surface: "header",
                    label: lineCta.label,
                    destination: lineCta.href,
                  });

                  activateLineCta({
                    title: lineCta.label,
                    surface: "header-line",
                    landingPage: "/",
                    intent: "high_intent",
                    source: "header",
                  });

                  e.preventDefault();
                }}
              >
                <span className="flex h-7 min-w-7 items-center justify-center rounded-full bg-white px-1 min-[690px]:h-8 min-[690px]:min-w-8">
                  <LineIcon size={15} />
                </span>
                <span>{lineCta.label}</span>
              </Link>

              <button
                ref={menuButtonRef}
                aria-controls={drawerPanelId}
                aria-expanded={isDrawerOpen}
                aria-label={menuTrigger.ariaLabel}
                className="flex size-10 items-center justify-center rounded-full text-white min-[690px]:size-11 min-[1280px]:hidden"
                type="button"
                onClick={() => {
                  const next = !isDrawerOpen;
                  setIsDrawerOpen(next);
                  if (next) {
                    analytics.track(AnalyticsEvents.MENU_OPEN, { surface: "header" });
                  } else {
                    analytics.track(AnalyticsEvents.DRAWER_CLOSE, { surface: "header" });
                  }
                }}
              >
                <Menu className="size-5" strokeWidth={2.1} />
              </button>
            </div>
          </div>
        </header>
      </div>

      {canUsePortal && isDrawerOpen
        ? createPortal(
            <div className="fixed inset-0 z-[80]">
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-black/65"
                onClick={closeDrawer}
              />

              <div
                ref={drawerPanelRef}
                id={drawerPanelId}
                aria-labelledby={drawerTitleId}
                aria-modal="true"
                className="absolute top-0 right-0 flex h-[100svh] w-full max-w-[min(92vw,380px)] flex-col border-l border-white/10 bg-[#0A0A0A] shadow-[-18px_0_48px_rgba(0,0,0,0.42)] min-[690px]:max-w-[min(78vw,420px)] min-[820px]:max-w-[min(62vw,460px)]"
                role="dialog"
              >
                {/* 1. Drawer header */}
                <div
                  className="flex shrink-0 items-center justify-between border-b border-white/8 px-4 py-3.5 min-[690px]:px-6 min-[820px]:px-7"
                  style={{
                    paddingTop: visibility.safeAreaTop
                      ? "max(0.875rem, env(safe-area-inset-top))"
                      : undefined,
                  }}
                >
                  <div>
                    <p
                      id={drawerTitleId}
                      className="text-[15px] font-bold tracking-[0.08em] text-[#E91E8C]"
                    >
                      {brand.wordmark}
                    </p>
                    <p className="mt-0.5 text-[11px] text-white/60">{brand.tagline}</p>
                  </div>

                  <button
                    ref={closeButtonRef}
                    aria-label="ปิดเมนูนำทาง"
                    className="flex size-11 items-center justify-center rounded-full text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E91E8C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]"
                    type="button"
                    onClick={closeDrawer}
                  >
                    <X className="size-5" strokeWidth={2.1} />
                  </button>
                </div>

                {/* 2. Current location context */}
                {activeNavItem ? (
                  <div className="shrink-0 border-b border-white/8 px-4 py-3 min-[690px]:px-6 min-[820px]:px-7">
                    <p className="text-[11px] font-medium tracking-[0.04em] text-white/50">
                      คุณกำลังดู
                    </p>
                    <p className="mt-0.5 text-[15px] font-semibold text-white">
                      {activeNavItem.label}
                    </p>
                  </div>
                ) : null}

                {/* 3. Scrollable primary navigation */}
                <nav
                  ref={navScrollRef}
                  aria-labelledby={drawerNavHeadingId}
                  className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 min-[690px]:px-6 min-[820px]:px-7"
                >
                  <h2
                    id={drawerNavHeadingId}
                    className="mb-3 text-[11px] font-bold tracking-[0.08em] text-white/45 uppercase"
                  >
                    เมนูหลัก
                  </h2>
                  <ul className="space-y-1">
                    {primaryNavItems.map((item, index) => {
                      const isActive = item.id === activeNavId;
                      return (
                        <li key={item.id}>
                          <Link
                            ref={(node) => {
                              if (isActive) {
                                activeLinkRef.current = node;
                              }
                              if (index === 0) {
                                firstPrimaryLinkRef.current = node;
                              }
                            }}
                            aria-current={isActive ? "location" : undefined}
                            aria-label={item.ariaLabel}
                            className={primaryLinkClass(isActive)}
                            href={item.href}
                            onClick={(e) => handlePrimaryNavClick(item, e)}
                          >
                            {isActive ? (
                              <span
                                aria-hidden="true"
                                className="absolute top-2 bottom-2 left-0 w-[3px] rounded-full bg-[#E91E8C]"
                              />
                            ) : null}
                            <span
                              aria-hidden="true"
                              className={`size-1.5 shrink-0 rounded-full ${
                                isActive ? "bg-[#E91E8C]" : "bg-white/20"
                              }`}
                            />
                            <span className="min-w-0 flex-1">{item.label}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </nav>

                {/* 4. Persistent bottom LINE action area */}
                <div
                  className="shrink-0 border-t border-white/10 bg-[#0A0A0A] px-4 pt-3 min-[690px]:px-6 min-[820px]:px-7"
                  style={{
                    paddingBottom: "max(0.875rem, env(safe-area-inset-bottom))",
                  }}
                >
                  <p className="mb-2.5 text-[12px] text-white/55">ต้องการคำแนะนำ?</p>

                  {lineOrderItem ? (
                    <Link
                      aria-label={DRAWER_LINE_PRESENTATION["line-order"].ariaLabel}
                      className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#E91E8C] px-4 text-[14px] font-semibold text-white shadow-[0_0_20px_rgba(233,30,140,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E91E8C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]"
                      href={lineOrderItem.href}
                      onClick={(e) => handleLineAction("line-order", lineOrderItem, e)}
                    >
                      <span className="flex size-7 items-center justify-center rounded-full bg-white">
                        <LineIcon size={15} />
                      </span>
                      <span>{DRAWER_LINE_PRESENTATION["line-order"].label}</span>
                    </Link>
                  ) : (
                    <Link
                      aria-label={lineCta.ariaLabel}
                      className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#E91E8C] px-4 text-[14px] font-semibold text-white shadow-[0_0_20px_rgba(233,30,140,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E91E8C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]"
                      href={lineCta.href}
                      onClick={(e) => {
                        analytics.track(AnalyticsEvents.HEADER_CTA_CLICK, {
                          surface: "drawer",
                          label: lineCta.label,
                          destination: lineCta.href,
                        });
                        activateLineCta({
                          title: lineCta.label,
                          surface: "header-line",
                          landingPage: "/",
                          intent: "high_intent",
                          source: "drawer",
                        });
                        e.preventDefault();
                        closeDrawer();
                      }}
                    >
                      <span className="flex size-7 items-center justify-center rounded-full bg-white">
                        <LineIcon size={15} />
                      </span>
                      <span>{lineCta.label}</span>
                    </Link>
                  )}

                  {consultingItem ? (
                    <Link
                      aria-label={DRAWER_LINE_PRESENTATION.consulting.ariaLabel}
                      className="mt-2 inline-flex min-h-11 w-full items-center justify-center rounded-full border border-white/15 bg-transparent px-4 text-[13px] font-medium text-white/80 transition-colors hover:border-white/25 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E91E8C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]"
                      href={consultingItem.href}
                      onClick={(e) => handleLineAction("consulting", consultingItem, e)}
                    >
                      {DRAWER_LINE_PRESENTATION.consulting.label}
                    </Link>
                  ) : null}
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
