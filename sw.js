// Service worker: tiene sul telefono tutta l'app e tutta la Bibbia, così si legge anche offline.
const VERSIONE = 'bibbia-57907ea94d';
const FILE = ["./", "index.html", "manifest.webmanifest", "icone/favicon.png", "icone/icona-192.png", "icone/icona-512.png", "data/libri.json", "data/piano.json", "data/riflessioni.json", "data/libri/1CH.json", "data/libri/1CO.json", "data/libri/1JN.json", "data/libri/1KI.json", "data/libri/1PE.json", "data/libri/1SA.json", "data/libri/1TH.json", "data/libri/1TI.json", "data/libri/2CH.json", "data/libri/2CO.json", "data/libri/2JN.json", "data/libri/2KI.json", "data/libri/2PE.json", "data/libri/2SA.json", "data/libri/2TH.json", "data/libri/2TI.json", "data/libri/3JN.json", "data/libri/ACT.json", "data/libri/AMO.json", "data/libri/COL.json", "data/libri/DAN.json", "data/libri/DEU.json", "data/libri/ECC.json", "data/libri/EPH.json", "data/libri/EST.json", "data/libri/EXO.json", "data/libri/EZK.json", "data/libri/EZR.json", "data/libri/GAL.json", "data/libri/GEN.json", "data/libri/HAB.json", "data/libri/HAG.json", "data/libri/HEB.json", "data/libri/HOS.json", "data/libri/ISA.json", "data/libri/JAS.json", "data/libri/JDG.json", "data/libri/JER.json", "data/libri/JHN.json", "data/libri/JOB.json", "data/libri/JOL.json", "data/libri/JON.json", "data/libri/JOS.json", "data/libri/JUD.json", "data/libri/LAM.json", "data/libri/LEV.json", "data/libri/LUK.json", "data/libri/MAL.json", "data/libri/MAT.json", "data/libri/MIC.json", "data/libri/MRK.json", "data/libri/NAM.json", "data/libri/NEH.json", "data/libri/NUM.json", "data/libri/OBA.json", "data/libri/PHM.json", "data/libri/PHP.json", "data/libri/PRO.json", "data/libri/PSA.json", "data/libri/REV.json", "data/libri/ROM.json", "data/libri/RUT.json", "data/libri/SNG.json", "data/libri/TIT.json", "data/libri/ZEC.json", "data/libri/ZEP.json"];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSIONE).then(c => c.addAll(FILE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    // stesso indirizzo di altre app su GitHub Pages: si toccano solo le copie della Bibbia
    .then(nomi => Promise.all(nomi.filter(n => n.startsWith('bibbia-') && n !== VERSIONE).map(n => caches.delete(n))))
    .then(() => self.clients.claim()));
});

// prima la copia sul telefono (subito, anche offline), intanto si aggiorna dalla rete
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const font = url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com';
  if (url.origin !== location.origin && !font) return;
  e.respondWith(caches.open(VERSIONE).then(async cache => {
    const salvata = await cache.match(req, { ignoreSearch: true });
    const daRete = fetch(req).then(r => {
      if (r && (r.ok || r.type === 'opaque')) cache.put(req, r.clone());
      return r;
    }).catch(() => null);
    if (salvata) { e.waitUntil(daRete); return salvata; }
    const r = await daRete;
    if (r) return r;
    if (req.mode === 'navigate') return cache.match('index.html');
    return Response.error();
  }));
});
