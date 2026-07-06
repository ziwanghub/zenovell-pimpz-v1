import type {
  AnalyticsEventKey,
  CtaDestination,
} from "@/content/site-navigation";

export type SiteHeaderLegacySource = {
  file: "@/content/hero";
  fields: {
    brandWordmark: "heroContent.brand.wordmark";
    brandTagline: "heroContent.brand.tagline";
    brandSubbrand: "heroContent.brand.subbrand";
  };
};

export type SiteHeaderDrawerTrigger = {
  label: string;
  ariaLabel: string;
  analyticsEventKey?: Extract<AnalyticsEventKey, "menu_open">;
  supportsDrawer: boolean;
};

export type SiteHeaderBrand = {
  wordmark: string;
  tagline: string;
  subbrand: string;
};

export type SiteHeaderVisibility = {
  sticky: boolean;
  safeAreaTop: boolean;
  showShadowOnScroll: boolean;
  supportsActiveNavigation: boolean;
  supportsDrawerTrigger: boolean;
};

export type SiteHeaderContract = {
  ariaLabel: string;
  brand: SiteHeaderBrand;
  lineCta: {
    destinationId: CtaDestination["id"];
    label: string;
    ariaLabel: string;
  };
  menuTrigger: SiteHeaderDrawerTrigger;
  visibility: SiteHeaderVisibility;
  authority: {
    currentLegacyRuntimeSource: SiteHeaderLegacySource;
    futureGlobalAuthorityFile: "@/content/site-header";
    migrationStatus: "global-header-live";
    extractionPlan: {
      heroHeaderRemovedFromRuntime: true;
      heroHeaderFieldsRemovedFromHeroContent: true;
      retainedHeroBrandFields: [
        "heroContent.brand.wordmark",
        "heroContent.brand.tagline",
        "heroContent.brand.subbrand",
      ];
      renameHeroContentFileDeferred: true;
    };
  };
};

export const siteHeaderContent: SiteHeaderContract = {
  ariaLabel: "ส่วนหัวของเว็บไซต์",
  brand: {
    wordmark: "ZENOVELL",
    tagline: "Modern Intimate Wellness",
    subbrand: "NICKY PIMPZ BOSS",
  },
  lineCta: {
    destinationId: "header-line",
    label: "ปรึกษาผ่าน LINE",
    ariaLabel: "ปรึกษาผ่าน LINE",
  },
  menuTrigger: {
    label: "เมนู",
    ariaLabel: "เปิดเมนูนำทาง",
    analyticsEventKey: "menu_open",
    supportsDrawer: true,
  },
  visibility: {
    sticky: true,
    safeAreaTop: true,
    showShadowOnScroll: true,
    supportsActiveNavigation: true,
    supportsDrawerTrigger: true,
  },
  authority: {
    currentLegacyRuntimeSource: {
      file: "@/content/hero",
      fields: {
        brandWordmark: "heroContent.brand.wordmark",
        brandTagline: "heroContent.brand.tagline",
        brandSubbrand: "heroContent.brand.subbrand",
      },
    },
    futureGlobalAuthorityFile: "@/content/site-header",
    migrationStatus: "global-header-live",
    extractionPlan: {
      heroHeaderRemovedFromRuntime: true,
      heroHeaderFieldsRemovedFromHeroContent: true,
      retainedHeroBrandFields: [
        "heroContent.brand.wordmark",
        "heroContent.brand.tagline",
        "heroContent.brand.subbrand",
      ],
      renameHeroContentFileDeferred: true,
    },
  },
};
