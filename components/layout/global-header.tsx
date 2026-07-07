"use client";

import Link from "next/link";
import {
  type CSSProperties,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { Menu, X } from "lucide-react";

import type { GlobalHeaderProps } from "@/lib/global-header-mapper";
import { analytics, AnalyticsEvents } from "@/lib/analytics";
import { activateLineCta } from "@/lib/commerce/cta-activation";
import { LineIcon } from "@/components/ui/line-icon";

const DRAWER_TITLE_ID_PREFIX = "global-header-drawer-title";
const DRAWER_PANEL_ID_PREFIX = "global-header-drawer-panel";

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
  const firstDrawerLinkRef = useRef<HTMLAnchorElement | null>(null);
  const drawerPanelRef = useRef<HTMLDivElement | null>(null);
  const instanceId = useId();
  const drawerTitleId = `${DRAWER_TITLE_ID_PREFIX}-${instanceId}`;
  const drawerPanelId = `${DRAWER_PANEL_ID_PREFIX}-${instanceId}`;
  const canUsePortal = typeof document !== "undefined";

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    analytics.track(AnalyticsEvents.DRAWER_CLOSE, { surface: "header" });
  };

  const lockBodyScroll = (lock: boolean) => {
    document.body.style.overflow = lock ? "hidden" : "";
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
        // only restore on actual close, not on initial mount
        menuButtonRef.current?.focus();
      }
      wasOpenRef.current = false;
      return;
    }

    wasOpenRef.current = true;
    lockBodyScroll(true);
    firstDrawerLinkRef.current?.focus();

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
  }, [isDrawerOpen]);

  const headerStyle: CSSProperties = {
    paddingTop: visibility.safeAreaTop ? "env(safe-area-inset-top)" : undefined,
  };

  return (
    <>
      <div
        aria-hidden="true"
        style={{
          height: visibility.safeAreaTop
            ? "calc(60px + env(safe-area-inset-top) + 20px)"
            : "80px",
        }}
      />

      <div className="fixed inset-x-0 top-0 z-[50]">
        <header
          aria-label={ariaLabel}
          className="mx-auto w-full max-w-[430px] border-b border-white/8 bg-[#0A0A0A] px-4"
          style={headerStyle}
        >
          <div
            className={`flex min-h-[60px] items-center justify-between gap-2 py-[10px] transition-shadow ${
              isScrolled
                ? "shadow-[0_12px_32px_rgba(0,0,0,0.28)]"
                : ""
            }`}
          >
            <div className="min-w-0 flex-1">
              <p className="text-[17px] font-extrabold leading-none tracking-[0.04em] text-[#E91E8C]">
                {brand.wordmark}
              </p>
              <p className="mt-0.5 text-[10px] leading-[1.4] text-white/50">
                {brand.tagline}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-1.5">
              <Link
                aria-label={lineCta.ariaLabel}
                className="inline-flex h-10 w-[168px] items-center gap-1 rounded-full bg-[#E91E8C] pr-3 pl-1.5 text-[11px] font-semibold whitespace-nowrap text-white shadow-[0_0_16px_rgba(233,30,140,0.4)]"
                href={lineCta.href}
                onClick={(e) => {
                  // Preserve existing analytics
                  analytics.track(AnalyticsEvents.HEADER_CTA_CLICK, {
                    surface: "header",
                    label: lineCta.label,
                    destination: lineCta.href,
                  });

                  // Activate LINE with Commerce Context using shared helper (Batch 1)
                  activateLineCta({
                    title: lineCta.label,
                    surface: "header-line",
                    landingPage: "/",
                    intent: "high_intent",
                    source: "header",
                  });

                  // Use rich contextual open; fallback href remains for accessibility / no-JS
                  e.preventDefault();
                }}
              >
                <span className="flex h-7 min-w-7 items-center justify-center rounded-full bg-white px-1">
                  <LineIcon size={15} />
                </span>
                <span>{lineCta.label}</span>
              </Link>

              <button
                ref={menuButtonRef}
                aria-controls={drawerPanelId}
                aria-expanded={isDrawerOpen}
                aria-label={menuTrigger.ariaLabel}
                className="flex size-9 items-center justify-center rounded-full text-white"
                type="button"
                onClick={() => {
                  const next = !isDrawerOpen;
                  setIsDrawerOpen(next);
                  if (next) {
                    analytics.track(AnalyticsEvents.MENU_OPEN, { surface: "header" });
                  } else {
                    // close will be tracked in closeDrawer
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
            <div
              className="fixed inset-0 z-[80]"
              // Portal-based drawer for consistent layering outside MobileShell
            >
              {/* Backdrop layer for visual and click-to-close */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-black/65"
                onClick={closeDrawer}
              />

              {/* Transparent click catcher for full area coverage */}
              <div
                aria-hidden="true"
                className="absolute inset-0"
                onClick={closeDrawer}
              />

              <div
                ref={drawerPanelRef}
                id={drawerPanelId}
                aria-labelledby={drawerTitleId}
                aria-modal="true"
                className="absolute top-0 right-0 flex h-[100svh] w-full max-w-[360px] flex-col border-l border-white/10 bg-[#0A0A0A] shadow-[-18px_0_48px_rgba(0,0,0,0.42)]"
                role="dialog"
              >
                <div
                  className="flex items-center justify-between border-b border-white/8 px-4 py-4"
                  style={{
                    paddingTop: visibility.safeAreaTop
                      ? "max(1rem, env(safe-area-inset-top))"
                      : undefined,
                  }}
                >
                  <div>
                    <p
                      id={drawerTitleId}
                      className="text-sm font-bold tracking-[0.08em] text-[#E91E8C] uppercase"
                    >
                      {menuTrigger.label}
                    </p>
                    <p className="mt-1 text-xs text-white/55">{brand.wordmark}</p>
                  </div>

                  <button
                    aria-label="ปิดเมนูนำทาง"
                    className="flex size-10 items-center justify-center rounded-full text-white"
                    type="button"
                    onClick={() => {
                      closeDrawer();
                      analytics.track(AnalyticsEvents.DRAWER_CLOSE, { surface: "header" });
                    }}
                  >
                    <X className="size-5" strokeWidth={2.1} />
                  </button>
                </div>

                <nav
                  aria-label="เมนูนำทางหลัก"
                  className="flex-1 overflow-y-auto px-4 py-5"
                >
                  <ul className="space-y-2">
                    {drawerItems.map((item, index) => (
                      <li key={item.id}>
                        <Link
                          ref={index === 0 ? firstDrawerLinkRef : undefined}
                          aria-label={item.ariaLabel}
                          className="flex min-h-12 items-center rounded-2xl border border-white/8 bg-white/[0.03] px-4 text-[15px] font-medium text-white/92 transition-colors hover:bg-white/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E91E8C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]"
                          href={item.href}
                          onClick={() => {
                            closeDrawer();
                            analytics.track(AnalyticsEvents.NAVIGATION_CLICK, {
                              surface: "drawer",
                              label: item.label,
                              destination: item.href,
                            });
                          }}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
