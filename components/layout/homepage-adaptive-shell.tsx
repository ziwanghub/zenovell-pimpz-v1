import type { ReactNode } from "react";

import { PlatformAdaptiveShell } from "@/components/layout/platform-adaptive-shell";

type HomepageAdaptiveShellProps = {
  children: ReactNode;
};

/**
 * Homepage-only presentation boundary for the frozen desktop adaptation.
 *
 * MobileShell remains the shared mobile/platform shell. The scoped selectors
 * widen only the Homepage instance for the approved transitional pre-tablet
 * lane and the frozen desktop lane; no runtime viewport branching or duplicate
 * section tree exists.
 *
 * DWC-02A: `data-homepage-wide-canvas` + `homepage-wide-canvas` mark this tree
 * for homepage-only desktop width ladder overrides in globals.css. Platform
 * routes never receive this marker.
 */
export function HomepageAdaptiveShell({
  children,
}: HomepageAdaptiveShellProps) {
  return (
    <div data-homepage-wide-canvas className="w-full">
      <PlatformAdaptiveShell className="homepage-wide-canvas bg-[var(--color-page-bg)]">
        {children}
      </PlatformAdaptiveShell>
    </div>
  );
}
