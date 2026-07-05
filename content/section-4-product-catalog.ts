export type Section4ProductFeatureIcon =
  | "droplet"
  | "heart"
  | "flask-conical"
  | "sparkles"
  | "shield-check";

export type Section4TrustIcon =
  | "truck"
  | "package"
  | "lock-keyhole"
  | "headphones";

export type Section4ProductFeature = {
  iconName: Section4ProductFeatureIcon;
  title: string;
  sub?: string;
};

export type Section4ProductCard = {
  slug: string;
  title: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
  badge?: {
    label: string;
  };
  features: [Section4ProductFeature, Section4ProductFeature, Section4ProductFeature];
  pricing: {
    salePrice: string;
    originalPrice: string;
    ariaLabel: string;
  };
  cta: {
    label: string;
    ariaLabel: string;
    href: string;
  };
};

export type Section4TrustItem = {
  iconName: Section4TrustIcon;
  title: string;
  sub: string;
};

export type Section4ProductCatalogContent = {
  sectionLabel: string;
  ariaLabel: string;
  heading: string;
  subtitle: string;
  products: Section4ProductCard[];
  trustItems: Section4TrustItem[];
  finalCta: {
    label: string;
    ariaLabel: string;
    href: string;
  };
  footerNote: string;
};

export const section4ProductCatalogContent: Section4ProductCatalogContent = {
  sectionLabel: "SECTION 4",
  ariaLabel: "สินค้าแนะนำทั้งหมด",
  heading: "สินค้าแนะนำทั้งหมด",
  subtitle: "เลือกผลิตภัณฑ์ที่ใช่ สำหรับคุณ",
  products: [
    {
      slug: "nicky-pimpz-boss",
      title: "NICKY PIMPZ BOSS",
      subtitle: "เพิ่มความมั่นใจ กระชับ อิ่มฟู",
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
      pricing: {
        salePrice: "990.-",
        originalPrice: "1,290.-",
        ariaLabel: "ราคา Nicky Pimpz Boss พิเศษ 990 บาท ราคาปกติ 1290 บาท",
      },
      cta: {
        label: "สั่งซื้อผ่าน LINE",
        ariaLabel: "สั่งซื้อ NICKY PIMPZ BOSS ผ่าน LINE",
        href: "#",
      },
    },
    {
      slug: "boss-men",
      title: "BOSS MEN",
      subtitle: "เพิ่มพลัง ฟื้นฟู สมรรถภาพ",
      imageSrc: "/images/section-4/products/boss-men-product1.jpeg",
      imageAlt:
        "Boss Men premium stamina box on a dark pedestal with gold energy glow",
      features: [
        { iconName: "heart", title: "เพิ่มพลัง", sub: "มั่นใจ" },
        { iconName: "flask-conical", title: "ฟื้นฟู", sub: "ภายใน" },
        { iconName: "shield-check", title: "ดูแลง่าย", sub: "ทุกวัน" },
      ],
      pricing: {
        salePrice: "990.-",
        originalPrice: "1,290.-",
        ariaLabel: "ราคา BOSS MEN พิเศษ 990 บาท ราคาปกติ 1290 บาท",
      },
      cta: {
        label: "สั่งซื้อผ่าน LINE",
        ariaLabel: "สั่งซื้อ BOSS MEN ผ่าน LINE",
        href: "#",
      },
    },
    {
      slug: "boss-lady",
      title: "BOSS LADY",
      subtitle: "เพิ่มความสุข อารมณ์ดี สมดุลฮอร์โมน",
      imageSrc: "/images/section-4/products/boss-lady-product1.jpeg",
      imageAlt: "Boss Lady product box with pink floral energy background",
      features: [
        { iconName: "heart", title: "อารมณ์ดี", sub: "สดใส" },
        { iconName: "flask-conical", title: "สมดุล", sub: "ฮอร์โมน" },
        { iconName: "sparkles", title: "ความสุข", sub: "เพิ่มขึ้น" },
      ],
      pricing: {
        salePrice: "890.-",
        originalPrice: "1,190.-",
        ariaLabel: "ราคา BOSS LADY พิเศษ 890 บาท ราคาปกติ 1190 บาท",
      },
      cta: {
        label: "สั่งซื้อผ่าน LINE",
        ariaLabel: "สั่งซื้อ BOSS LADY ผ่าน LINE",
        href: "#",
      },
    },
    {
      slug: "np-gel",
      title: "NP GEL",
      subtitle: "เจลเพิ่มความชุ่มชื้น อิ่มฟู",
      imageSrc: "/images/section-4/products/np-gel-product1.jpeg",
      imageAlt:
        "NP Gel product tube on dark pedestal with pink liquid splash background",
      features: [
        { iconName: "droplet", title: "ชุ่มชื้น", sub: "ทันที" },
        { iconName: "sparkles", title: "อิ่มฟู", sub: "เรียบลื่น" },
        { iconName: "shield-check", title: "ใช้ง่าย", sub: "สะดวก" },
      ],
      pricing: {
        salePrice: "590.-",
        originalPrice: "790.-",
        ariaLabel: "ราคา NP GEL พิเศษ 590 บาท ราคาปกติ 790 บาท",
      },
      cta: {
        label: "สั่งซื้อผ่าน LINE",
        ariaLabel: "สั่งซื้อ NP GEL ผ่าน LINE",
        href: "#",
      },
    },
    {
      slug: "np-mens-wipes",
      title: "NP MEN'S WIPES",
      subtitle: "แผ่นเช็ดทำความสะอาดจุดซ่อนเร้นชาย",
      imageSrc: "/images/section-4/products/np-mens-wipes-product1.jpeg",
      imageAlt:
        "NP Men's Wipes box and sachet on dark pedestal with cool splash background",
      features: [
        { iconName: "sparkles", title: "สะอาด", sub: "สดชื่น" },
        { iconName: "shield-check", title: "พกง่าย", sub: "ใช้งานไว" },
        { iconName: "droplet", title: "อ่อนโยน", sub: "มั่นใจ" },
      ],
      pricing: {
        salePrice: "390.-",
        originalPrice: "590.-",
        ariaLabel: "ราคา NP MEN'S WIPES พิเศษ 390 บาท ราคาปกติ 590 บาท",
      },
      cta: {
        label: "สั่งซื้อผ่าน LINE",
        ariaLabel: "สั่งซื้อ NP MEN'S WIPES ผ่าน LINE",
        href: "#",
      },
    },
    {
      slug: "b21",
      title: "B21",
      subtitle: "สุดยอดสมรรถภาพชาย",
      imageSrc: "/images/section-4/products/be21-product1.jpeg",
      imageAlt: "B21 product box with pink floral glow on dark pedestal",
      features: [
        { iconName: "heart", title: "สมรรถภาพ", sub: "มั่นใจ" },
        { iconName: "flask-conical", title: "ฟื้นตัว", sub: "ภายใน" },
        { iconName: "sparkles", title: "พลังชาย", sub: "เต็มที่" },
      ],
      pricing: {
        salePrice: "1,190.-",
        originalPrice: "1,590.-",
        ariaLabel: "ราคา B21 พิเศษ 1190 บาท ราคาปกติ 1590 บาท",
      },
      cta: {
        label: "สั่งซื้อผ่าน LINE",
        ariaLabel: "สั่งซื้อ B21 ผ่าน LINE",
        href: "#",
      },
    },
  ],
  trustItems: [
    {
      iconName: "truck",
      title: "จัดส่งรวดเร็ว",
      sub: "1-2 วัน ทั่วประเทศ",
    },
    {
      iconName: "package",
      title: "แพ็กเกจปิดสนิท",
      sub: "ไม่ระบุสินค้า",
    },
    {
      iconName: "lock-keyhole",
      title: "ข้อมูลส่วนตัวปลอดภัย",
      sub: "ไม่เปิดเผยข้อมูลลูกค้า",
    },
    {
      iconName: "headphones",
      title: "ปรึกษาฟรีผ่าน LINE",
      sub: "ทีมงานพร้อมให้คำแนะนำ",
    },
  ],
  finalCta: {
    label: "ปรึกษาหรือสั่งซื้อผ่าน LINE",
    ariaLabel: "ปรึกษาหรือสั่งซื้อสินค้าทั้งหมดผ่าน LINE",
    href: "#",
  },
  footerNote: "ZENOVELL • Modern Intimate Wellness",
};
