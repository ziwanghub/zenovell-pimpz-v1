# Current Operating State

## Project
- project name: ZENOVELL-PIMPZ-V4-Active
- branch: main
- source HEAD at RC3 closure recording: d16191fa86895921edb2c7b2c26ce8ecc706c18a
- staging / Production Candidate URL: https://beta.zenovell.com
- production domain: https://zenovell.com (**unreleased**)

## Active Profile
- ZENOVELL_PRODUCTION_INTEGRATION_PROFILE

## Current Sprint
- Production Integration and Client Delivery

## Release Candidate Gates
| Gate | Status |
|---|---|
| RC1 — Client analytics bootstrap | **COMPLETE** |
| RC2 — Secondary CTA authority + analytics coverage | **COMPLETE** |
| RC3 — GTM Preview / GA4 Realtime / Parameter contract | **COMPLETE** |
| GTM publication | **NOT_AUTHORIZED / PENDING** |
| Published public GTM conversion behavior | **NOT_YET_VERIFIED_AFTER_PUBLISH** |
| Search Console | **NOT_STARTED** |
| Google Ads readiness | **NOT_STARTED** |
| Full production smoke | **PENDING** |
| Production switch (zenovell.com) | **NOT_AUTHORIZED** |
| Backend / Phase 7 | **DEFERRED** |

## Verified
- GitHub repository and commit alignment (main)
- Hostinger beta deployment with NEXT_PUBLIC_GTM_ID=GTM-P7MSP66X
- GTM container installed (GTM-P7MSP66X)
- Google tag destination G-J8HYPV9S4N (Preview evidence)
- GA4 base tracking and page_view
- Application analytics runtime (client adapter bootstrap + dataLayer)
- line_cta_click application runtime (exactly one event per click)
- CTA coverage (RC2 8/8 + regression sample + parameter contract 14/14)
- GTM Preview trigger match and GA4 Event tag fire (Owner Preview evidence)
- GA4 Realtime line_cta_click reception (Owner evidence)
- Parameter contract 14/14 (event_version, cta_location, destination, page_path, link_url, source, intent)
- Canonical LINE authority https://lin.ee/syjmYE2
- Official LINE redirect to OA @362lupso
- Legacy runtime URL line.me/ti/p/@zenovell: **RESOLVED — count 0**

## Partially Verified / Open (publish gate only)
- GTM workspace Ecommerce settings on line_cta_click tag (**OPEN — MUST BE VERIFIED BEFORE GTM PUBLISH**)
- Tag pause / warning residual state (**OPEN — MUST BE VERIFIED BEFORE GTM PUBLISH**)
- Post-publish live public conversion path

## Blocked / Pending (next phases)
- GTM publish (separate authorization)
- Search Console
- Google Ads preparation
- Full production smoke test
- Client delivery / Production Candidate approval
- Production domain switch

## Next Safe Action
Prepare and execute the next approved Production Integration release gate while keeping beta.zenovell.com as the Production Candidate and zenovell.com unreleased. Verify GTM publish prerequisites (Ecommerce/pause/warning) before any publish authorization.

## Required Reading for New Agents
1. docs/governance/ZENOVELL-PRODUCTION-INTEGRATION-PROFILE.md
2. .z-mos/state/production-services.json
3. docs/handoff/CURRENT-OPERATING-STATE.md
4. docs/ANALYTICS-GTM-INTEGRATION.md
5. docs/reports/phase6/RC3-GTM-ANALYTICS-PARAMETER-CONTRACT-CLOSURE.md
6. latest Git commit on main
7. current .z-mos/intent.card.json, truth.contract.json, state/project-state.json

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

Validation:

✓ Grok CLI
✓ Codex Independent Cold Start
✓ RC1 / RC2 / RC3 evidence recorded

Current Result:

PASS

Purpose:

A newly started AI agent must be able to reconstruct
the complete operational state from repository-owned
artifacts without relying on previous chat history.

Primary Authority:

1. Git
2. .z-mos/state/production-services.json
3. intent.card.json
4. truth.contract.json
5. project-state.json
6. CURRENT-OPERATING-STATE.md

## Stop Conditions
Reference the active profile (ZENOVELL-PRODUCTION-INTEGRATION-PROFILE.md).
