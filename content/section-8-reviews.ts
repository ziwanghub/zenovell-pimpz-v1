export type Section8DistributionItem = {
  label: string;
  percentage: number;
  percentageLabel: string;
};

export type Section8ReviewProduct = {
  label: string;
  imageSrc: string;
  imageAlt: string;
};

export type Section8ReviewCard = {
  initial: string;
  name: string;
  meta: string;
  purchaseBadge: string;
  stars: 1 | 2 | 3 | 4 | 5;
  dateLabel: string;
  reviewLines: [string, string];
  product: Section8ReviewProduct;
};

export type Section8TrustItem = {
  iconName: "shield-check" | "lock-keyhole" | "truck";
  label: string;
};

export type Section8ReviewsContent = {
  sectionLabel: string;
  ariaLabel: string;
  heading: string;
  subtitle: string;
  summary: {
    title: string;
    score: string;
    reviewCountLabel: string;
    distribution: [
      Section8DistributionItem,
      Section8DistributionItem,
      Section8DistributionItem,
      Section8DistributionItem,
      Section8DistributionItem,
    ];
  };
  reviews: [Section8ReviewCard, Section8ReviewCard, Section8ReviewCard];
  moreReviewsRow: {
    title: string;
    description: string;
    ctaLabel: string;
    ariaLabel: string;
    href: string;
  };
  finalCta: {
    label: string;
    ariaLabel: string;
    href: string;
  };
  trustRow: [Section8TrustItem, Section8TrustItem, Section8TrustItem];
};

export const section8ReviewsContent: Section8ReviewsContent = {
  sectionLabel: "SECTION 8",
  ariaLabel: "รีวิวจากลูกค้าจริง",
  heading: "รีวิวจากลูกค้าจริง",
  subtitle: "ความพึงพอใจที่ผู้ใช้จริงบอกต่อ",
  summary: {
    title: "คะแนนเฉลี่ยจากลูกค้า",
    score: "4.9",
    reviewCountLabel: "จาก 1,246 รีวิว",
    distribution: [
      { label: "5 ★", percentage: 92, percentageLabel: "92%" },
      { label: "4 ★", percentage: 6, percentageLabel: "6%" },
      { label: "3 ★", percentage: 2, percentageLabel: "2%" },
      { label: "2 ★", percentage: 0, percentageLabel: "0%" },
      { label: "1 ★", percentage: 0, percentageLabel: "0%" },
    ],
  },
  reviews: [
    {
      initial: "K",
      name: "Karn",
      meta: "อายุ 32 • กรุงเทพฯ",
      purchaseBadge: "ซื้อซ้ำแล้ว",
      stars: 5,
      dateLabel: "2 วันที่แล้ว",
      reviewLines: [
        "ใช้แล้วรู้สึกมั่นใจมากขึ้นจริงๆ ค่ะ น้องสาวชมว่าดีขึ้นด้วย",
        "เนื้อสัมผัสดี ไม่เหนียวเหนอะหนะเลย แนะนำเลยค่ะ",
      ],
      product: {
        label: "NICKY PIMPZ BOSS",
        imageSrc: "/images/section-4/products/nicky-pimpz-product3.jpeg",
        imageAlt: "Nicky Pimpz Boss product bottle thumbnail",
      },
    },
    {
      initial: "P",
      name: "Pongpat",
      meta: "อายุ 28 • ชลบุรี",
      purchaseBadge: "ซื้อซ้ำแล้ว",
      stars: 5,
      dateLabel: "1 สัปดาห์ที่แล้ว",
      reviewLines: [
        "อึดขึ้น ทนขึ้น พลังดีขึ้นเยอะมากครับ ไม่ปวดหัว",
        "ไม่ใจสั่น ประทับใจมากครับ",
      ],
      product: {
        label: "BOSS MEN",
        imageSrc: "/images/section-4/products/boss-men-product1.jpeg",
        imageAlt: "Boss Men product box thumbnail",
      },
    },
    {
      initial: "A",
      name: "Aommy",
      meta: "อายุ 26 • เชียงใหม่",
      purchaseBadge: "ซื้อซ้ำแล้ว",
      stars: 5,
      dateLabel: "2 สัปดาห์ที่แล้ว",
      reviewLines: [
        "ช่วยให้ความรู้สึกดีขึ้นจริงๆ ค่ะ ความชุ่มชื้นดีมาก",
        "แฟนประทับใจ เราก็มั่นใจขึ้นเยอะเลยค่ะ",
      ],
      product: {
        label: "NP GEL",
        imageSrc: "/images/section-4/products/np-gel-product1.jpeg",
        imageAlt: "NP Gel product tube thumbnail",
      },
    },
  ],
  moreReviewsRow: {
    title: "ดูรีวิวเพิ่มเติมใน LINE",
    description: "รีวิวจริงจากผู้ใช้หลายพันคน",
    ctaLabel: "ดูรีวิวเพิ่มเติมใน LINE",
    ariaLabel: "ดูรีวิวเพิ่มเติมใน LINE จากผู้ใช้จริง",
    href: "#",
  },
  finalCta: {
    label: "ปรึกษาหรือสั่งซื้อผ่าน LINE",
    ariaLabel: "ปรึกษาหรือสั่งซื้อสินค้าผ่าน LINE",
    href: "#",
  },
  trustRow: [
    { iconName: "shield-check", label: "ปลอดภัย 100%" },
    { iconName: "lock-keyhole", label: "ข้อมูลลับ" },
    { iconName: "truck", label: "จัดส่งปกปิด" },
  ],
};
