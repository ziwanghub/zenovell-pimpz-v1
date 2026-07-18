/**
 * Information Authority (Phase 5D)
 *
 * Separate brand-level authority for trust, compliance, and research content.
 * Hybrid content layer - core facts and structured sections here.
 *
 * Does NOT touch Product Authority (content/products.ts).
 */

export interface InformationSection {
  type: 'text' | 'list' | 'highlight';
  title?: string;
  body?: string;
  items?: string[];
}

export interface Information {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  description?: string;
  sections: InformationSection[];
  relatedProducts?: string[]; // product slugs for cross links
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  cta: {
    label: string;
  };
}

export const informationPages: Information[] = [
  {
    id: 'about',
    slug: 'about',
    title: 'About ZENOVELL',
    subtitle: 'Premium wellness for modern life',
    description: 'ZENOVELL delivers science-backed personal care and wellness solutions with uncompromising quality.',
    sections: [
      {
        type: 'text',
        title: 'Our Story',
        body: 'Founded with a commitment to clean, effective formulations, ZENOVELL combines traditional wisdom with modern research. Every product is designed for real results without compromise.',
      },
      {
        type: 'highlight',
        title: 'What We Stand For',
        body: 'Transparency. Efficacy. Responsibility.',
      },
      {
        type: 'list',
        title: 'Core Values',
        items: [
          'Premium ingredients only',
          'Rigorous testing and quality control',
          'Sustainable and ethical sourcing',
          'Customer-first support via LINE',
        ],
      },
    ],
    relatedProducts: ['nicky-pimpz-boss', 'boss-men'],
    seo: {
      title: 'About ZENOVELL | Premium Wellness',
      description: 'Learn about ZENOVELL — our mission, values, and commitment to high-quality personal wellness products.',
      keywords: ['zenovell', 'about us', 'wellness brand', 'premium care'],
    },
    cta: {
      label: 'Talk to us on LINE',
    },
  },
  {
    id: 'quality',
    slug: 'quality',
    title: 'Quality & Certifications',
    subtitle: 'Standards you can trust',
    description: 'Every ZENOVELL product meets strict quality benchmarks and relevant certifications.',
    sections: [
      {
        type: 'text',
        title: 'Our Quality Promise',
        body: 'All formulations are developed and tested under controlled conditions. We prioritize purity, stability, and user safety.',
      },
      {
        type: 'list',
        title: 'Quality Controls',
        items: [
          'Third-party lab testing',
          'Batch traceability',
          'Ingredient sourcing audits',
          'Stability and shelf-life verification',
        ],
      },
      {
        type: 'highlight',
        title: 'Certifications & Compliance',
        body: 'Compliant with Thai FDA and international standards where applicable.',
      },
    ],
    relatedProducts: ['nicky-pimpz-boss', 'np-gel', 'b21'],
    seo: {
      title: 'Quality & Certifications | ZENOVELL',
      description: 'Discover ZENOVELL quality standards, testing processes, and certifications for our wellness products.',
      keywords: ['quality', 'certifications', 'testing', 'fda', 'wellness standards'],
    },
    cta: {
      label: 'Ask about quality on LINE',
    },
  },
  {
    id: 'privacy',
    slug: 'privacy',
    title: 'นโยบายความเป็นส่วนตัว',
    subtitle: 'ข้อมูลของคุณ เราดูแลอย่างจริงจัง',
    description:
      'นโยบายฉบับนี้อธิบายการเก็บ ใช้ และคุ้มครองข้อมูลส่วนบุคคลของลูกค้า ZENOVELL ตามหลักการ PDPA (พระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562) ปรับปรุงล่าสุด: 19 กรกฎาคม 2026',
    sections: [
      {
        type: 'text',
        title: 'ผู้ควบคุมข้อมูล',
        body: 'บริษัท เซโนเวลล์ จำกัด (ZENOVELL) กรุงเทพมหานคร ประเทศไทย ติดต่อ: LINE Official @zenovell · โทร 092-956-5523 (10:00–22:00 น.) · อีเมล support@zenovell.com',
      },
      {
        type: 'list',
        title: 'ข้อมูลที่เราอาจเก็บรวบรวม',
        items: [
          'ข้อมูลที่คุณให้เองเมื่อติดต่อผ่าน LINE, โทรศัพท์ หรืออีเมล (เช่น ชื่อเล่น เบอร์โทร ที่อยู่จัดส่ง รายละเอียดคำสั่งซื้อ)',
          'ข้อมูลการสนทนาที่จำเป็นต่อการให้คำปรึกษาหรือดำเนินการสั่งซื้อ',
          'ข้อมูลทางเทคนิคขั้นต่ำจากการใช้งานเว็บไซต์ (เช่น หน้าเพจที่เข้าชม, อุปกรณ์, คุกกี้/แท็กวิเคราะห์ตามที่คุณยินยอมหรือตามกฎหมายอนุญาต)',
        ],
      },
      {
        type: 'list',
        title: 'วัตถุประสงค์การใช้ข้อมูล',
        items: [
          'ตอบคำถาม ให้คำปรึกษา และดำเนินการสั่งซื้อ/จัดส่ง',
          'ยืนยันตัวตนและป้องกันการทุจริตหรือการใช้งานผิดวัตถุประสงค์',
          'ปรับปรุงบริการ คุณภาพสินค้า และประสบการณ์บนเว็บไซต์',
          'ปฏิบัติตามกฎหมาย ข้อบังคับ หรือคำสั่งหน่วยงานที่มีอำนาจ',
        ],
      },
      {
        type: 'list',
        title: 'การเปิดเผยข้อมูล',
        items: [
          'เราไม่ขายข้อมูลส่วนบุคคลของคุณ',
          'อาจเปิดเผยเฉพาะเท่าที่จำเป็นแก่ผู้ให้บริการจัดส่ง ระบบชำระเงิน หรือผู้ประมวลผลข้อมูลที่ได้รับมอบหมายภายใต้ข้อตกลงการคุ้มครองข้อมูล',
          'อาจเปิดเผยเมื่อกฎหมายกำหนดหรือเพื่อปกป้องสิทธิอันชอบด้วยกฎหมายของบริษัทและลูกค้า',
        ],
      },
      {
        type: 'list',
        title: 'สิทธิของเจ้าของข้อมูล (PDPA)',
        items: [
          'ขอเข้าถึง ขอสำเนา หรือขอให้เปิดเผยที่มาของข้อมูล',
          'ขอแก้ไขข้อมูลให้ถูกต้อง',
          'ขอลบหรือทำลายข้อมูลเมื่อเข้าเงื่อนไขตามกฎหมาย',
          'ขอระงับการใช้ข้อมูลชั่วคราว',
          'คัดค้านการเก็บรวบรวม ใช้ หรือเปิดเผยในบางกรณี',
          'ถอนความยินยอมเมื่อการประมวลผลอาศัยความยินยอม',
        ],
      },
      {
        type: 'text',
        title: 'ระยะเวลาเก็บรักษาและความปลอดภัย',
        body: 'เราเก็บข้อมูลเท่าที่จำเป็นตามวัตถุประสงค์ทางธุรกิจและข้อกำหนดทางกฎหมาย แล้วลบหรือทำให้ไม่สามารถระบุตัวตนได้เมื่อหมดความจำเป็น เราใช้มาตรการทางเทคนิคและองค์กรที่เหมาะสม (เช่น การจำกัดสิทธิ์เข้าถึง การสื่อสารผ่านช่องทางที่ควบคุมได้) เพื่อลดความเสี่ยงการเข้าถึงโดยไม่ได้รับอนุญาต',
      },
      {
        type: 'text',
        title: 'คุกกี้และการวิเคราะห์',
        body: 'เว็บไซต์อาจใช้คุกกี้หรือแท็กวัดผล (เช่น Google Tag Manager) เพื่อวัดการใช้งานและปรับปรุงบริการ คุณสามารถตั้งค่าเบราว์เซอร์เพื่อจำกัดคุกกี้ได้ แต่อาจส่งผลต่อบางฟังก์ชันของเว็บไซต์',
      },
      {
        type: 'text',
        title: 'การติดต่อเรื่องข้อมูลส่วนบุคคล',
        body: 'หากต้องการใช้สิทธิหรือสอบถามเกี่ยวกับนโยบายนี้ ติดต่อผ่าน LINE Official @zenovell โทร 092-956-5523 หรืออีเมล support@zenovell.com เราจะดำเนินการภายในกรอบเวลาที่กฎหมายกำหนด',
      },
    ],
    seo: {
      title: 'นโยบายความเป็นส่วนตัว | ZENOVELL',
      description:
        'นโยบายความเป็นส่วนตัวของ ZENOVELL — การคุ้มครองข้อมูลส่วนบุคคลตาม PDPA และการติดต่อเจ้าหน้าที่',
      keywords: [
        'privacy',
        'pdpa',
        'นโยบายความเป็นส่วนตัว',
        'คุ้มครองข้อมูลส่วนบุคคล',
        'zenovell',
      ],
    },
    cta: {
      label: 'สอบถามเรื่องความเป็นส่วนตัวผ่าน LINE',
    },
  },
  {
    id: 'shipping',
    slug: 'shipping',
    title: 'Shipping & Returns',
    subtitle: 'Fast, reliable delivery',
    description: 'We deliver across Thailand with care. Returns are accepted under our policy.',
    sections: [
      {
        type: 'text',
        title: 'Shipping Information',
        body: 'Orders are typically processed within 1-2 business days. Delivery times vary by location.',
      },
      {
        type: 'list',
        title: 'Shipping Details',
        items: [
          'Standard delivery: 2-5 business days',
          'Tracking provided for all orders',
          'Free shipping on qualifying orders',
        ],
      },
      {
        type: 'text',
        title: 'Returns & Exchanges',
        body: 'We accept returns within 7 days of receipt for unopened products in original condition. Contact us via LINE to initiate.',
      },
    ],
    seo: {
      title: 'Shipping & Returns | ZENOVELL',
      description: 'Learn about ZENOVELL shipping times, costs, and our return policy for wellness products.',
      keywords: ['shipping', 'delivery', 'returns', 'policy'],
    },
    cta: {
      label: 'Check order status on LINE',
    },
  },
  {
    id: 'contact',
    slug: 'contact',
    title: 'Contact Us',
    subtitle: 'We are here to help',
    description: 'The fastest way to reach our team is through LINE. We typically respond within business hours.',
    sections: [
      {
        type: 'text',
        title: 'Get in Touch',
        body: 'For product questions, orders, or general inquiries, connect with us on LINE. Our team is ready to assist.',
      },
      {
        type: 'highlight',
        title: 'Preferred Channel',
        body: 'LINE Official Account — fastest response and context-rich support.',
      },
      {
        type: 'list',
        title: 'What to Include',
        items: [
          'Your order number (if applicable)',
          'Product of interest',
          'Specific question or concern',
        ],
      },
    ],
    seo: {
      title: 'Contact ZENOVELL | Customer Support',
      description: 'Contact ZENOVELL via LINE for support, product questions, and inquiries.',
      keywords: ['contact', 'support', 'line', 'customer service'],
    },
    cta: {
      label: 'Chat with us on LINE',
    },
  },
  {
    id: 'terms',
    slug: 'terms',
    title: 'เงื่อนไขการให้บริการ',
    subtitle: 'โปรดอ่านก่อนใช้งานเว็บไซต์และสั่งซื้อ',
    description:
      'เงื่อนไขฉบับนี้กำกับดูแลการใช้เว็บไซต์ ZENOVELL และการสั่งซื้อสินค้า/บริการที่เกี่ยวข้อง ปรับปรุงล่าสุด: 19 กรกฎาคม 2026',
    sections: [
      {
        type: 'text',
        title: 'การยอมรับเงื่อนไข',
        body: 'เมื่อเข้าใช้งานเว็บไซต์ สั่งซื้อสินค้า หรือติดต่อทีมงาน คุณถือว่ายอมรับเงื่อนไขการให้บริการฉบับนี้และนโยบายความเป็นส่วนตัวของเรา หากไม่ยอมรับ โปรดหยุดใช้งานเว็บไซต์',
      },
      {
        type: 'list',
        title: 'การใช้งานเว็บไซต์',
        items: [
          'เนื้อหาบนเว็บไซต์มีวัตถุประสงค์เพื่อให้ข้อมูลทั่วไป ไม่ใช่คำแนะนำทางการแพทย์เฉพาะบุคคล',
          'ห้ามใช้เว็บไซต์ในทางที่ผิดกฎหมาย รบกวนระบบ หรือละเมิดสิทธิของผู้อื่น',
          'เราอาจปรับปรุงเนื้อหา ราคา หรือโปรโมชันได้โดยไม่ต้องแจ้งล่วงหน้า',
        ],
      },
      {
        type: 'list',
        title: 'การสั่งซื้อและการชำระเงิน',
        items: [
          'คำสั่งซื้อผ่าน LINE หรือช่องทางที่บริษัทกำหนดถือเป็นการแสดงความประสงค์ซื้อ',
          'ราคาสินค้าและเงื่อนไขโปรโมชันเป็นไปตามที่แจ้ง ณ เวลาที่ทีมงานยืนยันออเดอร์',
          'การชำระเงินอาจรองรับช่องทางที่บริษัทเปิดใช้ (เช่น โอน/พร้อมเพย์/บัตร ตามที่แจ้งในช่องทางขาย)',
        ],
      },
      {
        type: 'list',
        title: 'การจัดส่ง การคืนสินค้า และการรับประกัน',
        items: [
          'ระยะเวลาจัดส่งขึ้นกับพื้นที่และรอบออเดอร์ โดยทั่วไปดำเนินการภายใน 1–2 วันทำการหลังยืนยันการชำระ',
          'บรรจุภัณฑ์จัดส่งแบบปกปิดไม่ระบุรายละเอียดสินค้าโดยไม่จำเป็น',
          'เงื่อนไขคืนเงิน/รับประกันความพึงพอใจเป็นไปตามที่ระบุบนหน้าเว็บไซต์หรือที่ทีมงานยืนยันเป็นลายลักษณ์อักษร (เช่น ภายใน 7 วันตามเงื่อนไขที่กำหนด)',
        ],
      },
      {
        type: 'text',
        title: 'ข้อจำกัดความรับผิด',
        body: 'ภายใต้ขอบเขตที่กฎหมายอนุญาต ZENOVELL ไม่รับผิดชอบต่อความเสียหายทางอ้อม ความเสียหายที่เป็นผลสืบเนื่อง หรือการสูญเสียผลกำไรที่เกิดจากการใช้เว็บไซต์หรือสินค้า เว้นแต่เกิดจากความจงใจหรือประมาทเลินเล่ออย่างร้ายแรงของบริษัท',
      },
      {
        type: 'text',
        title: 'กฎหมายที่ใช้บังคับ',
        body: 'เงื่อนไขนี้อยู่ภายใต้กฎหมายไทย ข้อพิพาทให้อยู่ในเขตอำนาจศาลไทยที่เกี่ยวข้อง',
      },
      {
        type: 'text',
        title: 'การติดต่อ',
        body: 'สอบถามเงื่อนไขการให้บริการหรือคำสั่งซื้อ: LINE Official @zenovell · โทร 092-956-5523 (10:00–22:00 น.) · อีเมล support@zenovell.com · บริษัท เซโนเวลล์ จำกัด กรุงเทพมหานคร',
      },
    ],
    seo: {
      title: 'เงื่อนไขการให้บริการ | ZENOVELL',
      description:
        'เงื่อนไขการให้บริการของ ZENOVELL สำหรับการใช้เว็บไซต์ การสั่งซื้อ และการจัดส่ง',
      keywords: ['terms', 'เงื่อนไขการให้บริการ', 'zenovell', 'สั่งซื้อ', 'legal'],
    },
    cta: {
      label: 'สอบถามเงื่อนไขผ่าน LINE',
    },
  },
];

export function getAllInformation(): Information[] {
  return [...informationPages];
}

export function getInformationBySlug(slug: string): Information | undefined {
  return informationPages.find((page) => page.slug === slug);
}
