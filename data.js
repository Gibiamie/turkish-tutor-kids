const RAW = 'https://raw.githubusercontent.com/Gibiamie/turkish-tutor-kids-clean/main/';

export const APP_VERSION = '03.0.0';

export const translations = {
  en: {
    appName: 'Türkçe Adım', tagline: 'Learn useful Turkish, one clear step at a time.',
    start: 'Start learning', continue: 'Continue', lessons: 'Lessons', review: 'Review', progress: 'Progress', settings: 'Settings',
    today: 'Today', due: 'Due for review', completed: 'Completed', practiced: 'Practiced', needsPractice: 'Needs more practice', known: 'Already know',
    practiceDone: 'Practice done', alreadyKnow: 'I already know this', needsMore: 'Needs more practice',
    listen: 'Listen', audioUnavailable: 'Verified audio is not available for this item.',
    check: 'Check', next: 'Next', finish: 'Finish lesson', tryAgain: 'Not quite. Try again.', correct: 'Correct.',
    choose: 'Choose the correct answer.', build: 'Build the Turkish word.', intro: 'Learn first, then practise.',
    search: 'Search lessons and words', noResults: 'No close result found. Check the spelling or try a shorter word.',
    install: 'Install app', language: 'Explanation language', reset: 'Reset progress', resetConfirm: 'Reset all learning progress?',
    offline: 'You are offline. Saved lessons remain available.', online: 'Back online.', noReveal: 'The answer stays hidden until you solve it.',
    overview: 'Overview', practice: 'Practice', home: 'Home', statusLocked: 'Complete at least one practice item first.',
    privacy: 'Progress stays on this device. Microphone and location are not used.',
    firstRunTitle: 'Learn Turkish without guessing', firstRunBody: 'Short lessons, natural examples, clear feedback and no forced answer reveal.',
    chooseLanguage: 'Choose your explanation language', dailyGoal: 'Daily goal', fiveMinutes: '5 minutes', tenMinutes: '10 minutes',
    streak: 'Day streak', mastered: 'Mastered', reviewNow: 'Review now', emptyReview: 'Nothing is due. Continue with a lesson.',
    back: 'Back', lessonComplete: 'Lesson complete', saved: 'Progress saved on this device.'
  },
  id: {
    appName: 'Türkçe Adım', tagline: 'Belajar bahasa Turki yang berguna, selangkah demi selangkah.',
    start: 'Mulai belajar', continue: 'Lanjutkan', lessons: 'Pelajaran', review: 'Ulangan', progress: 'Progres', settings: 'Pengaturan',
    today: 'Hari ini', due: 'Perlu diulang', completed: 'Selesai', practiced: 'Sudah latihan', needsPractice: 'Perlu lebih banyak latihan', known: 'Sudah tahu',
    practiceDone: 'Latihan selesai', alreadyKnow: 'Saya sudah tahu ini', needsMore: 'Perlu lebih banyak latihan',
    listen: 'Dengarkan', audioUnavailable: 'Audio yang sudah diverifikasi belum tersedia untuk bagian ini.',
    check: 'Periksa', next: 'Berikutnya', finish: 'Selesaikan pelajaran', tryAgain: 'Belum tepat. Coba lagi.', correct: 'Benar.',
    choose: 'Pilih jawaban yang benar.', build: 'Susun kata bahasa Turki.', intro: 'Pelajari dulu, lalu berlatih.',
    search: 'Cari pelajaran dan kata', noResults: 'Tidak ada hasil yang dekat. Periksa ejaan atau coba kata yang lebih pendek.',
    install: 'Pasang aplikasi', language: 'Bahasa penjelasan', reset: 'Hapus progres', resetConfirm: 'Hapus semua progres belajar?',
    offline: 'Anda sedang offline. Pelajaran yang tersimpan tetap dapat digunakan.', online: 'Kembali online.', noReveal: 'Jawaban tetap tersembunyi sampai Anda menyelesaikannya.',
    overview: 'Ringkasan', practice: 'Latihan', home: 'Beranda', statusLocked: 'Selesaikan setidaknya satu latihan terlebih dahulu.',
    privacy: 'Progres disimpan di perangkat ini. Mikrofon dan lokasi tidak digunakan.',
    firstRunTitle: 'Belajar bahasa Turki tanpa menebak', firstRunBody: 'Pelajaran singkat, contoh alami, umpan balik jelas, dan jawaban tidak dibocorkan.',
    chooseLanguage: 'Pilih bahasa penjelasan', dailyGoal: 'Target harian', fiveMinutes: '5 menit', tenMinutes: '10 menit',
    streak: 'Hari beruntun', mastered: 'Dikuasai', reviewNow: 'Ulangi sekarang', emptyReview: 'Belum ada yang perlu diulang. Lanjutkan pelajaran.',
    back: 'Kembali', lessonComplete: 'Pelajaran selesai', saved: 'Progres tersimpan di perangkat ini.'
  }
};

const img = (name) => `${RAW}images/${name}.png`;
const audio = (name) => `${RAW}audio/pronunciation_tr_${name}.mp3`;

export const lessons = [
  {
    id: 'alphabet', icon: 'Aa', title: {en:'Turkish Sounds', id:'Bunyi Bahasa Turki'},
    subtitle: {en:'Hear and distinguish the letters that learners often confuse.', id:'Dengarkan dan bedakan huruf yang sering tertukar.'},
    overview: [
      {tr:'ı / i', note:{en:'ı has no dot. Keep the tongue relaxed and back. i is the clear “ee” sound.', id:'ı tidak bertitik. Lidah lebih rileks dan ke belakang. i berbunyi jelas seperti “ii”.'}},
      {tr:'o / ö', note:{en:'For ö, round your lips like o while keeping the tongue closer to e.', id:'Untuk ö, bulatkan bibir seperti o tetapi posisi lidah lebih dekat ke e.'}},
      {tr:'u / ü', note:{en:'For ü, round your lips like u while keeping the tongue close to i.', id:'Untuk ü, bulatkan bibir seperti u tetapi posisi lidah dekat dengan i.'}},
      {tr:'c / ç / ş', note:{en:'c sounds like j in “job”; ç like ch; ş like sh.', id:'c berbunyi seperti j; ç seperti “c” Indonesia; ş seperti “sy”.'}},
      {tr:'ğ', note:{en:'ğ does not begin Turkish words. It usually lengthens or connects the surrounding vowels.', id:'ğ tidak muncul di awal kata Turki. Biasanya memanjangkan atau menghubungkan vokal di sekitarnya.'}}
    ],
    items: [
      {id:'a1', type:'choice', prompt:{en:'Which Turkish letter has no dot?',id:'Huruf Turki mana yang tidak bertitik?'}, options:['i','ı','ü'], answer:'ı'},
      {id:'a2', type:'choice', prompt:{en:'Which pair contrasts “u” and the front rounded vowel?',id:'Pasangan mana yang membedakan “u” dan vokal bulat depan?'}, options:['u / ü','o / ö','ı / i'], answer:'u / ü'},
      {id:'a3', type:'choice', prompt:{en:'Which letter sounds like “sh”?',id:'Huruf mana yang berbunyi seperti “sh”?'}, options:['ç','ş','c'], answer:'ş'},
      {id:'a4', type:'choice', prompt:{en:'Which statement about ğ is correct?',id:'Pernyataan mana tentang ğ yang benar?'}, options:[
        {value:'start',label:{en:'It commonly starts words.',id:'Sering berada di awal kata.'}},
        {value:'link',label:{en:'It usually lengthens or links vowels.',id:'Biasanya memanjangkan atau menghubungkan vokal.'}},
        {value:'g',label:{en:'It is always pronounced as a hard g.',id:'Selalu dibaca sebagai g keras.'}}
      ], answer:'link'}
    ]
  },
  {
    id:'roots', icon:'ev', title:{en:'Root Words',id:'Kata Dasar'},
    subtitle:{en:'Concrete words you can recognise immediately.',id:'Kata nyata yang bisa langsung dikenali.'},
    overview:[
      {tr:'ev',image:img('ev'),fallback:'🏠',note:{en:'house / home',id:'rumah'}},
      {tr:'okul',image:img('okul'),fallback:'🏫',note:{en:'school',id:'sekolah'}},
      {tr:'kitap',image:img('kitap'),fallback:'📘',note:{en:'book',id:'buku'}},
      {tr:'elma',image:img('elma'),fallback:'🍎',note:{en:'apple',id:'apel'}},
      {tr:'köpek',image:img('kopek'),fallback:'🐶',note:{en:'dog',id:'anjing'}},
      {tr:'araba',image:img('araba'),fallback:'🚗',note:{en:'car',id:'mobil'}},
      {tr:'su',image:img('su'),fallback:'💧',note:{en:'water',id:'air'}},
      {tr:'kalem',image:img('kalem'),fallback:'✏️',note:{en:'pencil / pen',id:'pensil / pena'}}
    ],
    items:[
      {id:'r1',type:'choice',prompt:{en:'What does “ev” mean?',id:'Apa arti “ev”?'},options:[{value:'house',label:{en:'house',id:'rumah'}},{value:'school',label:{en:'school',id:'sekolah'}},{value:'book',label:{en:'book',id:'buku'}}],answer:'house'},
      {id:'r2',type:'choice',prompt:{en:'Choose the Turkish word for “book”.',id:'Pilih kata Turki untuk “buku”.'},options:['kalem','kitap','okul'],answer:'kitap'},
      {id:'r3',type:'choice',prompt:{en:'Choose the Turkish word for “water”.',id:'Pilih kata Turki untuk “air”.'},options:['su','elma','araba'],answer:'su'},
      {id:'r4',type:'choice',prompt:{en:'What does “köpek” mean?',id:'Apa arti “köpek”?'},options:[{value:'dog',label:{en:'dog',id:'anjing'}},{value:'car',label:{en:'car',id:'mobil'}},{value:'apple',label:{en:'apple',id:'apel'}}],answer:'dog'}
    ]
  },
  {
    id:'meaning', icon:'+', title:{en:'Meaning Builder',id:'Penyusun Makna'},
    subtitle:{en:'See how roots and suffixes build meaning.',id:'Lihat bagaimana kata dasar dan imbuhan membentuk makna.'},
    overview:[
      {tr:'ev + im = evim',note:{en:'my house',id:'rumah saya'}},
      {tr:'ev + de = evde',note:{en:'in / at the house',id:'di rumah'}},
      {tr:'ev + im + de = evimde',note:{en:'in my house',id:'di rumah saya'}},
      {tr:'araba + m = arabam',note:{en:'my car',id:'mobil saya'}},
      {tr:'göz + üm + de = gözümde',note:{en:'in my eye',id:'di mata saya'}}
    ],
    items:[
      {id:'m1',type:'build',prompt:{en:'Build “my house”.',id:'Susun “rumah saya”.'},parts:['ev','im','de'],answerParts:['ev','im']},
      {id:'m2',type:'build',prompt:{en:'Build “in the house”.',id:'Susun “di rumah”.'},parts:['ev','im','de'],answerParts:['ev','de']},
      {id:'m3',type:'build',prompt:{en:'Build “in my house”.',id:'Susun “di rumah saya”.'},parts:['ev','im','de'],answerParts:['ev','im','de']},
      {id:'m4',type:'build',prompt:{en:'Build “my car”.',id:'Susun “mobil saya”.'},parts:['araba','m','da'],answerParts:['araba','m']}
    ]
  },
  {
    id:'whose', icon:'?', title:{en:'Whose? Builder',id:'Punya Siapa?'},
    subtitle:{en:'Connect people with possession.',id:'Hubungkan orang dengan bentuk kepunyaan.'},
    overview:[
      {tr:'benim',note:{en:'my / mine',id:'punya saya'}},
      {tr:'senin',note:{en:'your / yours (singular, informal)',id:'punya kamu'}},
      {tr:'onun',note:{en:'his / her / its',id:'punya dia'}},
      {tr:'bizim',note:{en:'our / ours',id:'punya kami / kita'}},
      {tr:'sizin',note:{en:'your / yours (plural or polite)',id:'punya kalian / Anda'}},
      {tr:'onların',note:{en:'their / theirs',id:'punya mereka'}}
    ],
    items:[
      {id:'w1',type:'choice',prompt:{en:'Which word means “my / mine”?',id:'Kata mana berarti “punya saya”?'},options:['senin','benim','onun'],answer:'benim'},
      {id:'w2',type:'choice',prompt:{en:'Which word is polite or plural “your”?',id:'Kata mana berarti “punya Anda/kalian”?'},options:['sizin','bizim','onların'],answer:'sizin'},
      {id:'w3',type:'build',prompt:{en:'Build “senin”.',id:'Susun “senin”.'},parts:['sen','in','im'],answerParts:['sen','in']},
      {id:'w4',type:'build',prompt:{en:'Build “onun”.',id:'Susun “onun”.'},parts:['o','nun','in'],answerParts:['o','nun']}
    ]
  },
  {
    id:'plural', icon:'2+', title:{en:'More Than One',id:'Lebih Dari Satu'},
    subtitle:{en:'Use -ler or -lar according to vowel harmony.',id:'Gunakan -ler atau -lar sesuai harmoni vokal.'},
    overview:[
      {tr:'ev → evler',audio:audio('evler'),verified:true,note:{en:'houses',id:'rumah-rumah'}},
      {tr:'kitap → kitaplar',audio:audio('kitaplar'),verified:true,note:{en:'books',id:'buku-buku'}},
      {tr:'köpek → köpekler',audio:audio('kopekler'),verified:true,note:{en:'dogs',id:'anjing-anjing'}},
      {tr:'okul → okullar',audio:audio('okullar'),verified:true,note:{en:'schools',id:'sekolah-sekolah'}},
      {tr:'araba → arabalar',audio:audio('arabalar'),verified:true,note:{en:'cars',id:'mobil-mobil'}}
    ],
    items:[
      {id:'p1',type:'build',prompt:{en:'Build the plural of “ev”.',id:'Susun bentuk jamak “ev”.'},parts:['ev','ler','lar'],answerParts:['ev','ler'],audio:audio('evler'),verified:true},
      {id:'p2',type:'build',prompt:{en:'Build the plural of “kitap”.',id:'Susun bentuk jamak “kitap”.'},parts:['kitap','ler','lar'],answerParts:['kitap','lar'],audio:audio('kitaplar'),verified:true},
      {id:'p3',type:'build',prompt:{en:'Build the plural of “köpek”.',id:'Susun bentuk jamak “köpek”.'},parts:['köpek','ler','lar'],answerParts:['köpek','ler'],audio:audio('kopekler'),verified:true},
      {id:'p4',type:'build',prompt:{en:'Build the plural of “okul”.',id:'Susun bentuk jamak “okul”.'},parts:['okul','ler','lar'],answerParts:['okul','lar'],audio:audio('okullar'),verified:true},
      {id:'p5',type:'build',prompt:{en:'Build the plural of “araba”.',id:'Susun bentuk jamak “araba”.'},parts:['araba','ler','lar'],answerParts:['araba','lar'],audio:audio('arabalar'),verified:true}
    ]
  }
];

export function searchableEntries(lang='en') {
  return lessons.flatMap(lesson => [
    {lessonId:lesson.id,title:lesson.title[lang],detail:lesson.subtitle[lang],tokens:`${lesson.title.en} ${lesson.title.id} ${lesson.id}`},
    ...lesson.overview.map(row => ({lessonId:lesson.id,title:row.tr,detail:row.note[lang],tokens:`${row.tr} ${row.note.en} ${row.note.id}`}))
  ]);
}
