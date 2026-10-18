// TeoriPrøve's service worker: only the notifications (push.js on the server; the app's settings, «اعلان‌ها»).
// Nothing is cached here and no request goes through it.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));

// A message: { title, body, url, tag, lang, dir }.
self.addEventListener('push', e => {
  let d = {};
  try { d = e.data ? e.data.json() : {}; } catch { d = { body: e.data ? e.data.text() : '' }; }
  e.waitUntil(self.registration.showNotification(d.title || 'TeoriPrøve', {
    body: d.body || '', icon: '/icon-192.png', badge: '/icon-192.png', tag: d.tag || 'tp', renotify: true,
    lang: d.lang || 'fa', dir: d.dir || 'auto', data: { url: d.url || '/' },
  }));
});

// A tap opens the page the message is about: in the app's open window if there is one, else in a new one.
self.addEventListener('notificationclick', e => {
  e.notification.close();
  const url = new URL((e.notification.data && e.notification.data.url) || '/', self.location.origin).href;
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
    const win = list.find(c => new URL(c.url).origin === self.location.origin && !new URL(c.url).pathname.startsWith('/app/'));
    if (!win) return self.clients.openWindow(url);
    return win.focus().then(w => (w && w.navigate ? w.navigate(url).catch(() => self.clients.openWindow(url)) : null));
  }));
});
