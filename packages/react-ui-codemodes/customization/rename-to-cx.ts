/* tslint:disable:no-console */
import { API, FileInfo } from 'jscodeshift/src/core';
import { StringLiteral } from 'ast-types/gen/nodes';

const TO_SOURCE_OPTIONS: any = {
  quote: 'single',
  useTab: false,
  tabWidth: 2,
  wrapColumn: 120,
  lineTerminator: '\n',
  reuseWhitespace: false,
  trailingComma: {
    objects: true,
    arrays: true,
    parameters: true,
  },
};

function renameToCx(fileInfo: FileInfo, api: API) {
  if (fileInfo.path.includes('__stories__') || fileInfo.path.includes('__tests__')) {
    return null;
  }

  const j = api.jscodeshift;
  const root = j(fileInfo.source);
  let modified = false;

  root.find(j.ImportDeclaration).filter(({ node }) => {
    return !!node && !!node.source && !!node.source.value && (node.source as StringLiteral).value.endsWith('/theming/Emotion') && node.specifiers && node.specifiers.some(s => {
      return s.type === 'ImportSpecifier' && s.imported.name === 'cx' && !!s.local;
    });
  }).forEach((nodePath) => {

    const importSpecifier = nodePath.value.specifiers.find(s => s.type === 'ImportSpecifier' && s.imported.name === 'cx')!;
    const localName = importSpecifier.local!.name;
    console.log(fileInfo.path, localName);

    root.find(j.CallExpression, {callee: {name: localName}}).forEach(c => c.value.callee = j.identifier('cx'));
    importSpecifier.local = null;

    modified = true;
  });

  return modified ? root.toSource(TO_SOURCE_OPTIONS) : null;
}

module.exports = renameToCx;
