import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from 'fs';
import { dirname, join, relative } from 'path';
import { fileURLToPath } from 'url';

interface ExportsField {
  types: string;
  default: string;
}
type ExportsObject = Record<string, ExportsField | string>;

function handlePath(path: string): string {
  return './' + path.replace(/\\/g, '/');
}

export const replaceTSToJS = (packageJsonPath: string): void => {
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));

  const exports = packageJson['exports'];

  for (const entry in exports) {
    exports[entry] = exports[entry].replace(/\.tsx?$/, '.js');
  }

  packageJson.exports = {
    ...exports,
    './package.json': './package.json',
  };

  writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
};

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
replaceTSToJS(buildPackageJsonPath);
const buildPackageJson = JSON.parse(readFileSync(buildPackageJsonPath, 'utf-8'));

// Update package.json exports field:
// 1. Replace .ts to .js in package.json
// 2. Find all index.js files and make package entrypoints out of them
// make exports look like future public api
// and allow package linters work at full
buildPackageJson.exports = Object.assign(buildPackageJson.exports, filesToExports(buildDir));

writeFileSync(buildPackageJsonPath, JSON.stringify(buildPackageJson, null, 2) + '\n');
