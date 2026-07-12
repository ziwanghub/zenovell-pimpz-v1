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
 */
export function HomepageAdaptiveShell({
  children,
}: HomepageAdaptiveShellProps) {
  return (
    <PlatformAdaptiveShell className="bg-[var(--color-page-bg)]">
      {children}
    </PlatformAdaptiveShell>
  );
}
