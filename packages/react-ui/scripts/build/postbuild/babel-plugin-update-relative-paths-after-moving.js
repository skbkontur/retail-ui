const path = require('upath');

const isRelative = name => name.startsWith('.');
const getUpdatedRelativePath = relativePath => path.normalize(path.join('../', relativePath));

/**
 * Turns this:
 *
 * import module from './Module';
 * import module from '../Module';
 *
 * into this:
 *
 * import module from '../Module';
 * import module from '../../Module';
 *
 * and handles: import, import(), require(), export
 */

module.exports = function(babel) {
  const { types: t } = babel;
  return {
    visitor: {
      ImportDeclaration(path) {
        const { source } = path.node;
        if (!isRelative(source.value)) {
          return;
        }
        source.value = getUpdatedRelativePath(source.value);
      },
      CallExpression: {
        enter({ node }) {
          if (node.callee.type !== 'Import' && node.callee.name !== 'require') {
            return;
          }
          const firstArg = node.arguments[0];
          if (!isRelative(firstArg.value)) {
            return;
          }
          firstArg.value = getUpdatedRelativePath(firstArg.value);
        },
      },
      ExportAllDeclaration(path) {
        const { source } = path.node;
        if (!isRelative(source.value)) {
          return;
        }
        source.value = getUpdatedRelativePath(source.value);
      },
      ExportNamedDeclaration(path) {
        const { source } = path.node;
        if (!source || !isRelative(source.value)) {
          return;
        }
        source.value = getUpdatedRelativePath(source.value);
      },
    },
  };
};
