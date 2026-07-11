# Current Operating State

## Project
- project name: ZENOVELL-PIMPZ-V4-Active
- branch: main
- Production Candidate URL: https://beta.zenovell.com
- production domain: https://zenovell.com (**unreleased**)

## Active Profile
- ZENOVELL_PRODUCTION_INTEGRATION_PROFILE

## Current Phase
- **Production Readiness Review before zenovell.com release**
- Analytics Integration: **COMPLETE**
- Analytics Infrastructure: **FROZEN / PRODUCTION BASELINE**

## Release Candidate Gates
| Gate | Status |
|---|---|
| RC1 — Client analytics bootstrap | **COMPLETE** |
| RC2 — Secondary CTA authority + analytics coverage | **COMPLETE** |
| RC3 — Preview / Realtime / app parameter contract | **COMPLETE** |
| RC4A / RC4B / RC4C — GTM publish readiness + Workspace + publish | **COMPLETE** |
| GTM Version 2 | **PUBLISHED / LIVE** |
| Analytics Integration (app + dataLayer + GTM + GA4) | **COMPLETE** |
| QA-001 Full CTA surface regression | **DEFERRED** (after UI/UX Freeze) |
| Search Console | **NOT_STARTED** |
| Google Ads readiness | **NOT_STARTED** |
| Full device/browser smoke | **PENDING** |
| Production switch (zenovell.com) | **NOT_AUTHORIZED** |
| Backend / Phase 7 | **DEFERRED** |

## Verified
- GitHub main + CI on latest authority commits
- Hostinger beta with NEXT_PUBLIC_GTM_ID=GTM-P7MSP66X
- GTM container GTM-P7MSP66X **Version 2 published**
- Google tag G-J8HYPV9S4N
- Application analytics runtime (bootstrap + dataLayer)
- `line_cta_click` app emission (one per click)
- Custom parameter delivery verified in GA4 DebugView **before** publish
- GA4 Realtime receives `page_view` and `line_cta_click` from **real mobile usage**
- Canonical LINE `https://lin.ee/syjmYE2` / OA `@362lupso`
- Legacy runtime `line.me/ti/p/@zenovell` count **0**
- No application source change required for analytics infrastructure
- No GTM configuration change currently required

## Explicit non-claims
- Not every CTA surface re-tested after GTM Version 2 publish
- Full multi-surface CTA regression is **QA-001 DEFERRED** until UI/UX Freeze
- zenovell.com is not production

## Deferred / Pending (next phase order)
1. UI/UX remaining work and design freeze
2. SEO and metadata production audit
3. Search Console preparation
4. Google Ads conversion preparation
5. Full device/browser smoke test
6. **QA-001 CTA Surface Regression**
7. zenovell.com domain switch
8. Post-switch production verification
9. Final handoff

## Next Safe Action
Begin **Production Readiness Review before zenovell.com release**: continue UI/UX freeze path and SEO/Search Console/Ads prep as authorized; run QA-001 only after UI/UX Freeze.

## Required Reading for New Agents
1. docs/governance/ZENOVELL-PRODUCTION-INTEGRATION-PROFILE.md
2. .z-mos/state/production-services.json
3. docs/handoff/CURRENT-OPERATING-STATE.md
4. docs/ANALYTICS-GTM-INTEGRATION.md
5. docs/reports/phase6/ANALYTICS-INTEGRATION-CLOSEOUT.md
6. docs/governance/backlog/QA-001-CTA-SURFACE-REGRESSION.md
7. latest Git commit on main
8. .z-mos/intent.card.json, truth.contract.json, state/project-state.json

## Authority Precedence
1. Git truth for source code
2. .z-mos/state/production-services.json for external-service state
3. .z-mos/intent.card.json for current objective and next safe action
4. .z-mos/truth.contract.json for safety verdict
5. .z-mos/state/project-state.json for operational state
6. CURRENT-OPERATING-STATE.md as human/agent boot context
7. Shutdown/restart checkpoints as historical handoff snapshots (do not override newer state)

## Cold Start Protocol

Version:
1.0

Continuity Model:
Repository-Driven

Current Result:
PASS

## Stop Conditions
Reference the active profile (ZENOVELL-PRODUCTION-INTEGRATION-PROFILE.md).
