/* eslint-disable import/no-default-export */
import { API, FileInfo } from 'jscodeshift';
import { Collection } from 'jscodeshift/src/Collection';

const transformSkips = (api: API, collection: Collection<any>): boolean => {
  const j = api.jscodeshift;
  let modified = false;

  collection
    .find(j.ObjectProperty, (node) => node.key.name === 'creevey')
    .forEach((path) => {
      const skip = path.node.value.properties.find((p) => p.key.name === 'skip');
      if (skip) {
        const { value } = skip;

        if (value.type === 'ArrayExpression') {
          const { elements } = value;

          if (elements.length === 1) {
            skip.value = elements[0];
            modified = true;
          } else if (elements.length > 1) {
            const props = [];
            elements.forEach((e, i) => {
              let reason = '';
              if (e.type === 'ObjectExpression') {
                const reasonProp = e.properties.find((p) => p.key.name === 'reason');
                if (reasonProp) {
                  reason = reasonProp.value.value;
                }
                // j(reasonProp).remove();
              }
              if (!reason) {
                let defaultExport = path.parent;
                while (defaultExport) {
                  if (defaultExport.value.type === 'ExportDefaultDeclaration') {
                    break;
                  }
                  defaultExport = defaultExport.parent;
                }
                reason = (defaultExport ? 'kind' : 'story') + '-skip-' + i;
              }
              props.push(j.property('init', j.literal(reason), e));
            });
            skip.value = j.objectExpression(props);
            modified = true;
          }
        }
      }
    });

  return modified;
};

export default function transform(file: FileInfo, api: API) {
  const j = api.jscodeshift;
  const result = j(file.source);

  const modified = transformSkips(api, result);

  return modified ? result.toSource() : file.source;
}

export const parser = 'tsx';
