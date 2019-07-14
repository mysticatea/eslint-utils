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

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "c1e0c68718bdf99d28c53f882937a247"
  },
  {
    "url": "api/ast-utils.html",
    "revision": "d61c9e5bf1341f47c212080d0c1ee819"
  },
  {
    "url": "api/scope-utils.html",
    "revision": "50dda9171629f5e9233763223f384dd2"
  },
  {
    "url": "api/token-utils.html",
    "revision": "2da76daae511a7ef65ded88a8ae2d043"
  },
  {
    "url": "assets/css/0.styles.87363eac.css",
    "revision": "85eb15fb479fd0ab6ae3cab2e21bccff"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/2.8becae5f.js",
    "revision": "f18b338cf378a76b7ef3ceb3e7c79715"
  },
  {
    "url": "assets/js/3.b6c0c902.js",
    "revision": "f8931bf6139cf366318dab39f7405fe5"
  },
  {
    "url": "assets/js/4.18974c97.js",
    "revision": "8b96888475806cfc8d2ff5284bb251c1"
  },
  {
    "url": "assets/js/5.b828f092.js",
    "revision": "dbd04bb77470c8520a1da9f525d5bafa"
  },
  {
    "url": "assets/js/6.6b5f8912.js",
    "revision": "90042ddc6e8fa6cf40662bfa8c418067"
  },
  {
    "url": "assets/js/7.a01980b0.js",
    "revision": "f868fb588f07781c72f98a73ae47c7cf"
  },
  {
    "url": "assets/js/8.b45cb0f2.js",
    "revision": "e8740baa1a3389f16f2b963008137ac8"
  },
  {
    "url": "assets/js/app.58b52b29.js",
    "revision": "54691aca8ae5d770246ef5115e6f66af"
  },
  {
    "url": "guide/getting-started.html",
    "revision": "18d67a14d037c7359026c972cc34b3c7"
  },
  {
    "url": "index.html",
    "revision": "90c31a1e78d6fa8db9d6aeeb1d6f292d"
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
