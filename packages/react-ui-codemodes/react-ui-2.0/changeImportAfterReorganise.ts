/* eslint-disable import/no-default-export */
import { API, FileInfo } from 'jscodeshift';

const REGEX_REACT_UI_PATH = /@skbkontur\/react-ui\/components\/*/m;

const listOfChanges: any = {
  Autocomplete: '@skbkontur/react-ui',
  Button: '@skbkontur/react-ui',
  Calendar: '@skbkontur/react-ui/internal',
  Center: '@skbkontur/react-ui',
  Checkbox: '@skbkontur/react-ui',
  ComboBox: '@skbkontur/react-ui',
  CurrencyInput: '@skbkontur/react-ui',
  CurrencyLabel: '@skbkontur/react-ui',
  CustomComboBox: '@skbkontur/react-ui/internal',
  DateInput: '@skbkontur/react-ui',
  DatePicker: '@skbkontur/react-ui',
  DateSelect: '@skbkontur/react-ui/internal',
  Dropdown: '@skbkontur/react-ui',
  DropdownContainer: '@skbkontur/react-ui/internal',
  DropdownMenu: '@skbkontur/react-ui',
  Fias: '@skbkontur/react-ui',
  FiasSearch: '@skbkontur/react-ui',
  FocusTrap: '@skbkontur/react-ui/internal',
  FxInput: '@skbkontur/react-ui',
  Gapped: '@skbkontur/react-ui',
  Group: '@skbkontur/react-ui',
  HideBodyVerticalScroll: '@skbkontur/react-ui/internal',
  Hint: '@skbkontur/react-ui',
  Icon: '@skbkontur/react-ui/internal',
  IgnoreLayerClick: '@skbkontur/react-ui/internal',
  Input: '@skbkontur/react-ui',
  InputLikeText: '@skbkontur/react-ui/internal',
  InternalMenu: '@skbkontur/react-ui/internal',
  Kebab: '@skbkontur/react-ui',
  Link: '@skbkontur/react-ui',
  Loader: '@skbkontur/react-ui',
  LocaleProvider: '@skbkontur/react-ui',
  Logotype: '@skbkontur/react-ui',
  MaskedInput: '@skbkontur/react-ui/internal',
  Menu: '@skbkontur/react-ui/internal',
  MenuHeader: '@skbkontur/react-ui',
  MenuItem: '@skbkontur/react-ui',
  MenuSeparator: '@skbkontur/react-ui',
  Modal: '@skbkontur/react-ui',
  ModalStack: '@skbkontur/react-ui/internal',
  Paging: '@skbkontur/react-ui',
  PerformanceMetrics: '@skbkontur/react-ui/internal',
  Popup: '@skbkontur/react-ui/internal',
  PopupMenu: '@skbkontur/react-ui/internal',
  Radio: '@skbkontur/react-ui',
  RadioGroup: '@skbkontur/react-ui',
  RenderContainer: '@skbkontur/react-ui/internal',
  RenderLayer: '@skbkontur/react-ui/internal',
  ResizeDetector: '@skbkontur/react-ui/internal',
  ScrollContainer: '@skbkontur/react-ui',
  Select: '@skbkontur/react-ui',
  SidePage: '@skbkontur/react-ui',
  Spinner: '@skbkontur/react-ui',
  Sticky: '@skbkontur/react-ui',
  Switcher: '@skbkontur/react-ui',
  Tabs: '@skbkontur/react-ui',
  Textarea: '@skbkontur/react-ui',
  ThemeConsumer: '@skbkontur/react-ui/internal',
  ThemeProvider: '@skbkontur/react-ui/internal',
  ThemeShowcase: '@skbkontur/react-ui/internal',
  Toast: '@skbkontur/react-ui',
  Toggle: '@skbkontur/react-ui',
  Token: '@skbkontur/react-ui',
  TokenInput: '@skbkontur/react-ui',
  Tooltip: '@skbkontur/react-ui',
  TooltipMenu: '@skbkontur/react-ui',
  TopBar: '@skbkontur/react-ui',
  ZIndex: '@skbkontur/react-ui/internal',
};

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
    dep.value.specifiers.forEach((path: any) => {
      if (path.type === 'ImportSpecifier') {
        if (!path.local) return;
        const varName = path.local.name;
        if (listOfChanges[varName]) {
          localImports.push(
            j.importDeclaration([j.importSpecifier(path.local)], j.stringLiteral(listOfChanges[varName])),
          );
          j(dep).replaceWith(localImports);
        }
      }
      if (path.type === 'ImportDefaultSpecifier') {
        if (!path.local) return;
        const varName = path.local.name;
        if (listOfChanges[varName]) {
          localImports.push(
            j.importDeclaration([j.importSpecifier(path.local)], j.stringLiteral(listOfChanges[varName])),
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
          if (listOfChanges[pathVarName]) {
            path.local.name = `${pathVarName} as ${path.local.name}`;
            localImports.push(
              j.importDeclaration([j.importSpecifier(path.local)], j.stringLiteral(listOfChanges[pathVarName])),
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

export default function(fileInfo: FileInfo, api: API, options: any) {
  const result = options ? changeExport(fileInfo, api, options) : changeExport(fileInfo, api);
  return noDuplicateImports(result, api).source;
}
