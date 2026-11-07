const CACHE_NAME = 'minizoo-cache-v2';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './assets/slides/cover.jpg',
  './assets/slides/cover_resume.jpg',
  './assets/slides/pembuka.jpg',
  './assets/slides/main_map.jpg',
  './assets/slides/alur_permainan.jpg',
  './assets/slides/karnivora_gate.jpg',
  './assets/slides/herbivora_gate.jpg',
  './assets/slides/omnivora_gate.jpg',
  './assets/slides/karnivora_1.jpg',
  './assets/slides/karnivora_2.jpg',
  './assets/slides/karnivora_3.jpg',
  './assets/slides/karnivora_4.jpg',
  './assets/slides/karnivora_5.jpg',
  './assets/slides/herbivora_1.jpg',
  './assets/slides/herbivora_2.jpg',
  './assets/slides/herbivora_3.jpg',
  './assets/slides/herbivora_4.jpg',
  './assets/slides/herbivora_5.jpg',
  './assets/slides/omnivora_1.jpg',
  './assets/slides/omnivora_2.jpg',
  './assets/slides/omnivora_3.jpg',
  './assets/slides/omnivora_4.jpg',
  './assets/slides/omnivora_5.jpg',
  './assets/slides/karnivora_ending.jpg',
  './assets/slides/herbivora_ending.jpg',
  './assets/slides/omnivora_ending.jpg',
  './assets/slides/pre_ending.jpg',
  './assets/slides/tamat.jpg',
  './assets/animals/ayam.jpg',
  './assets/animals/babi.jpg',
  './assets/animals/beruang.jpg',
  './assets/animals/buaya.jpg',
  './assets/animals/gagak.jpg',
  './assets/animals/gajah.jpg',
  './assets/animals/harimau.jpg',
  './assets/animals/hiu.jpg',
  './assets/animals/jerapah.jpg',
  './assets/animals/kelinci.jpg',
  './assets/animals/monyet.jpg',
  './assets/animals/rusa.jpg',
  './assets/animals/sapi.jpg',
  './assets/animals/serigala.jpg',
  './assets/animals/singa.jpg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).catch(() => caches.match('./index.html'));
    })
  );
});
