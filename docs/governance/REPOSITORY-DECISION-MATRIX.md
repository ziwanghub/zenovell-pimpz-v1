# REPOSITORY DECISION MATRIX
**ZENOVELL-PIMPZ-V4-Active Official Team Standard**

**Version**: v1.0.0  
**Effective Date**: 2026-07-07  
**Status**: ACTIVE  

---

## 1. Introduction
This matrix defines the official, canonical files or directories that must be updated for specific development tasks. It prevents agents from placing implementation code or assets in wrong or duplicate paths.

---

## 2. Decision Matrix

| Development Task | Target Canonical Location | Authority Layer | Notes / Rules |
|------------------|---------------------------|-----------------|---------------|
| **Add/Modify Product Specs** | [content/products.ts](file:///Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active/content/products.ts) | Content Layer | Single Source of Truth for product parameters. Do not edit HTML code for product changes. |
| **Add Navigation Link** | [content/site-navigation.ts](file:///Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active/content/site-navigation.ts) | Content Layer | Holds all navbar and footer link configurations. |
| **Modify Main Homepage Layout** | [app/page.tsx](file:///Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active/app/page.tsx) | Presentation Layer | Renders homepage layout. **FROZEN** during Phase 5. |
| **Modify Landing Section UI** | [sections/](file:///Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active/sections/) | Presentation Layer | Core landing sections. **FROZEN** during Phase 5. |
| **Add Dynamic Platform Route** | [app/(platform)/](file:///Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active/app/\(platform\)/) | Platform Layer | Platform spokes (products, information, knowledge). |
| **Create UI Primitives (Button, etc)** | [components/ui/](file:///Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active/components/ui/) | Presentation Layer | Shared atomic visual blocks. **FROZEN** unless under primitives workstream. |
| **Add/Update Image Asset** | [public/images/](file:///Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active/public/images/) | Asset Layer | Store optimized images. Never store unoptimized formats. |
| **Define LINE CTA Message Template** | [lib/commerce/line-message-builder.ts](file:///Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active/lib/commerce/line-message-builder.ts) | Commerce Layer | Generates payload for LINE OA linkouts. |
| **Add Analytics Tracking Event** | `lib/analytics/` | Analytics Layer | Telemetry dispatcher hooks. |
| **Document Architectural Decision** | [docs/architecture/](file:///Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active/docs/architecture/) | Governance Layer | Create ADR markdown files (`ADR-XXX-*.md`). |
| **Write Milestone Validation Log** | [docs/reports/](file:///Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active/docs/reports/) | Governance Layer | Store audit results and checks inside respective phase folders. |
| **Write Global Team Standard** | [docs/governance/](file:///Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active/docs/governance/) | Governance Layer | Contains onboarding, matrix, and structure files. |

---

## 3. Related Standards
- [REPOSITORY-STRUCTURE-GUIDE.md](file:///Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active/docs/governance/REPOSITORY-STRUCTURE-GUIDE.md)
- [REPOSITORY-AUTHORITY-GUIDE.md](file:///Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active/docs/governance/REPOSITORY-AUTHORITY-GUIDE.md)
- [AGENT-STARTUP-CHECKLIST.md](file:///Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active/docs/governance/AGENT-STARTUP-CHECKLIST.md)
