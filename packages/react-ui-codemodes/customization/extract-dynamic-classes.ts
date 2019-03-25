/* tslint:disable:no-console */
import { API, FileInfo } from 'jscodeshift/src/core';
import * as path from 'path';
import { parseLess } from './less-parser';
import { DynamicRulesAggregator, IDynamicRulesetsMap } from './dynamic-rules-aggregator';
import { ITokenizedDynamicRulesMap, tokenize } from './rules-tokenizer';
import { Identifier, ImportDeclaration } from 'ast-types/gen/nodes';

const ROOT_PATH = process.cwd();
const TO_SOURCE_OPTIONS: any = { quote: 'single' };
const THEME_MANAGER_PATH = path.join('..', 'retail-ui', 'lib', 'ThemeManager');

function extractDynamicClasses(fileInfo: FileInfo, api: API) {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  const parsedLess = new Map<string, IDynamicRulesetsMap>();
  const simpleStylesMap = new Map<Identifier, IDynamicRulesetsMap>();
  // const conditionalStylesMap = new Map<Identifier, object>();

  let importDeclarations = root.find(j.ImportDeclaration);

  // replace "classnames" imports with {classnames} from 'emotion'
  let emotionImportStatement: ImportDeclaration | null = null;
  let emotionCxImportIdentifier: Identifier | null = null;
  const classnamesImports = importDeclarations.filter(
    ({ node }) => !!node && !!node.source && !!node.source.value && node.source.value === 'classnames',
  );
  if (classnamesImports.length === 1) {
    const classnamesImport: ImportDeclaration = classnamesImports.get().value;

    const specifier = classnamesImport && classnamesImport.specifiers[0] && classnamesImport.specifiers[0];
    if (specifier && specifier.type === 'ImportDefaultSpecifier') {
      const classnamesImportName = (specifier.local && specifier.local.name) || '';
      if (classnamesImportName) {
        emotionCxImportIdentifier = j.identifier(classnamesImportName);
        emotionImportStatement = j.importDeclaration(
          [j.importSpecifier(j.identifier('cx'), emotionCxImportIdentifier)],
          j.literal('emotion'),
        );
        classnamesImports.remove();
      }
    }
  } else if (classnamesImports.length > 1) {
    console.warn('There are multiple "classnames" imports, possibly a bug');
  }

  /*find all less imports .less*/
  importDeclarations
    .filter(
      ({ node }) =>
        !!node && !!node.source && typeof node.source.value === 'string' && node.source.value.endsWith('.less'),
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

  simpleStylesMap.forEach((styles, identifier) => {
    tokenizedStylesMap.set(identifier, tokenize(styles));
  });

  let emotionCssImportIdentifier: Identifier | null = null;
  if (tokenizedStylesMap.size > 0) {
    // as we have dynamic rules, we need to import css from 'emotion'
    emotionCssImportIdentifier = j.identifier('css');
    if (emotionImportStatement) {
      // already have classnames
      emotionImportStatement.specifiers.unshift(j.importSpecifier(emotionCssImportIdentifier));
    } else {
      emotionImportStatement = j.importDeclaration(
        [j.importSpecifier(emotionCssImportIdentifier)],
        j.literal('emotion'),
      );
    }
  }

  // has no dynamic styles, skip
  if (!emotionImportStatement) {
    return root.toSource(TO_SOURCE_OPTIONS);
  }

  // add css/cx imports
  importDeclarations = root.find(j.ImportDeclaration);
  importDeclarations.at(importDeclarations.length - 1).insertAfter(emotionImportStatement);

  const themeManagerIdentifier = j.identifier('ThemeManager');
  const dynamicStylesTypeIdentifier = j.identifier('DynamicStylesType');
  const themeManagerImportPath = path.relative(path.dirname(fileInfo.path), THEME_MANAGER_PATH).replace(/\\/g, '/');
  const themeManagerImportStatement = j.importDeclaration(
    [j.importDefaultSpecifier(themeManagerIdentifier), j.importSpecifier(dynamicStylesTypeIdentifier)],
    j.literal(themeManagerImportPath),
  );

  importDeclarations = root.find(j.ImportDeclaration);
  importDeclarations.at(importDeclarations.length - 1).insertAfter(themeManagerImportStatement);

  const themeIdentifier = j.identifier('defaultTheme');
  const themeConst = j.variableDeclaration('const', [
    j.variableDeclarator(
      themeIdentifier,
      j.callExpression(j.memberExpression(themeManagerIdentifier, j.identifier('getVariables')), [
        j.literal('default'),
      ]),
    ),
  ]);
  importDeclarations = root.find(j.ImportDeclaration);
  importDeclarations.at(importDeclarations.length - 1).insertAfter(themeConst);

  tokenizedStylesMap.forEach((styles, identifier) => {
    const objectProperties: any[] = [];
    const dynamicStyleArgumentIdentifier = j.identifier('theme');
    styles.forEach((ruleset, className) => {
      const templateLiteralQuasis: any[] = [];
      const templateLiteralExpressions: any[] = [];
      console.log('[extract-dynamic-classes.ts]', 'ruleset', ruleset.cascade.entries());

      const rules = Object.keys(ruleset.rules);

      for (let i = 0; i < rules.length; i++) {
        const ruleName = rules[i];
        let quasi = `${'\n\t\t\t'}${ruleName}: `;
        const values = ruleset.rules[ruleName];
        values.forEach(value => {
          if (value.startsWith(':variable')) {
            templateLiteralQuasis.push(j.templateElement({
              cooked: quasi,
              raw: quasi
            }, false));
            const variableName = value.replace(':variable(', '').replace(')', '');
            templateLiteralExpressions.push(
              j.memberExpression(dynamicStyleArgumentIdentifier, j.identifier(variableName)),
            );
            quasi = '';
          } else {
            quasi = quasi + value;
          }
        });
        if(i === rules.length - 1) {
          quasi = quasi + '\n\t\t';
          templateLiteralQuasis.push(j.templateElement({
            cooked: quasi,
            raw: quasi
          }, true));
        }
      }

      const property = j.property(
        'init',
        j.identifier(className),
        j.functionExpression(
          null,
          [dynamicStyleArgumentIdentifier],
          j.blockStatement([
            j.returnStatement(
              j.callExpression(emotionCssImportIdentifier!, [
                j.templateLiteral(templateLiteralQuasis, templateLiteralExpressions),
              ]),
            ),
          ]),
        ),
      );
      property.method = true;
      objectProperties.push(property);
    });

    const objectExpression = j.objectExpression(objectProperties);
    const dynamicStylesIdentifier = j.identifier(`${identifier.name}Dynamic`);
    dynamicStylesIdentifier.typeAnnotation = j.tsTypeAnnotation(j.tsTypeReference(dynamicStylesTypeIdentifier));
    const dynamicStylesConst = j.variableDeclaration('const', [
      j.variableDeclarator(dynamicStylesIdentifier, objectExpression),
    ]);

    root
      .find(j.VariableDeclaration, node => node.declarations && node.declarations[0].id === themeIdentifier)
      .insertAfter(dynamicStylesConst);
  });

  const result = root.toSource(TO_SOURCE_OPTIONS);

  // console.log('[extract-dynamic-classes.ts]', 'extractDynamicClasses', '\n', result);

  return result;
}

module.exports = extractDynamicClasses;
