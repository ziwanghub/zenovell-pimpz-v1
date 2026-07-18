import type { ReactNode } from "react";

import { MobileShell } from "@/components/layout/mobile-shell";
import { cn } from "@/lib/utils";

type PlatformAdaptiveShellProps = {
  children: ReactNode;
  className?: string;
};

export function PlatformAdaptiveShell({
  children,
  className,
}: PlatformAdaptiveShellProps) {
  return (
    <div className={cn("platform-adaptive-shell w-full", className)}>
      <MobileShell>{children}</MobileShell>
    </div>
  );
}
