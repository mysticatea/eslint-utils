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

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "0d2569ede53a9fbd0eddf9b57aac9ae9"
  },
  {
    "url": "api/ast-utils.html",
    "revision": "f65cf7fb8a0f47dfd3195d0f051e9ffe"
  },
  {
    "url": "api/scope-utils.html",
    "revision": "20ee395083b7b9bd715c3bfe453986bd"
  },
  {
    "url": "api/token-utils.html",
    "revision": "7a1e6628ac9bf90efa59fe998f44f0c5"
  },
  {
    "url": "assets/css/5.styles.3b5c09e1.css",
    "revision": "ea76e6346820d86a3ef570cd2d9e2492"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/0.f87bc0c9.js",
    "revision": "2a9ea358fc48b563b3259546b88a3b86"
  },
  {
    "url": "assets/js/1.97811312.js",
    "revision": "23eeb855108a635890f4f8f6efe8c829"
  },
  {
    "url": "assets/js/2.6055add6.js",
    "revision": "ae2fe11e1a84459bf43962d451834b1a"
  },
  {
    "url": "assets/js/3.1a460bbc.js",
    "revision": "37c8803c3f3bfec4965587d2e6348b10"
  },
  {
    "url": "assets/js/4.101c08c2.js",
    "revision": "1daee30a15ae9a3c87ae0ffa253b834c"
  },
  {
    "url": "assets/js/app.34e06378.js",
    "revision": "62fa229b5fead04ebe1805de1d874cb8"
  },
  {
    "url": "guide/getting-started.html",
    "revision": "82cb78ad3ee0b70e68e9f04311d37834"
  },
  {
    "url": "index.html",
    "revision": "2e4a683cdcb4cd653b731245d2d3451d"
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
