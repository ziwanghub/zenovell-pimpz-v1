# Mobile Navigation Freeze

**Date:** 2026-07-18  
**Surface:** Global Header Drawer (mobile / &lt;1280)  
**Merge:** PR #18 → `main` @ `883f6cf`  
**SA Visual:** PASS · UX PASS · Accessibility PASS · Mobile-first PASS  
**SA score:** **9.2 / 10**

---

## Freeze status

```text
MOBILE_NAVIGATION: FROZEN
GLOBAL_HEADER_DRAWER: PASS
```

### Frozen decisions

1. Location context block (“คุณกำลังดู” + active label)  
2. Primary nav vs sticky LINE action hierarchy  
3. Active state language (indicator + tinted bg + `aria-current`)  
4. LINE primary / secondary presentation intents  
5. Safe-area sticky CTA area  
6. Canonical LINE destination + existing analytics surfaces  

### Explicitly not frozen (future enhancement)

- Product-name-aware location on PLP  
- Active indicator animation polish  
- Desktop mega-menu  

### Modification rule

Do not change frozen drawer IA without **SA Scope Lock**.  
Bugfixes that preserve contracts are allowed with evidence.

### Evidence

- `docs/reports/navigation/GLOBAL-HEADER-DRAWER-MOBILE-REFINEMENT.md`  
- `screenshot/Mobile-screenshot/01-header-menu/drawer-refinement-after/`  
