import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const reactVersion = process?.env?.REACT_VERSION;
const tsVersion = process?.env?.TYPESCRIPT_VERSION;
const strictMode = process?.env?.STRICT_MODE;

// эти 2 команды в самом конце закинуть в package.json, чтобы весь механизм завелся
//"preinstall": "node scripts/testing/set-package-versions.js", -- для ci
//"set-testing-package-versions-local": "cross-env REACT_VERSION=17 TYPESCRIPT_VERSION=4 node scripts/testing/set-package-versions.mts" -- для Local

console.log('REACT_VERSION', process?.env?.REACT_VERSION);
console.log('TYPESCRIPT_VERSION', process?.env?.TYPESCRIPT_VERSION);
console.log('STRICT_MODE', process?.env?.STRICT_MODE);

function patchPackages(
  reactVersion: string | undefined,
  tsVersion: string | undefined,
  strictMode: string | undefined,
): void {
  if (reactVersion === undefined || tsVersion === undefined || !strictMode) {
    return;
  }

  const packagesPath = resolve(__dirname, '..', '..', 'packages');
  const { react, typescript } = getJsonFile(resolve(__dirname, 'package-versions.json'));

  const packagesForReact = react[reactVersion];
  const packagesForTypescript = typescript[tsVersion];

  const allPackages = { ...packagesForReact, ...packagesForTypescript };

  try {
    patchSmokeTestPackage(packagesPath, packagesForReact);
    patchPackageJsons(packagesPath, allPackages);
  } catch (e) {
    console.log(e);
  }
}
function patchPackageJsons(packagesPath: string, packages: Record<string, string>) {
  const pathToReactUi = resolve(packagesPath, 'react-ui', 'package.json');
  const pathToReactUiValidation = resolve(packagesPath, 'react-ui-validations', 'package.json');
  [pathToReactUi, pathToReactUiValidation].forEach((packagePath) => {
    const json = getJsonFile(packagePath);
    json.devDependencies = { ...json.devDependencies, ...packages };
    writeJsonFile(packagePath, json);
    console.log(packagePath, 'patched');
  });
}

function patchSmokeTestPackage(packagesPath: string, packagesForReact: Record<string, string>) {
  const pathToConfig = resolve(packagesPath, 'react-ui-smoke-test', 'cra-template-react-ui', 'template.json');
  const packageConfig = getJsonFile(pathToConfig);
  packageConfig.package.dependencies = { ...packageConfig.package.dependencies, ...packagesForReact };
  writeJsonFile(pathToConfig, packageConfig);
  console.log(pathToConfig, 'patched');

  //patch createRoot render api 18+ react
  if (reactVersion && Number(reactVersion) > 17) {
    const pathToRootApp = resolve(
      packagesPath,
      'react-ui-smoke-test',
      'cra-template-react-ui',
      'template',
      'src',
      'index.tsx',
    );
    const file = readFileSync(pathToRootApp, 'utf8');
    const patchedImport = file.replace(
      "import { render } from 'react-dom'",
      `import { createRoot } from 'react-dom/client'`,
    );
    const patchedRenderMethod = patchedImport.replace(
      'render(Content, container)',
      `const root = createRoot(container);\nroot.render(Content)`,
    );
    writeFileSync(pathToRootApp, patchedRenderMethod);
    console.log(pathToRootApp, 'patched');
  }
}

function getJsonFile(path: string) {
  return JSON.parse(readFileSync(path, 'utf8'));
}

function writeJsonFile(path: string, content: string) {
  writeFileSync(path, JSON.stringify(content, null, 2) + '\n');
}

patchPackages(reactVersion, tsVersion, strictMode);
