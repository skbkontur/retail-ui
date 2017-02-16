const babel = require('babel-core');

module.exports = {
  process(src, path) {
    if (path.match(/.less$/)) {
      return `
        module.exports = new Proxy({}, {
          get (_, name) {
            if (name === '__esModule') {
              return undefined;
            }
            return name;
          },
        });
      `;
    }
    if (babel.util.canCompile(path)) {
      return babel.transform(src, {
        filename: path,
        presets: ['jest', 'es2015', 'react', 'stage-0'],
        retainLines: true
      }).code;
    }

    return src;
  }
};
