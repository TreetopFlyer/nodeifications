importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js');

self.addEventListener('push', function(event) {
    const title = 'a notification';
    const options = {
        body: 'hey.'
    };

    event.waitUntil(self.registration.showNotification(title, options));
});
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
        clients.openWindow('https://developers.google.com/web/')
    );
});

if (workbox)
{

    workbox.precaching.precacheAndRoute([
        '/static/index.html',
    ]);

    workbox.routing.registerRoute(
        /.*\.(?:png|jpg|jpeg|svg|gif)/,
        workbox.strategies.cacheFirst(
        {
            cacheName: 'images',
            plugins: [
                new workbox.expiration.Plugin(
                {
                    maxEntries: 20,
                    maxAgeSeconds: 2 * 60 * 60,
                })
            ],
        })
    );

}