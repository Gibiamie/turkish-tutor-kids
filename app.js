import { APP_VERSION, lessons, translations, searchableEntries } from './data.js';

const STORAGE_KEY = 'turkce-adim-v03';
const app = document.querySelector('#app');
const memoryStore = new Map();
const persistence = (() => {
  try {
    const key = '__storage_test__';
    localStorage.setItem(key, '1');
    localStorage.removeItem(key);
    return localStorage;
  } catch {
    return {
      getItem: key => memoryStore.has(key) ? memoryStore.get(key) : null,
      setItem: (key, value) => memoryStore.set(key, String(value)),
      removeItem: key => memoryStore.delete(key)
    };
  }
})();
let deferredInstallPrompt = null;
let session = null;

const defaultState = () => ({
  version: APP_VERSION,
  onboarded: false,
  lang: 'en',
  dailyGoal: 5,
  currentLesson: 'alphabet',
  streak: 0,
  lastStudyDate: null,
  lessons: Object.fromEntries(lessons.map(l => [l.id,{status:'new',attempts:0,correct:0,lastPracticed:null,nextReview:null}]))
});

let state = loadState();
function loadState(){
  try {
    const parsed = JSON.parse(persistence.getItem(STORAGE_KEY));
    if (!parsed || parsed.version !== APP_VERSION) return defaultState();
    return {...defaultState(),...parsed,lessons:{...defaultState().lessons,...parsed.lessons}};
  } catch { return defaultState(); }
}
function saveState(){ persistence.setItem(STORAGE_KEY,JSON.stringify(state)); }
function t(key){ return translations[state.lang]?.[key] ?? translations.en[key] ?? key; }
function esc(value=''){ return String(value).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }
function labelFor(option){ return typeof option === 'string' ? option : option.label[state.lang]; }
function valueFor(option){ return typeof option === 'string' ? option : option.value; }
function normalize(text=''){
  return text.toLocaleLowerCase('tr-TR').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/ı/g,'i').replace(/[^a-z0-9çğıöşü\s]/gi,' ').replace(/\s+/g,' ').trim();
}
function route(){ return location.hash.replace('#/','') || (state.onboarded?'home':'welcome'); }
function go(name){ location.hash=`#/${name}`; }
function todayKey(){ return new Date().toISOString().slice(0,10); }
function updateStreak(){
  const today=todayKey(); if(state.lastStudyDate===today) return;
  if(state.lastStudyDate){ const d=(new Date(today)-new Date(state.lastStudyDate))/86400000; state.streak=d===1?state.streak+1:1; } else state.streak=1;
  state.lastStudyDate=today;
}
function dueCount(){ const now=Date.now(); return Object.values(state.lessons).filter(x=>x.nextReview && new Date(x.nextReview).getTime()<=now).length; }
function completeCount(){ return Object.values(state.lessons).filter(x=>['practiced','known'].includes(x.status)).length; }

window.addEventListener('hashchange',render);
window.addEventListener('online',()=>toast(t('online')));
window.addEventListener('offline',()=>toast(t('offline')));
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredInstallPrompt=e;render();});
window.addEventListener('appinstalled',()=>{deferredInstallPrompt=null;toast(t('saved'));});

function shell(content,active='home'){
  const offline = navigator.onLine ? '' : `<div class="network-banner">${esc(t('offline'))}</div>`;
  return `${offline}<header class="topbar"><button class="brand" data-go="home" aria-label="${esc(t('home'))}"><span class="brand-mark">T</span><span><strong>${esc(t('appName'))}</strong><small>Version ${APP_VERSION}</small></span></button><button class="icon-button" data-go="settings" aria-label="${esc(t('settings'))}">⚙</button></header><main id="main">${content}</main><nav class="bottom-nav" aria-label="Primary"><button class="${active==='home'?'active':''}" data-go="home"><span>⌂</span>${esc(t('home'))}</button><button class="${active==='review'?'active':''}" data-go="review"><span>↻</span>${esc(t('review'))}<b>${dueCount()}</b></button><button class="${active==='progress'?'active':''}" data-go="progress"><span>▥</span>${esc(t('progress'))}</button></nav><div id="toast" class="toast" role="status"></div>`;
}

function render(){
  const r=route();
  if(!state.onboarded && r!=='welcome') return go('welcome');
  if(r==='welcome') return renderWelcome();
  if(r==='home') return renderHome();
  if(r.startsWith('lesson/')) return renderLesson(r.split('/')[1]);
  if(r==='review') return renderReview();
  if(r==='progress') return renderProgress();
  if(r==='settings') return renderSettings();
  go('home');
}

function renderWelcome(){
  app.innerHTML=`<main class="welcome" id="main"><div class="hero-art" aria-hidden="true"><span>ı</span><span>ö</span><span>ü</span></div><p class="eyebrow">Version ${APP_VERSION}</p><h1>${esc(t('firstRunTitle'))}</h1><p>${esc(t('firstRunBody'))}</p><div class="card form-card"><label>${esc(t('chooseLanguage'))}<select id="lang"><option value="en">English</option><option value="id">Bahasa Indonesia</option></select></label><label>${esc(t('dailyGoal'))}<select id="goal"><option value="5">${esc(t('fiveMinutes'))}</option><option value="10">${esc(t('tenMinutes'))}</option></select></label><button class="primary wide" id="start">${esc(t('start'))}</button></div><p class="privacy-note">${esc(t('privacy'))}</p></main>`;
  const lang=document.querySelector('#lang'); lang.value=state.lang; lang.addEventListener('change',e=>{state.lang=e.target.value;saveState();renderWelcome();});
  document.querySelector('#goal').value=state.dailyGoal;
  document.querySelector('#start').addEventListener('click',()=>{state.dailyGoal=Number(document.querySelector('#goal').value);state.onboarded=true;saveState();go('home');});
}

function renderHome(){
  const current=lessons.find(x=>x.id===state.currentLesson)||lessons[0];
  const content=`<section class="hero"><p class="eyebrow">${esc(t('today'))}</p><h1>${esc(t('tagline'))}</h1><div class="stats"><div><strong>${state.streak}</strong><span>${esc(t('streak'))}</span></div><div><strong>${completeCount()}/${lessons.length}</strong><span>${esc(t('completed'))}</span></div><div><strong>${dueCount()}</strong><span>${esc(t('due'))}</span></div></div><button class="primary wide" data-open-lesson="${current.id}">${esc(t('continue'))}: ${esc(current.title[state.lang])}</button></section><section class="search-wrap"><label class="search"><span>⌕</span><input id="search" type="search" autocomplete="off" placeholder="${esc(t('search'))}"></label><div id="search-results"></div></section><section><div class="section-head"><h2>${esc(t('lessons'))}</h2><span>A1 Foundation</span></div><div class="lesson-list">${lessons.map((l,i)=>lessonCard(l,i)).join('')}</div></section>`;
  app.innerHTML=shell(content,'home'); bindShell();
  document.querySelectorAll('[data-open-lesson]').forEach(b=>b.addEventListener('click',()=>go(`lesson/${b.dataset.openLesson}`)));
  const input=document.querySelector('#search'); input.addEventListener('input',()=>renderSearch(input.value));
}
function lessonCard(l,i){
  const s=state.lessons[l.id]; const status=s.status==='new'?'':`<span class="status ${s.status}">${esc(t(s.status==='known'?'known':s.status==='needs'?'needsPractice':'practiced'))}</span>`;
  return `<button class="lesson-card" data-open-lesson="${l.id}"><span class="lesson-number">${String(i+1).padStart(2,'0')}</span><span class="lesson-icon">${esc(l.icon)}</span><span class="lesson-copy"><strong>${esc(l.title[state.lang])}</strong><small>${esc(l.subtitle[state.lang])}</small>${status}</span><span class="chev">›</span></button>`;
}
function renderSearch(query){
  const box=document.querySelector('#search-results'); if(!query.trim()){box.innerHTML='';return;}
  const q=normalize(query); const entries=searchableEntries(state.lang).map(x=>({...x,score:score(q,normalize(x.tokens))})).filter(x=>x.score>0).sort((a,b)=>b.score-a.score).slice(0,6);
  box.innerHTML=entries.length?`<div class="search-results">${entries.map(x=>`<button data-search-lesson="${x.lessonId}"><strong>${esc(x.title)}</strong><small>${esc(x.detail)}</small></button>`).join('')}</div>`:`<div class="empty-state">${esc(t('noResults'))}</div>`;
  box.querySelectorAll('[data-search-lesson]').forEach(b=>b.addEventListener('click',()=>go(`lesson/${b.dataset.searchLesson}`)));
}
function score(q,text){ if(text.startsWith(q))return 100-q.length; if(text.includes(q))return 70-q.length; const words=text.split(' '); if(words.some(w=>levenshtein(q,w)<=1))return 40; return 0; }
function levenshtein(a,b){const m=Array.from({length:b.length+1},(_,i)=>[i]);for(let j=0;j<=a.length;j++)m[0][j]=j;for(let i=1;i<=b.length;i++)for(let j=1;j<=a.length;j++)m[i][j]=b[i-1]===a[j-1]?m[i-1][j-1]:Math.min(m[i-1][j-1],m[i][j-1],m[i-1][j])+1;return m[b.length][a.length];}

function renderLesson(id){
  const lesson=lessons.find(x=>x.id===id); if(!lesson)return go('home'); state.currentLesson=id; saveState(); session={lesson,index:0,mode:'overview',selected:[],correct:0,attempted:0,wrong:new Set()};
  showLesson();
}
function showLesson(){
  const {lesson}=session;
  const content=`<section class="lesson-header"><button class="back" data-go="home">← ${esc(t('back'))}</button><div><p class="eyebrow">${esc(t(session.mode))}</p><h1>${esc(lesson.title[state.lang])}</h1></div><div class="progress-track"><span style="width:${session.mode==='overview'?15:Math.round((session.index/lesson.items.length)*100)}%"></span></div></section><section id="lesson-stage"></section>`;
  app.innerHTML=shell(content,'home'); bindShell();
  session.mode==='overview'?showOverview():showPractice();
}
function showOverview(){
  const stage=document.querySelector('#lesson-stage'); const l=session.lesson;
  stage.innerHTML=`<div class="overview-grid">${l.overview.map((row,i)=>`<article class="overview-card">${row.image?`<div class="word-image"><img src="${esc(row.image)}" alt="" onerror="this.hidden=true;this.nextElementSibling.hidden=false"><span hidden>${esc(row.fallback||'•')}</span></div>`:''}<div><strong>${esc(row.tr)}</strong><p>${esc(row.note[state.lang])}</p></div>${row.audio&&row.verified?`<button class="audio-button" data-audio="${esc(row.audio)}" aria-label="${esc(t('listen'))}: ${esc(row.tr)}">▶</button>`:''}</article>`).join('')}</div><div class="lesson-actions"><p>${esc(t('intro'))}</p><button class="primary wide" id="begin-practice">${esc(t('practice'))}</button></div>`;
  bindAudio(); document.querySelector('#begin-practice').addEventListener('click',()=>{session.mode='practice';session.index=0;showLesson();});
}
function showPractice(){
  const stage=document.querySelector('#lesson-stage'); const item=session.lesson.items[session.index];
  if(!item)return finishLesson(); session.selected=[];
  stage.innerHTML=`<article class="practice-card"><div class="question-meta"><span>${session.index+1}/${session.lesson.items.length}</span><span>${esc(t(item.type==='build'?'build':'choose'))}</span></div><h2>${esc(item.prompt[state.lang])}</h2><p class="no-reveal">${esc(t('noReveal'))}</p>${item.type==='choice'?choiceUI(item):buildUI(item)}<div id="feedback" class="feedback" hidden></div><button class="primary wide" id="check" disabled>${esc(t('check'))}</button>${item.audio&&item.verified?`<button class="secondary wide audio-inline" data-audio="${esc(item.audio)}">▶ ${esc(t('listen'))}</button>`:''}</article>`;
  bindAudio(); bindQuestion(item);
}
function choiceUI(item){return `<div class="options">${item.options.map((o,i)=>`<button class="option" data-value="${esc(valueFor(o))}"><span>${String.fromCharCode(65+i)}</span>${esc(labelFor(o))}</button>`).join('')}</div>`;}
function buildUI(item){return `<div class="build-zone" id="build-zone" aria-label="Built answer"><span class="placeholder">…</span></div><div class="parts">${item.parts.map((p,i)=>`<button class="part" data-part="${esc(p)}" data-index="${i}">${esc(p)}</button>`).join('')}</div><button class="text-button" id="clear-build">Clear</button>`;}
function bindQuestion(item){
  const check=document.querySelector('#check');
  if(item.type==='choice') document.querySelectorAll('.option').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.option').forEach(x=>x.classList.remove('selected'));b.classList.add('selected');session.selected=[b.dataset.value];check.disabled=false;}));
  else {
    document.querySelectorAll('.part').forEach(b=>b.addEventListener('click',()=>{if(b.disabled)return;session.selected.push(b.dataset.part);b.disabled=true;renderBuild();check.disabled=false;}));
    document.querySelector('#clear-build').addEventListener('click',()=>{session.selected=[];document.querySelectorAll('.part').forEach(b=>b.disabled=false);renderBuild();check.disabled=true;});
  }
  check.addEventListener('click',()=>checkAnswer(item));
}
function renderBuild(){const zone=document.querySelector('#build-zone');zone.innerHTML=session.selected.length?session.selected.map(x=>`<span>${esc(x)}</span>`).join(''):`<span class="placeholder">…</span>`;}
function checkAnswer(item){
  const expected=item.type==='choice'?[item.answer]:item.answerParts; const ok=JSON.stringify(session.selected)===JSON.stringify(expected); const feedback=document.querySelector('#feedback'); session.attempted++;
  if(ok){session.correct++;feedback.textContent=t('correct');feedback.className='feedback success';feedback.hidden=false;document.querySelectorAll('.option,.part').forEach(b=>b.disabled=true);const check=document.querySelector('#check');check.textContent=session.index===session.lesson.items.length-1?t('finish'):t('next');check.disabled=false;check.replaceWith(check.cloneNode(true));document.querySelector('#check').addEventListener('click',()=>{session.index++;showLesson();});}
  else {session.wrong.add(item.id);feedback.textContent=t('tryAgain');feedback.className='feedback error';feedback.hidden=false;if(item.type==='choice'){document.querySelectorAll('.option').forEach(b=>b.classList.remove('selected'));session.selected=[];}else{session.selected=[];document.querySelectorAll('.part').forEach(b=>b.disabled=false);renderBuild();}document.querySelector('#check').disabled=true;}
}
function finishLesson(){
  updateStreak(); const rec=state.lessons[session.lesson.id]; rec.attempts+=session.attempted;rec.correct+=session.correct;rec.lastPracticed=new Date().toISOString();if(rec.status==='new')rec.status='practiced';rec.nextReview=new Date(Date.now()+86400000).toISOString();saveState();
  const content=`<section class="completion"><div class="completion-mark">✓</div><p class="eyebrow">${esc(t('lessonComplete'))}</p><h1>${esc(session.lesson.title[state.lang])}</h1><p>${session.correct}/${session.lesson.items.length} ${esc(t('correct').toLowerCase())}</p><div class="status-actions"><button data-status="practiced">✓ ${esc(t('practiceDone'))}</button><button data-status="known">★ ${esc(t('alreadyKnow'))}</button><button data-status="needs">↻ ${esc(t('needsMore'))}</button></div><p class="privacy-note">${esc(t('saved'))}</p><button class="primary wide" data-go="home">${esc(t('home'))}</button></section>`;
  app.innerHTML=shell(content,'home');bindShell();document.querySelectorAll('[data-status]').forEach(b=>b.addEventListener('click',()=>setLessonStatus(session.lesson.id,b.dataset.status)));
}
function setLessonStatus(id,status){
  const rec=state.lessons[id]; if(rec.attempts<1){toast(t('statusLocked'));return;}rec.status=status;const days=status==='known'?7:status==='needs'?1:3;rec.nextReview=new Date(Date.now()+days*86400000).toISOString();saveState();document.querySelectorAll('[data-status]').forEach(b=>b.classList.toggle('selected',b.dataset.status===status));toast(t('saved'));
}

function renderReview(){
  const now=Date.now();const due=lessons.filter(l=>state.lessons[l.id].nextReview&&new Date(state.lessons[l.id].nextReview).getTime()<=now);
  const content=`<section class="page-head"><p class="eyebrow">${esc(t('review'))}</p><h1>${esc(t('due'))}</h1></section>${due.length?`<div class="lesson-list">${due.map((l,i)=>lessonCard(l,i)).join('')}</div>`:`<div class="empty-panel"><span>✓</span><h2>${esc(t('emptyReview'))}</h2></div>`}`;
  app.innerHTML=shell(content,'review');bindShell();document.querySelectorAll('[data-open-lesson]').forEach(b=>b.addEventListener('click',()=>go(`lesson/${b.dataset.openLesson}`)));
}
function renderProgress(){
  const mastered=Object.values(state.lessons).filter(x=>x.status==='known').length;
  const content=`<section class="page-head"><p class="eyebrow">${esc(t('progress'))}</p><h1>${completeCount()}/${lessons.length} ${esc(t('completed'))}</h1></section><div class="progress-summary"><div><strong>${state.streak}</strong><span>${esc(t('streak'))}</span></div><div><strong>${mastered}</strong><span>${esc(t('mastered'))}</span></div><div><strong>${dueCount()}</strong><span>${esc(t('due'))}</span></div></div><div class="progress-list">${lessons.map(l=>{const r=state.lessons[l.id];return `<article><span class="lesson-icon">${esc(l.icon)}</span><div><strong>${esc(l.title[state.lang])}</strong><small>${r.attempts} attempts · ${r.correct} correct</small></div><span class="status ${r.status}">${esc(r.status==='new'?'—':t(r.status==='known'?'known':r.status==='needs'?'needsPractice':'practiced'))}</span></article>`}).join('')}</div>`;
  app.innerHTML=shell(content,'progress');bindShell();
}
function renderSettings(){
  const content=`<section class="page-head"><p class="eyebrow">${esc(t('settings'))}</p><h1>${esc(t('appName'))}</h1></section><div class="card settings-card"><label>${esc(t('language'))}<select id="settings-lang"><option value="en">English</option><option value="id">Bahasa Indonesia</option></select></label>${deferredInstallPrompt?`<button class="primary wide" id="install">${esc(t('install'))}</button>`:''}<button class="danger wide" id="reset">${esc(t('reset'))}</button><p>${esc(t('privacy'))}</p><small>Version ${APP_VERSION}</small></div>`;
  app.innerHTML=shell(content,'home');bindShell();document.querySelector('#settings-lang').value=state.lang;document.querySelector('#settings-lang').addEventListener('change',e=>{state.lang=e.target.value;saveState();renderSettings();});
  document.querySelector('#reset').addEventListener('click',()=>{if(confirm(t('resetConfirm'))){persistence.removeItem(STORAGE_KEY);state=defaultState();go('welcome');}});
  const install=document.querySelector('#install');if(install)install.addEventListener('click',async()=>{deferredInstallPrompt.prompt();await deferredInstallPrompt.userChoice;deferredInstallPrompt=null;renderSettings();});
}
function bindShell(){document.querySelectorAll('[data-go]').forEach(b=>b.addEventListener('click',()=>go(b.dataset.go)));}
function bindAudio(){document.querySelectorAll('[data-audio]').forEach(b=>b.addEventListener('click',()=>playAudio(b.dataset.audio,b)));}
function playAudio(src,button){const old=button.textContent;button.disabled=true;button.textContent='…';const a=new Audio(src);a.addEventListener('ended',()=>{button.disabled=false;button.textContent=old;});a.addEventListener('error',()=>{button.disabled=false;button.textContent=old;toast(t('audioUnavailable'));});a.play().catch(()=>{button.disabled=false;button.textContent=old;toast(t('audioUnavailable'));});}
function toast(message){const el=document.querySelector('#toast');if(!el)return;el.textContent=message;el.classList.add('show');clearTimeout(toast.timer);toast.timer=setTimeout(()=>el.classList.remove('show'),2600);}

if('serviceWorker' in navigator) window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
render();
