const CACHE_NAME = 'minizoo-cache-v6';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './assets/audio/ingame_bgm.mp3',
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
  './assets/animals/singa.jpg',
  './assets/qr/lion.png',
  './assets/qr/tiger.png',
  './assets/qr/croc.png',
  './assets/qr/wolf.png',
  './assets/qr/shark.png',
  './assets/qr/cow.png',
  './assets/qr/rabbit.png',
  './assets/qr/giraffe.png',
  './assets/qr/elepanth.png',
  './assets/qr/deer.png',
  './assets/qr/bear.png',
  './assets/qr/chicken.png',
  './assets/qr/pigs.png',
  './assets/qr/monkey.png',
  './assets/qr/crow.png'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
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
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Network-First strategy for HTML navigation to ensure latest version is always seen
  if (event.request.mode === 'navigate' || event.request.destination === 'document' || url.pathname.endsWith('.html') || url.pathname.endsWith('/')) {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const clone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return networkResponse;
        })
        .catch(() => caches.match(event.request).then((cached) => cached || caches.match('./index.html')))
    );
    return;
  }

  // Cache-First with Network Fallback for images and media
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) return response;
      return fetch(event.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
          const clone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return networkResponse;
      });
    })
  );
});
