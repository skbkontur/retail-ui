const shellJs = require('shelljs');
const path = require('path');
const fs = require('fs');
const JS_CODE_SHIFT_PATH = path.resolve(__dirname, '../../..', 'node_modules/jscodeshift/bin/jscodeshift.js');
const COMPONENTS_DIR = path.resolve(__dirname, '../../', 'retail-ui/components');

const TRANSFORMED_COMPONENTS = {
  Autocomplete: true,
  Combobox: true,
  Fias: true,
  Group: true,
  Kebab: true,
  Loader: true,
  Logotype: true,
  Menu: true,
  Modal: true,
  Select: true,
  Spinner: true,
  Sticky: true,
  SidePage: true,
  Popup: true,
};
const directoryToFilesMap = buildDirectoryToFilesMap();

Object.keys(directoryToFilesMap).forEach(dirname => {
  const filesList = directoryToFilesMap[dirname];

  if (filesList.length > 0) {
    filesList.forEach(file => {
      const componentPath = path.resolve(COMPONENTS_DIR, `${dirname}/${file}`);

      processFile({
        path: componentPath,
        extension: 'tsx',
        parser: 'tsx',
      });
    });
  }
});

function processFile(props) {
  shellJs.exec(
    `node ${JS_CODE_SHIFT_PATH} ${props.path} --transform=extract-dynamic-classes.ts --extension=${
      props.extension
    } --parser=${props.parser}`,
  );
}

function buildDirectoryToFilesMap() {
  const componentsRootDirs = fs.readdirSync(COMPONENTS_DIR).filter(i => {
    const entityPath = fs.statSync(path.join(COMPONENTS_DIR, i));
    return !i.endsWith('__') && entityPath.isDirectory();
  });

  return componentsRootDirs.reduce((result, dir) => {
    // Stub for datePicker's components
    if (dir.toLowerCase().includes('calendar') || dir.toLowerCase().includes('date')) {
      return result;
    }
    // Skip transformed components
    if (TRANSFORMED_COMPONENTS[dir]) {
      return result;
    }
    const componentFiles = fs
      .readdirSync(path.join(COMPONENTS_DIR, dir))
      .filter(i => !i.startsWith('index') && i.endsWith('.tsx'));

    result[dir] = [];

    componentFiles.forEach(i => {
      const fileSource = fs.readFileSync(path.join(COMPONENTS_DIR, dir, i), { encoding: 'utf8' });

      if (fileSource.includes('.less') && result[dir]) {
        result[dir].push(i);
      }
      // TODO temporary stub
      if (fileSource.includes('.flat.less')) {
        delete result[dir];
      }
    });

    return result;
  }, {});
}
