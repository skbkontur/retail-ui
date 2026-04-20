import { dirname, join } from 'path';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const LOCK_FILES_PATHS = [
  join(__dirname, '../yarn.lock'),
  join(__dirname, '../packages/react-ui-testing/TestPages/yarn.lock'),
  join(__dirname, '../packages/react-ui-smoke-test/react-ui-ssr/yarn.lock'),
];

const YARNRC_FILE_PATH = join(__dirname, '../.yarnrc');
const NPMRC_FILE_PATH = join(__dirname, '../.npmrc');
const ENV_FILE_PATH = join(__dirname, '../.env');
const NEXUS_PACKAGE_REGISTRY = getValueFromFile(ENV_FILE_PATH, 'PACKAGE_REGISTRY');
const NPM_PACKAGE_REGISTRY = getValueFromFile(NPMRC_FILE_PATH, 'registry');

if (NEXUS_PACKAGE_REGISTRY && NPM_PACKAGE_REGISTRY) {
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

function getValueFromFile(filePath: string, valueName: string): string | undefined {
  if (!existsSync(filePath)) {
    return undefined;
  }

  return readFileSync(filePath, 'utf-8')
    .split('\n')
    .find((line) => line.startsWith(`${valueName}=`))
    ?.split('=')[1]
    .trim();
}
