module.exports = {
  assumptions: {
    setPublicClassFields: true,
  },
  env: {
    cjs: {
      presets: [['@babel/preset-env', { loose: true, modules: 'auto', targets: { ie: '11' } }]],
      plugins: [['@babel/plugin-transform-runtime', { version: '7.16.5' }]],
    },
  },
  presets: [['@babel/preset-env', { loose: true, modules: 'auto' }], '@babel/typescript', '@babel/preset-react'],
  plugins: [
    ['@babel/plugin-transform-runtime', { version: '7.16.5' }],
    ['@babel/plugin-proposal-decorators', { legacy: true }],
  ],
};
