const path = require('upath');
const fs = require('fs-extra');
const outputFileSync = require('output-file-sync');
const readdir = require('fs-readdir-recursive');
const chalk = require('chalk');
const babel = require('@babel/core');
const copyfiles = require('copyfiles');

const buildDir = path.join(__dirname, '../../../', 'build');
const cjsDir = path.join(buildDir, 'cjs');

copyTypingsToCjsDir();
handleESModules();

function copyTypingsToCjsDir() {
  copyfiles(
    [`${buildDir}/**/*.d.ts`, cjsDir],
    {
      exclude: `${cjsDir}/**/*`,
      up: buildDir.split(path.sep).length,
    },
    () => void 0,
  );
}

function handleESModules() {
  if (!fs.existsSync(buildDir)) {
    return;
  }
  readdir(buildDir).forEach((filename) => {
    const src = path.join(buildDir, filename);
    if (shouldHandle(src)) {
      const esm = src;
      const cjs = path.join(cjsDir, filename);
      handleModule(esm, cjs);
    }
  });
}

function shouldHandle(file) {
  const filesToIgnore = [cjsDir, path.join(buildDir, 'index.js')];
  return isJsFile(file) && !filesToIgnore.some((ignore) => file.startsWith(ignore));
}

function isJsFile(file) {
  return /\.js$/.test(file);
}

function isIndexFile(file) {
  return path.basename(file, '.js') === 'index';
}

function handleModule(esmPath, cjsPath) {
  log(`Handle`, esmPath, `green`);

  const typesPath = esmPath.replace('.js', '.d.ts');
  const movedModulePath = moveModule(esmPath);
  transformRelativePaths(movedModulePath);
  createPackageJson(movedModulePath, cjsPath, typesPath);

  if (isIndexFile(esmPath)) {
    createPackageJson(esmPath, cjsPath, typesPath);
  }
}

function moveModule(filepath) {
  const fileInfo = path.parse(filepath);
  const srcDir = fileInfo.dir;
  const destDir = path.join(srcDir, fileInfo.name);
  const extraFilesToMove = [fileInfo.name + '.js.map'];

  if (fs.existsSync(destDir)) {
    throw Error(`Can't move module. Directory "${path.relative(buildDir, destDir)}" already exists. See #2030.`);
  }

  const resultpath = path.join(destDir, fileInfo.base);

  log(`Move`, resultpath, `gray`);

  fs.moveSync(filepath, resultpath);
  extraFilesToMove.forEach((filename) => {
    const srcFile = path.join(srcDir, filename);
    const destFile = path.join(destDir, filename);
    if (fs.existsSync(srcFile)) {
      log(`Move`, destFile, `gray`);

      fs.moveSync(srcFile, destFile);
    }
  });

  return resultpath;
}

function createPackageJson(esmPath, cjsPath, typesPath) {
  const { dir, name } = path.parse(esmPath);
  const packageJson = {
    main: path.relative(dir, cjsPath),
    module: name,
    types: path.relative(dir, typesPath),
    sideEffects: false,
  };
  const packageJsonPath = path.join(dir, 'package.json');

  log(`Create`, packageJsonPath, `blue`);

  outputFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
}

function transformRelativePaths(filename) {
  if (fs.existsSync(filename)) {
    log(`Transform`, filename, `yellow`);

    const code = fs.readFileSync(filename, 'utf8');

    const result = babel.transform(code, {
      cwd: process.cwd(),
      filename,
      plugins: [path.join(__dirname, './babel-plugin-update-relative-paths-after-moving.js')],
    });

    outputFileSync(filename, result.code);
  }
}

function log(action, file, color) {
  console.log(chalk`${action} {${color} ${path.relative(buildDir, file)}}`);
}
