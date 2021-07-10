const cacheName = "v1";

const cacheAssets = [
  "index.html",
  "main.js",
  "index.js",
  "/icons/icon-192x192.png",
  "/icons/logo-192x192.png",
  "/icons/icon-451x451.png",
];

//install https://medium.com/james-johnson/a-simple-progressive-web-app-tutorial-f9708e5f2605
self.addEventListener('install', function(e) {
    e.waitUntil(
      caches.open(cacheName).then(function(cache) {
        return cache.addAll(filesToCache);
      })
    );
  });
  
  /* Serve cached content when offline */
  self.addEventListener('fetch', function(e) {
    e.respondWith(
      caches.match(e.request).then(function(response) {
        return response || fetch(e.request);
      })
    );
  });
