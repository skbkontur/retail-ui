module.exports = function(babel) {
  const t = babel.types;

  function getTid(attr) {
    if (t.isJSXExpressionContainer(attr)) {
      return attr.expression;
    }
    return attr;
  }

  const buildRefFunc = babel.template(`global.ReactTesting.ref(TID)`);
  const buildPassFunc = babel.template(`global.ReactTesting.pass(this)`);

  return {
    visitor: {
      JSXAttribute(path) {
        if (path.node.name.name === 'tid') {
          path.node.name.name = 'ref';

          const tid = getTid(path.node.value);
          path.node.value = t.JSXExpressionContainer(
            buildRefFunc({TID: tid}).expression
          );
        } else if (path.node.name.name === 'tid-pass') {
          path.node.name.name = 'ref';
          path.node.value = t.JSXExpressionContainer(
            buildPassFunc().expression
          );
        }
      }
    }
  };
};
