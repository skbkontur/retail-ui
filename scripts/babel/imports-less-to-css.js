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
          if (!/\.less$/.test(source.value)) {
            return;
          }

          path.replaceWith(
            t.importDeclaration(
              path.node.specifiers,
              t.stringLiteral(source.value.replace(/\.less$/, '.css'))
            )
          );
        }
      }
    }
  };
};
