// using babel.config.js here as a workaround
// to enable processing files from react-ui
// that are outside of validations package
// @see https://stackoverflow.com/a/67235617

module.exports = {
  presets: ['@babel/preset-env', '@babel/typescript', '@babel/preset-react'],
  plugins: [
    '@babel/plugin-transform-runtime',
    'react-hot-loader/babel',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    [
      'search-and-replace',
      {
        rules: [
          {
            // @see ReactUIDetection.ts
            search: /__REACT_UI_PACKAGE__/,
            replace: '@skbkontur/react-ui',
          },
        ],
      },
    ],
  ],
};
