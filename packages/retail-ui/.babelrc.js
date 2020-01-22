module.exports = {
  env: {
    production: {
      plugins: ['./scripts/babel/imports-less-to-css.js'],
    },
    development: {
      presets: [['@babel/preset-env', { loose: true, modules: 'commonjs', targets: { ie: '11' } }]],
      plugins: [['@babel/plugin-transform-runtime', { version: '7.7.0' }]],
    },
  },
  presets: [['@babel/preset-env', { loose: true, modules: false }], '@babel/typescript', '@babel/preset-react'],
  plugins: [
    ['@babel/plugin-transform-runtime', { useESModules: true, version: '7.7.0' }],
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
  ],
};
