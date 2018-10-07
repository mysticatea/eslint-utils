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
    "revision": "057b1e0888721886eb88e09282d2170d"
  },
  {
    "url": "api/ast-utils.html",
    "revision": "a209a3c967e03c64464e4b5182360fb3"
  },
  {
    "url": "api/scope-utils.html",
    "revision": "3417afc4d6efb9a725d1d87efb3b7f67"
  },
  {
    "url": "api/token-utils.html",
    "revision": "ee319a5e94efa23a2b42766c7ee7e6b7"
  },
  {
    "url": "assets/css/1.styles.babd7481.css",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "assets/css/2.styles.280bc6f1.css",
    "revision": "df7c35ec8029dbbde0735a45f875eaf7"
  },
  {
    "url": "assets/css/styles.5d469670.css",
    "revision": "2b5e3ff7c8f2055cc98f9af52ade157c"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/1.babd7481.js",
    "revision": "87b26c931f15723340e79b7706f16a71"
  },
  {
    "url": "assets/js/2.280bc6f1.js",
    "revision": "00b9d2c92af7c3412ffde73c1b6dd1a2"
  },
  {
    "url": "assets/js/3.c9579cba.js",
    "revision": "ba4fef8ecde4d0430ff692b644313dcc"
  },
  {
    "url": "assets/js/4.c820eaf8.js",
    "revision": "bee21a10416bfbf95c3aabce35b573dd"
  },
  {
    "url": "assets/js/5.bfc8510b.js",
    "revision": "09e8d721e604282800c6d4a211eca9b2"
  },
  {
    "url": "assets/js/6.e8d18f8e.js",
    "revision": "c87b1722ce7ab65c9704a264a39a3b40"
  },
  {
    "url": "assets/js/7.a147b051.js",
    "revision": "ebd55414a4d2b54645714babd538e18e"
  },
  {
    "url": "assets/js/app.5d469670.js",
    "revision": "fd7b4ea7abe8139a2bfe7c6882598760"
  },
  {
    "url": "guide/getting-started.html",
    "revision": "90a57b96bd497638474dde0cb72a0fb5"
  },
  {
    "url": "index.html",
    "revision": "c1d62cf4b3a9e2ec9fbcac10de06d8af"
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
