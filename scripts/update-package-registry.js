const path = require('path');
const { existsSync, readFileSync, writeFileSync } = require('fs');

const LOCK_FILES_PATHS = [
  path.join(__dirname, '../yarn.lock'),
  path.join(__dirname, '../packages/react-ui-testing/TestPages/yarn.lock'),
  path.join(__dirname, '../packages/react-ui-smoke-test/react-ui-ssr/yarn.lock'),
];

const YARNRC_FILE_PATH = path.join(__dirname, '../.yarnrc');
const NPMRC_FILE_PATH = path.join(__dirname, '../.npmrc');
const ENV_FILE_PATH = path.join(__dirname, '../.env');
const NEXUS_PACKAGE_REGISTRY = getValueFromFile(ENV_FILE_PATH, 'PACKAGE_REGISTRY');
const NPM_PACKAGE_REGISTRY = getValueFromFile(NPMRC_FILE_PATH, 'registry');

if (NEXUS_PACKAGE_REGISTRY) {
  const yarnrcFile = readFileSync(YARNRC_FILE_PATH, 'utf-8');

  if (process.argv.includes('back')) {
    writeFileSync(YARNRC_FILE_PATH, yarnrcFile.replaceAll(NEXUS_PACKAGE_REGISTRY, NPM_PACKAGE_REGISTRY));
  } else {
    writeFileSync(YARNRC_FILE_PATH, yarnrcFile.replaceAll(NPM_PACKAGE_REGISTRY, NEXUS_PACKAGE_REGISTRY));
  }

  LOCK_FILES_PATHS.forEach((lockFilePath) => {
    const lockFile = readFileSync(lockFilePath, 'utf-8');

    const modifiedLockFile = process.argv.includes('back')
      ? lockFile.replaceAll(NEXUS_PACKAGE_REGISTRY, NPM_PACKAGE_REGISTRY)
      : lockFile.replaceAll(NPM_PACKAGE_REGISTRY, NEXUS_PACKAGE_REGISTRY);

    writeFileSync(lockFilePath, modifiedLockFile);
  });
}

function getValueFromFile(filePath, valueName) {
  if (!existsSync(filePath)) {
    return undefined;
  }

  return readFileSync(filePath, 'utf-8')
    .split('\n')
    .find((line) => line.startsWith(`${valueName}=`))
    ?.split('=')[1]
    .trim();
}
