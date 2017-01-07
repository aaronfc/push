/* eslint-env browser, serviceworker, es6 */

'use strict';

const VERSION = 'v1';

self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

   const data = event.data.json();
  // const data = {title: 'This is a title', body: 'This is the content', url: 'https://www.any-url.com'};
  // const data = {title: 'This is a title', body: 'This is the content'};

  const title = data.title;
  const options = {
    body: data.body,
    // actions: [{action: 'ACTION_1', title: 'ACTION 1'}],
    icon: 'images/icon.png',
    badge: 'images/badge.png',
    data: data
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function(event) {
  console.log('[Service Worker] Notification click Received.');

  event.notification.close();

  const data = event.notification.data;

  if (data.url) {
    event.waitUntil(
      clients.openWindow(data.url)
    );
  }
});

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(VERSION).then(function(cache) {
      return cache.addAll([
        '/images/icon.png',
        '/images/badge.png'
      ]);
    })
  );
});

this.addEventListener('activate', function(event) {
  // SW is activated
});
