from pathlib import Path
import json,re,sys
root=Path(__file__).resolve().parents[1]
required=['index.html','styles.css','app.js','data.js','manifest.webmanifest','sw.js','assets/icons/icon.svg']
missing=[p for p in required if not (root/p).exists()]
if missing: raise SystemExit(f'Missing: {missing}')
manifest=json.loads((root/'manifest.webmanifest').read_text())
assert manifest['display']=='standalone'
assert manifest['start_url'].startswith('./')
html=(root/'index.html').read_text()
assert 'viewport-fit=cover' in html and 'manifest.webmanifest' in html
js=(root/'app.js').read_text()
for marker in ['Practice done','I already know this','Needs more practice']:
    if marker not in (root/'data.js').read_text(): raise AssertionError(marker)
assert "rec.attempts<1" in js
assert "tryAgain" in js
assert 'answer stays hidden' in (root/'data.js').read_text().lower()
assert 'CACHE=' in (root/'sw.js').read_text()
print('STATIC_AUDIT_OK')
