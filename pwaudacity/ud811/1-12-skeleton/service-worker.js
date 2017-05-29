/**
 * Created by nikhilpanchal on 5/14/17.
 */

// Need to update the cache name every time any resource in the app shell is modified,
    // otherwise old resources will be served.
var cacheName = "weatherPWA-6";
var dataCacheName = "dataPWA-2";
var dataUrl = "https://publicdata-weather.firebaseio.com";

var filesToCache = [
    "/images/wind.png",
    "/images/snow.png",
    "/images/rain.png",
    "/images/partly-cloudy.png",
    "/images/ic_refresh_white_24px.svg",
    "/images/ic_add_white_24px.svg",
    "/styles/ud811.css",
    "/scripts/localforage.min.js",
    "/index.html",
    "/"
];

self.addEventListener('install', function (e) {
    "use strict";

    // Keeps the service worker's state as installing until the promise is resolved.
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.addAll(filesToCache);
        }, function (error) {
            console.error("Failed to install service worker", error);
        }).catch(function (error) {
            console.error("Failed to install", error);
        })
    );
});

self.addEventListener('activate', function (e) {
    "use strict";

    e.waitUntil(
        caches.keys().then(function (keyList) {
            return Promise.all(keyList.map(function (key) {
                if (key !== cacheName) {
                    return caches.delete(key);
                }
            }));
        })
    );
});

/**
 * Important Event. Fired when network requests are made.
 * Can be used to intercept network fetches and return stuff from the local cache.
 */
self.addEventListener('fetch', function (e) {
    "use strict";

    if (e.request.url.startsWith(dataUrl)) {
        // Data requests
        e.respondWith(
            fetch(e.request).then(function (response) {
                return caches.open(dataCacheName).then(function (cache) {
                    // If the source of the request modifies the response, you don't want the cached copy
                    // to get modified as well. That's why you clone.
                    cache.put(e.request.url, response.clone());

                    return response;
                })
            })
        );
    }
    else {
        // Resource files
        e.respondWith(
            caches.match(e.request).then(function (response) {
                return response || fetch(e.request);
            })
        );
    }
});

