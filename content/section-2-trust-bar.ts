export type Section2TrustCardIcon =
  | "package"
  | "lock-keyhole"
  | "package-check"
  | "user-check";

export type Section2MicroTrustIcon = "shield-check" | "eye-off" | "headphones";

export type Section2TrustCardItem = {
  icon: Section2TrustCardIcon;
  title: [string, string];
  subText: string[];
};

export type Section2MicroTrustItem = {
  icon: Section2MicroTrustIcon;
  text: string;
};

export type Section2TrustBarContent = {
  sectionLabel: string;
  ariaLabel: string;
  heading: [string, string];
  description: string;
  trustCardItems: Section2TrustCardItem[];
  trustStatement: {
    label: string;
    highlight: string;
  };
  cta: {
    label: string;
  };
  microTrustItems: Section2MicroTrustItem[];
  artwork: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
};

export const section2TrustBarContent: Section2TrustBarContent = {
  sectionLabel: "SECTION 2",
  ariaLabel: "ความมั่นใจของคุณ คือสิ่งที่เราปกป้อง",
  heading: ["ความมั่นใจของคุณ", "คือสิ่งที่เราปกป้อง"],
  description: "ปลอดภัย เป็นส่วนตัว มั่นใจได้ในทุกการสั่งซื้อ",
  trustCardItems: [
    {
      icon: "package",
      title: ["จัดส่งไม่ระบุสินค้า", ""],
      subText: [
        "กล่องปิดทึบ ไม่มีโลโก้แบรนด์",
        "ไม่รู้ว่ามีอะไร",
      ],
    },
    {
      icon: "lock-keyhole",
      title: ["ข้อมูลของคุณ", "ปลอดภัย 100%"],
      subText: [
        "ไม่เปิดเผยชื่อ เบอร์ หรือ",
        "ประวัติการสั่งซื้อ",
      ],
    },
    {
      icon: "package-check",
      title: ["บรรจุภัณฑ์", "ปิดสนิท"],
      subText: [
        "ซีลแน่นหนา ป้องกันความชื้น",
        "สินค้าสภาพสมบูรณ์",
      ],
    },
    {
      icon: "user-check",
      title: ["ชื่อผู้ส่งทั่วไป", ""],
      subText: [
        "ชื่อผู้ส่งเป็นชื่อบริษัททั่วไป",
        "มั่นใจได้ทุกการจัดส่ง",
      ],
    },
  ],
  trustStatement: {
    label: "แบรนด์สุขภาพทางเพศสำหรับผู้ใหญ่",
    highlight: "วางใจในคุณภาพ มาตรฐาน และความเป็นส่วนตัว",
  },
  cta: {
    label: "ปรึกษาผู้เชี่ยวชาญผ่าน LINE",
  },
  microTrustItems: [
    {
      icon: "shield-check",
      text: "ปลอดภัย",
    },
    {
      icon: "eye-off",
      text: "ไม่เปิดเผยข้อมูล",
    },
    {
      icon: "headphones",
      text: "ให้คำแนะนำโดยผู้เชี่ยวชาญ",
    },
  ],
  artwork: {
    src: "/images/section-2/bg-trust-section2.jpeg",
    alt: "Nicky Pimpz Boss intimate serum bottle with ginseng root, orchid flowers, and beet root on premium dark stone with a pink energy glow background",
    width: 1122,
    height: 1402,
  },
};
