/* tslint:disable:no-console */
import { API, FileInfo } from 'jscodeshift/src/core';
import { Identifier } from 'ast-types/gen/nodes';
import * as path from 'path';
import { parseLess } from './less-parser';
import { DynamicRulesAggregator, IDynamicRulesetsMap } from './dynamic-rules-aggregator';
import * as fs from 'fs';
import { ITokenizedDynamicRulesMap, tokenize } from './rules-tokenizer';

const ROOT_PATH = process.cwd();

function extractDynamicClasses(fileInfo: FileInfo, api: API) {
  const jscodeshift = api.jscodeshift;
  const root = jscodeshift(fileInfo.source);

  const parsedLess = new Map<string, IDynamicRulesetsMap>();
  const simpleStylesMap = new Map<Identifier, IDynamicRulesetsMap>();
  // const conditionalStylesMap = new Map<Identifier, object>();

  /*находим все импорты .less*/
  root
    .find(
      jscodeshift.ImportDeclaration,
      node => node && node.source && node.source.value && node.source.value.endsWith('.less'),
    )
    .forEach(importNodePath => {
      const node = importNodePath.value;

      if (node.specifiers && node.specifiers.length > 0) {
        if (node.specifiers.length > 1) {
          throw new Error('Multiple specifiers for style import!');
        }
        const specifier = node.specifiers[0].local as Identifier;
        if (specifier && !simpleStylesMap.has(specifier)) {
          const lessPath = path.resolve(ROOT_PATH, path.dirname(fileInfo.path), node.source.value as string);
          if (!parsedLess.has(lessPath)) {
            const dynamicRulesAggregator = new DynamicRulesAggregator();
            // NOTE: we use dynamicRulesAggregator in the way we'd use 'out' in C#
            /*const modifiedCss = */ parseLess(lessPath, dynamicRulesAggregator);
            /*console.groupCollapsed('modified css');
            console.log('[extract-dynamic-classes.ts]', modifiedCss.substr(0, modifiedCss.indexOf('\n')) + '...');
            console.groupEnd();*/

            parsedLess.set(lessPath, dynamicRulesAggregator.getRulesets());
          }
          simpleStylesMap.set(specifier, parsedLess.get(lessPath)!);
        }
      }
    });

  /*root.find(jscodeshift.CallExpression, { callee: { name: 'require' } }).forEach(requireStatement => {
    if (requireStatement.parent.value && requireStatement.parent.value.type === 'ConditionalExpression') {
      if (requireStatement.parent.parent && requireStatement.parent.parent.parent) {
        const declaration = requireStatement.parent.parent.parent.value;
        if (declaration.declarations && declaration.declarations.length > 0) {
          if (declaration.declarations.length > 1) {
            throw new Error('Multiple declarations for styles require!');
          }
        }
        const styleNode = requireStatement.parent.parent.parent.value.declarations[0].id;
        if (!stylesMap.has(styleNode)) {
          stylesMap.set(styleNode, (requireStatement.value.arguments[0] as StringLiteral).value);
        }
      }
    }
  });*/

  const tokenizedStylesMap: Map<Identifier, ITokenizedDynamicRulesMap> = new Map();

  simpleStylesMap.forEach((value, key) => {
    tokenizedStylesMap.set(key, tokenize(value));

    fs.writeFileSync(
      path.resolve(__dirname, `out-${key.name}-parsed.txt`),
      Array.from(value.entries())
        .map(e => `${e[0]} = ${JSON.stringify(e[1])}`)
        .join('\r\n'),
    );
  });

  tokenizedStylesMap.forEach((value, key) => {
    fs.writeFileSync(
      path.resolve(__dirname, `out-${key.name}-tokenized.txt`),
      Array.from(value.entries())
        .map(e => `${e[0]} = ${JSON.stringify(e[1])}`)
        .join('\r\n'),
    );
  });


  return root.toSource();
}

module.exports = extractDynamicClasses;
