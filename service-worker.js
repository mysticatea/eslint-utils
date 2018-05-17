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
    "revision": "920350d01199a6a641201e79337b46a1"
  },
  {
    "url": "api/ast-utils.html",
    "revision": "60c2cd66a27324b7d396364d946a6331"
  },
  {
    "url": "api/scope-utils.html",
    "revision": "6d257eb1afcb033ab9bf3b5bc40a8d3e"
  },
  {
    "url": "api/token-utils.html",
    "revision": "a2e27e89193d658bc5573a605c9e614c"
  },
  {
    "url": "assets/css/5.styles.503c04d3.css",
    "revision": "465598e8fcfcea830c13778e9879db1a"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/0.adc3437c.js",
    "revision": "2a9ea358fc48b563b3259546b88a3b86"
  },
  {
    "url": "assets/js/1.236c606c.js",
    "revision": "b6fe2b437d3d5c9ca51fbf99ac7e10de"
  },
  {
    "url": "assets/js/2.2d322c39.js",
    "revision": "ae2fe11e1a84459bf43962d451834b1a"
  },
  {
    "url": "assets/js/3.07ec19ba.js",
    "revision": "37c8803c3f3bfec4965587d2e6348b10"
  },
  {
    "url": "assets/js/4.539c072f.js",
    "revision": "1daee30a15ae9a3c87ae0ffa253b834c"
  },
  {
    "url": "assets/js/app.78dfda49.js",
    "revision": "880a7fae8fbcc585ecf0a5d622ee529b"
  },
  {
    "url": "guide/getting-started.html",
    "revision": "66a2154afc49ad0a01808ec93660e0fd"
  },
  {
    "url": "index.html",
    "revision": "94fc2c5f79a6f821e7e03211d2654114"
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
