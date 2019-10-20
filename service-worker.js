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
    "revision": "d06d0a3ce6edace665530294df6f4dce"
  },
  {
    "url": "api/ast-utils.html",
    "revision": "5f4f939dccc0de9b732aa7e66d4d61fd"
  },
  {
    "url": "api/scope-utils.html",
    "revision": "a274ddd2e6d60e198d427a4f51b92b38"
  },
  {
    "url": "api/token-utils.html",
    "revision": "9431eea7f93acb50b4404e900893b4f8"
  },
  {
    "url": "assets/css/0.styles.802e124c.css",
    "revision": "85eb15fb479fd0ab6ae3cab2e21bccff"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/2.133d5005.js",
    "revision": "f18b338cf378a76b7ef3ceb3e7c79715"
  },
  {
    "url": "assets/js/3.16a75a3f.js",
    "revision": "dc03cd804b8d9dc38fbe0c4be7581a09"
  },
  {
    "url": "assets/js/4.3aba2be4.js",
    "revision": "1165308cfb9d0fb64d080193b4825f1e"
  },
  {
    "url": "assets/js/5.e702c7e3.js",
    "revision": "d21fece5d756013ec9abe56736a9e407"
  },
  {
    "url": "assets/js/6.d1dfe623.js",
    "revision": "2a25000e2267648fe410e23eb9cb248e"
  },
  {
    "url": "assets/js/7.86678116.js",
    "revision": "097f29f5d62100a7902c938d55816a20"
  },
  {
    "url": "assets/js/8.15075939.js",
    "revision": "e8740baa1a3389f16f2b963008137ac8"
  },
  {
    "url": "assets/js/app.535e0605.js",
    "revision": "39d082212f3630f54c575974678161cd"
  },
  {
    "url": "guide/getting-started.html",
    "revision": "b4f475c0534a44aa4c832f1fe7e210bd"
  },
  {
    "url": "index.html",
    "revision": "5f103af799a78479a3fe587097f33a12"
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
