'use client';

import { GlobalHeader } from '@/components/layout/global-header';
import { siteHeaderContent } from '@/content/site-header';
import {
  ctaDestinations,
  siteNavigationGroups,
} from '@/content/site-navigation';
import { mapGlobalHeaderProps } from '@/lib/global-header-mapper';

const platformPageHeaderProps = mapGlobalHeaderProps(
  siteHeaderContent,
  siteNavigationGroups,
  ctaDestinations,
);

export function PlatformPageHeader() {
  const drawerItems = platformPageHeaderProps.drawerItems.map((item) => ({
    ...item,
    href:
      item.href.startsWith('#') && item.href !== '#'
        ? `/${item.href}`
        : item.href,
  }));

  return <GlobalHeader {...platformPageHeaderProps} drawerItems={drawerItems} />;
}
