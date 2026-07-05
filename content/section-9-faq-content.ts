export type Section9FaqItem = {
  id: string;
  question: string;
  answerLines: string[];
  defaultOpen?: boolean;
};

export type Section9TrustItem = {
  iconName: "shield-check" | "lock-keyhole" | "truck";
  label: string;
};

export type Section9FaqContent = {
  sectionLabel: string;
  ariaLabel: string;
  heading: string;
  description: string;
  items: [
    Section9FaqItem,
    Section9FaqItem,
    Section9FaqItem,
    Section9FaqItem,
    Section9FaqItem,
    Section9FaqItem,
    Section9FaqItem,
    Section9FaqItem,
  ];
  supportCard: {
    title: string;
    descriptionLines: [string, string];
    ctaLabel: string;
    ctaAriaLabel: string;
    href: string;
  };
  primaryCta: {
    label: string;
    ariaLabel: string;
    href: string;
  };
  trustItems: [Section9TrustItem, Section9TrustItem, Section9TrustItem];
};

export const section9FaqContent: Section9FaqContent = {
  sectionLabel: "SECTION 9",
  ariaLabel: "คำถามที่พบบ่อย",
  heading: "คำถามที่พบบ่อย",
  description: "ทุกคำถามที่คุณอยากรู้ เรามีคำตอบให้คุณ",
  items: [
    {
      id: "faq-safety",
      question: "Nicky Pimpz Boss ทานแล้วปลอดภัยไหม?",
      answerLines: [
        "ปลอดภัย 100% ผลิตจากสมุนไพรธรรมชาติ",
        "คัดสรรคุณภาพ ผ่านการตรวจสอบมาตรฐาน",
        "ไม่มีสารอันตราย ไม่ก่อให้เกิดผลข้างเคียง",
        "สามารถทานได้อย่างมั่นใจ",
      ],
      defaultOpen: true,
    },
    {
      id: "faq-results",
      question: "เห็นผลจริงเมื่อไหร่?",
      answerLines: [
        "ผลลัพธ์อาจแตกต่างกันในแต่ละคน ขึ้นอยู่กับร่างกายและการดูแลตัวเองอย่างสม่ำเสมอ",
        "แนะนำให้ทานต่อเนื่องตามคำแนะนำและสังเกตการเปลี่ยนแปลงของตนเอง",
      ],
    },
    {
      id: "faq-dosage",
      question: "ต้องทานวันละกี่แคปซูล?",
      answerLines: [
        "แนะนำให้ทานตามวิธีใช้บนฉลากสินค้าอย่างสม่ำเสมอ",
        "หากมีข้อสงสัยเพิ่มเติม สามารถทักมาสอบถามทีมงานผ่าน LINE ได้ตลอด",
      ],
    },
    {
      id: "faq-other-meds",
      question: "สามารถทานร่วมกับยาอื่นได้ไหม?",
      answerLines: [
        "หากคุณมีโรคประจำตัว อยู่ระหว่างทานยา หรือมีข้อกังวลเฉพาะด้านสุขภาพ",
        "แนะนำให้ปรึกษาแพทย์หรือเภสัชกรก่อนเพื่อความเหมาะสมและความสบายใจ",
      ],
    },
    {
      id: "faq-suitable-for",
      question: "เหมาะกับใครบ้าง?",
      answerLines: [
        "เหมาะสำหรับผู้ที่ต้องการดูแลตัวเองและมองหาตัวช่วยเสริมความมั่นใจ",
        "โดยควรเลือกใช้อย่างเหมาะสมกับร่างกายและไลฟ์สไตล์ของตนเอง",
      ],
    },
    {
      id: "faq-cod",
      question: "มีบริการเก็บเงินปลายทางหรือไม่?",
      answerLines: [
        "มีบริการเก็บเงินปลายทางในพื้นที่ที่รองรับ",
        "ทั้งนี้สามารถสอบถามรายละเอียดเพิ่มเติมกับทีมงานผ่าน LINE ก่อนสั่งซื้อได้",
      ],
    },
    {
      id: "faq-privacy",
      question: "ข้อมูลของฉันจะปลอดภัยไหม?",
      answerLines: [
        "ข้อมูลการสั่งซื้อและการพูดคุยของคุณจะถูกดูแลอย่างเป็นส่วนตัว",
        "ทีมงานให้ความสำคัญกับความลับของลูกค้าและการติดต่ออย่างเหมาะสม",
      ],
    },
    {
      id: "faq-shipping",
      question: "ส่งของนานแค่ไหน?",
      answerLines: [
        "โดยทั่วไปจะจัดส่งตามรอบออเดอร์และใช้เวลาตามพื้นที่ปลายทาง",
        "ลูกค้าสามารถสอบถามสถานะจัดส่งกับทีมงานผ่าน LINE ได้ตลอด",
      ],
    },
  ],
  supportCard: {
    title: "ยังมีคำถามอื่นๆ?",
    descriptionLines: ["ทีมงานพร้อมให้คำแนะนำ", "อย่างเป็นส่วนตัว"],
    ctaLabel: "ปรึกษาผ่าน LINE",
    ctaAriaLabel: "ปรึกษาผ่าน LINE กับทีมงาน",
    href: "#",
  },
  primaryCta: {
    label: "ปรึกษาหรือสั่งซื้อผ่าน LINE",
    ariaLabel: "ปรึกษาหรือสั่งซื้อผ่าน LINE",
    href: "#",
  },
  trustItems: [
    { iconName: "shield-check", label: "ปลอดภัย 100%" },
    { iconName: "lock-keyhole", label: "ข้อมูลลับ" },
    { iconName: "truck", label: "จัดส่งปกปิด" },
  ],
};
