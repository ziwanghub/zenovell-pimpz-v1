import { LINE_OA_URL } from "@/lib/commerce/cta-contract";

export type SiteLinkKind =
  | "route"
  | "anchor"
  | "line"
  | "tel"
  | "mailto"
  | "social"
  | "external"
  | "placeholder";

export type SiteLinkSurface =
  | "header"
  | "drawer"
  | "footer"
  | "cta"
  | "section";

export type AnalyticsEventKey =
  | "page_view"
  | "hero_cta"
  | "line_click"
  | "menu_open"
  | "menu_click"
  | "faq_expand"
  | "product_click"
  | "footer_click"
  | "contact_click"
  | "social_click";

export type HeaderVisibilityRule = {
  hideOnTop?: boolean;
  hideWhenDrawerOpen?: boolean;
  showActiveState?: boolean;
  sticky?: boolean;
};

export type DrawerVisibilityRule = {
  includeInDrawer: boolean;
  priority: number;
};

export type SiteLinkVisibility = {
  surfaces: SiteLinkSurface[];
  header?: HeaderVisibilityRule;
  drawer?: DrawerVisibilityRule;
  footerColumnId?: "main-menu" | "products" | "services";
};

export type SiteLink = {
  id: string;
  label: string;
  href: string;
  kind: SiteLinkKind;
  ariaLabel: string;
  visibility: SiteLinkVisibility;
  analyticsEventKey?: AnalyticsEventKey;
  external?: boolean;
  placeholderSafe?: boolean;
};

export type SiteNavigationGroup = {
  id: "main-menu" | "products" | "services";
  label: string;
  items: SiteLink[];
};

export type SiteContact = {
  id: "line" | "phone" | "email" | "address";
  label: string;
  value: string;
  subtext?: string;
  href?: string;
  kind: Extract<SiteLinkKind, "line" | "tel" | "mailto" | "placeholder"> | "static";
  ariaLabel?: string;
  interactive: boolean;
  analyticsEventKey?: Extract<AnalyticsEventKey, "line_click" | "contact_click">;
};

export type SiteSocialLink = {
  id: "facebook" | "instagram" | "tiktok" | "youtube";
  label: string;
  href: string;
  kind: "social" | "placeholder";
  ariaLabel: string;
  analyticsEventKey: "social_click";
  placeholderSafe: boolean;
};

export type CtaDestination = {
  id:
    | "header-line"
    | "hero-line"
    | "section-line"
    | "support-line"
    | "footer-line";
  label: string;
  href: string;
  kind: "line" | "placeholder";
  ariaLabel: string;
  analyticsEventKey?: Extract<AnalyticsEventKey, "hero_cta" | "line_click">;
  placeholderSafe: boolean;
};

export const siteNavigationGroups: [
  SiteNavigationGroup,
  SiteNavigationGroup,
  SiteNavigationGroup,
] = [
  {
    id: "main-menu",
    label: "เมนูหลัก",
    items: [
      {
        id: "home",
        label: "หน้าแรก",
        href: "#hero",
        kind: "anchor",
        ariaLabel: "ไปที่หน้าแรก",
        visibility: {
          surfaces: ["header", "drawer", "footer"],
          header: { sticky: true, showActiveState: true },
          drawer: { includeInDrawer: true, priority: 10 },
          footerColumnId: "main-menu",
        },
        analyticsEventKey: "menu_click",
      },
      {
        id: "catalog",
        label: "สินค้าทั้งหมด",
        href: "#section-4-product-catalog",
        kind: "anchor",
        ariaLabel: "ไปที่สินค้าทั้งหมด",
        visibility: {
          surfaces: ["drawer", "footer"],
          drawer: { includeInDrawer: true, priority: 20 },
          footerColumnId: "main-menu",
        },
        analyticsEventKey: "menu_click",
      },
      {
        id: "about",
        label: "เกี่ยวกับเรา",
        href: "#section-5-why-choose-us",
        kind: "anchor",
        ariaLabel: "ไปที่เกี่ยวกับเรา",
        visibility: {
          surfaces: ["drawer", "footer"],
          drawer: { includeInDrawer: true, priority: 30 },
          footerColumnId: "main-menu",
        },
        analyticsEventKey: "menu_click",
      },
      {
        id: "reviews",
        label: "รีวิวลูกค้า",
        href: "#section-8-reviews",
        kind: "anchor",
        ariaLabel: "ไปที่รีวิวลูกค้า",
        visibility: {
          surfaces: ["drawer", "footer"],
          drawer: { includeInDrawer: true, priority: 40 },
          footerColumnId: "main-menu",
        },
        analyticsEventKey: "menu_click",
      },
      {
        id: "faq",
        label: "คำถามที่พบบ่อย",
        href: "#section-9-faq",
        kind: "anchor",
        ariaLabel: "ไปที่คำถามที่พบบ่อย",
        visibility: {
          surfaces: ["drawer", "footer"],
          drawer: { includeInDrawer: true, priority: 50 },
          footerColumnId: "main-menu",
        },
        analyticsEventKey: "menu_click",
      },
      {
        id: "ordering",
        label: "วิธีการสั่งซื้อ",
        href: "#section-6-how-to-order",
        kind: "anchor",
        ariaLabel: "ไปที่วิธีการสั่งซื้อ",
        visibility: {
          surfaces: ["drawer", "footer"],
          drawer: { includeInDrawer: true, priority: 60 },
          footerColumnId: "main-menu",
        },
        analyticsEventKey: "menu_click",
      },
      {
        id: "articles",
        label: "บทความ",
        href: "#",
        kind: "placeholder",
        ariaLabel: "ไปที่บทความ",
        visibility: {
          surfaces: ["drawer", "footer"],
          drawer: { includeInDrawer: true, priority: 70 },
          footerColumnId: "main-menu",
        },
        analyticsEventKey: "menu_click",
        placeholderSafe: true,
      },
      {
        id: "contact",
        label: "ติดต่อเรา",
        href: "#section-11-footer",
        kind: "anchor",
        ariaLabel: "ไปที่ติดต่อเรา",
        visibility: {
          surfaces: ["drawer", "footer"],
          drawer: { includeInDrawer: true, priority: 80 },
          footerColumnId: "main-menu",
        },
        analyticsEventKey: "menu_click",
      },
    ],
  },
  {
    id: "products",
    label: "ข้อมูลสินค้า",
    items: [
      {
        id: "nicky-pimpz-boss",
        label: "Nicky Pimpz Boss",
        href: "#section-3",
        kind: "anchor",
        ariaLabel: "ดูข้อมูลสินค้า Nicky Pimpz Boss",
        visibility: {
          surfaces: ["footer"],
          footerColumnId: "products",
        },
        analyticsEventKey: "product_click",
      },
      {
        id: "boss-men",
        label: "Boss Men",
        href: "#",
        kind: "placeholder",
        ariaLabel: "ดูข้อมูลสินค้า Boss Men",
        visibility: {
          surfaces: ["footer"],
          footerColumnId: "products",
        },
        analyticsEventKey: "product_click",
        placeholderSafe: true,
      },
      {
        id: "boss-lady",
        label: "Boss Lady",
        href: "#",
        kind: "placeholder",
        ariaLabel: "ดูข้อมูลสินค้า Boss Lady",
        visibility: {
          surfaces: ["footer"],
          footerColumnId: "products",
        },
        analyticsEventKey: "product_click",
        placeholderSafe: true,
      },
      {
        id: "np-gel",
        label: "NP Gel",
        href: "#",
        kind: "placeholder",
        ariaLabel: "ดูข้อมูลสินค้า NP Gel",
        visibility: {
          surfaces: ["footer"],
          footerColumnId: "products",
        },
        analyticsEventKey: "product_click",
        placeholderSafe: true,
      },
      {
        id: "np-wipes",
        label: "NP Men's Wipes",
        href: "#",
        kind: "placeholder",
        ariaLabel: "ดูข้อมูลสินค้า NP Men's Wipes",
        visibility: {
          surfaces: ["footer"],
          footerColumnId: "products",
        },
        analyticsEventKey: "product_click",
        placeholderSafe: true,
      },
      {
        id: "b21",
        label: "B21",
        href: "#",
        kind: "placeholder",
        ariaLabel: "ดูข้อมูลสินค้า B21",
        visibility: {
          surfaces: ["footer"],
          footerColumnId: "products",
        },
        analyticsEventKey: "product_click",
        placeholderSafe: true,
      },
    ],
  },
  {
    id: "services",
    label: "บริการของเรา",
    items: [
      {
        id: "consulting",
        label: "ให้คำปรึกษา",
        href: LINE_OA_URL,
        kind: "line",
        ariaLabel: "ไปที่บริการให้คำปรึกษา",
        visibility: {
          surfaces: ["footer", "drawer"],
          drawer: { includeInDrawer: true, priority: 90 },
          footerColumnId: "services",
        },
        analyticsEventKey: "line_click",
      },
      {
        id: "line-order",
        label: "การสั่งซื้อผ่าน LINE",
        href: LINE_OA_URL,
        kind: "line",
        ariaLabel: "ไปที่การสั่งซื้อผ่าน LINE",
        visibility: {
          surfaces: ["footer", "drawer"],
          drawer: { includeInDrawer: true, priority: 100 },
          footerColumnId: "services",
        },
        analyticsEventKey: "line_click",
      },
      {
        id: "shipping",
        label: "การจัดส่ง",
        href: "#section-7",
        kind: "anchor",
        ariaLabel: "ไปที่ข้อมูลการจัดส่ง",
        visibility: {
          surfaces: ["footer"],
          footerColumnId: "services",
        },
        analyticsEventKey: "footer_click",
      },
      {
        id: "payment",
        label: "การชำระเงิน",
        href: "#section-11",
        kind: "anchor",
        ariaLabel: "ไปที่ข้อมูลการชำระเงิน",
        visibility: {
          surfaces: ["footer"],
          footerColumnId: "services",
        },
        analyticsEventKey: "footer_click",
      },
      {
        id: "privacy",
        label: "ความเป็นส่วนตัว",
        href: "#",
        kind: "placeholder",
        ariaLabel: "ไปที่นโยบายความเป็นส่วนตัว",
        visibility: {
          surfaces: ["footer"],
          footerColumnId: "services",
        },
        analyticsEventKey: "footer_click",
        placeholderSafe: true,
      },
      {
        id: "terms",
        label: "เงื่อนไขการให้บริการ",
        href: "#",
        kind: "placeholder",
        ariaLabel: "ไปที่เงื่อนไขการให้บริการ",
        visibility: {
          surfaces: ["footer"],
          footerColumnId: "services",
        },
        analyticsEventKey: "footer_click",
        placeholderSafe: true,
      },
    ],
  },
];

export const siteContacts: [
  SiteContact,
  SiteContact,
  SiteContact,
  SiteContact,
] = [
  {
    id: "line",
    label: "LINE Official",
    value: "@zenovell",
    href: "#line-primary",
    kind: "placeholder",
    ariaLabel: "ติดต่อ LINE Official @zenovell",
    interactive: true,
    analyticsEventKey: "line_click",
  },
  {
    id: "phone",
    label: "โทรศัพท์",
    value: "099-124-4289",
    subtext: "(10:00 - 22:00 น.)",
    href: "tel:0991244289",
    kind: "tel",
    ariaLabel: "โทรหาเซโนเวลล์ที่ 099-124-4289",
    interactive: true,
    analyticsEventKey: "contact_click",
  },
  {
    id: "email",
    label: "อีเมล",
    value: "support@zenovell.com",
    href: "mailto:support@zenovell.com",
    kind: "mailto",
    ariaLabel: "ส่งอีเมลหา support@zenovell.com",
    interactive: true,
    analyticsEventKey: "contact_click",
  },
  {
    id: "address",
    label: "ที่อยู่",
    value: "บริษัท เซโนเวลล์ จำกัด",
    subtext: "กรุงเทพมหานคร ประเทศไทย",
    kind: "static",
    interactive: false,
  },
];

export const siteSocialLinks: [
  SiteSocialLink,
  SiteSocialLink,
  SiteSocialLink,
  SiteSocialLink,
] = [
  {
    id: "facebook",
    label: "Facebook",
    href: "#",
    kind: "placeholder",
    ariaLabel: "ติดตาม ZENOVELL บน Facebook",
    analyticsEventKey: "social_click",
    placeholderSafe: true,
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "#",
    kind: "placeholder",
    ariaLabel: "ติดตาม ZENOVELL บน Instagram",
    analyticsEventKey: "social_click",
    placeholderSafe: true,
  },
  {
    id: "tiktok",
    label: "TikTok",
    href: "#",
    kind: "placeholder",
    ariaLabel: "ติดตาม ZENOVELL บน TikTok",
    analyticsEventKey: "social_click",
    placeholderSafe: true,
  },
  {
    id: "youtube",
    label: "YouTube",
    href: "#",
    kind: "placeholder",
    ariaLabel: "ติดตาม ZENOVELL บน YouTube",
    analyticsEventKey: "social_click",
    placeholderSafe: true,
  },
];

export const ctaDestinations: CtaDestination[] = [
  {
    id: "header-line",
    label: "ปรึกษาผ่าน LINE",
    href: LINE_OA_URL,
    kind: "line",
    ariaLabel: "ปรึกษาผ่าน LINE",
    analyticsEventKey: "line_click",
    placeholderSafe: false,
  },
  {
    id: "hero-line",
    label: "ปรึกษาผู้เชี่ยวชาญผ่าน LINE",
    href: "#line-primary",
    kind: "placeholder",
    ariaLabel: "ปรึกษาผู้เชี่ยวชาญผ่าน LINE",
    analyticsEventKey: "hero_cta",
    placeholderSafe: true,
  },
  {
    id: "section-line",
    label: "ปรึกษาหรือสั่งซื้อผ่าน LINE",
    href: "#line-primary",
    kind: "placeholder",
    ariaLabel: "ปรึกษาหรือสั่งซื้อผ่าน LINE",
    analyticsEventKey: "line_click",
    placeholderSafe: true,
  },
  {
    id: "support-line",
    label: "ปรึกษาผ่าน LINE",
    href: "#line-primary",
    kind: "placeholder",
    ariaLabel: "ปรึกษาผ่าน LINE",
    analyticsEventKey: "line_click",
    placeholderSafe: true,
  },
  {
    id: "footer-line",
    label: "LINE Official",
    href: "#line-primary",
    kind: "placeholder",
    ariaLabel: "ติดต่อ LINE Official @zenovell",
    analyticsEventKey: "line_click",
    placeholderSafe: true,
  },
];

export const globalChromeVisibility = {
  // Transition note:
  // Canonical global header behavior visibility now lives in `content/site-header.ts`.
  // This object remains navigation-adjacent for drawer-layer behavior only.
  drawer: {
    portalRecommended: true,
    bodyScrollLockRequired: true,
    focusTrapRequired: true,
  },
} as const;
