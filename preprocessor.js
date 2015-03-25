var babelPreprocessor = require('babel-jest');

module.exports = {
  process: function(src, path) {
    if (path.match(/.less$/)) {
      return '';
    }
    return babelPreprocessor.process(src, path);
  }
};
