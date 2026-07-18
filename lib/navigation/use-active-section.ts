"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * Homepage section → primary drawer nav id mapping (canonical anchors).
 * Order is used only for fallback prioritization when multiple intersect.
 */
export const HOMEPAGE_SECTION_NAV_MAP = [
  { sectionId: "hero", navId: "home" },
  { sectionId: "section-4-product-catalog", navId: "catalog" },
  { sectionId: "section-5-why-choose-us", navId: "about" },
  { sectionId: "section-6-how-to-order", navId: "ordering" },
  { sectionId: "section-8-reviews", navId: "reviews" },
  { sectionId: "section-9-faq", navId: "faq" },
  { sectionId: "section-11-footer", navId: "contact" },
] as const;

export type HomepageNavId = (typeof HOMEPAGE_SECTION_NAV_MAP)[number]["navId"];

const ROUTE_ACTIVE: Array<{ match: (path: string) => boolean; navId: HomepageNavId }> = [
  {
    match: (path) => path.startsWith("/products"),
    navId: "catalog",
  },
  {
    match: (path) => path.startsWith("/information"),
    navId: "contact",
  },
  {
    match: (path) => path.startsWith("/knowledge"),
    // No dedicated articles primary item in drawer; treat knowledge as catalog-adjacent.
    navId: "catalog",
  },
];

function activeFromPathname(pathname: string | null): HomepageNavId | null {
  if (!pathname) return null;
  if (pathname === "/") return null; // homepage uses scroll observer
  for (const rule of ROUTE_ACTIVE) {
    if (rule.match(pathname)) return rule.navId;
  }
  return null;
}

/**
 * Tracks which primary navigation item reflects the user's current location.
 * - Homepage: IntersectionObserver on known section IDs
 * - Other routes: pathname heuristics
 *
 * Does not write history. Does not use assertive live regions.
 */
export function useActiveSection(
  enabled: boolean,
  validNavIds: ReadonlySet<string>,
): HomepageNavId | null {
  const pathname = usePathname();
  const routeActive = useMemo(() => activeFromPathname(pathname), [pathname]);
  const [scrollActive, setScrollActive] = useState<HomepageNavId | null>("home");

  useEffect(() => {
    if (!enabled) return;
    if (routeActive) return; // non-homepage: no observer needed

    const ratios = new Map<string, number>();

    const pickActive = (): HomepageNavId => {
      let bestId: HomepageNavId = "home";
      let bestRatio = 0;
      for (const { sectionId, navId } of HOMEPAGE_SECTION_NAV_MAP) {
        if (!validNavIds.has(navId)) continue;
        const ratio = ratios.get(sectionId) ?? 0;
        if (ratio > bestRatio) {
          bestRatio = ratio;
          bestId = navId;
        }
      }
      // If nothing intersects yet (very top / load), keep home when near top.
      if (bestRatio <= 0) {
        if (typeof window !== "undefined" && window.scrollY < 80) {
          return validNavIds.has("home") ? "home" : bestId;
        }
      }
      return bestId;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = (entry.target as HTMLElement).id;
          ratios.set(id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }
        setScrollActive(pickActive());
      },
      {
        // Bias toward the band below sticky header.
        root: null,
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0, 0.1, 0.25, 0.4, 0.6, 0.8, 1],
      },
    );

    for (const { sectionId } of HOMEPAGE_SECTION_NAV_MAP) {
      const el = document.getElementById(sectionId);
      if (el) {
        ratios.set(sectionId, 0);
        observer.observe(el);
      }
    }

    // Initial sync after layout (avoid setState-in-effect lint cascade)
    const initialFrame = window.requestAnimationFrame(() => {
      setScrollActive(pickActive());
    });

    return () => {
      window.cancelAnimationFrame(initialFrame);
      observer.disconnect();
    };
  }, [enabled, routeActive, validNavIds]);

  if (routeActive && validNavIds.has(routeActive)) {
    return routeActive;
  }

  if (scrollActive && validNavIds.has(scrollActive)) {
    return scrollActive;
  }

  return validNavIds.has("home") ? "home" : null;
}
