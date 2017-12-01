const isLess = name => /\.less$/.test(name);
const lessToCss = name => name.replace(/\.less$/, '.css');

/**
 * Turns this:
 *
 * import styles from './Styles.less';
 *
 * into this:
 *
 * import styles from './Styles.css';
 */
/* eslint-disable consistent-return */
module.exports = function(babel) {
  const { types: t } = babel;
  return {
    visitor: {
      ImportDeclaration: {
        enter(path) {
          const { source } = path.node;
          if (!isLess(source.value)) {
            return;
          }

          path.replaceWith(
            t.importDeclaration(
              path.node.specifiers,
              t.stringLiteral(lessToCss(source.value))
            )
          );
        }
      },
      CallExpression: {
        enter({ node }) {
          if (node.callee.name !== 'require') {
            return;
          }
          const firstArg = node.arguments[0];
          if (!isLess(firstArg.value)) {
            return;
          }
          firstArg.value = lessToCss(firstArg.value);
        }
      }
    }
  };
};
