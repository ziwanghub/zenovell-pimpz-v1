export type Section10BenefitItem = {
  id: string;
  iconName: "heart" | "flame" | "users" | "shield-check";
  title: string;
  description: string;
};

export type Section10AvatarItem = {
  id: string;
  initials: string;
  tone: "pink" | "gold" | "neutral";
};

export type Section10TrustItem = {
  id: string;
  iconName: "shield-check" | "lock-keyhole" | "truck" | "headset";
  title: string;
  description: string;
};

export type Section10FinalCtaContent = {
  sectionLabel: string;
  ariaLabel: string;
  headingLines: [string, string];
  highlightedWord: string;
  description: string;
  heroArtwork: {
    src: string;
    alt: string;
  };
  benefits: [
    Section10BenefitItem,
    Section10BenefitItem,
    Section10BenefitItem,
    Section10BenefitItem,
  ];
  socialProof: {
    avatars: [Section10AvatarItem, Section10AvatarItem, Section10AvatarItem];
    overflowLabel: string;
    trustCountLabel: string;
    trustDescription: string;
    starsLabel: string;
  };
  guaranteeCard: {
    title: string;
    highlight: string;
    description: string;
    shippingTitle: string;
    shippingLines: [string, string];
  };
  primaryCta: {
    label: string;
    description: string;
    ariaLabel: string;
    href: string;
  };
  trustItems: [
    Section10TrustItem,
    Section10TrustItem,
    Section10TrustItem,
    Section10TrustItem,
  ];
  finalReassurance: {
    prefix: string;
    highlight: string;
  };
};

export const section10FinalCtaContent: Section10FinalCtaContent = {
  sectionLabel: "SECTION 10",
  ariaLabel: "พร้อมเริ่มสั่งซื้อผ่าน LINE",
  headingLines: ["พร้อมเปลี่ยนความมั่นใจ", "ให้เป็นเวอร์ชั่นที่ดีที่สุดของคุณ"],
  highlightedWord: "ดีที่สุด",
  description: "เริ่มวันนี้ เพื่อความสัมพันธ์ที่ดีขึ้นในทุกวัน",
  heroArtwork: {
    src: "/images/section-10/bg-final-cta-section10.jpeg",
    alt: "Nicky Pimpz Boss product composition with ingredient imagery",
  },
  benefits: [
    {
      id: "confidence",
      iconName: "heart",
      title: "เพิ่มความมั่นใจ",
      description: "พร้อมทุกโมเมนต์สำคัญ",
    },
    {
      id: "power",
      iconName: "flame",
      title: "เพิ่มพลังและสมรรถนะ",
      description: "รู้สึกถึงความเปลี่ยนแปลง",
    },
    {
      id: "relationship",
      iconName: "users",
      title: "ความสัมพันธ์ดีขึ้น",
      description: "ใกล้ชิด มั่นใจมากกว่าเดิม",
    },
    {
      id: "safety",
      iconName: "shield-check",
      title: "ปลอดภัย 100%",
      description: "ผ่านการตรวจสอบมาตรฐาน",
    },
  ],
  socialProof: {
    avatars: [
      { id: "avatar-a", initials: "A", tone: "neutral" },
      { id: "avatar-k", initials: "K", tone: "gold" },
      { id: "avatar-n", initials: "N", tone: "pink" },
    ],
    overflowLabel: "+1.2K",
    trustCountLabel: "มากกว่า 1,246 คน",
    trustDescription: "ไว้วางใจ Nicky Pimpz Boss",
    starsLabel: "5 ดาวจากลูกค้า",
  },
  guaranteeCard: {
    title: "มั่นใจได้ 100%",
    highlight: "ไม่พอใจยินดีคืนเงินเต็มจำนวน",
    description: "ภายใน 7 วันไม่มีเงื่อนไข",
    shippingTitle: "จัดส่งไว",
    shippingLines: ["แพ็กเกจปกปิด", "ไม่ระบุสินค้า"],
  },
  primaryCta: {
    label: "ปรึกษาหรือสั่งซื้อผ่าน LINE",
    description: "แชทกับทีมงานผู้เชี่ยวชาญได้ทันที",
    ariaLabel: "ปรึกษาหรือสั่งซื้อผ่าน LINE กับทีมงานผู้เชี่ยวชาญ",
    // Runtime destination is LINE_OA_URL via activateLineCta (surface: final-cta).
    href: "https://lin.ee/syjmYE2",
  },
  trustItems: [
    {
      id: "safe",
      iconName: "shield-check",
      title: "ปลอดภัย 100%",
      description: "ผ่านมาตรฐาน",
    },
    {
      id: "private",
      iconName: "lock-keyhole",
      title: "ข้อมูลลับ",
      description: "ไม่เปิดเผย",
    },
    {
      id: "fast",
      iconName: "truck",
      title: "จัดส่งเร็ว",
      description: "1-2 วันทำการ",
    },
    {
      id: "support",
      iconName: "headset",
      title: "ทีมงานพร้อมดูแล",
      description: "ให้คำแนะนำ",
    },
  ],
  finalReassurance: {
    prefix: "มั่นใจได้ทุกการสั่งซื้อ",
    highlight: "เราดูแลคุณเหมือนคนสำคัญ",
  },
};
