import { API, ASTPath, ImportSpecifier, ExportSpecifier, ImportDeclaration, ExportDeclaration } from 'jscodeshift';
import { Collection } from 'jscodeshift/src/Collection';

export const getComponentNameFromPath = (path: string, packagePath: string): string | null => {
  const name = path
    .replace(packagePath, '')
    .split('/')
    .filter(token => !['all', 'components', 'index'].includes(token))
    .pop();

  if (!name) {
    return null;
  }
  if (path.match(/TopBar\/(ButtonItem|Item|Organizations|User|Divider)/)) {
    return 'TopBar' + name;
  }
  if (name === '20px') {
    return 'Icon';
  }

  return name;
};

export const getActualImportName = (path: string, importedName: string): string => {
  switch (true) {
    case !!path.match(/Modal\/(ModalBody|ModalHeader|ModalFooter)/): {
      return !importedName.startsWith('Modal') ? 'Modal' + importedName : importedName;
    }
    case !!path.match(/TopBar\/(ButtonItem|Item|Organizations|OrganizationsState|User)/): {
      return !importedName.startsWith('TopBar') ? 'TopBar' + importedName : importedName;
    }
    case !!path.match(/Input/) && importedName === 'IconType': {
      return 'InputIconType';
    }
    case importedName === 'Icon20': {
      return 'Icon';
    }
    default:
      return importedName;
  }
};

export const moveSpecifierToSeparateImport: (
  api: API,
  importSpecifier: ASTPath<ImportSpecifier>,
  source: string,
) => void = (api, importSpecifier, source) => {
  const j = api.jscodeshift;
  moveSpecifierToSeparateDeclaration(
    api,
    importSpecifier,
    j.importDeclaration([importSpecifier.node], j.stringLiteral(source)),
  );
};

export const moveSpecifierToSeparateExport: (
  api: API,
  exportSpecifier: ASTPath<ExportSpecifier>,
  source: string,
) => void = (api, exportSpecifier, source) => {
  const j = api.jscodeshift;
  moveSpecifierToSeparateDeclaration(
    api,
    exportSpecifier,
    j.exportDeclaration(false, null, [exportSpecifier.node], j.stringLiteral(source)),
  );
};

export const moveSpecifierToSeparateDeclaration: (
  api: API,
  specifier: ASTPath<ExportSpecifier | ImportSpecifier>,
  declaration: ExportDeclaration | ImportDeclaration,
) => void = (api, specifier, declaration) => {
  const j = api.jscodeshift;
  const originDeclaration = specifier.parent;
  originDeclaration.insertBefore(declaration);
  j(specifier).remove();
  if (!originDeclaration.value.specifiers.length) {
    j(originDeclaration).remove();
  }
};

export const deduplicateImports = (api: API, collection: Collection<any>, source: RegExp | string): void => {
  const j = api.jscodeshift;

  const imports = collection.find(j.ImportDeclaration, node => node.source.value.match(source));

  const newImports = imports.nodes().reduce((acc: { [key: string]: ImportDeclaration[] }, v) => {
    const source = v.source.value as string;
    if (!acc[source]) {
      acc[source] = [];
    }
    acc[source].push(v);
    return acc;
  }, {});

  const omit: any = [];

  imports
    .filter(i => newImports[i.node.source.value as string].length > 1)
    .replaceWith(p => {
      const source = p.node.source.value as string;

      if (p.node.specifiers[0].type === 'ImportNamespaceSpecifier') {
        return p.node;
      }

      if (omit[source]) {
        return '';
      }

      const imports = newImports[source].reduce((acc: any, v) => {
        return [...acc, ...v.specifiers.filter(i => i.type !== 'ImportNamespaceSpecifier')];
      }, []);

      p.node.specifiers = imports;

      omit[source] = true;

      return p.node;
    });
};
