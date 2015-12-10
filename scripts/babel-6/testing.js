module.exports = function(babel) {
  const t = babel.types;

  const buildRefFunc = babel.template(`global.ReactTesting.ref(TID)`);

  return {
    visitor: {
      JSXAttribute(path) {
        if (path.node.name.name !== 'tid') {
          return;
        }

        path.node.name.name = 'ref';
        path.node.value = t.JSXExpressionContainer(
          buildRefFunc({TID: path.node.value}).expression
        );
      }
    }
  };
};
