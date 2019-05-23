/* tslint:disable:no-console */
import { API, FileInfo } from 'jscodeshift/src/core';
import { Identifier } from 'ast-types/gen/nodes';
import * as path from 'path';
import * as fs from 'fs';

const DESCRIPTION_DIR_PATH = path.join(
  '..',
  'retail-ui',
  'components',
  'ThemeVariablesShowcase',
  'ComponentDescriptions',
);

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

function collectVariables(fileInfo: FileInfo, api: API) {
  const isStyle = fileInfo.path.endsWith('.styles.ts');
  const isStory = fileInfo.path.includes('__stories__');
  const isTest = fileInfo.path.includes('__tests__');
  if (isStory || isTest || !isStyle) {
    return null;
  }

  const j = api.jscodeshift;
  const fileName = path.basename(fileInfo.path);
  const outputFilePath = path.join(DESCRIPTION_DIR_PATH, fileName.replace('.styles.ts', '.json'));
  const root = j(fileInfo.source);
  const result: any = {};

  root.find(j.VariableDeclarator).forEach(variableNodePath => {
    j(variableNodePath)
      .find(j.ObjectMethod)
      .forEach(methodNodePath => {
        const name = (methodNodePath.value.key as Identifier).name;
        const contents: string[] = [];
        j(methodNodePath)
          .find(j.TaggedTemplateExpression)
          .forEach(css => {
            contents.push(j(css).toSource(TO_SOURCE_OPTIONS));
          });

        result[name] = result[name] || {
          contents: contents.join('\n'),
          variables: new Set(),
        };
        j(methodNodePath)
          .find(j.MemberExpression, {
            object: {
              type: 'Identifier',
              name: 't',
            },
          })
          .forEach(expressionNodePath => {
            const propertyName = (expressionNodePath.value.property as Identifier).name;
            result[name].variables.add(propertyName);
          });

        result[name].variables = Array.from(result[name].variables);
      });
  });

  if (!fs.existsSync(DESCRIPTION_DIR_PATH)) {
    fs.mkdirSync(DESCRIPTION_DIR_PATH);
  }

  fs.writeFileSync(outputFilePath, JSON.stringify(result, undefined, 2));

  return null;
}

module.exports = collectVariables;
