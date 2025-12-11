import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const buildDir = join(__dirname, '..', 'build');

const buildPackageJsonPath = join(buildDir, 'package.json');
const buildPackageJson = JSON.parse(readFileSync(buildPackageJsonPath, 'utf-8'));

buildPackageJson.exports = {
  '.': './index.js',
  './package.json': './package.json',
};

writeFileSync(buildPackageJsonPath, JSON.stringify(buildPackageJson, null, 2) + '\n');
