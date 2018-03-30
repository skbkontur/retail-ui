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
const OutDir = path.resolve(process.cwd(), 'build');

build();

function build() {
  FoldersToTransform.forEach(dirName => {
    const folderPath = path.resolve(process.cwd(), dirName);
    handle(folderPath, dirName);
  });

  collectExports(path.join(process.cwd(), 'components'));

  generatePackageJson();

  copyNpmRc();
}

function transform(filename, code, opts) {
  const result = babel.transform(code, {
    filename,
    plugins: config.plugins,
    presets: config.presets,
    sourceMaps: true
  });
  result.filename = filename;
  result.actual = code;
  return result;
}

function isLess(filename) {
  return /\.less$/.test(filename);
}

function isTS(filename) {
  // Matched .ts and .tsx files
  // Do not matched .d.ts files
  return /^((?!d\.).)*(\.tsx?)$/.test(filename);
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
        logTransform(src, dest);
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
  outputFileSync(dest + '.map', JSON.stringify(data.map));
  chmod(src, dest);
  logTransform(src, dest);
}

function logTransform(src, dest) {
  clearConsole();
  console.log();
  console.log('Transformed:');
  console.log('From: ' + path.relative(process.cwd(), src));
  console.log('  To: ' + path.relative(process.cwd(), dest));
  console.log();
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
  } else if (isTS(filename)) {
    // do nothing
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

function collectExports(filename) {
  if (!fs.existsSync(filename)) {
    return;
  }
  console.log(filename);
  const stat = fs.statSync(filename);

  if (stat.isDirectory()) {
    fs.readdir(filename, handleExports(filename));
  } else {
  }
}

function handleExports(dirPath) {
  return (err, files) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    files
      .map(x => path.join(dirPath, x))
      .filter(x => fs.statSync(x).isDirectory())
      .forEach(dir => fs.readdir(dir, handleReexport(dir)));

    function handleReexport(dir) {
      return (err, files) => {
        if (err) {
          console.error(err);
          process.exit(1);
        }
        if (files.includes('index.js')) {
          handleJsReexport(dir);
        }
        if (files.includes('index.d.ts')) {
          handleTsReexport(dir);
        }
      };
    }

    function handleJsReexport(dir) {
      const name = dir.split(path.sep).slice(-1)[0];
      const source = `module.exports = require('./components/${name}');\n`;
      const outPath = path.join(OutDir, name + '.js');
      outputFileSync(outPath, source);
    }

    function handleTsReexport(dir) {
      const name = dir.split(path.sep).slice(-1)[0];
      const source = `\
export * from './components/${name}';
export { default } from './components/${name}';
`;
      const outPath = path.join(OutDir, name + '.d.ts');
      outputFileSync(outPath, source);
    }
  };
}

function copyNpmRc() {
  const npmrc = fs.readFileSync(path.join(process.cwd(), '.npmrc.enc'));
  outputFileSync(path.join(OutDir, '.npmrc.enc'), npmrc);
}

function generatePackageJson() {
  const packageJson = require('../../package.json');
  const result = {
    name: '@skbkontur/react-ui',
    version: packageJson.version,
    license: 'MIT',
    dependencies: Object.assign({}, packageJson.dependencies, {
      'babel-runtime': '^6.26.0'
    }),
    peerDependencies: packageJson.peerDependencies
  };
  const source = JSON.stringify(result, null, 2);
  outputFileSync(path.join(OutDir, 'package.json'), source);
}

function clearConsole() {
  process.stdout.write(
    process.platform === 'win32' ? '\x1Bc' : '\x1B[2J\x1B[3J\x1B[H'
  );
}
