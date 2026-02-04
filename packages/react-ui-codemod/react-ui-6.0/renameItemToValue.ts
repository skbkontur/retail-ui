import type { API, FileInfo } from 'jscodeshift';

export default function (file: FileInfo, api: API): string | undefined {
  const j = api.jscodeshift;
  let modified = false;

  const result =  j(file.source)
      .findJSXElements('ComboBox')
      .find(j.JSXAttribute, (node) => node.name.name === 'itemToValue')
      .replaceWith((path) => {
        path.value.name.name = 'itemToId';
        modified = true;
        return path.node;
      });

  if (modified) {
    return result.toSource({ lineTerminator: '\n' });
  }
}
