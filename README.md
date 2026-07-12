# Turkish Tutor — Version 03

Production-oriented, mobile-first Turkish learning PWA for English and Bahasa Indonesia speakers.

## Product scope

- Separate profiles for Bella, Ayza, Adult and Guest
- A1 learning path covering Turkish sounds, first words, natural greetings, suffix building and an A1 checkpoint
- Listen, choose, type, build and self-assessment activities
- Turkish-character-tolerant search after three characters
- Profile-specific progress, mistake review, accuracy and streak tracking
- Light/dark mode and responsive one-handed mobile UI
- Offline application shell with a versioned service worker
- No login, location collection or background microphone use
- Existing visual and recorded-audio assets are served from the `turkish-tutor-kids-clean` GitHub Pages library; Turkish device speech is used when a recording is unavailable

## Production architecture

- `index.html` — application shell
- `styles.css` — responsive design system
- `data.js` — curriculum, localization and search data
- `app.js` — verified production loader
- `app.part1.txt`–`app.part3.txt` — deterministic production module chunks
- `sw.js` — cache lifecycle and offline routing
- `manifest.webmanifest` and `icon.svg` — installable PWA metadata

## Local serving

Serve the repository over HTTP because service workers do not run correctly from `file://` URLs.

```bash
python3 -m http.server 4173
```

Release: Version 03 — 2026-07-12
