import type { API, FileInfo } from 'jscodeshift';

const isRelevantDeclaration = (type: string) =>
  type === 'ImportDeclaration' || type === 'ExportNamedDeclaration' || type === 'ExportAllDeclaration';

// oxlint-disable-next-line import/no-default-export
export default function transform(file: FileInfo, api: API) {
  const j = api.jscodeshift;
  const root = j(file.source);

  root
    .find(j.Node, (node) => isRelevantDeclaration(node.type))
    .filter((path) => {
      const n = path.node as { source?: { value?: string } };
      const source = n.source;
      if (!source || typeof source.value !== 'string') {
        return false;
      }
      return /\/Icon/.test(source.value);
    })
    .replaceWith((path) => {
      const node = path.node as { source?: { value: string } };
      if (node.source && typeof node.source.value === 'string') {
        node.source.value = 'react-ui-icons';
      }
      return path.node;
    });

  return root.toSource({ lineTerminator: '\n' });
}
