console.log("SW startup");

self.addEventListener('fetch', function(event) {

	// console.log("Fetch event", event);
	// console.log(".request", event.request);
	// console.log(".respondWith", event.respondWith);
	// console.log(".default", event.default);

	if (event.request.url.indexOf("bigJson.js") != -1) {


		if (event.request.url.indexOf("fake") != -1) {

			event.respondWith(fetch(event.request));
		} else {
			event.respondWith(fetch(event.request));			
		}

	}
});
