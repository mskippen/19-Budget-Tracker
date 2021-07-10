const cacheName = "v2";

const cacheAssets = [
    "/",
  "index.html",
  "styles.css",
  "main.js",
  "index.js",
  "manifest.json",
  "/icons/icon-192x192.png",
  "/icons/logo-192x192.png",
  "/icons/icon-451x451.png",
];

//install
self.addEventListener("install", function (e) {
  console.log("Service worker installed");
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
        console.log("files caching")
      return cache.addAll(cacheAssets);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", function (e) {
  console.log("Service worker activated");

  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cacheName) {
            console.log("Clearing Old Cache");
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

/* Serve cached content when offline */
self.addEventListener("fetch", function (e) {
    console.log("cache fetching")
  e.respondWith(
    caches.match(e.request).then(function (response) {
      return response || fetch(e.request);
    })
  );
    // e.respondWith(fetch(e.request).catch(caches.match(e.request)))
});
