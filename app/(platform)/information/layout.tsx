import type { ReactNode } from 'react';

import { PlatformAdaptiveShell } from '@/components/layout/platform-adaptive-shell';
import { PlatformPageHeader } from '@/components/platform/platform-page-header';

// Phase 5B: Shared layout skeleton for Information pages.
// Prepares structure for future content. No visual changes to frozen areas.

export default function InformationLayout({ children }: { children: ReactNode }) {
  return (
    <div className="platform-information">
      {/* Future: shared information navigation, context integration */}
      <PlatformAdaptiveShell>
        <PlatformPageHeader />
        {children}
      </PlatformAdaptiveShell>
    </div>
  );
}
