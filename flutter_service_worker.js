'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "version.json": "7cec0f5764b89481ae174ca69b827aff",
"splash/img/light-2x.png": "c322e13ca1045cecdeafa8d3f3f70459",
"splash/img/dark-4x.png": "888b87d815d11c04596f884415837f53",
"splash/img/light-3x.png": "dc6fefd9dfc7cd6f51cb57ecf4823a45",
"splash/img/dark-3x.png": "a92f1e0f23cc79b8a36fed1051a51f1d",
"splash/img/light-4x.png": "f46dabc48f68facba3cd6aa92eaed0a7",
"splash/img/dark-2x.png": "8b7848ee0db3b7a05c749440ff93cc2d",
"splash/img/dark-1x.png": "57bf4781616d6ece2b235e4e9d42369d",
"splash/img/light-1x.png": "2031dcb307eb7aeea91b87dec6a0358e",
"splash/splash.js": "123c400b58bea74c1305ca3ac966748d",
"splash/style.css": "cbd53cd601ee4cb081e77dd37414f2ff",
"index.html": "ccf0774306fc234be69a33e1b4bab8b5",
"/": "ccf0774306fc234be69a33e1b4bab8b5",
"main.dart.js": "69d39954060223054f121ae8036adaf6",
"flutter.js": "a85fcf6324d3c4d3ae3be1ae4931e9c5",
"favicon.png": "aac7fc7fc82d61c9e2fd788b9008a28f",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "8a9fa825dc63092222e59e68213ef5dc",
"assets/AssetManifest.json": "945cb66c1a424b96424a9f2b9d12fb4d",
"assets/NOTICES": "6566e875d591638a75bb7875748aabe2",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/fonts/MaterialIcons-Regular.otf": "e7069dfd19b331be16bed984668fe080",
"assets/assets/svg/medium.svg": "dd3112c8383ebe0a83905815c4a051f2",
"assets/assets/svg/github.svg": "7972ce6225ea1f7754c02961dc7de48c",
"assets/assets/svg/instagram.svg": "b1b915083f6748f62a2512fa1cbaa4fb",
"assets/assets/svg/link.svg": "ad003eb500a852c81c27c9811793acaa",
"assets/assets/svg/bitcoin.svg": "15475d534b5fec7634fee13dcb69f8f8",
"assets/assets/svg/whatsapp.svg": "adc5a8f3f24624545b4baf79c9fb643d",
"assets/assets/svg/linkedin.svg": "11bef7a0d1555da9496fbb41d6033352",
"assets/assets/svg/twitter.svg": "c084e98043ecf14a707cfa4c396ea2d6",
"assets/assets/images/profile_photo.jpg": "34791a8a0ad9c0f9f057dfb2f4ceb543",
"assets/assets/logo/xcode.png": "57b52f94a38308a4360b935fd9b4575b",
"assets/assets/logo/hackerrank.png": "94d5957abf7780ec37aeba7329f809e2",
"assets/assets/logo/adobexd.png": "c5c8f72046c3a746bf47beac72f55149",
"assets/assets/logo/python.png": "ccfb5e0e745a26853d3a3fc06bf05462",
"assets/assets/logo/flutter.png": "12badf899b38e5340c55c68aabf810b6",
"assets/assets/logo/firebase.png": "51df2e8e61563e2afc4269ec8a96b7b8",
"assets/assets/logo/java.png": "dd4bb6953884e168b3cbffa23be8379b",
"assets/assets/logo/android.png": "8208582f6c483ee64cf20771e7f11707",
"assets/assets/logo/figma.png": "2117634bc3a7dc07d1ae8c3560faa3d0",
"assets/assets/logo/patika.dev.png": "784d807b4a0ee3f340cc6968df78856f",
"assets/assets/logo/iste.png": "57b57dc78ff8f4364b36d17893d8d307",
"assets/assets/logo/django.png": "a374e1477f083b9f95c5dbdbcf533bf7",
"assets/assets/logo/swift.png": "cf2d9c066072904f5196382a9ffb78a6",
"assets/assets/logo/udemy.png": "1e387f37c71689e30ebd489db7e27b2e",
"assets/assets/logo/ios.png": "e803c8e41f5ade1b30dc8153c0458c78",
"canvaskit/canvaskit.js": "97937cb4c2c2073c968525a3e08c86a3",
"canvaskit/profiling/canvaskit.js": "c21852696bc1cc82e8894d851c01921a",
"canvaskit/profiling/canvaskit.wasm": "371bc4e204443b0d5e774d64a046eb99",
"canvaskit/canvaskit.wasm": "3de12d898ec208a5f31362cc00f09b9e"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
