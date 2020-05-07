const fs = require('fs');
const path = require('path');

const outputFileSync = require('output-file-sync');
const readdir = require('fs-readdir-recursive');
const chalk = require('chalk');
const babel = require('@babel/core');

const isCommonJS = process.env.BABEL_ENV === 'cjs';

const FoldersToTransform = ['components', 'internal', 'lib', 'typings'];
const IgnoreTemplates = [/__tests__/, /__mocks__/, /\.stories.tsx?$/];
const RootDir = path.resolve(process.cwd(), 'build');
const OutDir = RootDir + (isCommonJS ? '/cjs' : '');

const BABEL_EXTENSIONS = ['js', '.jsx', '.ts', '.tsx'];

build();

function build() {
  handleFile(path.resolve(process.cwd(), 'index.ts'), 'index.ts');
  FoldersToTransform.forEach(dirName => {
    const folderPath = path.resolve(process.cwd(), dirName);
    handle(folderPath, dirName);
  });

  if (OutDir === RootDir) {
    copyFilesForPublish();
  }
}

function transform(filename, code, opts) {
  const result = babel.transform(code, {
    cwd: process.cwd(),
    filename,
    sourceMaps: true,
    retainLines: true,
  });
  result.filename = filename;
  result.actual = code;
  return result;
}

function isTsDts(filename) {
  return /\.d\.ts$/.test(filename);
}

function compile(filename, opts) {
  const code = fs.readFileSync(filename, 'utf8');
  return transform(filename, code, opts);
}

function chmod(src, dest) {
  fs.chmodSync(dest, fs.statSync(src).mode);
}

function write(src, relative) {
  // remove extension and then append back on .js
  relative = relative.replace(/\.(\w*?)$/, '') + '.js';

  const dest = path.join(OutDir, relative);

  const data = compile(src, {
    sourceFileName: path.relative(dest + '/..', src),
    sourceMapTarget: path.basename(relative),
  });

  outputFileSync(dest, data.code);
  outputFileSync(dest + '.map', JSON.stringify(data.map));
  chmod(src, dest);
  logTransform(src, dest);
}

function logTransform(src, dest) {
  console.log(
    chalk`{grey ${'Transformed: '}}{cyan ${path.relative(process.cwd(), src)}}{grey ${' => '}}{green ${path.relative(
      process.cwd(),
      dest,
    )}}`,
  );
}

function shouldIgnore(loc) {
  return IgnoreTemplates.some(x => x.test(loc));
}

function canCompile(filename) {
  return BABEL_EXTENSIONS.includes(path.extname(filename));
}

function handleFile(src, filename) {
  if (shouldIgnore(src)) {
    return;
  }

  if (canCompile(filename) && !isTsDts(filename)) {
    write(src, filename);
  } else {
    const dest = path.join(OutDir, filename);
    outputFileSync(dest, fs.readFileSync(src));
    chmod(src, dest);
  }
}

function handle(filename, dirName) {
  if (!fs.existsSync(filename)) {
    return;
  }
  console.log(chalk`{grey Entering directory} {green ${filename}}`);
  const stat = fs.statSync(filename);

  if (stat.isDirectory()) {
    const dirname = path.join(filename);
    readdir(filename).forEach(filename => {
      const src = path.join(dirname, filename);
      handleFile(src, path.join(dirName, filename));
    });
  } else {
    handleFile(filename, filename);
  }
}

function copyFilesForPublish() {
  const files = ['package.json', 'README.md', 'CHANGELOG.md', 'LICENSE'];
  files.forEach(filename => {
    const src = path.join(process.cwd(), filename);
    const dest = path.join(OutDir, filename);
    fs.copyFileSync(src, dest)
  });
}
