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
    name: 'ast-transform', // not required
    visitor: {
      ImportDeclaration: {
        enter(path) {
          const { source } = path.node;
          if (!/\.less$/.test(source.value)) {
            return;
          }

          if (!path.node.specifiers[0]) {
            return;
          }

          path.replaceWith(
            t.importDeclaration(
              [t.importDefaultSpecifier(path.node.specifiers[0].local)],
              t.stringLiteral(source.value.replace(/\.less$/, '.css'))
            )
          );
        }
      }
    }
  };
};
