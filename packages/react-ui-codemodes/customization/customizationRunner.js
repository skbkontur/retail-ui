const shellJs = require('shelljs');
const path = require('path');
const fs = require('fs');
const JS_CODE_SHIFT_PATH = path.resolve(__dirname, '../../..', 'node_modules/jscodeshift/bin/jscodeshift.js');
const COMPONENTS_DIR = path.resolve(__dirname, '../../', 'retail-ui/components');

const directoryToFilesMap = buildDirectoryToFilesMap();

Object.keys(directoryToFilesMap).forEach(dirname => {
  const filesList = directoryToFilesMap[dirname];

  if (filesList.length > 0) {
    filesList.forEach(file => {
      const componentPath = path.resolve(COMPONENTS_DIR, `${dirname}/${file}`);

      if (file.endsWith('.tsx')) {
        processFile({
          path: componentPath,
          extension: 'tsx',
          parser: 'tsx',
        });
      } else {
        processFile({
          path: componentPath,
          extension: 'js',
          parser: 'flow',
        });
      }
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
  const componentsDirs = fs
    .readdirSync(COMPONENTS_DIR)
    .filter(
      i =>
        !i.endsWith('.map') &&
        !i.endsWith('.flow') &&
        !i.endsWith('.ts') &&
        !i.endsWith('.less') &&
        !i.endsWith('.js') &&
        !i.startsWith('__'),
    );

  return componentsDirs.reduce((result, dir) => {
    const componentFiles = fs
      .readdirSync(path.join(COMPONENTS_DIR, dir))
      .filter(i => !i.startsWith('index') && !i.includes('adapter') && (i.endsWith('.js') || i.endsWith('.tsx')));

    result[dir] = [];

    componentFiles.forEach(i => {
      const fileSource = fs.readFileSync(path.join(COMPONENTS_DIR, dir, i), { encoding: 'utf8' });

      if (i.endsWith('.js') && fileSource.includes('"use strict";')) {
        // built file
        return;
      }
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
