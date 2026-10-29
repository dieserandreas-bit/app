/**
 * Offline-First Service Worker für den GP Teil 2 Prüfungstrainer NRW (Android / iOS / Desktop PWA)
 * Speichert das komplette App-Shell-Paket (HTML, CSS, JS, Icons) sowie geöffnete Prüfungs-PDFs lokal,
 * damit die Lerngruppe auch im Funkloch / in der Bahn / im Berufsschulkeller zu 100 % lernen kann.
 */
const CACHE_NAME = "gp2-nrw-pwa-v2026-1";
const APP_SHELL = [
  "/",
  "/index.html",
  "/style.css",
  "/script.js",
  "/manifest.json",
  "/icon.svg",
  "/pwa-192x192.png",
  "/pwa-512x512.png",
  "/pwa-maskable-512x512.png",
  "/apple-touch-icon.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((k) => k !== CACHE_NAME)
            .map((k) => caches.delete(k))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // API-Aufrufe niemals im Service Worker cachen
  if (
    url.pathname.startsWith("/api/") ||
    url.pathname.startsWith("/.netlify/")
  ) {
    return;
  }

  // Für HTML/JS/CSS: Network-First mit sofortigem Offline-Cache-Fallback (damit Updates sofort ankommen)
  const isCoreCode =
    req.mode === "navigate" ||
    url.pathname.endsWith(".html") ||
    url.pathname.endsWith(".js") ||
    url.pathname.endsWith(".css") ||
    url.pathname === "/";

  if (isCoreCode) {
    event.respondWith(
      fetch(req)
        .then((networkRes) => {
          if (networkRes && networkRes.status === 200) {
            const copy = networkRes.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
          }
          return networkRes;
        })
        .catch(async () => {
          const cached = await caches.match(req);
          if (cached) return cached;
          return caches.match("/index.html");
        })
    );
    return;
  }

  // Für PDFs, Bilder, Icons: Cache-First mit Hintergrund-Speicherung (spart mobiles Datenvolumen!)
  event.respondWith(
    caches.match(req).then((cachedRes) => {
      if (cachedRes) return cachedRes;
      return fetch(req).then((networkRes) => {
        if (networkRes && networkRes.status === 200) {
          const copy = networkRes.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
        }
        return networkRes;
      });
    })
  );
});
