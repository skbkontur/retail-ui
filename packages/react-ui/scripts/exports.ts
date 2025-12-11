import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'fs';
import { join, dirname, relative } from 'path';
import { fileURLToPath } from 'url';

interface ExportsField {
  types: string;
  default: string;
}
type ExportsObject = Record<string, ExportsField | string>;

const defaultExports: ExportsObject = {
  '.': './index.js',
  './package.json': './package.json',

  // pattern exports for backward compatibility with 5.x
  './components/*': './components/*.js',
  './lib/*': './lib/*.js',
  './hooks/*': './hooks/*.js',
  './internal/*': './internal/*.js',
};

function handlePath(path: string): string {
  return './' + path.replace(/\\/g, '/');
}

// function pathToExportField(path: string): ExportsField {
//   return {
//     types: path.replace('.js', '.d.ts'),
//     default: path,
//   };
// }

function filesToExports(dir: string, baseDir: string = dir): ExportsObject {
  const exports: ExportsObject = {};

  if (!existsSync(dir)) {
    return exports;
  }

  const files = readdirSync(dir);

  for (const file of files) {
    const fullPath = join(dir, file);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      // find all index.js files recursively
      Object.assign(exports, filesToExports(fullPath, baseDir));
    } else if (stat.isFile()) {
      const isRootIndex = relative(baseDir, fullPath) === 'index.js';
      if (file === 'index.js' && !isRootIndex) {
        // make backward compatible entrypoints for index files (make the '/index.js' part unnecessary)
        // e.g. { "./components/Button": "./components/Button/index.js" }
        exports[handlePath(relative(baseDir, dir))] = handlePath(relative(baseDir, fullPath));

        const indexContent = readFileSync(fullPath, 'utf-8');
        const componentExportRegex = /export\s+\*\s+from\s+['"](.+)['"]/g;
        let match;
        // make an entrypoint for each index-file's export
        // a foundation for the future public api style
        while ((match = componentExportRegex.exec(indexContent)) !== null) {
          const p = handlePath(relative(baseDir, join(dir, match[1])));
          exports[p.replace('.js', '')] = p;
        }
      }
    }
  }

  return exports;
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const buildDir = join(__dirname, '..', 'build');

const buildPackageJsonPath = join(buildDir, 'package.json');
const buildPackageJson = JSON.parse(readFileSync(buildPackageJsonPath, 'utf-8'));

// find all index.js files and make package entrypoints out of them
// make exports look like future public api
// and allow package linters work at full
buildPackageJson.exports = Object.assign(defaultExports, filesToExports(buildDir));

writeFileSync(buildPackageJsonPath, JSON.stringify(buildPackageJson, null, 2) + '\n');
