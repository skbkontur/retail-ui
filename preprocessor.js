const babel = require('babel-core');

module.exports = {
  process(src, path) {
    return babel.transform(src, {
      filename: path,
      presets: [
        [
          'env',
          {
            targets: {
              node: 'current'
            }
          }
        ],
        'react'
      ],
      plugins: ['transform-class-properties', 'transform-object-rest-spread'],
      retainLines: true
    }).code;
  }
};
