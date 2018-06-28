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
    "revision": "92e0f791c074e8455bc914d1ed2b857d"
  },
  {
    "url": "api/ast-utils.html",
    "revision": "5670d56f52cb0a41500239aa85c50534"
  },
  {
    "url": "api/scope-utils.html",
    "revision": "85b79cb1420b41a04833435378f09814"
  },
  {
    "url": "api/token-utils.html",
    "revision": "faffd3180e89a3e51f8eaf4a131fc027"
  },
  {
    "url": "assets/css/5.styles.f5bd8e27.css",
    "revision": "246845d5907c204f20882311bed7889c"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/0.4b9f33ef.js",
    "revision": "3c28fa181792df02eb6a93cd4f7461d2"
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
    "url": "assets/js/4.f932f5d5.js",
    "revision": "b5fc6b4e8e2c9c8fbfa5dfc6670581af"
  },
  {
    "url": "assets/js/app.a6953bd6.js",
    "revision": "c371d6ef8ee05c4395ae94962c83d73f"
  },
  {
    "url": "guide/getting-started.html",
    "revision": "a04b220f7df626616f354580f588ba2e"
  },
  {
    "url": "index.html",
    "revision": "aec15fa1a450f93ffe1600ffb97c1d56"
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
