/* eslint-disable import/no-default-export */
import { API, FileInfo } from 'jscodeshift';

import {
  deduplicateImports,
  moveSpecifierToSeparateImport,
  moveSpecifierToSeparateExport,
  deduplicateExports,
} from './helpers';

interface TransformOptions {
  /**
   * Имя компонента для модификации его импортов. Если не передано, то модифицируются все устаревшие компоненты
   */
  component: string;
  /**
   * Объединять ли разные импорты из одинаковых источников в один общий
   */
  dedupe: boolean;
}

export default function transform(file: FileInfo, api: API, options: TransformOptions) {
  const INITIAL_SOURCE = '@skbkontur/react-ui';
  const FINAL_SOURCE = '@skbkontur/react-ui-addons';
  const { component, dedupe = true } = options;
  const deprecatedComponents = ['Fias', 'FiasSearch', 'TopBar', 'Logotype', 'Loader', 'Spinner'];
  const componentsToTransform =
    component && deprecatedComponents.includes(component) ? [component] : deprecatedComponents;

  const j = api.jscodeshift;
  const result = j(file.source);
  let modified = false;

  result
    .find(j.ImportDeclaration, node => node.source.value.match(INITIAL_SOURCE))
    .find(j.ImportSpecifier, node => componentsToTransform.some(component => node.imported.name.startsWith(component)))
    .forEach(importSpecifier => {
      moveSpecifierToSeparateImport(api, importSpecifier, FINAL_SOURCE);
      modified = true;
    });

  result
    .find(j.ExportNamedDeclaration, node => node.source && node.source.value.match(INITIAL_SOURCE))
    .find(j.ExportSpecifier, node => componentsToTransform.some(component => node.local.name.startsWith(component)))
    .forEach(exportSpecifier => {
      moveSpecifierToSeparateExport(api, exportSpecifier, FINAL_SOURCE);
      modified = true;
    });

  const exportAllDeclarations = result.find(j.ExportAllDeclaration, node =>
    node.source.value.match(INITIAL_SOURCE + '/components/Fias/types'),
  );
  if (exportAllDeclarations.length) {
    exportAllDeclarations.replaceWith(exportDeclaration =>
      j.exportAllDeclaration(null, j.stringLiteral(FINAL_SOURCE + '/components/Fias/types')),
    );
    modified = true;
  }

  if (dedupe) {
    modified = deduplicateImports(api, result, FINAL_SOURCE) || modified;
    modified = deduplicateExports(api, result, FINAL_SOURCE) || modified;
  }

  return modified ? result.toSource() : null;
}
