const path = require('path');
const { readFileSync, writeFileSync } = require('fs');
const { execSync } = require('child_process');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const LOCK_FILE_PATH = path.join(__dirname, '../yarn.lock');
const ENV_PACKAGE_REGISTRY = process.env.PACKAGE_REGISTRY;

if (ENV_PACKAGE_REGISTRY) {
  const CONFIG_PACKAGE_REGISTRY = execSync('yarn config get registry').toString().trim();
  if (/^http(s?):\/\//.test(CONFIG_PACKAGE_REGISTRY) && CONFIG_PACKAGE_REGISTRY !== ENV_PACKAGE_REGISTRY) {
    const lockFile = readFileSync(LOCK_FILE_PATH, 'utf-8');

    const modifiedLockFile = process.argv.includes('back')
      ? lockFile.replaceAll(ENV_PACKAGE_REGISTRY, CONFIG_PACKAGE_REGISTRY)
      : lockFile.replaceAll(CONFIG_PACKAGE_REGISTRY, ENV_PACKAGE_REGISTRY);

    writeFileSync(LOCK_FILE_PATH, modifiedLockFile);
  }
}
