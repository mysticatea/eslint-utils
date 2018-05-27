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
    "revision": "b4eddff379dfa6dd7e4bbf4df44d8dcd"
  },
  {
    "url": "api/ast-utils.html",
    "revision": "35c6744f00eb0b945fab15a9fe6726c9"
  },
  {
    "url": "api/scope-utils.html",
    "revision": "f57486eebd578b9f2b081fb447c5e485"
  },
  {
    "url": "api/token-utils.html",
    "revision": "8ef8cb423ddaf93d5d40a49518a21ea5"
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
    "url": "assets/js/app.8f6b647e.js",
    "revision": "101d2e324b768f052e345e82a195263f"
  },
  {
    "url": "guide/getting-started.html",
    "revision": "211380282519f9ec7ad3d0067fa2f6da"
  },
  {
    "url": "index.html",
    "revision": "092e192ecaa6529a868b1c6f1c479865"
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
