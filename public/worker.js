const cacheName = "v1";
let urlsToCache = ["/"];

// Install a service worker
this.addEventListener("install", (event) => {
    // Perform install steps
    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            console.log("Opened cache");
            return cache.addAll(urlsToCache);
        })
    );
});

// Cache and return requests
this.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            // Cache hit - return response
            if (response) {
                return response;
            }
            return fetch(event.request);
        })
    );
});

// Update a service worker
this.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== cacheName) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});
