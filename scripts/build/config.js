// @flow

const path = require('path');

module.exports = {
  presets: ['react', ['env', { useBuiltIns: true, loose: true }]],
  plugins: [
    'transform-class-properties',
    'transform-object-rest-spread',
    path.resolve(__dirname, '../babel/imports-less-to-css')
  ]
};
