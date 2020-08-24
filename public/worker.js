/* eslint-disable no-restricted-globals */
const cacheName = "v1";

// Install a service worker
self.addEventListener("install", (event) => {
    console.log("Service workers have been installed");
});

// Cache and return requests
self.addEventListener("fetch", (event) => {
    // check if request is made by chrome extensions or web page
    // if request is made for web page url must contains http
    // skip the request. if request is not made with http protocol
    if (!(event.request.url.indexOf("http") === 0)) return;

    event.respondWith(
        fetch(event.request)
            .then((res) => {
                // Make a clone of website
                const resClone = res.clone();
                // Open caches
                caches.open(cacheName).then((cache) => {
                    // Add response to the cache
                    cache.put(event.request, resClone);
                });
                return res;
            })
            .catch((err) => caches.match(event.request).then((res) => res))
    );
});

// Update a service worker
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== cacheName) return caches.delete(cache);
                })
            );
        })
    );
});
