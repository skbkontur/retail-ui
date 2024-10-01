export function transpileTs(code) {
  var transpile = function transpile() {
    return window.ts.transpile(code.trim(), {
      noImplicitUseStrict: true,
      target: 'es6',
      jsx: 'preserve'
    });
  };
  if ('ts' in window) {
    return Promise.resolve(transpile());
  } else {
    return new Promise(function (resolve) {
      loadService(function () {
        return resolve(transpile());
      });
    });
  }
}
function loadService() {
  var onLoad = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
  var scriptId = 'typescriptServices';
  var existingTag = document.getElementById(scriptId);
  if (existingTag) {
    existingTag.addEventListener('load', onLoad);
    return;
  }
  var script = document.createElement('script');
  script.src = 'https://klesun-misc.github.io/TypeScript/lib/typescriptServices.js';
  script.id = scriptId;
  script.addEventListener('load', onLoad);
  document.head.appendChild(script);
}