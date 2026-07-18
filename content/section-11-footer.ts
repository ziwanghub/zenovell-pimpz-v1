/**
 * Section 11 Footer — presentation content only.
 *
 * Navigation, contacts, and social destinations are NOT owned here.
 * They are consumed from content/site-navigation.ts (canonical authority):
 * - siteNavigationGroups
 * - siteContacts
 * - siteSocialLinks
 *
 * B2.7 removed the duplicate footer navigation authority (S11-F03).
 */

export type Section11FooterPaymentItem = {
  id: string;
  label: string;
  variant: "visa" | "mastercard" | "jcb" | "promptpay";
};

export type Section11FooterContent = {
  /** Empty / omitted from production UI (development badge removed). */
  sectionLabel?: string;
  ariaLabel: string;
  heading: string;
  description: string;
  contactTitle: string;
  socialCard: {
    title: string;
    description: string;
  };
  privacyPanel: {
    title: string;
    lines: [string, string];
  };
  guarantee: {
    title: string;
    description: string;
  };
  brand: {
    name: string;
    tagline: string;
  };
  legal: {
    /** Static rights line after dynamic year prefix. */
    rightsLine: string;
    rights: string;
  };
  security: {
    title: string;
    description: string;
  };
  payments: [
    Section11FooterPaymentItem,
    Section11FooterPaymentItem,
    Section11FooterPaymentItem,
    Section11FooterPaymentItem,
  ];
  /** Column icon names aligned to siteNavigationGroups order */
  columnIcons: {
    "main-menu": "package";
    products: "info";
    services: "shield-check";
  };
  navAriaLabel: string;
  paymentsAriaLabel: string;
};

export const section11FooterContent: Section11FooterContent = {
  // Development-only section number intentionally omitted from user-facing UI.
  sectionLabel: undefined,
  ariaLabel: "ส่วนท้ายเว็บไซต์ เมนูและช่องทางติดต่อ",
  heading: "เมนูและช่องทางติดต่อ",
  description: "เราพร้อมดูแลคุณ",
  contactTitle: "ช่องทางติดต่อ",
  socialCard: {
    title: "ติดตามเราได้ที่",
    description: "อัปเดตโปรโมชั่นและข่าวสารก่อนใคร",
  },
  privacyPanel: {
    title: "มั่นใจ ปลอดภัย 100%",
    lines: ["ข้อมูลของคุณถูกเข้ารหัส", "และไม่เปิดเผยกับบุคคลภายนอก"],
  },
  guarantee: {
    title: "รับประกันความพึงพอใจ 100%",
    description: "หากไม่พอใจ ยินดีคืนเงินเต็มจำนวน ภายใน 7 วัน",
  },
  brand: {
    name: "ZENOVELL",
    tagline: "Modern Intimate Wellness",
  },
  legal: {
    rightsLine: "ZENOVELL. All rights reserved.",
    rights: "สงวนลิขสิทธิ์ทุกประการ",
  },
  security: {
    title: "Secure",
    description: "SSL Encrypted",
  },
  payments: [
    { id: "visa", label: "VISA", variant: "visa" },
    { id: "mastercard", label: "Mastercard", variant: "mastercard" },
    { id: "jcb", label: "JCB", variant: "jcb" },
    { id: "promptpay", label: "PromptPay", variant: "promptpay" },
  ],
  columnIcons: {
    "main-menu": "package",
    products: "info",
    services: "shield-check",
  },
  navAriaLabel: "เมนูส่วนท้าย",
  paymentsAriaLabel: "วิธีชำระเงินที่รองรับ",
};
