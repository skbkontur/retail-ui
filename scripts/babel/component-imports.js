/**
 * Turns this:
 *
 * import {Button, Gapped} from 'ui';
 *
 * into this:
 * 
 * import Button from 'ui/Button';
 * import Gapped from 'ui/Gapped';
 */
module.exports = function(babel) {
  var t = babel.types;

  return new babel.Transformer('component-imports', {
    ImportDeclaration: {
      enter: function(node, parent, scope, state) {
        if (node.source.value !== 'ui') {
          return node;
        }

        var imports = [];
        node.specifiers.forEach(function(specifier) {
          if (specifier.type !== 'ImportSpecifier') {
            throw new Error(
              'Default and namespace imports from `ui` are not supported'
            );
          }

          var imp = t.importDeclaration(
            [t.importDefaultSpecifier(specifier.local)],
            t.literal('ui/' + specifier.imported.name)
          );
          imports.push(imp);
        });

        return imports;
      },
    },
  });
};
