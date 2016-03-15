const babel = require('babel-core');

const testingPlugin = require('./scripts/babel-6/testing');

module.exports = {
  process: function(src, path) {
    if (path.match(/.less$/)) {
      return '';
    }
    if (babel.util.canCompile(path)) {
      return babel.transform(src, {
        filename: path,
        presets: ['jest', 'es2015', 'react', 'stage-0'],
        plugins: [testingPlugin],
        retainLines: true,
      }).code;
    }

    return src;
  }
};
