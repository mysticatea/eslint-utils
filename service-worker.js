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
    "revision": "62c7d3adda9a3806e5cb149cba9eb851"
  },
  {
    "url": "api/ast-utils.html",
    "revision": "9a286c0e6d4c1ab0b10f4e8b6a92a306"
  },
  {
    "url": "api/scope-utils.html",
    "revision": "be7f79245ec7344ecdcbb70c64e2c024"
  },
  {
    "url": "api/token-utils.html",
    "revision": "0f8ade1ddb1fff004d48c8fd138c0d70"
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
    "url": "assets/js/0.3ec26b2d.js",
    "revision": "938286fa7768660686b9f07918bee28a"
  },
  {
    "url": "assets/js/1.236c606c.js",
    "revision": "b6fe2b437d3d5c9ca51fbf99ac7e10de"
  },
  {
    "url": "assets/js/2.dda49ccf.js",
    "revision": "7b31cf9c5a6ad8790c086c86022f0073"
  },
  {
    "url": "assets/js/3.948b2c2d.js",
    "revision": "2ca7fb0bce9a4c6e9629d5726d5b5062"
  },
  {
    "url": "assets/js/4.539c072f.js",
    "revision": "1daee30a15ae9a3c87ae0ffa253b834c"
  },
  {
    "url": "assets/js/app.c25c7e31.js",
    "revision": "6f5df5c1d4fa83be11f8166f4a8729c1"
  },
  {
    "url": "guide/getting-started.html",
    "revision": "42578c0c8286b088b87a88119af63224"
  },
  {
    "url": "index.html",
    "revision": "f02471257eaf5e832b209ac54de64ad7"
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
