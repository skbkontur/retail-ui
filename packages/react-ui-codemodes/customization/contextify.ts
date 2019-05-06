/* tslint:disable:no-console */
import { API, FileInfo } from "jscodeshift/src/core";
import { ClassDeclaration, Identifier, ImportDeclaration } from "ast-types/gen/nodes";
import { NodePath } from "ast-types";
import * as path from "path";

const INJECT_THEME_PATH = path.join('..', 'retail-ui', 'lib', 'theming', 'ThemeDecorator');
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
  if (fileInfo.path.includes('__stories__') || fileInfo.path.includes('__tests__')) {
    return null;
  }

  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  let themeManagerImport: ImportDeclaration | null = null;
  const themeManagerImports = root.find(j.ImportDeclaration).filter(({ node }) => {
    return !!node && !!node.source && !!node.source.value && (node.source as any).value.endsWith('ThemeManager');
  });
  if (themeManagerImports.length === 1) {
    themeManagerImport = themeManagerImports.get().value;
  } else if (themeManagerImports.length > 1) {
    throw new Error('More than one ThemeManager import found');
  }

  if (!themeManagerImport) {
    return null;
  }

  let themeManagerIdentifier: Identifier | null = null;
  const themeManagerSpecifier = themeManagerImport.specifiers.find(s => s.type === 'ImportDefaultSpecifier');
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
      console.error(`${fileInfo.path}: variable ${themeVariableName} is declared outside class declaration`);
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
    (themeProperty as any).accessibility = 'public';

    const insertAt = classDeclaration.body.body.findIndex(
      n => (n.type === 'ClassProperty' || n.type === 'ClassMethod') && !n.static,
    );
    classDeclaration.body.body.splice(Math.max(0, insertAt), 0, themeProperty);

    const classDeclarationAny = classDeclaration as any;

    if (!classDeclarationAny.decorators) {
      classDeclarationAny.decorators = [];
    }

    classDeclarationAny.decorators.unshift(j.decorator(j.identifier('injectTheme')));

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

  themeManagerImport.specifiers.push(j.importSpecifier(j.identifier('ITheme')));
  themeManagerImport.specifiers = themeManagerImport.specifiers.filter(s => s.type !== 'ImportDefaultSpecifier');

  const decoratorImportPath = path.relative(path.dirname(fileInfo.path), INJECT_THEME_PATH).replace(/\\/g, '/');
  const decoratorImport = j.importDeclaration(
    [j.importSpecifier(j.identifier('injectTheme'))],
    j.literal(decoratorImportPath),
  );

  themeManagerImports.insertAfter(decoratorImport);

  // NOTE: this hack is here because themeProperty.definite=true does not work
  return root.toSource(TO_SOURCE_OPTIONS).replace('public theme: ITheme;', 'public theme!: ITheme;');
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
