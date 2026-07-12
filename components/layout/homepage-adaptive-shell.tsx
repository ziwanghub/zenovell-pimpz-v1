import type { ReactNode } from "react";

import { MobileShell } from "@/components/layout/mobile-shell";

type HomepageAdaptiveShellProps = {
  children: ReactNode;
};

/**
 * Homepage-only presentation boundary for the frozen desktop adaptation.
 *
 * MobileShell remains the shared mobile/platform shell. The scoped responsive
 * selectors widen only its direct Homepage instance at the approved desktop
 * breakpoint; no runtime viewport branching or duplicate section tree exists.
 */
export function HomepageAdaptiveShell({
  children,
}: HomepageAdaptiveShellProps) {
  return (
    <div
      className={
        "w-full bg-[var(--color-page-bg)] " +
        "min-[1280px]:px-10 " +
        "min-[1366px]:px-12 " +
        "min-[1536px]:px-14 " +
        "min-[1280px]:[&>div:first-child]:max-w-[1200px] " +
        "min-[1366px]:[&>div:first-child]:max-w-[1240px] " +
        "min-[1536px]:[&>div:first-child]:max-w-[1320px]"
      }
    >
      <MobileShell>{children}</MobileShell>
    </div>
  );
}
