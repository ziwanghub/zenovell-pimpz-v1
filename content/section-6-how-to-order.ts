export type Section6StepIcon =
  | "line-message"
  | "message-square"
  | "package2"
  | "clipboard-check"
  | "package"
  | "truck";

export type Section6TrustIcon =
  | "shield-check"
  | "lock-keyhole"
  | "package";

export type Section6StepItem = {
  stepNumber: string;
  iconName: Section6StepIcon;
  title: string;
  description: string;
};

export type Section6TrustItem = {
  iconName: Section6TrustIcon;
  label: string;
};

export type Section6HowToOrderContent = {
  sectionLabel: string;
  ariaLabel: string;
  heading: string;
  subtitle: string;
  steps: [
    Section6StepItem,
    Section6StepItem,
    Section6StepItem,
    Section6StepItem,
    Section6StepItem,
    Section6StepItem,
  ];
  promo: {
    title: string;
    highlight: string;
    description: string;
    imageSrc: string;
    imageAlt: string;
  };
  finalCta: {
    label: string;
    ariaLabel: string;
    href: string;
  };
  trustRow: [Section6TrustItem, Section6TrustItem, Section6TrustItem];
};

export const section6HowToOrderContent: Section6HowToOrderContent = {
  sectionLabel: "SECTION 6",
  ariaLabel: "สั่งซื้อผ่าน LINE",
  heading: "สั่งซื้อ ง่าย ผ่าน LINE",
  subtitle: "ไม่ยุ่งยาก ส่งไว ปลอดภัย 100%",
  steps: [
    {
      stepNumber: "1",
      iconName: "line-message",
      title: "กดปุ่ม “ปรึกษาผ่าน LINE”",
      description: "เพื่อเริ่มต้นการสั่งซื้อ",
    },
    {
      stepNumber: "2",
      iconName: "message-square",
      title: "แชทกับทีมงานของเรา",
      description: "สอบถามข้อมูลสินค้า และรับคำแนะนำ",
    },
    {
      stepNumber: "3",
      iconName: "package2",
      title: "เลือกสินค้าและจำนวน",
      description: "ทีมงานยืนยันออเดอร์ และแจ้งยอดรวม",
    },
    {
      stepNumber: "4",
      iconName: "clipboard-check",
      title: "ยืนยันการสั่งซื้อ",
      description: "ชำระเงินปลายทาง หรือโอนเงิน (ตามที่ตกลง)",
    },
    {
      stepNumber: "5",
      iconName: "package",
      title: "จัดส่งแบบปกปิด",
      description: "แพ็กเกจปกปิดชื่อสินค้า ไม่ระบุเนื้อหา",
    },
    {
      stepNumber: "6",
      iconName: "truck",
      title: "รับสินค้าอย่างมั่นใจ",
      description: "สินค้าอยู่ในมือคุณ อย่างรวดเร็วและปลอดภัย",
    },
  ],
  promo: {
    title: "มั่นใจในความปลอดภัย",
    highlight: "และความเป็นส่วนตัว",
    description: "ทุกออเดอร์ถูกดูแลเป็นพิเศษ",
    imageSrc: "/images/section-6/bg-how-to-order-section6.jpeg",
    imageAlt:
      "Nicky Pimpz Boss product box with dark floral glow supporting privacy and safety reassurance",
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
      iconName: "package",
      label: "จัดส่งปกปิด",
    },
  ],
};
