const CACHE='turkce-adim-v03-03.0.0';
const SHELL=['./','./index.html','./styles.css','./app.js','./data.js','./manifest.webmanifest','./assets/icons/icon.svg'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(SHELL)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  const url=new URL(event.request.url);
  if(url.origin===location.origin){
    event.respondWith(caches.match(event.request).then(hit=>hit||fetch(event.request).then(response=>{const copy=response.clone();caches.open(CACHE).then(c=>c.put(event.request,copy));return response;}).catch(()=>event.request.mode==='navigate'?caches.match('./index.html'):undefined)));
  } else if(url.hostname==='raw.githubusercontent.com'){
    event.respondWith(caches.match(event.request).then(hit=>hit||fetch(event.request,{mode:'no-cors'}).then(response=>{const copy=response.clone();caches.open(CACHE).then(c=>c.put(event.request,copy));return response;})));
  }
});
