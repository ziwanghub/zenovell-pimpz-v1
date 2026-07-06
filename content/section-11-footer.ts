export type Section11FooterLinkItem = {
  id: string;
  label: string;
  href: string;
  ariaLabel: string;
};

export type Section11FooterLinkColumn = {
  id: string;
  title: string;
  iconName: "package" | "info" | "shield-check";
  items: Section11FooterLinkItem[];
};

export type Section11FooterContactItem = {
  id: string;
  label: string;
  value: string;
  subtext?: string;
  href?: string;
  ariaLabel?: string;
  iconName: "line" | "phone" | "mail" | "map-pin";
  interactive: boolean;
};

export type Section11FooterSocialItem = {
  id: string;
  platform: "facebook" | "instagram" | "youtube" | "tiktok";
  href: string;
  ariaLabel: string;
};

export type Section11FooterPaymentItem = {
  id: string;
  label: string;
  variant: "visa" | "mastercard" | "promptpay" | "cod";
};

export type Section11FooterContent = {
  sectionLabel: string;
  ariaLabel: string;
  heading: string;
  description: string;
  navColumns: [
    Section11FooterLinkColumn,
    Section11FooterLinkColumn,
    Section11FooterLinkColumn,
  ];
  contactTitle: string;
  contacts: [
    Section11FooterContactItem,
    Section11FooterContactItem,
    Section11FooterContactItem,
    Section11FooterContactItem,
  ];
  socialCard: {
    title: string;
    description: string;
    items: [
      Section11FooterSocialItem,
      Section11FooterSocialItem,
      Section11FooterSocialItem,
      Section11FooterSocialItem,
    ];
  };
  privacyPanel: {
    title: string;
    lines: [string, string];
  };
  guarantee: {
    title: string;
    description: string;
  };
  brand: {
    name: string;
    tagline: string;
  };
  legal: {
    copyright: string;
    rights: string;
  };
  security: {
    title: string;
    description: string;
  };
  payments: [
    Section11FooterPaymentItem,
    Section11FooterPaymentItem,
    Section11FooterPaymentItem,
    Section11FooterPaymentItem,
  ];
};

export const section11FooterContent: Section11FooterContent = {
  sectionLabel: "SECTION 11",
  ariaLabel: "Footer",
  heading: "เมนูและช่องทางติดต่อ",
  description: "เราพร้อมดูแลคุณ",
  navColumns: [
    {
      id: "main-menu",
      title: "เมนูหลัก",
      iconName: "package",
      items: [
        { id: "home", label: "หน้าแรก", href: "#", ariaLabel: "ไปที่หน้าแรก" },
        {
          id: "catalog",
          label: "สินค้าทั้งหมด",
          href: "#",
          ariaLabel: "ไปที่สินค้าทั้งหมด",
        },
        {
          id: "about",
          label: "เกี่ยวกับเรา",
          href: "#",
          ariaLabel: "ไปที่เกี่ยวกับเรา",
        },
        {
          id: "reviews",
          label: "รีวิวลูกค้า",
          href: "#",
          ariaLabel: "ไปที่รีวิวลูกค้า",
        },
        {
          id: "faq",
          label: "คำถามที่พบบ่อย",
          href: "#",
          ariaLabel: "ไปที่คำถามที่พบบ่อย",
        },
        {
          id: "ordering",
          label: "วิธีการสั่งซื้อ",
          href: "#",
          ariaLabel: "ไปที่วิธีการสั่งซื้อ",
        },
        {
          id: "articles",
          label: "บทความ",
          href: "#",
          ariaLabel: "ไปที่บทความ",
        },
        {
          id: "contact",
          label: "ติดต่อเรา",
          href: "#",
          ariaLabel: "ไปที่ติดต่อเรา",
        },
      ],
    },
    {
      id: "products",
      title: "ข้อมูลสินค้า",
      iconName: "info",
      items: [
        {
          id: "nicky-pimpz-boss",
          label: "Nicky Pimpz Boss",
          href: "#",
          ariaLabel: "ดูข้อมูลสินค้า Nicky Pimpz Boss",
        },
        {
          id: "boss-men",
          label: "Boss Men",
          href: "#",
          ariaLabel: "ดูข้อมูลสินค้า Boss Men",
        },
        {
          id: "boss-lady",
          label: "Boss Lady",
          href: "#",
          ariaLabel: "ดูข้อมูลสินค้า Boss Lady",
        },
        {
          id: "np-gel",
          label: "NP Gel",
          href: "#",
          ariaLabel: "ดูข้อมูลสินค้า NP Gel",
        },
        {
          id: "np-wipes",
          label: "NP Men's Wipes",
          href: "#",
          ariaLabel: "ดูข้อมูลสินค้า NP Men's Wipes",
        },
        {
          id: "b21",
          label: "B21",
          href: "#",
          ariaLabel: "ดูข้อมูลสินค้า B21",
        },
      ],
    },
    {
      id: "services",
      title: "บริการของเรา",
      iconName: "shield-check",
      items: [
        {
          id: "consulting",
          label: "ให้คำปรึกษา",
          href: "#",
          ariaLabel: "ไปที่บริการให้คำปรึกษา",
        },
        {
          id: "line-order",
          label: "การสั่งซื้อผ่าน LINE",
          href: "#",
          ariaLabel: "ไปที่การสั่งซื้อผ่าน LINE",
        },
        {
          id: "shipping",
          label: "การจัดส่ง",
          href: "#",
          ariaLabel: "ไปที่ข้อมูลการจัดส่ง",
        },
        {
          id: "payment",
          label: "การชำระเงิน",
          href: "#",
          ariaLabel: "ไปที่ข้อมูลการชำระเงิน",
        },
        {
          id: "privacy",
          label: "ความเป็นส่วนตัว",
          href: "#",
          ariaLabel: "ไปที่นโยบายความเป็นส่วนตัว",
        },
        {
          id: "terms",
          label: "เงื่อนไขการให้บริการ",
          href: "#",
          ariaLabel: "ไปที่เงื่อนไขการให้บริการ",
        },
      ],
    },
  ],
  contactTitle: "ช่องทางติดต่อ",
  contacts: [
    {
      id: "line",
      label: "LINE Official",
      value: "@zenovell",
      href: "#",
      ariaLabel: "ติดต่อ LINE Official @zenovell",
      iconName: "line",
      interactive: true,
    },
    {
      id: "phone",
      label: "โทรศัพท์",
      value: "099-124-4289",
      subtext: "(10:00 - 22:00 น.)",
      href: "tel:0991244289",
      ariaLabel: "โทรหาเซโนเวลล์ที่ 099-124-4289",
      iconName: "phone",
      interactive: true,
    },
    {
      id: "email",
      label: "อีเมล",
      value: "support@zenovell.com",
      href: "mailto:support@zenovell.com",
      ariaLabel: "ส่งอีเมลหา support@zenovell.com",
      iconName: "mail",
      interactive: true,
    },
    {
      id: "address",
      label: "ที่อยู่",
      value: "บริษัท เซโนเวลล์ จำกัด",
      subtext: "กรุงเทพมหานคร ประเทศไทย",
      iconName: "map-pin",
      interactive: false,
    },
  ],
  socialCard: {
    title: "ติดตามเราได้ที่",
    description: "อัปเดตโปรโมชั่นและข่าวสารก่อนใคร",
    items: [
      {
        id: "facebook",
        platform: "facebook",
        href: "#",
        ariaLabel: "ติดตาม ZENOVELL บน Facebook",
      },
      {
        id: "instagram",
        platform: "instagram",
        href: "#",
        ariaLabel: "ติดตาม ZENOVELL บน Instagram",
      },
      {
        id: "tiktok",
        platform: "tiktok",
        href: "#",
        ariaLabel: "ติดตาม ZENOVELL บน TikTok",
      },
      {
        id: "youtube",
        platform: "youtube",
        href: "#",
        ariaLabel: "ติดตาม ZENOVELL บน YouTube",
      },
    ],
  },
  privacyPanel: {
    title: "มั่นใจ ปลอดภัย 100%",
    lines: ["ข้อมูลของคุณถูกเข้ารหัส", "และไม่เปิดเผยกับบุคคลภายนอก"],
  },
  guarantee: {
    title: "รับประกันความพึงพอใจ 100%",
    description: "หากไม่พอใจ ยินดีคืนเงินเต็มจำนวน ภายใน 7 วัน",
  },
  brand: {
    name: "ZENOVELL",
    tagline: "Modern Intimate Wellness",
  },
  legal: {
    copyright: "© 2025 ZENOVELL. All rights reserved.",
    rights: "สงวนลิขสิทธิ์ทุกประการ",
  },
  security: {
    title: "Secure",
    description: "SSL Encrypted",
  },
  payments: [
    { id: "visa", label: "VISA", variant: "visa" },
    { id: "mastercard", label: "Mastercard", variant: "mastercard" },
    { id: "promptpay", label: "PromptPay", variant: "promptpay" },
    { id: "cod", label: "COD", variant: "cod" },
  ],
};
