
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/welcome"
  },
  {
    "renderMode": 2,
    "route": "/movies"
  },
  {
    "renderMode": 2,
    "route": "/profile"
  },
  {
    "renderMode": 2,
    "redirectTo": "/welcome",
    "route": "/"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 23573, hash: '1a259034eb921f6d80439e6485506d7f94474e3918abaf1469067147839b5369', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17147, hash: 'bf9701b3b038768dfe306225df429402b9ab053559841111944aadc2ba1cee49', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'movies/index.html': {size: 24477, hash: 'b99b042ffe59f3839411c5434b8eccf2ffed672a81e6c4f66367ea24bbe49e3a', text: () => import('./assets-chunks/movies_index_html.mjs').then(m => m.default)},
    'welcome/index.html': {size: 24880, hash: '35a5316254f529bd61ebf0f415c38a02a9e06eaf2f81b6f423e9746cc9f594d9', text: () => import('./assets-chunks/welcome_index_html.mjs').then(m => m.default)},
    'profile/index.html': {size: 88354, hash: '3ba76c6da3326d4265892ac347211744fc443d3004a4808f49eac751dd8aac18', text: () => import('./assets-chunks/profile_index_html.mjs').then(m => m.default)},
    'styles-CXQUZ3PB.css': {size: 6979, hash: 'mYIPdabeAag', text: () => import('./assets-chunks/styles-CXQUZ3PB_css.mjs').then(m => m.default)}
  },
};
