const path = require('path');
const createCompiler = require('@storybook/addon-docs/mdx-compiler-plugin');
const codesandbox = require('remark-codesandbox');

module.exports = {
  stories: ['../stories/**/*.stories.mdx'],
  addons: [
    {
      name: '@storybook/addon-docs',
      options: {
        configureJSX: true,
      },
    },
  ],
  webpackFinal: config => {
    console.dir(config, { depth: null });
    config.resolve.extensions.unshift('.ts', '.tsx');
    config.module.rules.push(
      {
        test: /\.tsx?$/,
        // exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              envName: 'development',
              extends: 'retail-ui/.babelrc.js',
            },
          },
          {
            loader: 'react-docgen-typescript-loader',
            options: {
              tsconfigPath: path.resolve(__dirname, '../tsconfig.json'),
            },
          },
        ],
      },
      {
        test: /\.(css|less)$/,
        loaders: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'global',
                localIdentName: '[name]-[local]-[hash:base64:4]',
              },
            },
          },
          'less-loader',
        ],
      },
      // {
      //   test: /\.(stories|story)\.mdx$/,
      //   use: [
      //     {
      //       loader: '@mdx-js/loader',
      //       options: {
      //         compilers: [createCompiler({})],
      //         remarkPlugins: [[codesandbox, { mode: 'iframe' }]],
      //       },
      //     },
      //   ],
      // },
    );
    return config;
  },
};
