import { API, ASTPath, ImportSpecifier, ExportSpecifier, ImportDeclaration, ExportNamedDeclaration } from 'jscodeshift';
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
  if (path.match(/lib\/Theming\/themes\/DefaultTheme/)) {
    return 'DEFAULT_THEME';
  }
  if (path.match(/lib\/Theming\/themes\/FlatTheme/)) {
    return 'FLAT_THEME';
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
    case !!path.match(/Fias/): {
      return !importedName.startsWith('Fias') ? 'Fias' + importedName : importedName;
    }
    case !!path.match(/Input/) && importedName === 'IconType': {
      return 'InputIconType';
    }
    case !!path.match(/lib\/Upgrades/): {
      return 'Upgrade';
    }
    case importedName === 'Icon20': {
      return 'Icon';
    }
    case importedName === 'listenFocusOutside': {
      return 'listen';
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
    j.exportNamedDeclaration(null, [exportSpecifier.node], j.stringLiteral(source)),
  );
};

export const moveSpecifierToSeparateDeclaration: (
  api: API,
  specifier: ASTPath<ExportSpecifier | ImportSpecifier>,
  declaration: ExportNamedDeclaration | ImportDeclaration,
) => void = (api, specifier, declaration) => {
  const j = api.jscodeshift;
  const originDeclaration = specifier.parent;
  originDeclaration.insertBefore(declaration);
  j(specifier).remove();
  if (!originDeclaration.value.specifiers.length) {
    j(originDeclaration).remove();
  }
};

export const dedupe: (collection: Collection<any>) => void = (collection): void => {
  const map: { [key: string]: ASTPath<any>[] } = {};

  collection.forEach((declaration: any) => {
    const source = declaration.value.source.value;
    if (typeof source === 'string' && !isModuleRemoved(source)) {
      const array = map[source];
      if (!array) {
        map[source] = [declaration];
      } else {
        array.push(declaration);
      }
    }
  });

  const omit: any = {};

  collection
    .filter(i => {
      const source = i.node.source.value;
      return source && map[source] && map[source].length > 1;
    })
    .replaceWith(p => {
      const source = p.node.source!.value as string;

      if (p.node.specifiers[0].type === 'ImportNamespaceSpecifier') {
        return p.node;
      }

      if (omit[source]) {
        return '';
      }

      const specifiers = map[source].reduce((acc: any, v) => {
        return [...acc, ...v.node.specifiers.filter((i: any) => i.type !== 'ImportNamespaceSpecifier')];
      }, []);

      p.node.specifiers = specifiers;

      omit[source] = true;

      return p.node;
    });
};

export const deduplicateImports = (api: API, collection: Collection<any>, source: RegExp | string): boolean => {
  const j = api.jscodeshift;
  const suspects = collection.find(j.ImportDeclaration, node => node.source.value.match(source));
  if (suspects.length) {
    dedupe(suspects);
    return true;
  }
  return false;
};

export const deduplicateExports = (api: API, collection: Collection<any>, source: RegExp | string): boolean => {
  const j = api.jscodeshift;
  const suspects = collection.find(j.ExportNamedDeclaration, node => node.source && node.source.value.match(source));
  if (suspects.length) {
    dedupe(suspects);
    return true;
  }
  return false;
};

export const isModuleRemoved = (path: string, report?: API['report']) => {
  const removedModules = [
    'components/ComboBoxOld',
    'components/DatePickerOld',
    'components/Kladr',
    'lib/pluralize',
    'lib/Colors',
    'lib/dom/getComputedStyle',
    'components/internal/cross',
    /\.less$/,
  ];
  if (removedModules.some(removedPath => path.match(removedPath))) {
    if (report) {
      report(
        `Module "${path}" was completly removed from the "@skbkontur/react-ui" package. Please, consider replacing it.`,
      );
    }
    return true;
  }
  return false;
};

export const isReactUISource = (source: string, alias: string) => {
  return source.match(alias + '(\\/\\w*)*$');
};
