# Türkçe Adım — Version 03

Production PWA for English- and Bahasa Indonesia-speaking Turkish learners.

## Release scope

- Five clean A1 foundation topics: Turkish sounds, root words, meaning builder, possession, plurals
- No-answer-reveal practice flow
- `Practice done / I already know this / Needs more practice` statuses, available only after practice
- Local progress, review scheduling, typo-tolerant Turkish search
- Verified legacy audio for plural examples
- Legacy root-word images with resilient emoji fallback
- Offline app shell and runtime media caching
- Responsive mobile-first interface

## Local run

```bash
python3 -m http.server 4173
```

Open `http://localhost:4173`.

## QA

```bash
node --check app.js
node --check data.js
node --check sw.js
python3 -m json.tool manifest.webmanifest
python3 tests/static_audit.py
python3 tests/browser_qa.py
```
