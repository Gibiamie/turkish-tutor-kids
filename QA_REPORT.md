# Version 03 Acceptance and Regression Report

Release date: 2026-07-12

## Automated checks passed

- JavaScript syntax validation for application, curriculum data and service worker
- Manifest JSON validation
- Unique lesson and activity identifiers
- Curriculum inventory: 5 A1 lessons, 21 activities and 19 searchable entries
- Four isolated learner profiles
- Sequential lesson locking and unlocking
- Lesson completion, resume position and progress persistence
- Correct and incorrect answer feedback
- Alternative answer acceptance without Turkish characters where explicitly supported
- Mistake recording and mistake-review flow
- Token-based suffix builder
- Turkish-character-tolerant fuzzy search (`kopek` → `köpek`)
- English and Bahasa Indonesia interface switching
- Dark-mode switching
- Online/offline state handling
- Service-worker cache versioning and old-cache removal
- No horizontal overflow at 320 px, 360 px and 412 px viewport widths
- Bottom navigation touch area above 60 px
- No browser console errors or unhandled page errors in the automated mobile flow

## Product acceptance

- Main learning flow reaches value without registration or long onboarding
- No location permission is requested
- No microphone permission or background listening is used
- Progress is stored per profile on the device
- Recorded media has a controlled fallback when an individual asset is unavailable
- Empty input, missing selection and no-result states provide explicit feedback

Status: Passed for Version 03 production release.
