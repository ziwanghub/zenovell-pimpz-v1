# SEC-01 — GitHub Governance Hardening Report

**Task:** SEC-01  
**Mode:** Controlled Operations · Repository Governance Only  
**Date:** 2026-07-23  
**Repository:** `ziwanghub/zenovell-pimpz-v1`  
**Local workspace:** ZENOVELL-PIMPZ-V4-Active  
**Target branch:** `main`  
**Operator identity (non-sensitive):** GitHub user `ziwanghub` with **admin** permission  

```text
NO APPLICATION SOURCE CHANGES
NO UI / RESPONSIVE / DEPLOYMENT CHANGES
NO DEPENDENCY UPDATES
```

---

## 1. Executive Summary

GitHub governance for Soft Launch readiness was hardened on `ziwanghub/zenovell-pimpz-v1` without modifying application runtime, Hostinger, or npm packages.

| Control | Result |
|---------|--------|
| Classic Branch Protection on `main` | **Applied** |
| Required PR + 1 approval + conversation resolution | **ON** |
| Required status check `validate` (strict) | **ON** |
| Force push / branch deletion | **Blocked** |
| Enforce admins | **ON** |
| Dependabot alerts (vulnerability alerts) | **ON** |
| Dependabot security updates | **ON** |
| Secret scanning | **ON** |
| Secret scanning push protection | **ON** |
| Actions default GITHUB_TOKEN | **read** (pre-existing) |
| Actions cannot approve PRs | **true** (pre-existing) |
| Application source modified | **NO** |
| Deployment performed | **NO** |
| Visibility | **public** (unchanged by design) |

**Final verdict:** `SEC-01_PASS_WITH_WARNINGS`

Primary residual warning: **solo owner + `enforce_admins` + 1 required approval** means merges to `main` need a second reviewer account (or temporary process adjustment). This is intentional security friction, not a failed control.

---

## 2. Repository and HEAD

| Field | Value |
|-------|-------|
| Remote | `git@github.com:ziwanghub/zenovell-pimpz-v1.git` |
| Visibility | **public** |
| Default branch | `main` |
| Local branch (preflight) | `main` |
| Local HEAD (preflight) | `a29f0ce` (`a29f0ce93dc4db1fa9546f450b2df8258c18672e`) |
| Working tree | Clean of app changes; untracked `docs/reports/field/` (out of scope for this task) |
| Auth | `gh` logged in as `ziwanghub` (scopes include `repo`) |
| Permission | **admin** |

---

## 3. Pre-change State

| Control | Before |
|---------|--------|
| Branch protection on `main` | **None** (API 404) |
| Rulesets | Empty `[]` |
| Dependabot security updates | disabled |
| Secret scanning | disabled |
| Push protection | disabled |
| Vulnerability alerts | disabled |
| Actions enabled | true |
| Allowed actions | `all` |
| SHA pinning required | false |
| Default workflow permissions | **read** |
| Can approve PRs via Actions | **false** |
| CI workflow | `.github/workflows/ci.yml` name `CI`, job **`validate`** |
| Status check name observed on main | **`validate`** (app: github-actions) |
| Open PRs | Multiple open docs/UI PRs (unrelated; not merged) |

---

## 4. Changes Applied

### Phase 1 — Branch protection (Classic)

Mechanism: **Classic Branch Protection** (not Ruleset).

API: `PUT /repos/ziwanghub/zenovell-pimpz-v1/branches/main/protection`

Configured:

- Require pull request reviews before merging  
- `required_approving_review_count`: **1**  
- `dismiss_stale_reviews`: **true**  
- `required_conversation_resolution`: **true**  
- Required status checks: **`validate`** only (exact name from check-runs history)  
- `strict`: **true** (branch must be up to date with base)  
- `allow_force_pushes`: **false**  
- `allow_deletions`: **false**  
- `enforce_admins`: **true**  
- `restrictions`: null (no path user restrictions)

### Phase 2 — Security features

| Feature | Action | Result |
|---------|--------|--------|
| Vulnerability alerts | `PUT .../vulnerability-alerts` | **204** → enabled (Dependabot Alerts prerequisite) |
| Dependabot security updates | `PUT .../automated-security-fixes` + PATCH security_and_analysis | **enabled** |
| Secret scanning | PATCH `security_and_analysis.secret_scanning` | **enabled** |
| Push protection | PATCH `secret_scanning_push_protection` | **enabled** |
| Secret scanning non-provider patterns | Not forced | remains **disabled** |
| Secret scanning validity checks | Not forced | remains **disabled** |
| Dependency graph | Implicit with public repo + alerts | available / no error |

General Dependabot version-update schedule: **out of scope** (not created).

### Phase 3 — GitHub Actions governance

| Setting | Action |
|---------|--------|
| `default_workflow_permissions: read` | **Already correct — left unchanged** |
| `can_approve_pull_request_reviews: false` | **Already correct — left unchanged** |
| `allowed_actions: all` | **Left unchanged** (restricting would risk CI break without SHA inventory) |
| `sha_pinning_required: false` | **Left unchanged** → follow-up **SEC-01B** recommended |
| Workflow file rewrite | **Not performed** |

---

## 5. Branch Protection / Ruleset Configuration

| Item | Value |
|------|-------|
| Mechanism | **Classic Branch Protection** |
| Branch | `main` |
| Enforce admins | **true** |
| Required approvals | **1** |
| Dismiss stale approvals | **true** |
| Conversation resolution | **required** |
| Force push | **blocked** |
| Branch deletion | **blocked** |

---

## 6. Required Status Checks

| Context | Source | Strict |
|---------|--------|--------|
| **`validate`** | GitHub Actions job in workflow `CI` (`.github/workflows/ci.yml`) | **yes** |

No invented check names. Context matches `gh api .../commits/main/check-runs` observation prior to change.

---

## 7. Dependabot Status

| Feature | Status |
|---------|--------|
| Dependabot Alerts (vulnerability alerts) | **ON** (GET returns 204 when enabled) |
| Dependabot Security Updates | **ON** |
| Dependabot version updates (scheduled PRs for all deps) | **Not configured** (out of scope) |

---

## 8. Secret Scanning Status

| Feature | Status |
|---------|--------|
| Secret scanning | **ON** |
| Non-provider patterns | OFF (optional / not enabled) |
| Validity checks | OFF (optional / not enabled) |

---

## 9. Push Protection Status

| Feature | Status |
|---------|--------|
| Secret scanning push protection | **ON** |

---

## 10. GitHub Actions Governance Status

| Control | Status | Notes |
|---------|--------|-------|
| Actions enabled | true | Required for CI |
| Allowed actions | all | Conservative retention; SEC-01B to pin SHA |
| Default GITHUB_TOKEN | **read** | PASS |
| Actions may approve PRs | **false** | PASS |
| Fork PR secrets | N/A / default GitHub behavior | No deploy secrets in CI workflow |
| Workflow writes to source | CI does not deploy | validate-only pipeline |

**Actions governance overall:** **PARTIAL** (token permissions good; action allow-list / SHA pin not tightened).

---

## 11. Blocked or Unavailable Controls

| Item | Status | Reason / Manual fallback |
|------|--------|---------------------------|
| Secret scanning validity checks | Not enabled | Optional enterprise-ish feature; enable in UI if desired |
| Non-provider pattern scanning | Not enabled | Optional; enable in Settings → Code security if wanted |
| Restrict allowed_actions to `selected` | Not applied | Would require inventory of `actions/checkout@v4` / `actions/setup-node@v4` pins; risk of breaking CI |
| Second human reviewer always available | Process risk | Solo admin cannot self-approve under GitHub rules; add collaborator or use temporary dual-account process |

---

## 12. Residual Risks

1. **Solo maintainer merge friction:** `enforce_admins` + 1 approval blocks single-person merge without a second account.  
2. **Public repository:** Source and history remain world-readable (intentional; not changed).  
3. **Actions not SHA-pinned:** `checkout@v4` / `setup-node@v4` still tag-based → supply-chain residual → **SEC-01B**.  
4. **CI does not deploy:** Hostinger access remains separate trust boundary → **SEC-02**.  
5. **npm high advisories still open:** Deferred to **SEC-03** (no `npm audit fix` in this task).  
6. **Security headers / GTM consent:** Deferred to SEC-04 / ZEN-AUDIT-05.

---

## 13. Evidence

| Evidence | How verified |
|----------|----------------|
| Protection JSON | `GET .../branches/main/protection` after PUT |
| Check name `validate` | Preflight check-runs on `main` |
| security_and_analysis | `GET /repos/...` after PATCH |
| Vulnerability alerts | `GET .../vulnerability-alerts` → **204** |
| Actions permissions | `GET .../actions/permissions` + `.../workflow` |
| No app source edits | `git status` — only untracked field docs unrelated; no `app/` / `components/` changes from SEC-01 |
| No deployment | No Hostinger/workflow deploy steps executed |

---

## 14. Verification Results

| Check | Result |
|-------|--------|
| `main` requires PR reviews | **PASS** |
| Required status check `validate` configured | **PASS** |
| Strict up-to-date required | **PASS** |
| Force push blocked | **PASS** (`allow_force_pushes.enabled: false`) |
| Deletion blocked | **PASS** |
| Dependabot alerts | **ON** |
| Dependabot security updates | **ON** |
| Secret scanning | **ON** |
| Push protection | **ON** |
| Actions token read-default | **PASS** |
| Actions cannot approve PRs | **PASS** |
| Visibility still public | **PASS** |
| Application source modified | **NO** |
| Deployment performed | **NO** |
| Destructive push test | **Not performed** (per safety rules) |

---

## 15. Rollback Guidance

If protection must be temporarily relaxed (emergency only):

```bash
# Inspect first
gh api repos/ziwanghub/zenovell-pimpz-v1/branches/main/protection

# Remove classic protection (destructive to policy — SA approval required)
gh api -X DELETE repos/ziwanghub/zenovell-pimpz-v1/branches/main/protection

# Or edit individual settings via GitHub UI:
# Settings → Branches → Branch protection rules → main
```

Disable security features only via Settings → Code security and analysis (prefer temporary, documented).

**Do not** disable force-push protection casually on a public Soft Launch repository.

---

## 16. Final Verdict

```text
SEC-01_PASS_WITH_WARNINGS
```

Warnings are operational (solo review capacity; Actions SHA pin follow-up), not failed enablement of core controls.

---

## 17. Recommended Next Task

```text
SEC-02_HOSTINGER_ACCESS_SECURITY_REVIEW
```

Then: **SEC-03** Dependency Advisory Triage (no blind audit fix) → **SEC-04** Security Headers → **ZEN-AUDIT-05** Consent/GTM.

Optional immediate follow-up: **SEC-01B** — pin GitHub Actions to commit SHAs + optional `allowed_actions: selected`.

---

## Appendix — Preflight snapshot (Phase 0)

| Item | Value |
|------|-------|
| CI workflow names | `CI` |
| Exact required check name | **`validate`** |
| Existing open PRs | Yes (historical docs/UI); not modified by SEC-01 |
| Unrelated local untracked | `docs/reports/field/` (FIELD validation protocol; excluded from this commit set unless PR includes only security report) |
