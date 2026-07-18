import type { ReactNode } from "react";

type MobileShellProps = {
  children: ReactNode;
};

export function MobileShell({ children }: MobileShellProps) {
  return (
    <div data-mobile-shell-root className="mx-auto w-full max-w-[430px]">
      <div className="min-h-[100svh] overflow-hidden bg-[var(--color-panel-bg)]">
        {children}
      </div>
    </div>
  );
}
