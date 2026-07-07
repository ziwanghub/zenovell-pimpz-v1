import type { ReactNode } from 'react';

// Phase 5B: Shared layout skeleton for Information pages.
// Prepares structure for future content. No visual changes to frozen areas.

export default function InformationLayout({ children }: { children: ReactNode }) {
  return (
    <div className="platform-information">
      {/* Future: shared information navigation, context integration */}
      {children}
    </div>
  );
}
