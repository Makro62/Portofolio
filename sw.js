/* Service worker minimal — mencegah error register; bisa dikembangkan untuk cache */
self.addEventListener('install', event => {
  self.skipWaiting()
})

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim())
})
