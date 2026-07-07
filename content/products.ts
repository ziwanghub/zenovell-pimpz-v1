/**
 * Product Authority (Phase 4A)
 *
 * Central source of truth for commerce product data on the landing page.
 * Follows conventions from existing content/*.ts files.
 *
 * This is the single source of truth for:
 * - Product identification (id, slug, sku)
 * - Pricing (structured Money + display)
 * - Promotions
 * - CTA labels (mapping)
 * - LINE payload metadata (for future builder)
 * - UTM compatibility (context passed at use time)
 * - Active status
 *
 * UI-specific fields (images, features, badges) are included here for the
 * catalog authority migration but belong conceptually to presentation layer.
 * Future phases may separate ui extensions.
 */

export type Money = {
  amount: number; // in satang (e.g. 99000 = 990.00 THB)
  currency: "THB";
  display: string; // e.g. "990.-"
};

export type Promotion = {
  id: string;
  type: "discount" | "bundle" | "limited";
  label: string;
  discountPercent?: number;
  endsAt?: string; // ISO date
};

export type LinePayloadMetadata = {
  sku: string;
  title: string;
  saleDisplay: string;
  originalDisplay: string;
};

export type ProductCta = {
  label: string;
  ariaLabel: string;
};

export type Product = {
  id: string;
  slug: string;
  sku: string;
  title: string; // display name
  subtitle: string; // short name / tagline
  category: "capsule" | "gel" | "wipes" | "bundle" | "other";
  pricing: {
    sale: Money;
    original: Money;
  };
  promotions: Promotion[];
  cta: ProductCta; // CTA mapping
  linePayloadMetadata: LinePayloadMetadata;
  active: boolean;
  // Presentation fields (kept for current catalog compatibility)
  imageSrc: string;
  imageAlt: string;
  badge?: {
    label: string;
  };
  features: Array<{
    iconName: string;
    title: string;
    sub?: string;
  }>;
};

export const products: Product[] = [
  {
    id: "prod-npb-001",
    slug: "nicky-pimpz-boss",
    sku: "NPB-001",
    title: "NICKY PIMPZ BOSS",
    subtitle: "เพิ่มความมั่นใจ กระชับ อิ่มฟู",
    category: "capsule",
    pricing: {
      sale: { amount: 99000, currency: "THB", display: "990.-" },
      original: { amount: 129000, currency: "THB", display: "1,290.-" },
    },
    promotions: [
      {
        id: "promo-launch",
        type: "discount",
        label: "พิเศษ",
        discountPercent: 23,
      },
    ],
    cta: {
      label: "สั่งซื้อผ่าน LINE",
      ariaLabel: "สั่งซื้อ NICKY PIMPZ BOSS ผ่าน LINE",
    },
    linePayloadMetadata: {
      sku: "NPB-001",
      title: "NICKY PIMPZ BOSS",
      saleDisplay: "990.-",
      originalDisplay: "1,290.-",
    },
    active: true,
    imageSrc: "/images/section-4/products/nicky-pimpz-product3.jpeg",
    imageAlt:
      "Nicky Pimpz Boss product bottle with ginseng root and fruit on a glowing dark pedestal",
    badge: {
      label: "BEST SELLER",
    },
    features: [
      { iconName: "droplet", title: "กระชับ", sub: "อิ่มฟู" },
      { iconName: "heart", title: "มั่นใจ", sub: "มากขึ้น" },
      { iconName: "shield-check", title: "ทานง่าย", sub: "30 แคปซูล" },
    ],
  },
  {
    id: "prod-bsm-002",
    slug: "boss-men",
    sku: "BSM-002",
    title: "BOSS MEN",
    subtitle: "เพิ่มพลัง ฟื้นฟู สมรรถภาพ",
    category: "capsule",
    pricing: {
      sale: { amount: 99000, currency: "THB", display: "990.-" },
      original: { amount: 129000, currency: "THB", display: "1,290.-" },
    },
    promotions: [
      {
        id: "promo-launch",
        type: "discount",
        label: "พิเศษ",
        discountPercent: 23,
      },
    ],
    cta: {
      label: "สั่งซื้อผ่าน LINE",
      ariaLabel: "สั่งซื้อ BOSS MEN ผ่าน LINE",
    },
    linePayloadMetadata: {
      sku: "BSM-002",
      title: "BOSS MEN",
      saleDisplay: "990.-",
      originalDisplay: "1,290.-",
    },
    active: true,
    imageSrc: "/images/section-4/products/boss-men-product1.jpeg",
    imageAlt:
      "Boss Men premium stamina box on a dark pedestal with gold energy glow",
    features: [
      { iconName: "heart", title: "เพิ่มพลัง", sub: "มั่นใจ" },
      { iconName: "flask-conical", title: "ฟื้นฟู", sub: "ภายใน" },
      { iconName: "shield-check", title: "ดูแลง่าย", sub: "ทุกวัน" },
    ],
  },
  {
    id: "prod-bsl-003",
    slug: "boss-lady",
    sku: "BSL-003",
    title: "BOSS LADY",
    subtitle: "เพิ่มความสุข อารมณ์ดี สมดุลฮอร์โมน",
    category: "capsule",
    pricing: {
      sale: { amount: 89000, currency: "THB", display: "890.-" },
      original: { amount: 119000, currency: "THB", display: "1,190.-" },
    },
    promotions: [
      {
        id: "promo-launch",
        type: "discount",
        label: "พิเศษ",
        discountPercent: 25,
      },
    ],
    cta: {
      label: "สั่งซื้อผ่าน LINE",
      ariaLabel: "สั่งซื้อ BOSS LADY ผ่าน LINE",
    },
    linePayloadMetadata: {
      sku: "BSL-003",
      title: "BOSS LADY",
      saleDisplay: "890.-",
      originalDisplay: "1,190.-",
    },
    active: true,
    imageSrc: "/images/section-4/products/boss-lady-product1.jpeg",
    imageAlt: "Boss Lady product box with pink floral energy background",
    features: [
      { iconName: "heart", title: "อารมณ์ดี", sub: "สดใส" },
      { iconName: "flask-conical", title: "สมดุล", sub: "ฮอร์โมน" },
      { iconName: "sparkles", title: "ความสุข", sub: "เพิ่มขึ้น" },
    ],
  },
  {
    id: "prod-npg-004",
    slug: "np-gel",
    sku: "NPG-004",
    title: "NP GEL",
    subtitle: "เจลเพิ่มความชุ่มชื้น อิ่มฟู",
    category: "gel",
    pricing: {
      sale: { amount: 59000, currency: "THB", display: "590.-" },
      original: { amount: 79000, currency: "THB", display: "790.-" },
    },
    promotions: [
      {
        id: "promo-launch",
        type: "discount",
        label: "พิเศษ",
        discountPercent: 25,
      },
    ],
    cta: {
      label: "สั่งซื้อผ่าน LINE",
      ariaLabel: "สั่งซื้อ NP GEL ผ่าน LINE",
    },
    linePayloadMetadata: {
      sku: "NPG-004",
      title: "NP GEL",
      saleDisplay: "590.-",
      originalDisplay: "790.-",
    },
    active: true,
    imageSrc: "/images/section-4/products/np-gel-product1.jpeg",
    imageAlt:
      "NP Gel product tube on dark pedestal with pink liquid splash background",
    features: [
      { iconName: "droplet", title: "ชุ่มชื้น", sub: "ทันที" },
      { iconName: "sparkles", title: "อิ่มฟู", sub: "เรียบลื่น" },
      { iconName: "shield-check", title: "ใช้งานง่าย", sub: "สะดวก" },
    ],
  },
  {
    id: "prod-npw-005",
    slug: "np-mens-wipes",
    sku: "NPW-005",
    title: "NP MEN'S WIPES",
    subtitle: "แผ่นเช็ดทำความสะอาดจุดซ่อนเร้นชาย",
    category: "wipes",
    pricing: {
      sale: { amount: 39000, currency: "THB", display: "390.-" },
      original: { amount: 59000, currency: "THB", display: "590.-" },
    },
    promotions: [
      {
        id: "promo-launch",
        type: "discount",
        label: "พิเศษ",
        discountPercent: 34,
      },
    ],
    cta: {
      label: "สั่งซื้อผ่าน LINE",
      ariaLabel: "สั่งซื้อ NP MEN'S WIPES ผ่าน LINE",
    },
    linePayloadMetadata: {
      sku: "NPW-005",
      title: "NP MEN'S WIPES",
      saleDisplay: "390.-",
      originalDisplay: "590.-",
    },
    active: true,
    imageSrc: "/images/section-4/products/np-mens-wipes-product1.jpeg",
    imageAlt:
      "NP Men's Wipes box and sachet on dark pedestal with cool splash background",
    features: [
      { iconName: "sparkles", title: "สะอาด", sub: "สดชื่น" },
      { iconName: "shield-check", title: "พกง่าย", sub: "ใช้งานไว" },
      { iconName: "droplet", title: "อ่อนโยน", sub: "มั่นใจ" },
    ],
  },
  {
    id: "prod-b21-006",
    slug: "b21",
    sku: "B21-006",
    title: "B21",
    subtitle: "สุดยอดสมรรถภาพชาย",
    category: "capsule",
    pricing: {
      sale: { amount: 119000, currency: "THB", display: "1,190.-" },
      original: { amount: 159000, currency: "THB", display: "1,590.-" },
    },
    promotions: [
      {
        id: "promo-launch",
        type: "discount",
        label: "พิเศษ",
        discountPercent: 25,
      },
    ],
    cta: {
      label: "สั่งซื้อผ่าน LINE",
      ariaLabel: "สั่งซื้อ B21 ผ่าน LINE",
    },
    linePayloadMetadata: {
      sku: "B21-006",
      title: "B21",
      saleDisplay: "1,190.-",
      originalDisplay: "1,590.-",
    },
    active: true,
    imageSrc: "/images/section-4/products/be21-product1.jpeg",
    imageAlt: "B21 product box with pink floral glow on dark pedestal",
    features: [
      { iconName: "heart", title: "สมรรถภาพ", sub: "มั่นใจ" },
      { iconName: "flask-conical", title: "ฟื้นตัว", sub: "ภายใน" },
      { iconName: "sparkles", title: "พลังชาย", sub: "เต็มที่" },
    ],
  },
];

/**
 * Helper to get a product by slug.
 * Used by future commerce layers (CTA wiring, events, message builder).
 */
export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

/**
 * Featured product (Nicky Pimpz Boss) for hero / primary surfaces.
 */
export const featuredProduct = products[0];

/**
 * UTM compatibility note:
 * UTM values (source, medium, campaign, content) are captured at runtime
 * and passed via LineMessageContext (see blueprint). Not stored per-product.
 */
