/* eslint-disable import/no-default-export */
import { API, FileInfo, ObjectExpression } from 'jscodeshift';
import { Collection } from 'jscodeshift/src/Collection';


/**
 * Transform skips to new format
 * @see https://github.com/creevey/creevey/pull/206
 */
const transformSkips = (api: API, collection: Collection<any>): boolean => {
  const j = api.jscodeshift;
  let modified = false;

  collection
    // { creevey: ... }
    .find(j.ObjectProperty, (node) => node.key.name === 'creevey')
    .forEach((path) => {
      if (path.node.value.type === "ObjectExpression") {
        // { creevey: {...} }
        const skip = path.node.value.properties.find((p) => p.type === "ObjectProperty" && p.key.type === "Identifier" && p.key.name === 'skip');
        if (skip && skip.type === "ObjectProperty") {
          // { creevey: { skip: ... } }
          const { value } = skip;

          if (value.type === 'ArrayExpression') {
            // { creevey: { skip: [...] } }
            const { elements } = value;

            if (elements.length === 1 && elements[0] && elements[0].type === 'BooleanLiteral') {
              // { creevey: { skip: [true|false] } }
              skip.value = elements[0];
              modified = true;
            } else if (elements.length !== 0) {
              // { creevey: { skip: [..., ...] } }
              const props: ObjectExpression['properties'] = [];
              elements.forEach((e, i) => {
                let reason = '';
                if (e) {
                  if (e.type === 'ObjectExpression') {
                    // { creevey: { skip: [{ ... }, ] } }
                    const reasonProp = e.properties.find((p) => p.type === "ObjectProperty" && p.key.type === "Identifier" && p.key.name === 'reason');
                    // { creevey: { skip: [{ reason: ...,  }, ] } }
                    if (reasonProp && reasonProp.type === "ObjectProperty" && reasonProp.value.type === "StringLiteral") {
                      // { creevey: { skip: [{ reason: "...", }, ] } }
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
                  props.push(j.property('init', j.literal(reason), e as any));
                }
              });
              skip.value = j.objectExpression(props);
              modified = true;
            }
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
