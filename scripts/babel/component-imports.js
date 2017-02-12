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
/* eslint-disable consistent-return */
module.exports = function(babel) {
  var t = babel.types;

  var babel5 = !!babel.Transformer;
  var stringLiteral = babel5 ? t.literal : t.stringLiteral;

  var visitor = {
    ImportDeclaration: {
      enter(path) {
        var node = babel5 ? path : path.node;

        if (node.source.value !== 'ui') {
          return;
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
            stringLiteral('ui/' + specifier.imported.name)
          );
          imports.push(imp);
        });

        if (babel5) {
          return imports;
        } else {
          path.replaceWithMultiple(imports);
        }
      }
    }
  };

  if (babel5) {
    return new babel.Transformer('component-imports', visitor);
  } else {
    return { visitor };
  }
};
