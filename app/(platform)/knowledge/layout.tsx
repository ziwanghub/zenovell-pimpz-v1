import type { ReactNode } from 'react';

import { PlatformAdaptiveShell } from '@/components/layout/platform-adaptive-shell';
import { PlatformPageHeader } from '@/components/platform/platform-page-header';

// Phase 5B: Shared layout skeleton for Knowledge pages.
// Prepares structure for future educational content.

export default function KnowledgeLayout({ children }: { children: ReactNode }) {
  return (
    <div className="platform-knowledge">
      {/* Future: shared knowledge navigation, SEO enhancements */}
      <PlatformAdaptiveShell>
        <PlatformPageHeader />
        {children}
      </PlatformAdaptiveShell>
    </div>
  );
}
