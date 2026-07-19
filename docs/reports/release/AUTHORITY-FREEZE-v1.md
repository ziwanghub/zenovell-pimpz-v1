# AUTHORITY FREEZE v1 — Homepage Mobile & Desktop

**Effective:** 2026-07-19  
**Source freeze HEAD:** `796be7e26a2dde9a59dfc3fec9b0f21a55a8f747`  
**Branch:** `ui/desktop-image-balance-d5`  
**CI:** GREEN on PR #28  

---

## Status

```text
MOBILE_AUTHORITY:
FROZEN

DESKTOP_AUTHORITY:
FROZEN

TABLET_AUTHORITY:
AUTHORIZED

HOMEPAGE_DESIGN:
LOCKED

SECTIONS:
1-10 LOCKED

GLOBAL_LAYOUT:
LOCKED

SHARED_COMPONENTS:
LOCKED
```

---

## What is frozen

### Mobile (&lt;690px)

- Layout, crop, CTA visibility, typography, spacing for homepage sections  
- Hero mobile asset + art direction  
- Section 2 trust + mobile CTA  
- Section 3 stacked purchase layout  
- Sections 5/6/8 **generic CTAs remain visible**  
- Trust strips, scroll indicators, mobile shells  

### Desktop (≥1280px) and Adaptive Tablet shell rules already shipped

- Homepage Wide Canvas ladder (DWC-02A)  
- Hero tablet/desktop full-bleed + art direction (ZZ-01)  
- Section 2 trust card width ladder; CTA hide ≥690 (ZZ-02)  
- Section 3 image art direction + purchase row (ZZ-03)  
- Section 4 accepted as-is  
- Sections 5/6/8 generic CTA hide ≥690 (ZZ-04)  
- CTA hierarchy: Header · Hero · S3 · S4 · S8 contextual · S10  

### Global / shared (locked)

- Width ladder / HomepageAdaptiveShell tokens  
- PlatformAdaptiveShell for non-homepage routes  
- Shared CTA activation / LINE URL / analytics contracts  
- Commerce orchestration  
- GTM contracts  

---

## Forbidden until dual approval

Until **SA APPROVAL** and **ZZ APPROVAL**:

- Desktop redesign  
- Mobile redesign  
- Hero redesign  
- CTA hierarchy changes  
- Width ladder changes  
- Shared component modification  
- Analytics modification  
- Commerce modification  

### Allowed exception

**Critical bug only**, requiring:

```text
SA APPROVAL
AND
ZZ APPROVAL
```

---

## Documented non-blocking debts

| Debt | Location | Notes |
|---|---|---|
| Hero dual network ≥690 | ZZ-01 | SSR mobile image then desktop; MEDIUM perf |
| S3 source 941px softness | ZZ-03 | ACCEPTABLE at large desktop |
| CTA `href="#"` + activateLineCta | existing | not regression |
| Beta host lag | Hostinger | deploy not tied to this branch CI |

---

## Active development scope after freeze

```text
ONLY: Tablet-first UI polish (690–1279 adaptive band)
MUST NOT: change Mobile or Desktop behavior
```

See `TABLET-DEVELOPMENT-BASELINE.md`.
