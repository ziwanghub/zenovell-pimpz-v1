import type {
  SiteHeaderContract,
  SiteHeaderVisibility,
} from "@/content/site-header";
import type {
  CtaDestination,
  SiteLink,
  SiteNavigationGroup,
} from "@/content/site-navigation";

export type GlobalHeaderNavItem = {
  id: SiteLink["id"];
  label: SiteLink["label"];
  href: SiteLink["href"];
  ariaLabel: SiteLink["ariaLabel"];
};

export type GlobalHeaderProps = {
  ariaLabel: string;
  brand: SiteHeaderContract["brand"];
  lineCta: {
    label: string;
    ariaLabel: string;
    href: CtaDestination["href"];
  };
  menuTrigger: SiteHeaderContract["menuTrigger"];
  visibility: SiteHeaderVisibility;
  drawerItems: GlobalHeaderNavItem[];
};

export function mapGlobalHeaderProps(
  header: SiteHeaderContract,
  navigationGroups: SiteNavigationGroup[],
  destinations: CtaDestination[],
): GlobalHeaderProps {
  const lineCtaDestination =
    destinations.find((destination) => destination.id === header.lineCta.destinationId) ??
    destinations[0];

  const drawerItems = navigationGroups
    .flatMap((group) => group.items)
    .filter(
      (item) =>
        item.visibility.surfaces.includes("drawer") &&
        item.visibility.drawer?.includeInDrawer,
    )
    .sort(
      (left, right) =>
        (left.visibility.drawer?.priority ?? Number.MAX_SAFE_INTEGER) -
        (right.visibility.drawer?.priority ?? Number.MAX_SAFE_INTEGER),
    )
    .map((item) => ({
      id: item.id,
      label: item.label,
      href: item.href,
      ariaLabel: item.ariaLabel,
    }));

  return {
    ariaLabel: header.ariaLabel,
    brand: header.brand,
    lineCta: {
      label: header.lineCta.label,
      ariaLabel: header.lineCta.ariaLabel,
      href: lineCtaDestination?.href ?? "#",
    },
    menuTrigger: header.menuTrigger,
    visibility: header.visibility,
    drawerItems,
  };
}
