# ZENOVELL-PIMPZ-V4 Shutdown Checkpoint

**Date**: 2026-07-11
**Project**: ZENOVELL-PIMPZ-V4-Active
**Current Sprint**: Production Integration and Client Delivery
**Current Profile**: ZENOVELL_PRODUCTION_INTEGRATION_PROFILE
**Git Branch**: main
**Git HEAD**: 0fcd689d2473cec0e7f6de7b982a16fb07473eba

## Production Services Summary

**Verified**:
- GitHub repository and commit alignment (0fcd689, up to date with origin)
- Application static path for line_cta_click (code trace complete)

**Configured**:
- Hostinger deployment (beta.zenovell.com with NEXT_PUBLIC_GTM_ID=GTM-P7MSP66X)
- GTM Container (GTM-P7MSP66X installed)
- Google Tag (destination G-J8HYPV9S4N configured)
- GA4 base tracking (G-J8HYPV9S4N property/stream)

**Pending**:
- LINE OA authority drift audit (canonical https://lin.ee/syjmYE2)
- Search Console
- Google Ads preparation
- production smoke test
- client delivery

**Blocked**:
- GTM Event tag (line_cta_click) paused / malware-warning
- GTM publish
- active line_cta_click runtime verification in Data Layer / GA4 Realtime

## Open Issues
- GTM line_cta_click tag paused/malware warning (BLOCKED - requires Unpause + review + evidence before publish)
- active line_cta_click runtime verification (PARTIALLY_VERIFIED - static passed, runtime pending)
- LINE URL authority drift (PENDING - audit required)
- Tag Assistant session management (DEBUG_SESSION_INCOMPLETE)

## Next Safe Action
Inspect the GTM line_cta_click tag pause and malware-warning state before authorizing any GTM publication or additional event verification.

## Required Reading After Restart
1. docs/handoff/CURRENT-OPERATING-STATE.md
2. .z-mos/state/production-services.json
3. docs/governance/ZENOVELL-PRODUCTION-INTEGRATION-PROFILE.md
4. .z-mos/intent.card.json
5. .z-mos/truth.contract.json
6. .z-mos/state/project-state.json
7. docs/ANALYTICS-GTM-INTEGRATION.md
8. latest Git commit and status

## Stop Conditions
- Git state unclear
- Scope exceeds RC1.x or profile
- GTM tag malware warning unresolved
- line_cta_click not verified in active Data Layer
- LINE URL not consistent with canonical
- Any claim without evidence
- Truth verdict unsafe

## Cold Start Resume Workflow
1. Open repository (cd to active dir)
2. Read: docs/handoff/CURRENT-OPERATING-STATE.md
3. Read: .z-mos/state/production-services.json
4. Read: .z-mos/intent.card.json
5. Read: .z-mos/truth.contract.json
6. Read: .z-mos/state/project-state.json
7. Read latest Git commit and `git status`
8. Read open production blockers
9. Resume exactly from: Next Safe Action
Do not rely on chat history.

## Expected First Command After Restart
cd /Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active
git status --short
git branch --show-current
git rev-parse HEAD
cat docs/handoff/CURRENT-OPERATING-STATE.md
cat .z-mos/state/production-services.json

## Expected First Validation
- Confirm current objective and next safe action match files
- Confirm production-services statuses
- Proceed to GTM Preview reconnect (keep session open)
- Click LINE CTA and verify line_cta_click in Data Layer
- Resolve tag state before any publish decision
