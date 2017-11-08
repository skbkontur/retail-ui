// @flow

const path = require('path');

module.exports = {
  presets: ['react', ['env', { useBuiltIns: true, loose: true }]],
  plugins: [
    'transform-es3-property-literals',
    'transform-es3-member-expression-literals',
    'transform-class-properties',
    'transform-object-rest-spread',
    [
      'transform-runtime',
      {
        helpers: false,
        polyfill: false,
        regenerator: true,
        moduleName: 'babel-runtime'
      }
    ],
    path.resolve(__dirname, '../babel/imports-less-to-css')
  ]
};
