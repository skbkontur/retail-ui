module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/typescript',
  ],
  plugins: [['@babel/plugin-transform-runtime', { version: '7.16.5' }]],
};
