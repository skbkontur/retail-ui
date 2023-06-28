require('@babel/register')({
  extensions: ['.ts', '.tsx'],
  presets: [['@babel/preset-env', { targets: { node: '16' } }], '@babel/typescript'],
});
