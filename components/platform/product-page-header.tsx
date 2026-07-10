'use client';

import { GlobalHeader } from '@/components/layout/global-header';
import { siteHeaderContent } from '@/content/site-header';
import {
  ctaDestinations,
  siteNavigationGroups,
} from '@/content/site-navigation';
import { mapGlobalHeaderProps } from '@/lib/global-header-mapper';

const productPageHeaderProps = mapGlobalHeaderProps(
  siteHeaderContent,
  siteNavigationGroups,
  ctaDestinations,
);

export function ProductPageHeader() {
  const drawerItems = productPageHeaderProps.drawerItems.map((item) => ({
    ...item,
    href:
      item.href.startsWith('#') && item.href !== '#'
        ? `/${item.href}`
        : item.href,
  }));

  return <GlobalHeader {...productPageHeaderProps} drawerItems={drawerItems} />;
}
