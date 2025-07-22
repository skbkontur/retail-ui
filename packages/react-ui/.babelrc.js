module.exports = {
  assumptions: {
    setPublicClassFields: true,
  },
  env: {
    cjs: {
      presets: [['@babel/preset-env', { loose: true, modules: 'commonjs', targets: { ie: '11' } }]],
      plugins: [['@babel/plugin-transform-runtime', { version: '7.16.5' }]],
    },
  },
  presets: [['@babel/preset-env', { loose: true, modules: false }], '@babel/typescript', '@babel/preset-react'],
  plugins: [
    ['@babel/plugin-transform-runtime', { useESModules: true, version: '7.16.5' }],
    ['@babel/plugin-proposal-decorators', { legacy: true }],
  ],
};
