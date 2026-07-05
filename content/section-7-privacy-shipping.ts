export type Section7PrivacyIcon =
  | "package-lock"
  | "user-shield"
  | "truck-shield"
  | "house";

export type Section7TrustIcon =
  | "shield-check"
  | "lock-keyhole"
  | "truck";

export type Section7PrivacyCard = {
  iconName: Section7PrivacyIcon;
  title: string;
  lines: [string, string, string];
};

export type Section7ShieldChecklistItem = {
  label: string;
};

export type Section7TrustItem = {
  iconName: Section7TrustIcon;
  label: string;
};

export type Section7PrivacyShippingContent = {
  sectionLabel: string;
  ariaLabel: string;
  heading: string;
  subtitle: string;
  cards: [
    Section7PrivacyCard,
    Section7PrivacyCard,
    Section7PrivacyCard,
    Section7PrivacyCard,
  ];
  shieldCard: {
    title: string;
    checklist: [
      Section7ShieldChecklistItem,
      Section7ShieldChecklistItem,
      Section7ShieldChecklistItem,
    ];
    privacyNote: {
      title: string;
      description: string;
    };
  };
  supportRow: {
    title: string;
    description: string;
    cta: {
      label: string;
      ariaLabel: string;
      href: string;
    };
  };
  finalCta: {
    label: string;
    ariaLabel: string;
    href: string;
  };
  trustRow: [Section7TrustItem, Section7TrustItem, Section7TrustItem];
};

export const section7PrivacyShippingContent: Section7PrivacyShippingContent = {
  sectionLabel: "SECTION 7",
  ariaLabel: "ความเป็นส่วนตัวและการจัดส่ง",
  heading: "ความเป็นส่วนตัวของคุณ คือสิ่งสำคัญที่สุด",
  subtitle: "สั่งซื้ออย่างมั่นใจ ปลอดภัย และเป็นส่วนตัว 100%",
  cards: [
    {
      iconName: "package-lock",
      title: "ปกปิดสินค้า 100%",
      lines: ["บรรจุภัณฑ์มิดชิด", "ไม่มีโลโก้สินค้า", "ไม่ระบุเนื้อหา"],
    },
    {
      iconName: "user-shield",
      title: "ข้อมูลของคุณปลอดภัย",
      lines: ["ไม่เปิดเผยข้อมูลลูกค้า", "เก็บเป็นความลับ", "ทุกขั้นตอน"],
    },
    {
      iconName: "truck-shield",
      title: "จัดส่งแบบปกปิด",
      lines: ["ซื้อส่งทั่วไทย", "ไม่มีระบุชื่อร้าน", "บนพัสดุ"],
    },
    {
      iconName: "house",
      title: "จัดส่งทั่วประเทศ",
      lines: ["รวดเร็ว 1-2 วันทำการ", "ถึงมือคุณ", "อย่างปลอดภัย"],
    },
  ],
  shieldCard: {
    title: "มั่นใจได้ทุกการสั่งซื้อ",
    checklist: [
      { label: "ไม่ระบุชื่อสินค้า" },
      { label: "ไม่มีโลโก้บนกล่อง" },
      { label: "ไร้ร่องรอยที่ทำให้ถูกสงสัย" },
    ],
    privacyNote: {
      title: "เราใส่ใจในความเป็นส่วนตัวของคุณ",
      description: "เหมือนคนในครอบครัว",
    },
  },
  supportRow: {
    title: "ต้องการความช่วยเหลือ?",
    description: "ทีมงานพร้อมให้คำแนะนำ อย่างเป็นส่วนตัว",
    cta: {
      label: "ปรึกษาผ่าน LINE",
      ariaLabel: "ปรึกษาผ่าน LINE กับทีมงานแบบเป็นส่วนตัว",
      href: "#",
    },
  },
  finalCta: {
    label: "ปรึกษาหรือสั่งซื้อผ่าน LINE",
    ariaLabel: "ปรึกษาหรือสั่งซื้อสินค้าผ่าน LINE",
    href: "#",
  },
  trustRow: [
    {
      iconName: "shield-check",
      label: "ปลอดภัย 100%",
    },
    {
      iconName: "lock-keyhole",
      label: "ข้อมูลลับ",
    },
    {
      iconName: "truck",
      label: "จัดส่งปกปิด",
    },
  ],
};
