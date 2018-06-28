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
    "revision": "c7eb9880c11be3bc61128fb810d295ca"
  },
  {
    "url": "api/ast-utils.html",
    "revision": "5fd2390836fb22a4c506ee6dff430257"
  },
  {
    "url": "api/scope-utils.html",
    "revision": "3b99fc2b2ada914496f9819ca8274d6c"
  },
  {
    "url": "api/token-utils.html",
    "revision": "3c3210a3e781a48fe686ad76034f6286"
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
    "url": "assets/js/app.d30881f1.js",
    "revision": "d9a4148c524e9728499d1e551c41e74d"
  },
  {
    "url": "guide/getting-started.html",
    "revision": "26eeab7252495f58f143abc3aa17eaf1"
  },
  {
    "url": "index.html",
    "revision": "bd6125d250dd4edaabc0460e2b92f867"
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
