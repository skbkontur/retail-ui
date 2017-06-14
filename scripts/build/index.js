// @flow
const outputFileSync = require('output-file-sync');
const readdir = require('fs-readdir-recursive');
const fs = require('fs');
const path = require('path');
const babel = require('babel-core');
const less = require('less');
const config = require('./config.js');

const FoldersToTransform = ['components', 'lib'];
const IgnoreTemplates = [/__tests__/, /\.stories.js$/];
const OutDir = path.resolve(process.cwd(), 'dist');

function transform(filename, code, opts) {
  const result = babel.transform(code, {
    filename,
    plugins: config.plugins,
    presets: config.presets
  });
  result.filename = filename;
  result.actual = code;
  return result;
}

function isLess(filename) {
  return /\.less$/.test(filename);
}

function compileLess(src, relative) {
  function handleError(error) {
    console.error(relative + ' can not be transpiled');
    console.error(error.message);
  }

  fs.readFile(src, 'utf8', (error, data) => {
    if (error) {
      handleError(error);
      return;
    }

    const dest = path.join(OutDir, relative).replace(/.less$/, '.css');

    less
      .render(data, {
        paths: [
          path.resolve(process.cwd(), 'components'),
          path.resolve(process.cwd(), 'web_modules')
        ],
        relativeUrls: true,
        filename: src
      })
      .then(output => {
        outputFileSync(dest, output.css);
        chmod(src, dest);
        console.log(src + ' -> ' + dest);
      }, handleError);
  });
}

function compile(filename, opts) {
  try {
    const code = fs.readFileSync(filename, 'utf8');
    return transform(filename, code, opts);
  } catch (err) {
    throw err;
  }
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
    sourceMapTarget: path.basename(relative)
  });

  outputFileSync(dest, data.code);
  chmod(src, dest);

  console.log(src + ' -> ' + dest);
}

function shouldIgnore(loc) {
  return IgnoreTemplates.some(x => x.test(loc)) || babel.util.shouldIgnore(loc);
}

function handleFile(src, filename) {
  if (shouldIgnore(src)) {
    return;
  }

  if (babel.util.canCompile(filename)) {
    write(src, filename);
  } else if (isLess(filename)) {
    compileLess(src, filename);
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
  console.log(filename);
  const stat = fs.statSync(filename);

  if (stat.isDirectory()) {
    const dirname = path.join(filename);
    readdir(filename).forEach(function(filename) {
      const src = path.join(dirname, filename);
      handleFile(src, path.join(dirName, filename));
    });
  } else {
    write(filename, filename);
  }
}

FoldersToTransform.forEach(dirName => {
  const folderPath = path.resolve(process.cwd(), dirName);
  handle(folderPath, dirName);
});
