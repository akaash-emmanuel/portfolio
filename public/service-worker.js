// This is a service worker file for caching resources and improving load times
const CACHE_NAME = 'portfolio-v1.1';
const STATIC_CACHE_NAME = 'static-assets-v1.1';
const DYNAMIC_CACHE_NAME = 'dynamic-resources-v1.1';
const VIDEO_CACHE_NAME = 'video-assets-v1.1';

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/cat.png',
  '/paintbrush.png',
  '/me.jpeg',
  '/gmail-svgrepo-com.svg',
  '/linkedin-svgrepo-com.svg',
  '/phone-svgrepo-com.svg',
  '/BalooBhaijaan2-VariableFont_wght.ttf',
  '/Bellefair-Regular.ttf',
];

// Videos to cache for better performance
const VIDEO_ASSETS = [
  '/home.mp4',
  '/aboutme.mp4',
  '/projects.mp4',
  '/contact.mp4',
  '/sentient.mp4',
];

// Install the service worker and cache static assets
self.addEventListener('install', event => {
  event.waitUntil(
    Promise.all([
      // Cache static assets
      caches.open(STATIC_CACHE_NAME).then(cache => {
        console.log('Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      }),
      // Prefetch and cache video assets
      caches.open(VIDEO_CACHE_NAME).then(cache => {
        console.log('Prefetching video assets');
        // We use a fetch and put approach for videos to handle ranges
        return Promise.all(
          VIDEO_ASSETS.map(videoUrl => {
            return fetch(videoUrl).then(response => {
              if (response.ok) {
                return cache.put(videoUrl, response);
              }
            }).catch(err => console.log('Failed to fetch video: ' + videoUrl, err));
          })
        );
      })
    ]).then(() => self.skipWaiting())
  );
});

// Activate the service worker and remove old caches
self.addEventListener('activate', event => {
  const currentCaches = [STATIC_CACHE_NAME, DYNAMIC_CACHE_NAME, VIDEO_CACHE_NAME];
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!currentCaches.includes(cacheName)) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('Service worker activated and controlling');
      return self.clients.claim();
    })
  );
});

// Serve cached content when possible, otherwise fetch from network
self.addEventListener('fetch', event => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;
  
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) return;

  // Handle range requests for videos
  if (event.request.headers.has('range')) {
    event.respondWith(handleRangeRequest(event.request));
    return;
  }
  
  // For MP4 videos, try cache first, then network
  if (event.request.url.endsWith('.mp4')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Clone the response to store in cache
          const responseToCache = response.clone();
          
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });
            
          return response;
        })
        .catch(() => {
          return caches.match(event.request);
        })
    );
    return;
  }
  
  // For everything else, try cache first, then network
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        
        return fetch(event.request)
          .then(networkResponse => {
            // Don't cache responses that aren't successful
            if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
              return networkResponse;
            }
            
            // Clone the response to store in cache
            const responseToCache = networkResponse.clone();
            
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
              
            return networkResponse;
          });
      })
  );
});
