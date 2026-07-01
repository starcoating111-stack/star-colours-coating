// Admin-only push notification service worker.
// Registered with scope '/admin/' — no fetch interception, no caching.

self.addEventListener('push', (event) => {
  if (!event.data) return;
  let data;
  try { data = event.data.json(); } catch { return; }

  event.waitUntil(
    self.registration.showNotification(data.title ?? 'New Inquiry', {
      body: data.body ?? '',
      icon: '/favicon.ico',
      badge: '/favicon.ico',
      data: { url: data.url ?? '/admin/messages' },
      tag: 'inquiry',
      renotify: true
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const target = event.notification.data?.url ?? '/admin/messages';
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
      for (const client of list) {
        if (client.url.includes('/admin') && 'focus' in client) {
          client.navigate(target);
          return client.focus();
        }
      }
      return clients.openWindow(target);
    })
  );
});
