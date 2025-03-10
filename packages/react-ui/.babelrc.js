const isDocsEnv = Boolean(process.env.STORYBOOK_REACT_UI_DOCS);

/**
 * Генерирует массив путей с относительными ссылками
 * @returns Массив строк с относительными путями
 */
function generateRelativePaths(basePath, maxDepth) {
  return Array.from({ length: maxDepth }, (_, index) => {
    const dots = '../'.repeat(index);
    return `${dots}${basePath}`;
  });
}

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
    ...(isDocsEnv
      ? [['transform-react-remove-prop-types', { mode: 'remove', ignoreFilenames: ['node_modules'] }]]
      : []),
    [
      // docs https://github.com/emotion-js/emotion/tree/main/packages/babel-plugin
      '@emotion',
      {
        importMap: generateRelativePaths('../lib/theming/Emotion', 5).reduce((prev, current) => {
          prev[current] = { css: { canonicalImport: ['@emotion/css', 'css'] } };
          return prev;
        }, {}),
        sourceMap: false,
        cssPropOptimization: false,
      },
    ],
  ],
};
