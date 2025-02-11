
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/myFlix-Angular-client/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/myFlix-Angular-client/welcome",
    "route": "/myFlix-Angular-client"
  },
  {
    "renderMode": 2,
    "route": "/myFlix-Angular-client/welcome"
  },
  {
    "renderMode": 2,
    "route": "/myFlix-Angular-client/movies"
  },
  {
    "renderMode": 2,
    "route": "/myFlix-Angular-client/profile"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 23595, hash: '932263da46c168309575253efe728aecec31a41f353a0dacab1c353629348ab9', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17169, hash: 'b91bc73836ad5b3268ce87c0b3473f8dcb58f8f17bcb9ca15c5edb5326cf3eb8', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'movies/index.html': {size: 24499, hash: 'e8ce5a381bee12519dde00353c420e89730f5dc30b2821ff62e5884f4233f782', text: () => import('./assets-chunks/movies_index_html.mjs').then(m => m.default)},
    'welcome/index.html': {size: 24902, hash: 'e874e25eb5a300c0961091ab8863cca8cd8910f1de5c5e3305df34eb927f35d2', text: () => import('./assets-chunks/welcome_index_html.mjs').then(m => m.default)},
    'profile/index.html': {size: 88376, hash: '591707983759d304aec97e331883c55e318018fd710392a5a6dfd51a714756bc', text: () => import('./assets-chunks/profile_index_html.mjs').then(m => m.default)},
    'styles-CXQUZ3PB.css': {size: 6979, hash: 'mYIPdabeAag', text: () => import('./assets-chunks/styles-CXQUZ3PB_css.mjs').then(m => m.default)}
  },
};
