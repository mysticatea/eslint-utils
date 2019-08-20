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
    "revision": "90c1c384cde9d993ebd91a4715baeeb8"
  },
  {
    "url": "api/ast-utils.html",
    "revision": "19c83986a69fe8c1ee0f10fc5eef1e0b"
  },
  {
    "url": "api/scope-utils.html",
    "revision": "3b8befaa68b57932f0746c7eec6e8d3c"
  },
  {
    "url": "api/token-utils.html",
    "revision": "91ff5547f7ce3f24ddac67fade4e41aa"
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
    "url": "assets/js/app.36104c14.js",
    "revision": "c766f2ddc7e9c30eca547ec90e3fa134"
  },
  {
    "url": "guide/getting-started.html",
    "revision": "36b22b29d71c84c07a73d4cfbb19dc93"
  },
  {
    "url": "index.html",
    "revision": "7fe601f00a14d2638fdc5bff44982c71"
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
