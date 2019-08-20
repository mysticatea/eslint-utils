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
    "revision": "530c11339f2dddf6f233be803d84a616"
  },
  {
    "url": "api/ast-utils.html",
    "revision": "f5a94dea6ab8632ef3f94ab2f3eb6bd0"
  },
  {
    "url": "api/scope-utils.html",
    "revision": "75e86c12827e28c88ed93276d678724e"
  },
  {
    "url": "api/token-utils.html",
    "revision": "37d6b5126f8754de8c512deb8ce14c77"
  },
  {
    "url": "assets/css/0.styles.601b2cbb.css",
    "revision": "85eb15fb479fd0ab6ae3cab2e21bccff"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/2.c5a5cd26.js",
    "revision": "f18b338cf378a76b7ef3ceb3e7c79715"
  },
  {
    "url": "assets/js/3.63d69cba.js",
    "revision": "f8931bf6139cf366318dab39f7405fe5"
  },
  {
    "url": "assets/js/4.ba5008d4.js",
    "revision": "2b356128fcf9646490c2ea25beb41108"
  },
  {
    "url": "assets/js/5.4dbf6a5e.js",
    "revision": "8255b9fa935d11db501f47eb03235c94"
  },
  {
    "url": "assets/js/6.10603214.js",
    "revision": "60deba8b45a8279ab667978c728ee8db"
  },
  {
    "url": "assets/js/7.f559fd51.js",
    "revision": "f868fb588f07781c72f98a73ae47c7cf"
  },
  {
    "url": "assets/js/8.7b729576.js",
    "revision": "e8740baa1a3389f16f2b963008137ac8"
  },
  {
    "url": "assets/js/app.6e2df41d.js",
    "revision": "0c4a5a0d50bb1020471c53e3df1e6379"
  },
  {
    "url": "guide/getting-started.html",
    "revision": "f4fb6751bfebf6fd27e8e1961c24c4b8"
  },
  {
    "url": "index.html",
    "revision": "9556b4f46e2ec9d7aa24a6f0d16de884"
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
