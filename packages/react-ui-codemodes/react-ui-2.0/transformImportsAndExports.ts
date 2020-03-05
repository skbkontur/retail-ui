/* eslint-disable import/no-default-export */
import { API, FileInfo } from 'jscodeshift';
import { Collection } from 'jscodeshift/src/Collection';

import {
  getComponentNameFromPath,
  getActualImportName,
  deduplicateImports,
  moveSpecifierToSeparateImport,
  moveSpecifierToSeparateExport,
  deduplicateExports,
} from './helpers';

const transformDefaultImports = (api: API, collection: Collection<any>, path: string): Collection<any> => {
  const j = api.jscodeshift;
  return collection
    .find(j.ImportDeclaration, node => node.source.value.match(path))
    .find(j.ImportDefaultSpecifier)
    .forEach(importSpecifier => {
      const importDeclaration = importSpecifier.parent;
      const importSource = importDeclaration.node.source.value;
      const componentName = getComponentNameFromPath(importSource, path);
      if (componentName) {
        j(importSpecifier).replaceWith(j.importSpecifier(j.identifier(componentName), importSpecifier.value.local));
      }
    });
};

const transformNamedImports = (api: API, collection: Collection<any>, path: string): Collection<any> => {
  const j = api.jscodeshift;
  return collection
    .find(j.ImportDeclaration, node => node.source.value.match(path))
    .find(j.ImportSpecifier)
    .forEach(importSpecifier => {
      const importDeclaration = importSpecifier.parent;
      const importSource = importDeclaration.node.source.value;
      const importName = getActualImportName(importSource, importSpecifier.value.imported.name);
      j(importSpecifier).replaceWith(j.importSpecifier(j.identifier(importName), importSpecifier.value.local));
    });
};

const changeImportsSource = (api: API, collection: Collection<any>, path: string, value: string): void => {
  const j = api.jscodeshift;
  collection
    .find(j.ImportDeclaration, node => node.source.value.match(path))
    .replaceWith(importDeclaration => {
      importDeclaration.node.source.value = value;
      return importDeclaration.node;
    });
};

const transformReExports = (api: API, collection: Collection<any>, path: string, sourceValue: string): void => {
  const j = api.jscodeshift;

  collection
    .find(j.ExportAllDeclaration, node => node.source.value.match(path))
    .forEach(exportDeclaration => {
      const originSource = exportDeclaration.node.source.value as string;
      const componentName = getComponentNameFromPath(originSource, path);
      if (!componentName) {
        exportDeclaration.value.source = j.stringLiteral(sourceValue);
      } else {
        if (originSource.match(/Fias\/types/)) {
          exportDeclaration.value.source = j.stringLiteral(sourceValue + '/components/Fias/types');
        } else {
          exportDeclaration.value.source = j.stringLiteral(sourceValue + '/components/' + componentName);
        }
      }
    });

  collection
    .find(j.ExportNamedDeclaration, node => node.source.value.match(path))
    .forEach(exportDeclaration => {
      j(exportDeclaration)
        .find(j.ExportSpecifier)
        .forEach(exportSpecifier => {
          const componentName = getComponentNameFromPath(exportDeclaration.node.source!.value as string, path);
          const localName = exportSpecifier.node.local?.name;
          if (localName) {
            if (localName === 'default' && componentName) {
              j(exportSpecifier).replaceWith(
                j.exportSpecifier(j.identifier(componentName), exportSpecifier.value.exported),
              );
            } else {
              const exportDeclaration = exportSpecifier.parent;
              const importSource = exportDeclaration.node.source.value;
              const importName = getActualImportName(importSource, localName);
              j(exportSpecifier).replaceWith(
                j.exportSpecifier(j.identifier(importName), exportSpecifier.value.exported),
              );
            }
          }
        });
      exportDeclaration.value.source = j.stringLiteral(sourceValue);
    });
};

const transformInternals = (api: API, collection: Collection<any>, path: string, internalsPath: string): void => {
  const j = api.jscodeshift;
  const internals = [
    'Calendar',
    'CustomComboBox',
    'DateSelect',
    'DropdownContainer',
    'HideBodyVerticalScroll',
    'IgnoreLayerClick',
    'Menu',
    'Popup',
    'RenderContainer',
    'RenderLayer',
    'ZIndex',
    'FocusTrap',
    'InputLikeText',
    'InternalMenu',
    'MaskedInput',
    'PopupMenu',
    'ResizeDetector',
    'PerformanceMetrics',
    'ModalStack',
    'ThemeShowcase',
    'Icon',
  ];

  collection
    .find(j.ExportNamedDeclaration, node => node.source.value.match(path))
    .find(j.ExportSpecifier, node => internals.some(internal => node.local.name.startsWith(internal)))
    .forEach(importSpecifier => {
      moveSpecifierToSeparateExport(api, importSpecifier, internalsPath);
    });

  collection
    .find(j.ImportDeclaration, node => node.source.value.match(path))
    .find(j.ImportSpecifier, node => internals.some(internal => node.imported.name.startsWith(internal)))
    .forEach(importSpecifier => {
      moveSpecifierToSeparateImport(api, importSpecifier, internalsPath);
    });
};

interface TransformOptions {
  /**
   * Альтернативный путь до контролов, который может быть настроен в проекте
   * Например, "ui" вместо "retail-ui/components"
   */
  alias: string;
  /**
   * Объединять ли разные импорты из одинаковых источников в один общий
   */
  dedupe: boolean;
}

export default function transform(file: FileInfo, api: API, options: TransformOptions) {
  const DEFAULT_SOURCE = '@skbkontur/react-ui';
  const FINAL_SOURCE = '@skbkontur/react-ui';
  const INTERNAL_SOURCE = '@skbkontur/react-ui/internal';
  const { alias = DEFAULT_SOURCE, dedupe = true } = options;

  const j = api.jscodeshift;
  const result = j(file.source);

  transformDefaultImports(api, result, alias);
  transformNamedImports(api, result, alias);
  changeImportsSource(api, result, alias, FINAL_SOURCE);
  transformReExports(api, result, alias, FINAL_SOURCE);
  transformInternals(api, result, FINAL_SOURCE, INTERNAL_SOURCE);
  if (dedupe) {
    deduplicateImports(api, result, FINAL_SOURCE);
    deduplicateExports(api, result, FINAL_SOURCE);
  }

  return result.toSource();
}
