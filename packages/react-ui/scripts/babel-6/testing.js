'use strict';

const invariant = require('invariant');

module.exports = function(babel) {
  const t = babel.types;

  const buildRefFunc = babel.template('global.ReactTesting.ref(TID, REF)');
  const buildPassFunc = babel.template('global.ReactTesting.pass(this)');

  return {
    visitor: {
      JSXOpeningElement(path) {
        const refAttr = findAttribute(path, 'ref');
        const tidAttr = findAttribute(path, 'tid');
        const tidPassAttr = findAttribute(path, 'tid-pass');

        if (tidAttr) {
          let ref = t.NullLiteral();
          if (refAttr) {
            ref = refAttr.node.value.expression;
            refAttr.remove();
          }

          const tid = getTid(tidAttr);
          const refValue = t.JSXExpressionContainer(
            buildRefFunc({
              TID: tid,
              REF: ref
            }).expression
          );

          tidAttr.replaceWithMultiple([
            tidAttr.node,
            t.JSXAttribute(t.JSXIdentifier('ref'), refValue)
          ]);
        } else if (tidPassAttr) {
          invariant(
            !refAttr,
            'Attributes `ref` and `tid-pass` cannot be used together.'
          );

          tidPassAttr.node.name.name = 'ref';
          tidPassAttr.node.value = t.JSXExpressionContainer(
            buildPassFunc().expression
          );
        }
      }
    }
  };
};

function findAttribute(openingElementPath, name) {
  for (const attr of openingElementPath.get('attributes') || []) {
    if (attr.isJSXAttribute() && attr.node.name.name === name) {
      return attr;
    }
  }
  return null;
}

function getTid(attrPath) {
  const valuePath = attrPath.get('value');
  if (valuePath.isJSXExpressionContainer()) {
    return valuePath.node.expression;
  }
  return valuePath.node;
}
