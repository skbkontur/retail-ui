module.exports = function(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);
  const typesForReplace = ['ImportDeclaration', 'ExportNamedDeclaration', 'ExportAllDeclaration'];

  root
    .find(j.Node, node => typesForReplace.indexOf(node.type) > -1)
    .filter(path => {
      if (path.node.source.value.match(/\/Icon/)) {
        return path;
      }
    })
    .replaceWith(path => {
      const node = path.node;
      node.source.value = 'react-ui-icons';
      return node;
    });

  return root.toSource();
};
