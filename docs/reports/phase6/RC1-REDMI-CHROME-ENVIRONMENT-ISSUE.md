# RC1-REDMI-CHROME-ENVIRONMENT-ISSUE

**Date**: 2026-07-10  
**Incident ID**: RC1.2  
**Status**: RESOLVED (Client Environment)

## Summary

One specific Redmi Android device exhibited severe visual rendering corruption (duplicated layers, overlapping elements, stacked icons) in Landing Page Sections 4–7 when using its installed Chrome browser on https://beta.zenovell.com.

## Scope

- Affected: Chrome on one Redmi device
- Not affected:
  - Other Android browsers
  - Android LINE In-App Browser (unless separately reported)
  - All iOS browsers (Safari, Chrome, LINE)
  - Sections 1, 2, 3, 8+

## Root Cause Classification

**PRIMARY: CLIENT_ENVIRONMENT / CHROME_INSTALLATION_OR_VERSION_ISSUE**

After the user uninstalled and/or updated Chrome on the affected Redmi device, the visual corruption no longer reproduced.

Retest on the same device with updated Chrome: PASS.

No website code defect was reproduced in a clean or updated environment.

## Evidence

- Real-device screenshots provided by owner showing duplication in Sections 4-7 only.
- Post-remediation retest: clean rendering.
- No reproduction on other devices/browsers.
- Code audit showed no duplicate React renders or global CSS issues that would affect only one browser instance.

## Actions Taken

- Investigated Sections 4-7 for shared compositing patterns (transition-transform, scale, heavy shadows).
- Experimental patch prepared but not required after environment remediation.
- Patch files restored to approved baseline.
- LINE OA RC1.1 patch (ebc4ae3) remains intact and verified.
- Working tree cleaned.
- Incident documented as environment-specific.

## Reopen Conditions

Reopen only if the issue reproduces on:
- Another Android device with current Chrome
- Clean Chrome installation on any Android
- Android LINE WebView
- Multiple users
- Or after confirming it is not resolved by browser update

## Resolution

The defect is classified as client environment / browser installation issue.

No production code change for rendering is required at this time.

Website rendering on Android is considered acceptable based on available evidence.

## Related

- RC1.1 LINE OA fix: ebc4ae3235801767f3c72b995db5b5cd198d7d1a
- P8.0 Premium UI Polish baseline preserved
- Phase 6E RC1 baseline preserved

