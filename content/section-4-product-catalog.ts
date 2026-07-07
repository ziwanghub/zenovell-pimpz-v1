import { products as commerceProducts } from "./products";

export type Section4ProductFeatureIcon =
  | "droplet"
  | "heart"
  | "flask-conical"
  | "sparkles"
  | "shield-check";

export type Section4TrustIcon =
  | "truck"
  | "package"
  | "lock-keyhole"
  | "headphones";

export type Section4ProductFeature = {
  iconName: Section4ProductFeatureIcon;
  title: string;
  sub?: string;
};

export type Section4ProductCard = {
  slug: string;
  title: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
  badge?: {
    label: string;
  };
  features: [Section4ProductFeature, Section4ProductFeature, Section4ProductFeature];
  pricing: {
    salePrice: string;
    originalPrice: string;
    ariaLabel: string;
  };
  cta: {
    label: string;
    ariaLabel: string;
    href: string;
  };
};

export type Section4TrustItem = {
  iconName: Section4TrustIcon;
  title: string;
  sub: string;
};

export type Section4ProductCatalogContent = {
  sectionLabel: string;
  ariaLabel: string;
  heading: string;
  subtitle: string;
  products: Section4ProductCard[];
  trustItems: Section4TrustItem[];
  finalCta: {
    label: string;
    ariaLabel: string;
    href: string;
  };
  footerNote: string;
};

// Map from central Product Authority to the legacy UI shape.
// This guarantees 100% identical output for existing sections.
// The central products.ts is now the source of truth for commerce data.
const mapToCatalogCard = (p: (typeof commerceProducts)[number]): Section4ProductCard => ({
  slug: p.slug,
  title: p.title,
  subtitle: p.subtitle,
  imageSrc: p.imageSrc,
  imageAlt: p.imageAlt,
  badge: p.badge,
  features: p.features as [Section4ProductFeature, Section4ProductFeature, Section4ProductFeature],
  pricing: {
    salePrice: p.pricing.sale.display,
    originalPrice: p.pricing.original.display,
    ariaLabel: `ราคา ${p.title} พิเศษ ${p.pricing.sale.display.replace(".", "")} บาท ราคาปกติ ${p.pricing.original.display.replace(".", "")} บาท`,
  },
  cta: {
    label: p.cta.label,
    ariaLabel: p.cta.ariaLabel,
    href: "#",
  },
});

export const section4ProductCatalogContent: Section4ProductCatalogContent = {
  sectionLabel: "SECTION 4",
  ariaLabel: "สินค้าแนะนำทั้งหมด",
  heading: "สินค้าแนะนำทั้งหมด",
  subtitle: "เลือกผลิตภัณฑ์ที่ใช่ สำหรับคุณ",
  products: commerceProducts.map(mapToCatalogCard),
  trustItems: [
    {
      iconName: "truck",
      title: "จัดส่งรวดเร็ว",
      sub: "1-2 วัน ทั่วประเทศ",
    },
    {
      iconName: "package",
      title: "แพ็กเกจปิดสนิท",
      sub: "ไม่ระบุสินค้า",
    },
    {
      iconName: "lock-keyhole",
      title: "ข้อมูลส่วนตัวปลอดภัย",
      sub: "ไม่เปิดเผยข้อมูลลูกค้า",
    },
    {
      iconName: "headphones",
      title: "ปรึกษาฟรีผ่าน LINE",
      sub: "ทีมงานพร้อมให้คำแนะนำ",
    },
  ],
  finalCta: {
    label: "ปรึกษาหรือสั่งซื้อผ่าน LINE",
    ariaLabel: "ปรึกษาหรือสั่งซื้อสินค้าทั้งหมดผ่าน LINE",
    href: "#",
  },
  footerNote: "ZENOVELL • Modern Intimate Wellness",
};
