const path = require('path');
const { existsSync, readFileSync, writeFileSync } = require('fs');
const { execSync } = require('child_process');

const LOCK_FILE_PATH = path.join(__dirname, '../yarn.lock');
const ENV_PACKAGE_REGISTRY = getRegistryFromEnv();

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

function getRegistryFromEnv() {
  const ENV_VAR_NAME = 'PACKAGE_REGISTRY';
  const ENV_FILE_PATH = path.join(__dirname, '../.env');

  if (process.env[ENV_VAR_NAME]) return process.env[ENV_VAR_NAME];

  if (!existsSync(ENV_FILE_PATH)) return undefined;

  return readFileSync(ENV_FILE_PATH, 'utf-8')
    .split('\n')
    .find((line) => line.startsWith(`${ENV_VAR_NAME}=`))
    ?.split('=')[1].replace(/(\r\n|\n|\r)/gm,"");
}
