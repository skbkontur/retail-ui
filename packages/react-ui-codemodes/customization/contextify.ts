/* tslint:disable:no-console */
import { API, FileInfo } from 'jscodeshift/src/core';
import { BlockStatement, ClassDeclaration, Identifier, ImportDeclaration } from 'ast-types/gen/nodes';
import { NodePath } from 'ast-types';
import * as path from 'path';

const THEME_PATH = path.join('..', 'retail-ui', 'lib', 'theming', 'Theme');
const THEME_CONSUMER_PATH = path.join('..', 'retail-ui', 'lib', 'theming', 'ThemeProvider');
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

function contextify(fileInfo: FileInfo, api: API) {
  const filePath = fileInfo.path;
  if (filePath.includes('__stories__') || filePath.includes('__tests__') || filePath.endsWith('ThemeEditor.tsx')) {
    return null;
  }

  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  let themeFactoryImport: ImportDeclaration | null = null;
  const themeFactoryImports = root.find(j.ImportDeclaration).filter(({ node }) => {
    return !!node && !!node.source && !!node.source.value && (node.source as any).value.endsWith('ThemeFactory');
  });
  if (themeFactoryImports.length === 1) {
    themeFactoryImport = themeFactoryImports.get().value;
  } else if (themeFactoryImports.length > 1) {
    throw new Error('More than one ThemeFactory import found');
  }

  if (!themeFactoryImport) {
    return null;
  }

  let themeManagerIdentifier: Identifier | null = null;
  const themeManagerSpecifier = themeFactoryImport.specifiers.find(s => s.type === 'ImportDefaultSpecifier');
  if (themeManagerSpecifier) {
    themeManagerIdentifier = themeManagerSpecifier.local as Identifier;
  }

  if (!themeManagerIdentifier) {
    return null;
  }

  const themeDeclarations = root.find(j.VariableDeclarator).filter(declaratorPath => {
    const init = declaratorPath.node.init;
    if (init && init.type === 'CallExpression') {
      const callee = init.callee;
      if (callee && callee.type === 'MemberExpression') {
        return callee.object.type === 'Identifier' && callee.object.name === themeManagerIdentifier!.name;
      }
    }
    return false;
  });

  if (!themeDeclarations.length) {
    return null;
  }

  const modifiedClasses = new Map<ClassDeclaration, boolean>();

  function patchClass(classDeclaration: ClassDeclaration | null, themeVariableName: string) {
    if (!classDeclaration) {
      console.error(`${filePath}: variable ${themeVariableName} is declared outside class declaration`);
      return;
    }

    if (modifiedClasses.get(classDeclaration)) {
      return;
    }

    const themeProperty = j.classProperty(
      j.identifier('theme'),
      null,
      j.tsTypeAnnotation(j.tsTypeReference(j.identifier('ITheme'))),
    );
    (themeProperty as any).definite = false;
    (themeProperty as any).accessibility = 'private';

    const renderBodyPath: NodePath<BlockStatement> = j(classDeclaration)
      .find(j.ClassMethod)
      .filter(
        node =>
          node.value.key &&
          ((node.value.key.type === 'StringLiteral' && node.value.key.value === 'render') ||
            (node.value.key.type === 'Identifier' && node.value.key.name === 'render')),
      )
      .get('body');

    if (!renderBodyPath) {
      console.error('Did not find .render() body');
      return;
    }
    const renderMainIdentifier = j.identifier('renderMain');
    const renderMainMethod = j.classMethod('method', renderMainIdentifier, [], renderBodyPath.value);

    renderMainMethod.accessibility = 'private';
    let insertThemePropAt = 0;
    let insertRenderMainAt = 0;
    classDeclaration.body.body.forEach((n: any, i) => {
      const isProperty = n.type === 'ClassProperty' && (!n.value || n.value.type !== 'ArrowFunctionExpression');
      if (isProperty && (n.static || n.accessibility === 'public')) {
        insertThemePropAt = i + 1;
      }

      const isClassicMethod = n.type === 'ClassMethod';
      const isPropertyLikeMethod = n.type === 'ClassProperty' && n.value && n.value.type === 'ArrowFunctionExpression';
      if ((isClassicMethod || isPropertyLikeMethod) && (n.static || n.accessibility === 'public')) {
        insertRenderMainAt = i + 1;
      }
    });

    classDeclaration.body.body.splice(insertThemePropAt, 0, themeProperty);
    classDeclaration.body.body.splice(insertRenderMainAt + 1, 0, renderMainMethod);

    const renderReturnStatement = j.template.expression([
      `<ThemeConsumer>
  {theme => {
    this.theme = theme;
    return this.renderMain();
  }}
</ThemeConsumer>`,
    ]);

    renderBodyPath.replace(j.blockStatement([j.returnStatement(renderReturnStatement)]));

    modifiedClasses.set(classDeclaration, true);
  }

  themeDeclarations.forEach(declarationPath => {
    const themeVariableName = (declarationPath.node.id as Identifier).name;
    if (declarationPath.scope.isGlobal) {
      // that sucks, need to find usages
      // but we believe in no-shadowed-variable rule!

      // find all other usages of this identifier
      root.find(j.Identifier, { name: themeVariableName }).forEach(identifierPath => {
        if (identifierPath.node !== declarationPath.node.id) {
          const classDeclaration = findClassNodePath(identifierPath);
          patchClass(classDeclaration, themeVariableName);

          identifierPath.replace(j.memberExpression(j.thisExpression(), j.identifier('theme')));
        }
      });
      declarationPath.prune();
    } else {
      // for simplicity we assume it's somewhere inside class methods
      const classDeclaration = findClassNodePath(declarationPath);
      patchClass(classDeclaration, themeVariableName);

      declarationPath.replace(
        j.variableDeclarator(
          j.identifier(themeVariableName),
          j.memberExpression(j.thisExpression(), j.identifier('theme')),
        ),
      );
    }
  });

  const themeImportPath = path.relative(path.dirname(filePath), THEME_PATH).replace(/\\/g, '/');
  const themeImport = j.importDeclaration([j.importSpecifier(j.identifier('ITheme'))], j.literal(themeImportPath));
  const consumerImportPath = path.relative(path.dirname(filePath), THEME_CONSUMER_PATH).replace(/\\/g, '/');
  const consumerImport = j.importDeclaration(
    [j.importSpecifier(j.identifier('ThemeConsumer'))],
    j.literal(consumerImportPath),
  );

  themeFactoryImports.insertAfter(themeImport);
  themeFactoryImports.insertAfter(consumerImport);
  themeFactoryImports.remove();

  // NOTE: this hack is here because themeProperty.definite=true does not work
  return root.toSource(TO_SOURCE_OPTIONS).replace('private theme: ITheme;', 'private theme!: ITheme;');
}

function findClassNodePath(nodePath: NodePath): ClassDeclaration | null {
  let result: NodePath | null = null;
  while (nodePath.parent && !result) {
    if (nodePath.value.type === 'ClassDeclaration') {
      result = nodePath;
    }

    nodePath = nodePath.parent;
  }

  return result ? result.node : result;
}

module.exports = contextify;
