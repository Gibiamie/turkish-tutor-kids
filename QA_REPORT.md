# Version 03 Acceptance and Regression Report

Release date: 2026-07-15

## Passed checks

- JavaScript syntax: `app.js`, `data.js`, `sw.js`
- Manifest JSON validation
- Required production-file inventory
- Five A1 foundation lessons present
- Mobile Chromium flow at 390 × 844
- English onboarding and Bahasa Indonesia switching
- Search with typo tolerance (`evl` locates `evler`)
- Wrong-answer feedback does not expose the correct option
- Correct-answer progression
- Suffix-builder interaction
- No horizontal overflow in tested mobile flow
- No browser console errors or unhandled page errors
- `I already know this` is blocked until at least one practice attempt
- Versioned service-worker cache with old-cache removal

## Product acceptance

- Single production code path; obsolete `app.part*.txt` files removed
- No microphone or location permission
- Progress remains on the device
- Existing root-word images reused from the previous application with emoji fallback
- Only user-verified plural audio is enabled in the release scope

Status: passed for Version 03 production release.
