# SEC-04 — Baseline Security Headers

**Task:** SEC-04  
**Mode:** Minimal-risk security hardening  
**Date:** 2026-07-23  
**Repository:** `ziwanghub/zenovell-pimpz-v1`  
**Base:** `main` @ `a29f0ce`  
**Change surface:** `next.config.ts` only (+ this report)

```text
NO UI / RESPONSIVE / ANALYTICS / GTM / GA4 / LINE / SEO METADATA / BUSINESS LOGIC CHANGES
```

---

## Final Verdict

```text
SEC-04_PASS
```

---

## 1. Before (beta edge sample — SEC-02)

Observed on `https://beta.zenovell.com` (Hostinger):

| Header | Before |
|--------|--------|
| `Strict-Transport-Security` | **Missing** |
| `X-Content-Type-Options` | **Missing** |
| `Referrer-Policy` | **Missing** |
| `Permissions-Policy` | **Missing** |
| `X-Frame-Options` | **Missing** |
| `Content-Security-Policy` | `upgrade-insecure-requests` only (Hostinger/platform) |
| `X-Powered-By` | `Next.js` |

---

## 2. After (application-emitted via Next)

Configured in `next.config.ts`:

| Header | Value | Scope |
|--------|-------|-------|
| `X-Content-Type-Options` | `nosniff` | All envs |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | All envs |
| `X-Frame-Options` | `DENY` | All envs |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=(), payment=(), usb=()` | All envs |
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains` | **`NODE_ENV=production` only** |
| `poweredByHeader` | **`false`** | Removes Next `X-Powered-By` when Next serves response |

### Local production verification (`next start -p 3010`)

Homepage and Product both returned:

```text
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
X-Frame-Options: DENY
Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

`X-Powered-By` **not present**.

---

## 3. Headers Added

- X-Content-Type-Options  
- Referrer-Policy  
- X-Frame-Options  
- Permissions-Policy (minimal deny list)  
- Strict-Transport-Security (production)  
- Disable Next powered-by header  

---

## 4. Headers Deferred

| Header / control | Reason |
|------------------|--------|
| **Restrictive CSP** (script-src, etc.) | Explicitly out of scope; risk to GTM/LINE/third-party scripts |
| CSP `frame-ancestors` | Covered by `X-Frame-Options: DENY` for this phase |
| HSTS `preload` | Not submitted; requires long-term HTTPS guarantee on all subdomains |
| Platform CSP merge on Hostinger | Hostinger may continue emitting `upgrade-insecure-requests`; **left as-is** (compatible additive posture) |
| Apex `zenovell.com` parking headers | Domain not serving Next app yet (SEC-02); fix at cutover |

---

## 5. CSP Decision (this phase)

| Decision | Keep Hostinger / edge `Content-Security-Policy: upgrade-insecure-requests` **unchanged** |
|----------|----------------------------------------------------------------------------------------|
| App-level CSP | **Not expanded** |
| Rationale | Avoid breaking GTM, analytics, fonts, and third-party LINE handoff paths before ZEN-AUDIT-05 |

---

## 6. Regression Results

| Check | Result |
|-------|--------|
| `npm run lint` | **PASS** |
| `npm run typecheck` | **PASS** |
| `npm run build` | **PASS** |
| Local prod headers home | **PASS** |
| Local prod headers product | **PASS** |
| UI / responsive code | **Unchanged** |
| Analytics / GTM / LINE code | **Unchanged** |
| SEO metadata code | **Unchanged** |

**Note:** Full browser LINE/GTM regression is unchanged by headers; smoke after Hostinger deploy is recommended (not a code fail).

---

## 7. Production Compatibility

| Environment | Compatibility |
|-------------|---------------|
| Local `next start` | Headers verified |
| `beta.zenovell.com` | Will apply after deploy of this commit; may sit **alongside** Hostinger CSP upgrade-insecure-requests |
| Apex parking `zenovell.com` | **Not Next** — headers not applicable until cutover |
| HSTS on beta | Safe (beta already HTTP→HTTPS 301) |
| HSTS includeSubDomains | Applies to host that sends the header (e.g. beta.zenovell.com and its subdomains) |

---

## 8. Files Changed

| File | Change |
|------|--------|
| `next.config.ts` | `poweredByHeader: false` + `headers()` baseline |
| `docs/reports/security/SEC-04-SECURITY-HEADERS.md` | This report |

---

## 9. Residual Risks / Warnings

1. Headers appear on **Next-served** responses; CDN may add/override some values — verify on beta after deploy.  
2. No full CSP yet — intentional.  
3. Apex production domain still parking (SEC-02) — separate cutover work.  
4. Next 16.2.11 Wave 1 patch still deferred per SA (SEC-03).  

None block SEC-04 acceptance.

---

## Final Verdict

```text
SEC-04_PASS
```

---

## Next Task

```text
ZEN-AUDIT-05
```

Consent + GTM + PDPA technical audit (read-only), then Wave 1 Next patch scheduling and Soft Launch / **PSG-01 Production Security Gate** before apex cutover.

---

**End of SEC-04**
