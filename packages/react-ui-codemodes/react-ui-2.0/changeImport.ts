/* eslint-disable import/no-default-export */
import { API, FileInfo } from 'jscodeshift';

const listOfDeprecated = ['Fias', 'TopBar', 'Logotype', 'FiasSearch', 'Loader'];
const REGEX_REACT_UI_PATH = /@skbkontur\/react-ui\/components\/*/m;

const noDuplicateImports = (file: FileInfo, api: API) => {
  const j = api.jscodeshift;

  const imports = j(file.source)
    .find(j.ImportDeclaration)
    .nodes();

  const newImports = imports.reduce((acc: any, v: any) => {
    const source = v.source.value as string;
    if (acc[source]) {
      acc[source].push(v);

      return acc;
    }

    acc[source] = [v];

    return acc;
  }, {});

  const omit: any = [];

  const result = j(file.source)
    .find(j.ImportDeclaration)
    .filter(i => newImports[i.node.source.value as string].length > 1)
    .replaceWith(p => {
      const source = p.node.source.value;

      if (p.node.specifiers[0].type === 'ImportNamespaceSpecifier') {
        return p.node;
      }

      const imports = newImports[source as string].reduce((acc: any, v: any) => {
        return [...acc, ...v.specifiers.filter((i: any) => i.type !== 'ImportNamespaceSpecifier')];
      }, []);

      p.node.specifiers = imports;

      if (omit[source as string]) {
        return '';
      }

      omit[source as string] = true;

      return p.node;
    })
    .toSource();
  file.source = result;
  return file;
};

const changeExport = (fileInfo: FileInfo, api: API, options?: any) => {
  const j = api.jscodeshift;

  const imports = j(fileInfo.source).find(j.ImportDeclaration);

  const result = imports.forEach(dep => {
    const localImports: any = [];
    dep.value.specifiers.forEach(path => {
      if (path.type === 'ImportSpecifier') {
        if (!path.local) return;
        const varName = path.local.name;
        if (listOfDeprecated.includes(varName)) {
          localImports.push(
            j.importDeclaration([j.importSpecifier(path.local)], j.stringLiteral('@skbkontur/react-ui-addons')),
          );
          j(dep).replaceWith(localImports);
        }
      }
      if (path.type === 'ImportDefaultSpecifier') {
        if (!path.local) return;
        const varName = path.local.name;
        if (listOfDeprecated.includes(varName)) {
          localImports.push(
            j.importDeclaration([j.importSpecifier(path.local)], j.stringLiteral('@skbkontur/react-ui-addons')),
          );
          j(dep).replaceWith(localImports);
        } else {
          const regexReactUiComponents = options && options.regex ? options.regex : REGEX_REACT_UI_PATH;
          let pathVarName = dep.value.source.value
            ? dep.value.source.value?.toString().replace(regexReactUiComponents, '')
            : '';
          if (pathVarName.includes('/')) {
            pathVarName = pathVarName.slice(pathVarName.lastIndexOf('/') + 1);
          }
          if (listOfDeprecated.includes(pathVarName)) {
            path.local.name = `${pathVarName} as ${path.local.name}`;
            localImports.push(
              j.importDeclaration([j.importSpecifier(path.local)], j.stringLiteral('@skbkontur/react-ui-addons')),
            );
            j(dep).replaceWith(localImports);
          }
        }
      }
    });
  });

  fileInfo.source = result.toSource();
  return fileInfo;
};

export default function(fileInfo: FileInfo, api: API, options?: any) {
  const result = options ? changeExport(fileInfo, api, options) : changeExport(fileInfo, api);
  return noDuplicateImports(result, api).source;
}
