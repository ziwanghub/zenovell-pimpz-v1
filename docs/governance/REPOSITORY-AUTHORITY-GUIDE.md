# REPOSITORY AUTHORITY GUIDE
**ZENOVELL-PIMPZ-V4-Active Official Team Standard**

**Version**: v1.0.0  
**Effective Date**: 2026-07-07  
**Status**: ACTIVE  

---

## 1. Introduction
To prevent configuration drift, conflicting parameters, and architectural misalignment, this project enforces strict **Authority Boundaries**. A file or folder labeled as the "Authority" for a specific domain is the absolute **Single Source of Truth (SSOT)**. No other files may define, override, or duplicate this data.

All developers and AI agents must consume data from these canonical locations instead of hardcoding values or creating duplicate structures.

---

## 2. Domain Authorities

### 2.1 Product Authority
*   **Description**: Holds all metadata, identifiers, configurations, features, pricing, and specs for products.
*   **Canonical Location**: [content/products.ts](file:///Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active/content/products.ts)
*   **Owner**: Content Manager & Product Owner (ZZ)
*   **Allowed Changes**: Modifying prices, adding product SKUs, updating copy/specs under approved milestones.
*   **Forbidden Changes**: Importing React or browser UI primitives. Edits that alter core types without updating component contracts.
*   **Primary Consumers**: Homepage components, Dynamic `/products/[slug]` routing templates, and QA validation scripts.

### 2.2 Navigation Authority
*   **Description**: Governs the global links, headers, and footer menu trees.
*   **Canonical Location**: [content/site-navigation.ts](file:///Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active/content/site-navigation.ts)
*   **Owner**: Product Owner (ZZ)
*   **Allowed Changes**: Modifying menu items, updating URLs, reorganizing footer columns.
*   **Forbidden Changes**: Inline styling definitions or component layout configurations.
*   **Primary Consumers**: `global-header.tsx`, `mobile-shell.tsx`, and `global-footer` sections.

### 2.3 Commerce Authority
*   **Description**: Defines attribution state schemas, LINE client configurations, and event tracking taxonomies.
*   **Canonical Location**: [lib/commerce/](file:///Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active/lib/commerce/)
*   **Owner**: Lead Solution Architect
*   **Allowed Changes**: Additive pure helpers (e.g. refining UTM parsing logic) that do not break backward compatibility.
*   **Forbidden Changes**: Adding UI libraries, importing visual buttons, or writing state mutations that persist to global databases.
*   **Primary Consumers**: CTA triggers, Analytics event triggers, and LINE OA routing handlers.

### 2.4 Platform Authority
*   **Description**: Houses metadata schemas, next.js routing configuration, and page loading abstractions.
*   **Canonical Location**: [lib/platform/](file:///Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active/lib/platform/)
*   **Owner**: Platform Architect
*   **Allowed Changes**: Optimizing metadata generation, configuring dynamic parameters, caching strategies.
*   **Forbidden Changes**: Directly implementing product-specific layouts or overriding commerce tracking states.
*   **Primary Consumers**: Root routing layouts, platform spoke layout configurations, and loader systems.

### 2.5 Asset Authority
*   **Description**: Holds canonical brand icons, logos, static illustrations, and product images.
*   **Canonical Location**: [public/images/](file:///Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active/public/images/)
*   **Owner**: UI/UX Designer
*   **Allowed Changes**: Replacing visual assets with optimized, high-fidelity formats (WebP/AVIF).
*   **Forbidden Changes**: Storing unoptimized PNGs/JPEGs or messy folder organization.
*   **Primary Consumers**: All frontend component image tags.

### 2.6 SEO Authority
*   **Description**: Configures global indexing rules, robots metadata, sitemaps, and default meta tags.
*   **Canonical Location**: [app/layout.tsx](file:///Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active/app/layout.tsx) & [lib/platform/metadata.ts](file:///Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active/lib/platform/metadata.ts) (if configured)
*   **Owner**: SEO Analyst & Chief Architect
*   **Allowed Changes**: Modifying keywords, site descriptions, and structuring schema.org JSON-LD tags.
*   **Forbidden Changes**: Hardcoding unique page metadata inside reusable layout blocks.
*   **Primary Consumers**: Google Ads trackers, social media sharing tags, and web crawler indexers.

### 2.7 Analytics Authority
*   **Description**: Coordinates event tracking wrappers, GA4 telemetry, and pixels.
*   **Canonical Location**: `lib/analytics/` & [docs/reports/m10-analytics-foundation/](file:///Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active/docs/reports/m10-analytics-foundation/)
*   **Owner**: Analytics Architect
*   **Allowed Changes**: Adding new event dispatchers for custom conversions.
*   **Forbidden Changes**: Direct modification of runtime analytics libraries without architectural review.
*   **Primary Consumers**: All interactive click/view components.

### 2.8 Documentation Authority
*   **Description**: Contains decision logs (ADRs), blueprints, and scopes governing the codebase.
*   **Canonical Location**: [docs/](file:///Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active/docs/)
*   **Owner**: Chief Architect & Product Owner (ZZ)
*   **Allowed Changes**: Creating independent audit reports and documenting approved architectural plans.
*   **Forbidden Changes**: Tampering with past approved ADR logs or modifying frozen milestone closure reports.
*   **Primary Consumers**: Developers, AI agents, and auditors.

---

## 3. Related Standards
- [REPOSITORY-STRUCTURE-GUIDE.md](file:///Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active/docs/governance/REPOSITORY-STRUCTURE-GUIDE.md)
- [REPOSITORY-DECISION-MATRIX.md](file:///Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active/docs/governance/REPOSITORY-DECISION-MATRIX.md)
- [AGENT-STARTUP-CHECKLIST.md](file:///Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active/docs/governance/AGENT-STARTUP-CHECKLIST.md)
