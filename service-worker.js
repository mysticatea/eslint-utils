/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.2/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "5c652a12ec30969aa1cb42c1c96e9539"
  },
  {
    "url": "api/ast-utils.html",
    "revision": "1c1fe67ce930ec53be77f6a639a2fac0"
  },
  {
    "url": "api/scope-utils.html",
    "revision": "1934f9de8c9960838bf330624d3a522d"
  },
  {
    "url": "api/token-utils.html",
    "revision": "d2a46e3d5096e65694c7a6e530444dbe"
  },
  {
    "url": "assets/css/1.styles.3b1d2675.css",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "assets/css/2.styles.d04aaf87.css",
    "revision": "2cf3a0822d03ffc5020b66b5f37c7096"
  },
  {
    "url": "assets/css/styles.6a475cd9.css",
    "revision": "6a2b9acc38f53e85e92a7bcf9f780ccc"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/1.3b1d2675.js",
    "revision": "12a6979e996bde9df2968a36e17e18a9"
  },
  {
    "url": "assets/js/2.d04aaf87.js",
    "revision": "918f52b5ee3ba53c9a5606cde95bf43e"
  },
  {
    "url": "assets/js/3.6a8efa95.js",
    "revision": "de93a410c7197e0c592aa38a0d039a40"
  },
  {
    "url": "assets/js/4.446e28a8.js",
    "revision": "b50f293c6f8719247ae96a8750dcf1b2"
  },
  {
    "url": "assets/js/5.8875bfe9.js",
    "revision": "9114604c94fde46abf4db7a599c133fb"
  },
  {
    "url": "assets/js/6.f7ce938e.js",
    "revision": "108913254965f42ecea56b5e6bf52db1"
  },
  {
    "url": "assets/js/7.7a8e85a9.js",
    "revision": "84a8e8710475331c2880be141ca6b9cd"
  },
  {
    "url": "assets/js/app.6a475cd9.js",
    "revision": "2b7d563971a591432e64cf8dd60ae406"
  },
  {
    "url": "guide/getting-started.html",
    "revision": "30dff9457d59cf916495481f7dffde9e"
  },
  {
    "url": "index.html",
    "revision": "a9c3e740cd223bcabc8e5d9a4be74b69"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
