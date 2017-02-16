const j = require('jscodeshift');

module.exports = function(src) {
  const ast = j(src);

  const name = ast.find(j.AssignmentExpression, {
    left: { property: { name: '__ADAPTER__' } }
  }).get('right').node.name;

  const obj = ast.find(j.VariableDeclarator, {
    id: { name }
  }).get('init');

  const props = obj.node.properties.map(prop => ({
    name: prop.key.name,
    args: getPropArgs(prop).slice(1),
    desc: getPropDesc(prop)
  }));

  return props;
};

function getPropArgs(prop) {
  return prop.value.params.map(param => param.name);
}

function getPropDesc(prop) {
  if (prop.leadingComments) {
    return prop.leadingComments.map(c => c.value).join('');
  }
  return '';
}
