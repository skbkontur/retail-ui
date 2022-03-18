const path = require('path');
const { existsSync, readFileSync, writeFileSync } = require('fs');
const { execSync } = require('child_process');

const LOCK_FILE_PATH = path.join(__dirname, '../yarn.lock');
const ENV_FILE_PATH = path.join(__dirname, '../.env');
const ENV_PACKAGE_REGISTRY = getRegistryFromEnv();

if (ENV_PACKAGE_REGISTRY) {
  const CONFIG_PACKAGE_REGISTRY = execSync('yarn config get registry').toString().trim();
  if (/^http(s?):\/\//.test(CONFIG_PACKAGE_REGISTRY) && CONFIG_PACKAGE_REGISTRY !== ENV_PACKAGE_REGISTRY) {
    const lockFile = readFileSync(LOCK_FILE_PATH, 'utf-8');

    let modifiedLockFile;
    if (process.argv.includes('back')) {
      modifiedLockFile = lockFile.replaceAll(ENV_PACKAGE_REGISTRY, CONFIG_PACKAGE_REGISTRY);
    } else {
      modifiedLockFile = lockFile.replaceAll(CONFIG_PACKAGE_REGISTRY, ENV_PACKAGE_REGISTRY);
    }

    writeFileSync(LOCK_FILE_PATH, modifiedLockFile);
  }
}

function getRegistryFromEnv() {
  const ENV_VAR_NAME = 'PACKAGE_REGISTRY';
  if (process.env[ENV_VAR_NAME]) return process.env[ENV_VAR_NAME];

  if (!existsSync(ENV_FILE_PATH)) return undefined;

  const envFile = readFileSync(ENV_FILE_PATH, 'utf-8');
  return envFile.split('\n').reduce((acc, line) => {
    const [name, value] = line.split('=');
    return name === ENV_VAR_NAME ? value : acc;
  }, undefined);
}
