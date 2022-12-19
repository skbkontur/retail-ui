const path = require('path');
const { existsSync, readFileSync, writeFileSync, unlinkSync } = require('fs');

const LOCK_FILES_PATHS = [
  path.join(__dirname, '../yarn.lock'),
  path.join(__dirname, '../packages/react-ui-testing/TestPages/yarn.lock'),
  path.join(__dirname, '../packages/react-ui-smoke-test/react-ui-ssr/yarn.lock'),
];
const ORIGINAL_REGISTRIES_FILE_NAME = 'original_registries.json';
const ENV_PACKAGE_REGISTRY = getRegistryFromEnv();

const CONFIG_PACKAGE_REGISTRIES = ['https://registry.npmjs.org', 'https://registry.yarnpkg.com'];

if (ENV_PACKAGE_REGISTRY) {
  LOCK_FILES_PATHS.forEach((lockFilePath) => {
    const lockFile = readFileSync(lockFilePath, 'utf-8');
    const originalRegistriesFilePath = path.join(path.dirname(lockFilePath), ORIGINAL_REGISTRIES_FILE_NAME);

    let modifiedLockFile = '';

    if (process.argv.includes('back')) {
      const originalRegistries = require(originalRegistriesFilePath);

      modifiedLockFile = lockFile.replaceAll(ENV_PACKAGE_REGISTRY, () => {
        return originalRegistries.shift();
      });

      unlinkSync(originalRegistriesFilePath);
    } else {
      const originalRegistries = [];

      modifiedLockFile = lockFile.replaceAll(new RegExp(CONFIG_PACKAGE_REGISTRIES.join('|'), 'g'), (match) => {
        originalRegistries.push(match);
        return ENV_PACKAGE_REGISTRY;
      });

      writeFileSync(originalRegistriesFilePath, JSON.stringify(originalRegistries, null, 2));
    }

    writeFileSync(lockFilePath, modifiedLockFile);
  });
}

function getRegistryFromEnv() {
  const ENV_VAR_NAME = 'PACKAGE_REGISTRY';
  const ENV_FILE_PATH = path.join(__dirname, '../.env');

  if (process.env[ENV_VAR_NAME]) {
    return process.env[ENV_VAR_NAME];
  }

  if (!existsSync(ENV_FILE_PATH)) {
    return undefined;
  }

  return readFileSync(ENV_FILE_PATH, 'utf-8')
    .split('\n')
    .find((line) => line.startsWith(`${ENV_VAR_NAME}=`))
    ?.split('=')[1];
}
