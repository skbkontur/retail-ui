module.exports = function(babel) {
  var t = babel.types;

  function buildRefFunc(tid) {
    return t.CallExpression(
      t.MemberExpression(
        t.MemberExpression(
          t.Identifier('global'),
          t.Identifier('ReactTesting')
        ),
        t.Identifier('ref')
      ),
      [tid]
    );
  }

  return new babel.Transformer('testing', {
    JSXAttribute(node) {
      if (node.name.name !== 'tid') {
        return;
      }

      node.name.name = 'ref';
      node.value = t.JSXExpressionContainer(buildRefFunc(node.value));
    }
  });
};
