const env = {
  cjs: {
    presets: [
      [
        '@babel/preset-env',
        {
          loose: true,
          modules: 'commonjs',
          targets: { ie: '11' },
        },
      ],
    ],
    plugins: [['@babel/plugin-transform-runtime', { version: '7.8.3' }]],
  },
};

const presets = [['@babel/preset-env', { loose: true, modules: false }], '@babel/typescript', '@babel/preset-react'];

const plugins = [
  ['@babel/plugin-transform-runtime', { useESModules: true, version: '7.8.3' }],
  ['@babel/plugin-proposal-decorators', { legacy: true }],
  ['@babel/plugin-proposal-class-properties', { loose: true }],
  ['babel-plugin-typescript-to-proptypes', { comments: true, mapUnknownReferenceTypesToAny: true, maxSize: 0 }],
];

module.exports = { env, presets, plugins };
