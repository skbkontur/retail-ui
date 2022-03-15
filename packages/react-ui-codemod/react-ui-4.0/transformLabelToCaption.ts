/* eslint-disable import/no-default-export */
import { API, FileInfo } from 'jscodeshift';

export default function (file: FileInfo, api: API) {
  const j = api.jscodeshift;
  let modified = false;
  const result = j(file.source)
    .findJSXElements('Switcher')
    .find(j.JSXAttribute, (node) => node.name.name === 'label')
    .replaceWith((path) => {
      path.value.name.name = 'caption';
      modified = true;
      return path.node;
    });

  if (modified) {
    return result.toSource();
  }
}
