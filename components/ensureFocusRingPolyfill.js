// @flow

let polyfillInited = false;

function init() {
  require('wicg-focus-ring');
}

if (!polyfillInited) {
  init();
  polyfillInited = true;
}
