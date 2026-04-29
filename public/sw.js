const CACHE_NAME = "habit-tracker-v2";

// Core app shell (routes)
const APP_SHELL = ["/", "/login", "/signup", "/dashboard"];

// Install → cache app shell
self.addEventListener("install", (event) => {
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(APP_SHELL);
    }),
  );
});

// Activate → clean old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        }),
      );
    }),
  );

  self.clients.claim();
});

// Fetch → network first, fallback to cache, then offline-safe fallback
self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Only handle GET requests
  if (request.method !== "GET") return;

  event.respondWith(
    fetch(request)
      .then((response) => {
        // Clone response into cache
        const clone = response.clone();

        caches.open(CACHE_NAME).then((cache) => {
          cache.put(request, clone);
        });

        return response;
      })
      .catch(async () => {
        // Try cache first
        const cached = await caches.match(request);
        if (cached) return cached;

        // If navigation request → fallback to app shell
        if (request.mode === "navigate") {
          return caches.match("/");
        }

        return new Response("Offline", {
          status: 503,
          statusText: "Offline",
        });
      }),
  );
});
