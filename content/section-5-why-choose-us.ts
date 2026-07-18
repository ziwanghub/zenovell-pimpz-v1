export type Section5BenefitIcon =
  | "shield-check"
  | "sparkles"
  | "lock-keyhole"
  | "truck"
  | "headphones";

export type Section5TrustIcon =
  | "shield-check"
  | "lock-keyhole"
  | "package";

export type Section5BenefitItem = {
  iconName: Section5BenefitIcon;
  title: string;
  description: string;
};

export type Section5TrustItem = {
  iconName: Section5TrustIcon;
  label: string;
};

export type Section5WhyChooseUsContent = {
  sectionLabel: string;
  ariaLabel: string;
  heading: string;
  subtitle: string;
  benefits: [
    Section5BenefitItem,
    Section5BenefitItem,
    Section5BenefitItem,
    Section5BenefitItem,
    Section5BenefitItem,
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
  trustRow: [Section5TrustItem, Section5TrustItem, Section5TrustItem];
};

export const section5WhyChooseUsContent: Section5WhyChooseUsContent = {
  sectionLabel: "SECTION 5",
  ariaLabel: "ทำไมต้องเลือกเรา",
  heading: "ทำไมต้องเลือกเรา?",
  subtitle: "ดูแลคุณมากกว่าสิ่งที่คุณคาดหวัง",
  benefits: [
    {
      iconName: "shield-check",
      title: "ปลอดภัย ได้มาตรฐาน",
      description:
        "คัดสรรวัตถุดิบคุณภาพ ผลิตตามมาตรฐาน มั่นใจได้ทุกแคปซูล",
    },
    {
      iconName: "sparkles",
      title: "เห็นผลจริง จากประสบการณ์ผู้ใช้",
      description:
        "พัฒนาจากงานวิจัยและรีวิวจริง ช่วยให้มั่นใจในทุกการเปลี่ยนแปลง",
    },
    {
      iconName: "lock-keyhole",
      title: "ข้อมูลลับ 100%",
      description:
        "เคารพความเป็นส่วนตัวของคุณ ตั้งแต่การพูดคุยจนถึงการจัดส่ง",
    },
    {
      iconName: "truck",
      title: "จัดส่งรวดเร็ว ปกปิดทุกขั้นตอน",
      description: "ส่งไวภายใน 1-2 วันทำการ พร้อมแพ็กเกจที่ปกปิดสนิท",
    },
    {
      iconName: "headphones",
      title: "ปรึกษาฟรี โดยผู้เชี่ยวชาญ",
      description: "ทีมงานพร้อมแนะนำแบบเป็นส่วนตัว ตอบไว และใส่ใจคุณ",
    },
  ],
  promo: {
    title: "เราอยู่ข้างคุณทุกขั้นตอน",
    highlight: "จากคำปรึกษาถึงผลลัพธ์",
    description: "เพื่อให้คุณมั่นใจก่อนตัดสินใจสั่งซื้อ",
    imageSrc: "/images/section-5/bg-why-choose-us-section5.jpeg",
    imageAlt:
      "Romantic couple portrait with magenta glow representing quality standards and privacy",
  },
  finalCta: {
    label: "ปรึกษาผู้เชี่ยวชาญผ่าน LINE",
    ariaLabel: "ปรึกษาผู้เชี่ยวชาญเกี่ยวกับสินค้า ผ่าน LINE",
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
