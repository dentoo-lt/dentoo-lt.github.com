const CACHE_NAME = 'dentoo-lt-v1';
const urlsToCache = [
  '/',
  '/list.html',
  '/js/index.js',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => Promise.all(
      cacheNames.map(cacheName => cacheName !== CACHE_NAME ? caches.delete(cacheName) : null)
    ))
  );
});

self.addEventListener('fetch', event => {
  const fetchRequest = event.request.clone();
  event.respondWith(
    fetch(fetchRequest)
      .then(res => {
        const responseToCache = res.clone();
        caches.open(CACHE_NAME)
          .then(cache => cache.put(event.request, responseToCache));
        return res;
      })
      .catch(() => caches.match(event.request))
  );
});
