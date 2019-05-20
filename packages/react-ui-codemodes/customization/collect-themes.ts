/* tslint:disable:no-console */
import { API, FileInfo } from 'jscodeshift/src/core';
import { Identifier, StringLiteral } from 'ast-types/gen/nodes';
import * as path from 'path';
import * as fs from 'fs';

const DESCRIPTION_DIR_PATH = path.join('..', 'retail-ui', 'components', 'ThemeVariablesShowcase', 'ThemeDescriptions');

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

function collectThemes(fileInfo: FileInfo, api: API) {
  const isTheme = fileInfo.path.includes('themes') && fileInfo.path.endsWith('Theme.ts');
  const isStory = fileInfo.path.includes('__stories__');
  const isTest = fileInfo.path.includes('__tests__');
  if (isStory || isTest || !isTheme) {
    return null;
  }

  const j = api.jscodeshift;
  const fileName = path.basename(fileInfo.path);
  const outputFilePath = path.join(DESCRIPTION_DIR_PATH, fileName.replace('.ts', '.description.ts'));
  const root = j(fileInfo.source);
  const result: any = {};

  root.find(j.ObjectProperty).forEach(propertyNodePath => {
    let propertyName = '';
    const key = propertyNodePath.value.key;
    if (!key) {
      return;
    }
    const keyType = key.type;

    if (keyType === 'Literal' || keyType === 'StringLiteral') {
      propertyName = (key as StringLiteral).value;
    } else if (keyType === 'Identifier') {
      propertyName = (key as Identifier).name;
    }

    if (!propertyName) {
      return;
    }
    if (!result[propertyName]) {
      result[propertyName] = [];
    }
    j(propertyNodePath)
      .find(j.MemberExpression)
      .forEach(nodePath => {
        const value = nodePath.value;
        if (
          value &&
          value.object &&
          value.object.type === 'ThisExpression' &&
          value.property &&
          value.property.type === 'Identifier' &&
          result[propertyName].indexOf(value.property.name) < 0
        ) {
          result[propertyName].push(value.property.name);
        }
      });
  });

  if (!fs.existsSync(DESCRIPTION_DIR_PATH)) {
    fs.mkdirSync(DESCRIPTION_DIR_PATH);
  }

  const toFormat = `export default ${JSON.stringify(result, undefined, 2)};`;
  const resultAST = j(toFormat).forEach(program => {
    j(program)
      .find(j.ObjectProperty)
      .forEach(op => {
        op.value.key = j.identifier((op.value.key as StringLiteral).value);
      });
  });

  fs.writeFileSync(outputFilePath, resultAST.toSource(TO_SOURCE_OPTIONS));

  return null;
}

module.exports = collectThemes;
