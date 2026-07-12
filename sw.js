const VERSION = 'turkish-tutor-v03-20260712-r1';
const CORE = ['./','./index.html','./styles.css','./app.js','./app.part1.txt','./app.part2.txt','./app.part3.txt','./data.js','./manifest.webmanifest','./icon.svg'];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(VERSION).then(cache => cache.addAll(CORE)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k=>k!==VERSION).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (req.mode === 'navigate') {
    event.respondWith(fetch(req).then(res=>{const copy=res.clone();caches.open(VERSION).then(c=>c.put('./index.html',copy));return res;}).catch(()=>caches.match('./index.html')));
    return;
  }
  if (url.origin === location.origin) {
    event.respondWith(caches.match(req).then(cached=>cached || fetch(req).then(res=>{if(res.ok){const copy=res.clone();caches.open(VERSION).then(c=>c.put(req,copy));}return res;})));
    return;
  }
  if (url.hostname === 'gibiamie.github.io') {
    event.respondWith(caches.match(req).then(cached => cached || fetch(req,{mode:'cors'}).then(res=>{if(res.ok){const copy=res.clone();caches.open(VERSION).then(c=>c.put(req,copy));}return res;}).catch(()=>cached)));
  }
});
