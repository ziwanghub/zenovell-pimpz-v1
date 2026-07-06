export type HeroHeadlineLine = {
  text: string;
  tone: "light" | "accent";
};

export type HeroBenefit = {
  icon: "flower" | "droplet" | "heart";
  title: string;
  sub: string;
};

export type HeroTrustItem = {
  icon: "shield" | "flask" | "package" | "lock";
  lines: [string, string, string];
};

export type HeroContent = {
  // Section 1 Hero body content authority.
  // Global header authority lives in `content/site-header.ts`.
  brand: {
    wordmark: string;
    tagline: string;
    subbrand: string;
  };
  headline: HeroHeadlineLine[];
  subheadline: string[];
  benefits: HeroBenefit[];
  cta: {
    label: string;
    eyebrow: string;
    primary: string;
  };
  trustItems: HeroTrustItem[];
};

export const heroContent: HeroContent = {
  brand: {
    wordmark: "ZENOVELL",
    tagline: "Modern Intimate Wellness",
    subbrand: "NICKY PIMPZ BOSS",
  },
  headline: [
    { text: "ปลุกความ", tone: "light" },
    { text: "มั่นใจ", tone: "light" },
    { text: "ให้กลับมา", tone: "accent" },
    { text: "เป็นคุณ", tone: "accent" },
  ],
  subheadline: ["เชรมฟื้นฟูความรู้สึก", "เพื่อผู้หญิงยุคใหม่"],
  benefits: [
    {
      icon: "flower",
      title: "เพิ่มความมั่นใจ",
      sub: "กระชับ อิ่มฟู",
    },
    {
      icon: "droplet",
      title: "เติมสมดุลฮอร์โมน",
      sub: "บำรุงจากภายใน",
    },
    {
      icon: "heart",
      title: "เพิ่มเสน่ห์ดึงดูด",
      sub: "รู้สึกได้ในตัวคุณ",
    },
  ],
  cta: {
    label: "ปรึกษาผู้เชี่ยวชาญผ่าน LINE",
    eyebrow: "ปรึกษาผู้เชี่ยวชาญ",
    primary: "ผ่าน LINE",
  },
  trustItems: [
    {
      icon: "shield",
      lines: ["ปลอดภัย", "วัตถุดิบคุณภาพ", "ได้มาตรฐาน"],
    },
    {
      icon: "flask",
      lines: ["พัฒนาโดย", "นักวิจัยด้านสุขภาพ", "สตรี"],
    },
    {
      icon: "package",
      lines: ["จัดส่งปกปิด", "ไม่ระบุสินค้า", "เป็นส่วนตัว"],
    },
    {
      icon: "lock",
      lines: ["ข้อมูลลับ 100%", "ความเป็นส่วนตัว", "ของคุณสำคัญที่สุด"],
    },
  ],
} as const;
