/* tslint:disable:no-console */
import { API, FileInfo, JSCodeshift } from 'jscodeshift/src/core';
import * as path from 'path';
import { parseLess } from './less-parser';
import { DynamicRulesAggregator, IDynamicRulesetsMap, IRemovalInfo } from './dynamic-rules-aggregator';
import { ITokenizedDynamicRulesMap, tokenize } from './rules-tokenizer';
import {
  Identifier,
  ImportDeclaration,
  ImportDefaultSpecifier,
  ImportSpecifier,
  StringLiteral,
} from 'ast-types/gen/nodes';
import { NodePath } from 'ast-types';
import * as fs from 'fs';
import { Collection } from 'jscodeshift/src/Collection';

let DRA_ID = 0;
const ROOT_PATH = process.cwd();
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
const THEME_MANAGER_PATH = path.join('..', 'retail-ui', 'lib', 'ThemeManager');
const COLOR_FUNCTIONS_PATH = path.join('..', 'retail-ui', 'lib', 'styles', 'ColorFunctions');
let rulesToRemove: IRemovalInfo[] = [];
let themeManagerImportPath: string;
let colorFunctionsImportPath: string;

function extractDynamicClasses(fileInfo: FileInfo, api: API, options: any) {
  if (fileInfo.path.includes('__stories__') || fileInfo.path.includes('__tests__')) {
    return null;
  }

  const doWrite = !options.dry;
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  const parsedLess = new Map<string, IDynamicRulesetsMap>();
  const stylesMap = new Map<Identifier, IDynamicRulesetsMap>();
  const stylesIdToFileMap = new Map<Identifier, string>();

  let importDeclarations = root.find(j.ImportDeclaration);

  const hasJsStylesImport =
    importDeclarations.filter(
      n =>
        !!n.value &&
        !!n.value.source &&
        typeof n.value.source.value === 'string' &&
        n.value.source.value.endsWith('.styles'),
    ).length > 0;

  if (hasJsStylesImport) {
    return null;
  }

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
        if (specifier && !stylesMap.has(specifier)) {
          const lessFilePath = path.resolve(ROOT_PATH, path.dirname(fileInfo.path), node.source.value as string);
          if (!parsedLess.has(lessFilePath)) {
            const dynamicRulesAggregator = new DynamicRulesAggregator(DRA_ID++);
            // NOTE: we use dynamicRulesAggregator in the way we'd use 'out' in C#
            parseLess(lessFilePath, dynamicRulesAggregator);
            // console.log(parseLess(lessFilePath, dynamicRulesAggregator), '\n\n');
            parsedLess.set(lessFilePath, dynamicRulesAggregator.getRulesets());
            rulesToRemove = rulesToRemove.concat(dynamicRulesAggregator.getRemovals());
          }
          stylesMap.set(specifier, parsedLess.get(lessFilePath)!);
          stylesIdToFileMap.set(specifier, node.source.value as string);
        }
      }
    });

  const requires = root.find(j.CallExpression, { callee: { name: 'require' } });

  requires.forEach(requireStatement => {
    if (requireStatement.parent.value && requireStatement.parent.value.type === 'ConditionalExpression') {
      if (requireStatement.parent.parent && requireStatement.parent.parent.parent) {
        const declaration = requireStatement.parent.parent.parent.value;
        if (declaration.declarations && declaration.declarations.length > 0) {
          if (declaration.declarations.length > 1) {
            throw new Error('Multiple declarations for styles require!');
          }
        }

        const lessFile = (requireStatement.value.arguments[0] as any).value as string;
        if (lessFile.endsWith('.less') && !lessFile.endsWith('.flat.less')) {
          const styleNode = declaration.declarations[0].id;
          if (styleNode && !stylesMap.has(styleNode)) {
            const lessFilePath = path.resolve(ROOT_PATH, path.dirname(fileInfo.path), lessFile);
            if (!parsedLess.has(lessFilePath)) {
              const dynamicRulesAggregator = new DynamicRulesAggregator(DRA_ID++);
              // NOTE: we use dynamicRulesAggregator in the way we'd use 'out' in C#
              parseLess(lessFilePath, dynamicRulesAggregator);
              // console.log(parseLess(lessFilePath, dynamicRulesAggregator), '\n\n');
              parsedLess.set(lessFilePath, dynamicRulesAggregator.getRulesets());
              rulesToRemove = rulesToRemove.concat(dynamicRulesAggregator.getRemovals());
            }
            stylesMap.set(styleNode, parsedLess.get(lessFilePath)!);
            stylesIdToFileMap.set(styleNode, lessFile);
          }
        }
      }
    } else if (requireStatement.parent.value && requireStatement.parent.value.type === 'VariableDeclarator') {
      const declaration = requireStatement.parent.parent.value;
      if (declaration.declarations && declaration.declarations.length > 0) {
        if (declaration.declarations.length > 1) {
          throw new Error('Multiple declarations for styles require!');
        }
      }
      const lessFile = (requireStatement.value.arguments[0] as any).value as string;
      if (lessFile.endsWith('.less') && !lessFile.endsWith('.flat.less')) {
        const styleNode = declaration.declarations[0].id;
        if (styleNode && !stylesMap.has(styleNode)) {
          const lessFilePath = path.resolve(ROOT_PATH, path.dirname(fileInfo.path), lessFile);
          if (!parsedLess.has(lessFilePath)) {
            const dynamicRulesAggregator = new DynamicRulesAggregator(DRA_ID++);
            // NOTE: we use dynamicRulesAggregator in the way we'd use 'out' in C#
            parseLess(lessFilePath, dynamicRulesAggregator);
            // console.log(parseLess(lessFilePath, dynamicRulesAggregator), '\n\n');
            parsedLess.set(lessFilePath, dynamicRulesAggregator.getRulesets());
            rulesToRemove = rulesToRemove.concat(dynamicRulesAggregator.getRemovals());
          }
          stylesMap.set(styleNode, parsedLess.get(lessFilePath)!);
          stylesIdToFileMap.set(styleNode, lessFile);
        }
      }
    }
  });

  // add css/cx imports
  importDeclarations = root.find(j.ImportDeclaration);
  importDeclarations.at(importDeclarations.length - 1).insertAfter(emotionImportStatement);

  if (!stylesMap.size || Array.from(stylesMap.values()).every(v => !v.size)) {
    return emotionImportStatement ? root.toSource(TO_SOURCE_OPTIONS) : null;
  }

  const tokenizedStylesMap: Map<Identifier, ITokenizedDynamicRulesMap> = new Map();
  stylesMap.forEach((styles, identifier) => {
    tokenizedStylesMap.set(identifier, tokenize(styles));
  });

  themeManagerImportPath = path.relative(path.dirname(fileInfo.path), THEME_MANAGER_PATH).replace(/\\/g, '/');
  colorFunctionsImportPath = path.relative(path.dirname(fileInfo.path), COLOR_FUNCTIONS_PATH).replace(/\\/g, '/');
  const themeManagerIdentifier = j.identifier('ThemeManager');
  const themeTypeIdentifier = j.identifier('ITheme');
  const themeManagerImportStatement = j.importDeclaration(
    [j.importDefaultSpecifier(themeManagerIdentifier)],
    j.literal(themeManagerImportPath),
  );

  importDeclarations = root.find(j.ImportDeclaration);
  importDeclarations.at(importDeclarations.length - 1).insertAfter(themeManagerImportStatement);

  const themeIdentifier = j.identifier('theme');
  const themeConst = j.variableDeclaration('const', [
    j.variableDeclarator(
      themeIdentifier,
      j.callExpression(j.memberExpression(themeManagerIdentifier, j.identifier('getTheme')), []),
    ),
  ]);

  const stylesIdentifiers = Array.from(stylesMap.keys());
  const dynamicStylesDeclarationIdentifiers: Identifier[] = [];
  tokenizedStylesMap.forEach((styles, identifier) => {
    const objectProperties: any[] = [];
    const dynamicStylesIdentifier = j.identifier(nameToDynamic(identifier.name));
    const themeArgumentIdentifier = j.identifier('t');

    const lessImportPath = stylesIdToFileMap.get(identifier)!;
    const jsStylesImportPath = `./${getFileNameFromPath(lessImportPath)}.styles`;
    const jsStylesImportDeclaration = j.importDeclaration(
      [j.importDefaultSpecifier(dynamicStylesIdentifier)],
      j.literal(jsStylesImportPath),
    );
    importDeclarations = root.find(j.ImportDeclaration);
    importDeclarations.at(importDeclarations.length - 1).insertAfter(jsStylesImportDeclaration);

    styles.forEach((ruleset, className) => {
      const templateLiteralQuasis: any[] = [];
      const templateLiteralExpressions: any[] = [];

      const ownRules = Object.keys(ruleset.rules);
      const cascades = ruleset.cascade;
      let quasi = '';

      // fill own rules
      for (const ruleName of ownRules) {
        quasi = quasi + `${'\n\t\t\t'}${ruleName}: `;
        const ruleParts = ruleset.rules[ruleName];
        ruleParts.forEach(value => {
          if (value.startsWith(':functions')) {
            templateLiteralQuasis.push(
              j.templateElement(
                {
                  cooked: quasi,
                  raw: quasi,
                },
                false,
              ),
            );

            // @ts-ignore
            const [whole, functionName, args] = value.match(/^:functions\[([a-z0-9]+)]\(([a-z0-9:()#',%\s]+)\)$/i)!;
            const callColorExpression = j.callExpression(
              j.memberExpression(j.identifier('cf'), j.identifier(functionName)),
              args.split(',').map(a => {
                const suspect = a.replace(/'/g, '').trim();
                if (suspect.startsWith(':variable')) {
                  const variableName = suspect.replace(':variable(', '').replace(')', '');
                  return j.memberExpression(themeArgumentIdentifier, j.identifier(variableName));
                }

                return j.literal(suspect);
              }),
            );

            templateLiteralExpressions.push(callColorExpression);
            quasi = '';
          } else if (value.startsWith(':variable')) {
            templateLiteralQuasis.push(
              j.templateElement(
                {
                  cooked: quasi,
                  raw: quasi,
                },
                false,
              ),
            );
            const variableName = value.replace(':variable(', '').replace(')', '');
            templateLiteralExpressions.push(j.memberExpression(themeArgumentIdentifier, j.identifier(variableName)));
            quasi = '';
          } else {
            quasi = quasi + value;
          }
        });
        quasi = quasi + ';';
      }

      if (ownRules.length > 0 && cascades.size > 0) {
        quasi = quasi + '\n';
      }

      // fill cascades
      cascades.forEach((cascadeRulesObject, cascadeNameParts) => {
        quasi = quasi + '\n\t\t\t';
        cascadeNameParts.forEach(cascadeNamePart => {
          if (cascadeNamePart.startsWith(':static')) {
            templateLiteralQuasis.push(
              j.templateElement(
                {
                  cooked: quasi,
                  raw: quasi,
                },
                false,
              ),
            );
            quasi = '';
            const variableName = cascadeNamePart.replace(':static(', '').replace(')', '');
            templateLiteralExpressions.push(j.memberExpression(identifier, j.identifier(variableName)));
          } else if (cascadeNamePart.startsWith(':dynamic')) {
            templateLiteralQuasis.push(
              j.templateElement(
                {
                  cooked: quasi,
                  raw: quasi,
                },
                false,
              ),
            );
            quasi = '';
            const variableName = cascadeNamePart.replace(':dynamic(', '').replace(')', '');
            templateLiteralExpressions.push(
              j.callExpression(j.memberExpression(dynamicStylesIdentifier, j.identifier(variableName)), [
                themeArgumentIdentifier,
              ]),
            );
          } else if (cascadeNamePart.startsWith(':global')) {
            const globalSelector = cascadeNamePart.replace(':global(', '').replace(')', '');
            quasi = quasi + globalSelector;
          } else {
            quasi = quasi + cascadeNamePart;
          }
        });

        quasi = quasi + ' {';

        const cascadeRules = Object.keys(cascadeRulesObject);
        for (let i = 0; i < cascadeRules.length; i++) {
          const ruleName = cascadeRules[i];
          quasi = quasi + `${'\n\t\t\t\t'}${ruleName}: `;
          const ruleParts = cascadeRulesObject[ruleName];
          ruleParts.forEach(value => {
            if (value.startsWith(':functions')) {
              templateLiteralQuasis.push(
                j.templateElement(
                  {
                    cooked: quasi,
                    raw: quasi,
                  },
                  false,
                ),
              );

              // @ts-ignore
              const [whole, functionName, args] = value.match(/^:functions\[([a-z0-9]+)]\(([a-z0-9:()#',%\s]+)\)$/i)!;
              const callColorExpression = j.callExpression(
                j.memberExpression(j.identifier('cf'), j.identifier(functionName)),
                args.split(',').map(a => {
                  const suspect = a.replace(/'/g, '').trim();
                  if (suspect.startsWith(':variable')) {
                    const variableName = suspect.replace(':variable(', '').replace(')', '');
                    return j.memberExpression(themeArgumentIdentifier, j.identifier(variableName));
                  }

                  return j.literal(suspect);
                }),
              );
              templateLiteralExpressions.push(callColorExpression);
              quasi = '';
            } else if (value.startsWith(':variable')) {
              templateLiteralQuasis.push(
                j.templateElement(
                  {
                    cooked: quasi,
                    raw: quasi,
                  },
                  false,
                ),
              );
              const variableName = value.replace(':variable(', '').replace(')', '');
              templateLiteralExpressions.push(j.memberExpression(themeArgumentIdentifier, j.identifier(variableName)));
              quasi = '';
            } else {
              quasi = quasi + value;
            }
          });

          quasi = quasi + ';';

          if (i === cascadeRules.length - 1) {
            quasi = quasi + '\n\t\t\t}';
          }
        }
      });

      templateLiteralQuasis.push(
        j.templateElement(
          {
            cooked: `${quasi}\n\t\t`,
            raw: `${quasi}\n\t\t`,
          },
          true,
        ),
      );

      const themeArgumentAnnotatedIdentifier = j.identifier('t');
      themeArgumentAnnotatedIdentifier.typeAnnotation = j.tsTypeAnnotation(j.tsTypeReference(themeTypeIdentifier));

      const property = j.property(
        'init',
        j.identifier(className),
        j.functionExpression(
          null,
          [themeArgumentAnnotatedIdentifier],
          j.blockStatement([
            j.returnStatement(
              j.taggedTemplateExpression(
                j.identifier('css'),
                j.templateLiteral(templateLiteralQuasis, templateLiteralExpressions),
              ),
            ),
          ]),
        ),
      );
      property.method = true;
      objectProperties.push(property);
    });

    const objectExpression = j.objectExpression(objectProperties);
    dynamicStylesDeclarationIdentifiers.push(dynamicStylesIdentifier);
    const dynamicStylesConst = j.variableDeclaration('const', [
      j.variableDeclarator(dynamicStylesIdentifier, objectExpression),
    ]);

    const dynamicsStylesSource = j(dynamicStylesConst);
    const jsStylesFullPath = path.resolve(path.dirname(fileInfo.path), `${jsStylesImportPath}.ts`);

    // NOTE: we always write as it's a separate file
    fs.writeFileSync(jsStylesFullPath, dynamicsStylesSource.toSource(TO_SOURCE_OPTIONS), { encoding: 'utf8' });
    processJsStylesFile(j, jsStylesFullPath, identifier, lessImportPath);
  });

  let positionsToInsert: any = root.find(
    j.VariableDeclaration,
    node =>
      node.declarations &&
      (node.declarations[0].id === themeIdentifier || stylesIdentifiers.includes(node.declarations[0].id)),
  );

  if (positionsToInsert.length === 0) {
    positionsToInsert = root.find(j.ImportDeclaration);
  }

  positionsToInsert.at(positionsToInsert.length - 1).insertAfter(themeConst);

  stylesIdentifiers.forEach(styleIdentifier => {
    const dynamicCounterpart = tokenizedStylesMap.get(styleIdentifier)!;
    // const propertyNames = Array.from(dynamicCounterpart.keys()).map(k => k.replace('.', ''));
    root
      .find(j.MemberExpression, {
        object: {
          type: 'Identifier',
          name: styleIdentifier.name,
        },
      })
      .filter(node => {
        // NOTE: we have to skip 'isOneOfProperties' check to handle styles[foo] case
        // It's assumed, that ([)object: Identifier).name check is sufficient. Name can't collide with other variables,
        // because of the no-shadowed-var rule.
        // const isOneOfProperties = node.value && node.value.property && propertyNames.includes((node.value.property as Identifier).name);
        return isNotWithinDynamicStyles(node, dynamicStylesDeclarationIdentifiers);
      })
      .forEach(val => {
        let className = '';
        if (val.value.property.type === 'Identifier') {
          className = (val.value.property as Identifier).name;
        } else if (val.value.property.type === 'StringLiteral') {
          className = (val.value.property as StringLiteral).value;
        } else {
          // a special case of styles[foo], replace with cx
          if (!emotionCxImportIdentifier) {
            // we didn't import cx from emotion
            emotionCxImportIdentifier = j.identifier('cx');
            if (emotionImportStatement) {
              emotionImportStatement.specifiers.push(j.importSpecifier(emotionCxImportIdentifier));
            } else {
              emotionImportStatement = j.importDeclaration(
                [j.importSpecifier(j.identifier('cx'), emotionCxImportIdentifier)],
                j.literal('emotion'),
              );
              importDeclarations = root.find(j.ImportDeclaration);
              importDeclarations.at(importDeclarations.length - 1).insertAfter(emotionImportStatement);
            }
          }

          console.warn(
            `Dynamic invocation encountered: ${styleIdentifier.name}[${j(val.value.property).toSource(
              TO_SOURCE_OPTIONS,
            )}]. Consider revising.`,
          );

          const superDynamicStyles = j.memberExpression(
            j.identifier(nameToDynamic(styleIdentifier.name)),
            val.value.property,
          );
          superDynamicStyles.computed = true;

          const cxExpression = j.callExpression(emotionCxImportIdentifier, [
            val.value,
            j.logicalExpression('&&', superDynamicStyles, j.callExpression(superDynamicStyles, [themeIdentifier])),
          ]);

          val.replace(cxExpression);

          return;
        }

        if (!className) {
          throw new Error(`Could not extract class name`);
        }
        const dynamicRuleset = dynamicCounterpart.get(className);

        if (!dynamicRuleset) {
          // it's a static class
          return;
        }

        // console.log('[extract-dynamic-classes.ts]', '', val.parent.value.type, className, dynamicRuleset.isPartial);
        // console.count(`${dynamicRuleset.isPartial}`);
        if (dynamicRuleset.isPartial) {
          // hard case: we have to properly place dynamic rule alongside with the static one
          const parentNode = val.parent.value;
          switch (parentNode.type) {
            case 'ObjectProperty': {
              if (parentNode.key === val.value) {
                // it's used as a computed key, most probably inside classnames or simple classes object
                const holdingObject = val.parent.parent.value;
                if (!holdingObject) {
                  throw new Error('Could not find holding object, something is terribly wrong');
                }

                const indexOfProperty = holdingObject.properties.indexOf(parentNode);
                const property = j.property(
                  'init',
                  j.callExpression(
                    j.memberExpression(j.identifier(nameToDynamic(styleIdentifier.name)), j.identifier(className)),
                    [themeIdentifier],
                  ),
                  parentNode.value,
                );
                property.computed = true;
                holdingObject.properties.splice(indexOfProperty + 1, 0, property);
              } else if (parentNode.value === val.value) {
                // it's used as a value inside things like SIZE_CLASS_NAMES

                if (!emotionCxImportIdentifier) {
                  // we didn't import cx from emotion
                  emotionCxImportIdentifier = j.identifier('cx');
                  if (emotionImportStatement) {
                    emotionImportStatement.specifiers.push(j.importSpecifier(emotionCxImportIdentifier));
                  } else {
                    emotionImportStatement = j.importDeclaration(
                      [j.importSpecifier(j.identifier('cx'), emotionCxImportIdentifier)],
                      j.literal('emotion'),
                    );
                    importDeclarations = root.find(j.ImportDeclaration);
                    importDeclarations.at(importDeclarations.length - 1).insertAfter(emotionImportStatement);
                  }
                }

                const cxExpression = j.callExpression(emotionCxImportIdentifier, [
                  val.value,
                  j.callExpression(
                    j.memberExpression(j.identifier(nameToDynamic(styleIdentifier.name)), j.identifier(className)),
                    [themeIdentifier],
                  ),
                ]);
                val.replace(cxExpression);
              } else {
                // it's magic
                throw new Error(`Partial class name is used as ObjectProperty in unknown manner, please implement`);
              }

              break;
            }
            case 'LogicalExpression':
            case 'ConditionalExpression': {
              if (!emotionCxImportIdentifier) {
                // we didn't import cx from emotion
                emotionCxImportIdentifier = j.identifier('cx');
                if (emotionImportStatement) {
                  emotionImportStatement.specifiers.push(j.importSpecifier(emotionCxImportIdentifier));
                } else {
                  emotionImportStatement = j.importDeclaration(
                    [j.importSpecifier(j.identifier('cx'), emotionCxImportIdentifier)],
                    j.literal('emotion'),
                  );
                  importDeclarations = root.find(j.ImportDeclaration);
                  importDeclarations.at(importDeclarations.length - 1).insertAfter(emotionImportStatement);
                }
              }

              const cxExpression = j.callExpression(emotionCxImportIdentifier, [
                val.value,
                j.callExpression(
                  j.memberExpression(j.identifier(nameToDynamic(styleIdentifier.name)), j.identifier(className)),
                  [themeIdentifier],
                ),
              ]);

              val.replace(cxExpression);
              break;
            }
            case 'JSXExpressionContainer': {
              const holdingAttr = val.parent.parent.value;
              if (holdingAttr.name.name !== 'className') {
                throw new Error(`Partial class name is used in attribute ${holdingAttr.name.name}, please implement`);
              } else {
                if (!emotionCxImportIdentifier) {
                  // we didn't import cx from emotion
                  emotionCxImportIdentifier = j.identifier('cx');
                  if (emotionImportStatement) {
                    emotionImportStatement.specifiers.push(j.importSpecifier(emotionCxImportIdentifier));
                  } else {
                    emotionImportStatement = j.importDeclaration(
                      [j.importSpecifier(j.identifier('cx'), emotionCxImportIdentifier)],
                      j.literal('emotion'),
                    );
                    importDeclarations = root.find(j.ImportDeclaration);
                    importDeclarations.at(importDeclarations.length - 1).insertAfter(emotionImportStatement);
                  }
                }

                const cxExpression = j.callExpression(emotionCxImportIdentifier, [
                  val.value,
                  j.callExpression(
                    j.memberExpression(j.identifier(nameToDynamic(styleIdentifier.name)), j.identifier(className)),
                    [themeIdentifier],
                  ),
                ]);

                val.replace(cxExpression);
              }

              break;
            }
            case 'CallExpression': {
              if (emotionCxImportIdentifier && parentNode.callee.name === emotionCxImportIdentifier.name) {
                const indexOfArg = parentNode.arguments.indexOf(val.value);
                parentNode.arguments.splice(
                  indexOfArg + 1,
                  0,
                  j.callExpression(
                    j.memberExpression(j.identifier(nameToDynamic(styleIdentifier.name)), j.identifier(className)),
                    [themeIdentifier],
                  ),
                );
              } else {
                throw new Error(`CallExpression for partial ruleset is not within classnames call, please implement`);
              }
              break;
            }
            case 'VariableDeclarator': {
              if (!emotionCxImportIdentifier) {
                // we didn't import cx from emotion
                emotionCxImportIdentifier = j.identifier('cx');
                if (emotionImportStatement) {
                  emotionImportStatement.specifiers.push(j.importSpecifier(emotionCxImportIdentifier));
                } else {
                  emotionImportStatement = j.importDeclaration(
                    [j.importSpecifier(j.identifier('cx'), emotionCxImportIdentifier)],
                    j.literal('emotion'),
                  );
                  importDeclarations = root.find(j.ImportDeclaration);
                  importDeclarations.at(importDeclarations.length - 1).insertAfter(emotionImportStatement);
                }
              }
              const cxExpression = j.callExpression(emotionCxImportIdentifier, [
                val.value,
                j.callExpression(
                  j.memberExpression(j.identifier(nameToDynamic(styleIdentifier.name)), j.identifier(className)),
                  [themeIdentifier],
                ),
              ]);
              val.replace(cxExpression);
              break;
            }
            default: {
              throw new Error(
                `New case for partial ruleset ${styleIdentifier.name}.${className}: ${
                  parentNode.type
                }, please implement`,
              );
            }
          }
        } else {
          // easy case - just replace; respect computed
          const memberExpression = j.memberExpression(
            j.identifier(nameToDynamic(styleIdentifier.name)),
            j.identifier(className),
          );
          memberExpression.computed = val.value.computed;
          val.replace(j.callExpression(memberExpression, [themeIdentifier]));
        }
      });

    const lessFilePath = path.resolve(path.dirname(fileInfo.path), stylesIdToFileMap.get(styleIdentifier)!);
    const rulesToRemoveArr = Array.from(new Set(rulesToRemove.map(r => `${dasherizeVariables(r.rule)}`)));
    if (doWrite) {
      fs.writeFileSync(`${lessFilePath}.removals.txt`, rulesToRemoveArr.join('\n'), { encoding: 'utf8' });
    }

    removeVariableRulesFromLessFile(lessFilePath, rulesToRemoveArr, doWrite);
  });

  const result = root.toSource(TO_SOURCE_OPTIONS);
  // console.log('[extract-dynamic-classes.ts]', 'extractDynamicClasses', result);
  return result;
}

function removeVariableRulesFromLessFile(lessFilePath: string, rulesToRemoveArr: string[], doWrite: boolean) {
  let lessFileSource = fs.readFileSync(lessFilePath, {
    encoding: 'utf8',
  });

  rulesToRemoveArr.forEach(rule => {
    rule = rule.trim();
    if (lessFileSource.includes(rule)) {
      const ruleRegexp = new RegExp(rule, 'g');
      lessFileSource = lessFileSource.replace(ruleRegexp, '');
    }
  });
  if (doWrite) {
    fs.writeFileSync(lessFilePath, lessFileSource, { encoding: 'utf8' });
  }
}

function isNotWithinDynamicStyles(nodePath: NodePath<any>, targets: any[]) {
  while (nodePath.parent) {
    const parentValue = nodePath.parent.value;
    if (parentValue && parentValue.type === 'VariableDeclarator' && targets.includes(parentValue.id)) {
      return false;
    }
    nodePath = nodePath.parent;
  }
  return true;
}

function nameToDynamic(name: string) {
  return `js${name.charAt(0).toUpperCase()}${name.substr(1)}`;
}

function processJsStylesFile(j: JSCodeshift, filePath: string, stylesIdentifier: Identifier, lessImportPath: string) {
  const dynamicStylesSource = j(fs.readFileSync(filePath, { encoding: 'utf8' }));
  const variableDeclaration = dynamicStylesSource.find(j.VariableDeclaration).at(0);
  const exportDeclaration = j.exportDefaultDeclaration(j.identifier(nameToDynamic(stylesIdentifier.name)));

  const themeTypeIdentifier = j.identifier('ITheme');
  const themeManagerImportDeclaration = j.importDeclaration(
    [j.importSpecifier(themeTypeIdentifier)],
    j.literal(themeManagerImportPath),
  );

  const colorFunctionsIdentifier = j.identifier('cf');
  const colorFunctionsImportDeclaration = j.importDeclaration(
    [j.importDefaultSpecifier(colorFunctionsIdentifier)],
    j.literal(colorFunctionsImportPath),
  );

  const cssEmotionImportDeclaration = j.importDeclaration(
    [j.importSpecifier(j.identifier('css'))],
    j.literal('emotion'),
  );
  const lessImportDeclaration = j.importDeclaration(
    [j.importDefaultSpecifier(stylesIdentifier)],
    j.literal(lessImportPath),
  );

  variableDeclaration
    .insertBefore(cssEmotionImportDeclaration)
    .insertBefore(colorFunctionsImportDeclaration)
    .insertAfter(exportDeclaration);

  const importDeclarations = dynamicStylesSource.find(j.ImportDeclaration);
  importDeclarations
    .at(importDeclarations.length - 1)
    .insertAfter(themeManagerImportDeclaration)
    .insertAfter(lessImportDeclaration);

  removeUnusedImports(j, dynamicStylesSource);

  fs.writeFileSync(filePath, dynamicStylesSource.toSource(TO_SOURCE_OPTIONS), { encoding: 'utf8' });
}

function getFileNameFromPath(fileInfoPath: string) {
  return path.basename(fileInfoPath).replace(path.extname(fileInfoPath), '');
}

function dasherizeVariables(str: string) {
  const STRING_DASHERIZE_REGEXP = /[ _]/g;
  const STRING_DECAMELIZE_REGEXP = /([a-z\d])([A-Z])/g;
  const variables = str.match(/@[a-zA-Z]*/gm) || [];

  variables.forEach(variable => {
    const dasherizedVariable = variable
      .replace(STRING_DECAMELIZE_REGEXP, '$1_$2')
      .toLowerCase()
      .replace(STRING_DASHERIZE_REGEXP, '-');
    str = str.replace(variable, dasherizedVariable);
  });

  return str;
}

function removeUnusedImports(j: JSCodeshift, root: Collection<any>) {
  const removeIfUnused = (
    importSpecifier: NodePath<ImportSpecifier | ImportDefaultSpecifier>,
    importDeclaration: NodePath<ImportDeclaration, ImportDeclaration>,
  ) => {
    const varName = importSpecifier.value.local
      ? importSpecifier.value.local.name
      : importSpecifier.value.imported.name;

    const isUsedInScopes = () => {
      return (
        j(importDeclaration)
          .closestScope()
          .find(j.Identifier, { name: varName })
          .filter(p => {
            if (p.parent && p.parent.value === importSpecifier.value) {
              return false;
            }
            if (p.parentPath.value.type === 'Property' && p.name === 'key') {
              return false;
            }
            return p.name !== 'property';
          })
          .size() > 0
      );
    };

    if (!isUsedInScopes()) {
      j(importSpecifier).remove();
      return true;
    }
    return false;
  };

  const removeUnusedDefaultImport = (importDeclaration: NodePath<ImportDeclaration, ImportDeclaration>) => {
    return (
      j(importDeclaration)
        .find(j.ImportDefaultSpecifier)
        .filter(s => removeIfUnused(s, importDeclaration))
        .size() > 0
    );
  };

  const removeUnusedNonDefaultImports = (importDeclaration: NodePath<ImportDeclaration, ImportDeclaration>) => {
    return (
      j(importDeclaration)
        .find(j.ImportSpecifier)
        .filter(s => removeIfUnused(s, importDeclaration))
        .size() > 0
    );
  };

  // Return True if something was transformed.
  const processImportDeclaration = (importDeclaration: NodePath<ImportDeclaration, ImportDeclaration>) => {
    // e.g. import 'styles.css'; // please Don't Touch these imports!
    if (importDeclaration.value.specifiers.length === 0) {
      return false;
    }

    const hadUnusedDefaultImport = removeUnusedDefaultImport(importDeclaration);
    const hadUnusedNonDefaultImports = removeUnusedNonDefaultImports(importDeclaration);

    if (importDeclaration.value.specifiers.length === 0) {
      j(importDeclaration).remove();
      return true;
    }
    return hadUnusedDefaultImport || hadUnusedNonDefaultImports;
  };

  root.find(j.ImportDeclaration).filter(processImportDeclaration);
}

module.exports = extractDynamicClasses;
