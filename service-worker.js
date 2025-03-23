const CACHE_NAME = 'portfolio-cache-v1';

// Critical assets that should always be cached
const CRITICAL_ASSETS = [
  '/',
  '/index.html',
  '/static/css/main.chunk.css',
  '/static/js/main.chunk.js'
];

// Function to check if a URL is valid for caching
function isValidUrl(url) {
  try {
    const urlObj = new URL(url);
    // Only cache HTTP(S) requests to our own origin
    return (urlObj.protocol === 'http:' || urlObj.protocol === 'https:') &&
           (urlObj.origin === self.location.origin || url.startsWith('/'));
  } catch {
    // If URL parsing fails, check if it's a valid relative path
    return url.startsWith('/') && 
           !url.startsWith('//') && 
           !url.includes(':');
  }
}

// Install event - cache critical assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        // Cache critical assets
        return cache.addAll(CRITICAL_ASSETS);
      })
      .catch(error => {
        console.error('Error during service worker installation:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE_NAME) {
              return caches.delete(cacheName);
            }
          })
        );
      })
  );
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  // Early return for chrome-extension URLs without any cache operations
  if (event.request.url.startsWith('chrome-extension://')) {
    return;
  }

  // Ignore other non-cacheable URLs
  if (!isValidUrl(event.request.url)) {
    event.respondWith(fetch(event.request));
    return;
  }

  event.respondWith(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.match(event.request)
          .then(response => {
            if (response) {
              return response;
            }

            return fetch(event.request)
              .then(networkResponse => {
                if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
                  return networkResponse;
                }

                // Only cache valid responses from our own origin
                if (isValidUrl(event.request.url)) {
                  const responseToCache = networkResponse.clone();
                  cache.put(event.request, responseToCache)
                    .catch(() => {
                      // Silently fail for caching errors
                    });
                }

                return networkResponse;
              })
              .catch(() => {
                // Return a basic offline message
                return new Response('Offline content not available');
              });
          });
      })
  );
}); 