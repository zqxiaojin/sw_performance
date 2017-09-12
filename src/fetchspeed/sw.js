// console.log("SW startup");

self.addEventListener('fetch', function(event) {


	if (event.request.url.indexOf("jsonBig.json") != -1) {


		if (event.request.url.indexOf("fake") != -1) {

			event.respondWith(new Response("Hello world!"));
		} else {
			event.respondWith(fetch(event.request));			
		}

	}
});



var PRECACHE = "fake";


const PRECACHE_URLS = [
  'jsonBig.json',
];

// The install handler takes care of precaching the resources we always need.
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(PRECACHE)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(self.skipWaiting())
  );
});

