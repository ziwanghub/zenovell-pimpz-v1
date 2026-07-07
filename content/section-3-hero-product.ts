import { featuredProduct } from "./products";

export type Section3BadgeType = "bestSeller" | "capsules";

export type Section3Badge = {
  type: Section3BadgeType;
  topLine: string;
  bottomLine: string;
  caption: string;
};

export type Section3BenefitIcon = "Flower2" | "Droplet" | "Heart";

export type Section3Benefit = {
  iconName: Section3BenefitIcon;
  title: string;
  sub: string;
};

export type Section3MiniTrustIcon =
  | "ShieldCheck"
  | "FlaskConical"
  | "Package"
  | "Headphones";

export type Section3MiniTrust = {
  iconName: Section3MiniTrustIcon;
  title: [string, string];
};

export type Section3Content = {
  sectionLabel: string;
  ariaLabel: string;
  superline: string;
  productName: string;
  productTagline: string;
  badges: Section3Badge[];
  benefits: Section3Benefit[];
  pricing: {
    label: string;
    salePrice: string;
    originalPrice: string;
    originalPriceLabel: string;
    ariaLabel: string;
  };
  cta: {
    label: string;
    ariaLabel: string;
    href: string;
  };
  miniTrust: Section3MiniTrust[];
  artwork: {
    src: string;
    alt: string;
  };
};

export const section3HeroProductContent: Section3Content = {
  sectionLabel: "SECTION 3",
  ariaLabel: "สินค้าแนะนำ Nicky Pimpz Boss",
  superline: "สินค้าแนะนำ",
  // Core product data now sourced from central Product Authority
  productName: featuredProduct.title,
  productTagline: featuredProduct.subtitle,
  badges: [
    {
      type: "bestSeller",
      topLine: "BEST",
      bottomLine: "SELLER",
      caption: "ยอดขายอันดับ 1",
    },
    {
      type: "capsules",
      topLine: "30",
      bottomLine: "CAPSULES",
      caption: "ทานง่าย 1 แคปซูล/วัน",
    },
  ],
  benefits: [
    { iconName: "Flower2", title: "เพิ่มความมั่นใจ", sub: "กระชับ อิ่มฟู" },
    { iconName: "Droplet", title: "เติมสมดุลฮอร์โมน", sub: "บำรุงจากภายใน" },
    { iconName: "Heart", title: "เพิ่มเสน่ห์ดึงดูด", sub: "รู้สึกได้ในตัวคุณ" },
  ],
  pricing: {
    label: "พิเศษวันนี้",
    salePrice: featuredProduct.pricing.sale.display,
    originalPrice: featuredProduct.pricing.original.display,
    originalPriceLabel: "ราคาปกติ",
    ariaLabel: `ราคาพิเศษวันนี้ ${featuredProduct.pricing.sale.display.replace(".", "")} บาท ราคาปกติ ${featuredProduct.pricing.original.display.replace(".", "")} บาท`,
  },
  cta: {
    label: featuredProduct.cta.label,
    ariaLabel: featuredProduct.cta.ariaLabel,
    href: "#",
  },
  miniTrust: [
    { iconName: "ShieldCheck", title: ["ปลอดภัย", "ได้รับมาตรฐาน"] },
    { iconName: "FlaskConical", title: ["พัฒนาโดย", "นักวิจัยด้านสุขภาพสตรี"] },
    { iconName: "Package", title: ["จัดส่งปกปิด", "ไม่ระบุสินค้า"] },
    { iconName: "Headphones", title: ["ปรึกษาฟรี", "ทีมงานพร้อมแนะนำ"] },
  ],
  artwork: {
    src: "/images/section-3/bg-hero-product-section3.jpeg",
    alt: "Nicky Pimpz Boss intimate serum bottle 30 capsules with ginseng root and beet root on dark stone slab with pink energy glow",
  },
};
