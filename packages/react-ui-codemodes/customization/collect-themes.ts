/* tslint:disable:no-console */
import { API, FileInfo } from 'jscodeshift/src/core';
import { Identifier, StringLiteral } from 'ast-types/gen/nodes';
import * as path from 'path';
import * as fs from 'fs';

const DESCRIPTION_DIR_PATH = path.join('..', 'retail-ui', 'components', 'ThemeVariablesShowcase', 'ThemeDescriptions');

function collectThemes(fileInfo: FileInfo, api: API) {
  const isTheme = fileInfo.path.includes('themes') && fileInfo.path.endsWith('Theme.ts');
  const isStory = fileInfo.path.includes('__stories__');
  const isTest = fileInfo.path.includes('__tests__');
  if (isStory || isTest || !isTheme) {
    return null;
  }

  const j = api.jscodeshift;
  const fileName = path.basename(fileInfo.path);
  const outputFilePath = path.join(DESCRIPTION_DIR_PATH, fileName.replace('.ts', '.json'));
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

  fs.writeFileSync(outputFilePath, JSON.stringify(result, undefined, 2));

  return null;
}

module.exports = collectThemes;
