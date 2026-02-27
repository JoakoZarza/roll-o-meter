const CACHE_NAME = 'roll-o-meter-v3';
const ASSETS = [
    './',
    './index.html',
    './manifest.json',
    './apple-touch-icon.png',
    './icon-512.png',
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap'
];

// Install Event
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(ASSETS))
            .then(() => self.skipWaiting())
    );
});

// Activate Event
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.filter(key => key !== CACHE_NAME)
                    .map(key => caches.delete(key))
            );
        })
    );
});

// Fetch Event (Offline support)
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});
