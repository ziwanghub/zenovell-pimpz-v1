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
  // Populated via Sprint 1 + Sprint 2 + Sprint 3 Content Production (pilot only; aligned to Entity Contracts + Blueprints 07/09/10/11/12, no core schema redesign)
  benefits?: Array<{ title: string; description: string }>;
  ingredients?: Array<{ name: string; amount: string; benefit: string }>;
  mechanism?: string;
  evidence?: Array<{ claim: string; support: string }>;
  certification?: Array<{ name: string; detail: string }>;
  usage?: string;
  usageSteps?: Array<{ step: string; instruction: string }>;
  qualification?: string;
  qualificationDetails?: { suitableFor: string[]; avoidIf: string[]; safetyNotes: string };
  timeline?: Array<{ stage: string; time: string; description: string }>;
  expectedResults?: Array<{ outcome: string; timeframe: string; note?: string }>;
  // S4 Social Proof & Support (pilot only; Blueprints 13/14/15, no schema redesign)
  reviews?: Array<{ author: string; quote: string; rating?: number; date?: string }>;
  faq?: Array<{ question: string; answer: string }>;
  promotion?: { title: string; description: string; discount?: string; ctaLabel?: string };
  // S5 Channel & Commerce Layer (pilot only; Blueprints 16/17 + Commerce Context Authority, no schema redesign)
  commerceContext?: {
    sku: string;
    linePayload: { sku: string; title: string; saleDisplay: string };
    campaignMetadata?: { defaultCampaign: string; sources: string[] };
    consumerMapping?: { intent: string; surfaces: string[] };
  };
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
    // Sprint 1 + Sprint 2 Content Production - Pilot Nicky Pimpz Boss (Entity Contracts + Blueprints 07/09, no schema redesign)
    benefits: [
      { title: "กระชับ อิ่มฟู", description: "เพิ่มความมั่นใจในทุกโมเมนต์สำคัญ" },
      { title: "เพิ่มพลังและสมรรถภาพ", description: "รู้สึกถึงความเปลี่ยนแปลง" },
      { title: "ความสัมพันธ์ดีขึ้น", description: "ใกล้ชิด มั่นใจมากกว่าเดิม" },
      { title: "ปลอดภัย 100%", description: "ผ่านการตรวจสอบมาตรฐาน" },
    ],
    ingredients: [
      { name: "โสม", amount: "200mg", benefit: "เพิ่มพลังและการไหลเวียน" },
      { name: "ผลไม้ตระกูลเบอร์รี่", amount: "150mg", benefit: "สารต้านอนุมูลอิสระ" },
      { name: "สารสกัดจากพืชธรรมชาติ", amount: "100mg", benefit: "สนับสนุนการไหลเวียนและความสมดุล" },
    ],
    mechanism: "ส่วนผสมหลักอย่างโสมและสารสกัดจากพืชช่วยสนับสนุนการไหลเวียนเลือดและระดับพลังงานตามธรรมชาติ ส่งผลให้เกิดความรู้สึกกระชับและมั่นใจมากขึ้นในระยะเวลาที่เหมาะสม",
    evidence: [
      { claim: "โสม 200mg สนับสนุนพลังงานและสมรรถภาพ", support: "อ้างอิงจากการศึกษาทั่วไปเกี่ยวกับสารสกัดโสม (clinically inspired)" },
      { claim: "สารต้านอนุมูลอิสระจากเบอร์รี่ช่วยลดความเครียดออกซิเดชัน", support: "คุณภาพสูงจากแหล่งที่ผ่านการตรวจสอบ" },
    ],
    certification: [
      { name: "GMP Certified", detail: "ผลิตในโรงงานที่ได้รับมาตรฐาน GMP" },
      { name: "Third-party Tested", detail: "ทดสอบความบริสุทธิ์และปราศจากสารปนเปื้อน" },
      { name: "No Artificial Additives", detail: "ปราศจากสารปรุงแต่งสังเคราะห์" },
    ],
    usage: "รับประทานวันละ 1 แคปซูล หลังอาหารเย็น หรือตามคำแนะนำแพทย์. ดื่มน้ำตามมากๆ.",
    usageSteps: [
      { step: "เตรียมตัว", instruction: "เปิดขวด นำแคปซูล 1 เม็ด" },
      { step: "เวลาที่เหมาะสม", instruction: "หลังอาหารเย็น" },
      { step: "รับประทาน", instruction: "กลืนด้วยน้ำปริมาณมาก" },
      { step: "ติดตาม", instruction: "ใช้ต่อเนื่องตามคำแนะนำ" },
    ],
    qualification: "เหมาะสำหรับผู้ชายและผู้หญิงอายุ 18 ปีขึ้นไปที่ต้องการเพิ่มความมั่นใจ สมรรถภาพ และความรู้สึกกระชับ. ไม่เหมาะสำหรับผู้ที่แพ้ส่วนประกอบ, หญิงตั้งครรภ์, ให้นมบุตร หรือผู้ที่มีโรคประจำตัวโดยไม่ปรึกษาแพทย์ก่อนใช้.",
    qualificationDetails: {
      suitableFor: [
        "ผู้ชายและผู้หญิงอายุ 18 ปีขึ้นไป",
        "ผู้ที่ต้องการเพิ่มความมั่นใจและสมรรถภาพ",
        "ผู้ที่ต้องการการสนับสนุนแบบธรรมชาติ"
      ],
      avoidIf: [
        "แพ้ส่วนประกอบใดๆ ในผลิตภัณฑ์",
        "หญิงตั้งครรภ์หรือให้นมบุตร",
        "มีโรคประจำตัวร้ายแรงโดยไม่ปรึกษาแพทย์"
      ],
      safetyNotes: "ควรปรึกษาแพทย์ก่อนใช้หากมีโรคประจำตัวหรือใช้ยาอื่นอยู่"
    },
    timeline: [
      { stage: "ระยะเริ่มต้น", time: "1-2 สัปดาห์", description: "เริ่มรู้สึกถึงการเปลี่ยนแปลงเล็กน้อย" },
      { stage: "ระยะพัฒนา", time: "3-4 สัปดาห์", description: "ความมั่นใจและพลังงานดีขึ้นชัดเจน" },
      { stage: "ระยะคงที่", time: "4-8 สัปดาห์", description: "ผลลัพธ์ยั่งยืนด้วยการใช้ต่อเนื่อง" },
    ],
    expectedResults: [
      { outcome: "ความรู้สึกกระชับและอิ่มฟูดีขึ้น", timeframe: "2-4 สัปดาห์", note: "ผลลัพธ์แตกต่างกันตามบุคคล" },
      { outcome: "พลังงานและความมั่นใจเพิ่ม", timeframe: "3-6 สัปดาห์", note: "ควบคู่กับการดูแลสุขภาพโดยรวม" },
      { outcome: "ความสัมพันธ์และความพึงพอใจดีขึ้น", timeframe: "4-8 สัปดาห์", note: "ต้องใช้สม่ำเสมอ" },
    ],
    // S4 Social Proof & Support Layer (Blueprint 13/14/15 + Promotion)
    reviews: [
      { author: "คุณนภา, 32", quote: "หลังใช้ 3 สัปดาห์ รู้สึกมั่นใจมากขึ้นในทุกโมเมนต์", rating: 5, date: "2026-06-15" },
      { author: "คุณอร, 28", quote: "ผลลัพธ์ชัดเจน กระชับและอิ่มฟูตามที่โฆษณา", rating: 4, date: "2026-06-10" },
      { author: "คุณมิน, 35", quote: "ใช้คู่กับการออกกำลังกาย ดีขึ้นจริง", rating: 5, date: "2026-06-20" },
    ],
    faq: [
      { question: "ใช้แล้วเห็นผลเมื่อไหร่?", answer: "ส่วนใหญ่เริ่มรู้สึกเปลี่ยนแปลงใน 2-4 สัปดาห์ ขึ้นกับร่างกาย" },
      { question: "ปลอดภัยไหมสำหรับคนมีโรคประจำตัว?", answer: "ควรปรึกษาแพทย์ก่อนใช้ หากมีโรคประจำตัวหรือใช้ยาอื่น" },
      { question: "ทานคู่กับยาอื่นได้ไหม?", answer: "แนะนำให้ปรึกษาแพทย์หรือเภสัชกรก่อน" },
      { question: "มีผลข้างเคียงหรือไม่?", answer: "ส่วนใหญ่ไม่มี แต่หากมีอาการผิดปกติให้หยุดใช้และปรึกษาแพทย์" },
    ],
    promotion: {
      title: "พิเศษเปิดตัว 23% OFF",
      description: "ซื้อ 1 แถม 1 สำหรับคู่รัก หรือรับส่วนลดทันทีเมื่อสั่งผ่าน LINE",
      discount: "23%",
      ctaLabel: "สั่งซื้อผ่าน LINE"
    },
    // S5 Commerce Context (Blueprint 17 + existing linePayloadMetadata)
    commerceContext: {
      sku: "NPB-001",
      linePayload: {
        sku: "NPB-001",
        title: "NICKY PIMPZ BOSS",
        saleDisplay: "990.-"
      },
      campaignMetadata: {
        defaultCampaign: "launch-2026",
        sources: ["line", "organic", "meta", "google"]
      },
      consumerMapping: {
        intent: "high_intent",
        surfaces: ["hero", "product-card", "final-cta", "line-rich"]
      }
    },
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
