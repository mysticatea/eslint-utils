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

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.3.1/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "80a91340ef28253d9ad8ba79fb7a01e2"
  },
  {
    "url": "api/ast-utils.html",
    "revision": "ec9bb2db4d01571b27c33291473afdb7"
  },
  {
    "url": "api/scope-utils.html",
    "revision": "ee5c00309553dc451113eb3ff8ff6935"
  },
  {
    "url": "api/token-utils.html",
    "revision": "8bd85d8acf334017622a9b9dfd937617"
  },
  {
    "url": "assets/css/5.styles.23590fd6.css",
    "revision": "28df051be7fbc2207698ca454a8b4b31"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/0.6af203b8.js",
    "revision": "a65a5a6cf82afbc25952ae68ec3b6a64"
  },
  {
    "url": "assets/js/1.7b3a8a18.js",
    "revision": "8aa4d9a66120e0a5cc9bcff88e6dd4c0"
  },
  {
    "url": "assets/js/2.aa74b94a.js",
    "revision": "da673f856a539e578144791f2a42d389"
  },
  {
    "url": "assets/js/3.10d9c763.js",
    "revision": "7396141051eca627c1a83a79624f26ec"
  },
  {
    "url": "assets/js/4.e5ec3a03.js",
    "revision": "d8c904fc122014b89f9663d86b9a2e53"
  },
  {
    "url": "assets/js/app.3b6972a5.js",
    "revision": "a62fa8a088a3dc951bb0d6c614fa6a08"
  },
  {
    "url": "guide/getting-started.html",
    "revision": "4a8855399373629e6f345590d5f4fc4e"
  },
  {
    "url": "index.html",
    "revision": "2d2c5773e253190efb8fc90efb7a286c"
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
