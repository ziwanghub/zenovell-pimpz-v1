# Tablet Development Baseline

**Baseline freeze HEAD:** `796be7e`  
**Active band:** Adaptive Tablet **690–1279px** (primary), with care at edges into Desktop  
**Date:** 2026-07-19  

---

## Contract

```text
TABLET_AUTHORITY: AUTHORIZED
MOBILE_AUTHORITY: FROZEN — do not regress <690
DESKTOP_AUTHORITY: FROZEN — do not regress ≥1280
```

### Tablet may adjust

- Layout composition within adaptive shell  
- Grid / column behavior **only where Desktop grid is not already authority**  
- Image `object-position` / stage height (CSS breakpoints)  
- Typography scale and spacing **scoped `min-[690px]`–`max-[1279px]` where needed**  
- Local section rhythm  

### Tablet must never modify

- Mobile behavior / crop / CTA visibility under 690  
- Desktop ≥1280 composition that is already frozen  
- CTA destinations, analytics, commerce, shared handlers  
- Global width ladder tokens without SA+ZZ dual approval  
- Shared runtime components unless unavoidable (then STOP)  

---

## Preferred implementation rules

1. Prefer **CSS media / Tailwind breakpoint classes** over JS viewport.  
2. Use **range-safe** classes so Desktop is not accidentally overridden (watch `md:` vs `min-[1280px]`).  
3. Max runtime files per micro-phase: keep **section-local**.  
4. Always verify: **390 · 690 · 768 · 1024 · 1280 · 1440**.  
5. Independent verification before checkpoint.  

---

## Execution order (T1+)

```text
Section 1 (Hero adaptive polish if needed)
→ 2 Trust
→ 3 Product
→ 4 Catalog
→ 5 Why choose
→ 6 How to order
→ 7 Privacy
→ 8 Reviews
→ 9 FAQ
→ 10 Final CTA
```

Each section loop:

```text
Implementation
→ Browser Verify (Mobile + Tablet + Desktop)
→ SA Review
→ Checkpoint
→ GitHub push
→ CI PASS
→ Freeze section note
→ Next
```

---

## Reference checkpoints

| Phase | Commit |
|---|---|
| DWC-02A Wide Canvas | `97aab20` |
| ZZ-01+02 Hero + Trust | `5d4cbce` |
| ZZ-03 Featured product | `aa80593` |
| ZZ-04 CTA density | `796be7e` |
| Authority freeze docs | (this release pack) |

---

## Success definition for Tablet phase

- Tablet reading/layout quality improved  
- **Zero intentional Mobile/Desktop visual regressions**  
- Contracts intact  
- CI green per checkpoint  
