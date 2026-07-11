# Current Operating State

## Project
- project name: ZENOVELL-PIMPZ-V4-Active
- branch: main
- HEAD: 0fcd689d2473cec0e7f6de7b982a16fb07473eba
- staging URL: https://beta.zenovell.com

## Active Profile
- ZENOVELL_PRODUCTION_INTEGRATION_PROFILE

## Current Sprint
- Production Integration and Client Delivery

## Verified
- GitHub repository and commit alignment
- Hostinger deployment with NEXT_PUBLIC_GTM_ID
- GTM container installed (GTM-P7MSP66X)
- Google tag configured (G-J8HYPV9S4N)
- GA4 base tracking and page_view
- LINE canonical authority defined (PENDING full audit - see Blocked/Pending)
- Application static path for line_cta_click

## Partially Verified
- line_cta_click runtime verification (static trace passed, active Data Layer pending)
- GTM/GA4 integration overall

## Blocked / Pending
- GTM Event tag paused/malware warning review
- active line_cta_click runtime verification
- LINE URL authority drift audit (canonical https://lin.ee/syjmYE2 vs observed line.me links)
- Search Console
- Google Ads preparation
- production smoke test
- client delivery

## Next Safe Action
Inspect the GTM line_cta_click tag pause and malware-warning state before authorizing any GTM publication or additional event verification.

## Required Reading for New Agents
1. docs/governance/ZENOVELL-PRODUCTION-INTEGRATION-PROFILE.md
2. .z-mos/state/production-services.json
3. docs/handoff/CURRENT-OPERATING-STATE.md
4. docs/ANALYTICS-GTM-INTEGRATION.md
5. docs/handoff/RESTART-CHECKPOINT-2026-07-11.md
6. latest Git commit (0fcd689)
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

Current Result:

PASS_WITH_WARNINGS

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
