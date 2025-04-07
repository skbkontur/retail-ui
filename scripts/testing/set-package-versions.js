const path = require('path');
const fs = require('fs');

const reactVersion = process?.env?.REACT_VERSION;
const tsVersion = process?.env?.TYPESCRIPT_VERSION;

// эти 2 команды в самом конце закинуть в next, чтобы весь механизм завелся
//"preinstall": "node scripts/testing/set-package-versions.js", -- для ci
//"set-testing-package-versions-local": "cross-env REACT_VERSION=17 TYPESCRIPT_VERSION=4 node scripts/testing/set-package-versions.js" -- для Local

if (!(reactVersion && tsVersion)) {
  return;
}

const packagesPath = path.resolve(__dirname, "..", "..", "packages");
const {react, typescript} = getJsonFile(path.resolve(__dirname, "package-versions.json"));

const packagesForReact = react[reactVersion];
const packagesForTypescript = typescript[tsVersion];

const allPackages = {...packagesForReact, ...packagesForTypescript};

try {
  patchSmokeTestPackage();
  patchSeleniumTestsPackage();
  patchPackageJsons();
} catch (e) {
  //log
}

function patchPackageJsons() {
  const pathToReactUi = path.resolve(packagesPath, "react-ui", "package.json");
  const pathToReactUiValidation = path.resolve(packagesPath, "react-ui-validations", "package.json");
  [pathToReactUi, pathToReactUiValidation].forEach(packagePath => {
    const json = getJsonFile(packagePath);
    json.devDependencies = {...json.devDependencies, ...allPackages}
    writeJsonFile(packagePath, json);
  })
}

function patchSeleniumTestsPackage() {
  const pathToConfig = path.resolve(packagesPath, "react-ui-testing", "TestPages", "versions.js");
  console.log(pathToConfig, "has been patched");
  //noop
}

function patchSmokeTestPackage() {
  const pathToConfig = path.resolve(packagesPath, "react-ui-smoke-test", "cra-template-react-ui", "template.json");
  const package = getJsonFile(pathToConfig);
  package.package.dependencies = {...package.package.dependencies, ...packagesForReact};
  writeJsonFile(pathToConfig, package);
  console.log(pathToConfig, "has been patched");
}

function getJsonFile(path) {
  return JSON.parse(fs.readFileSync(path, 'utf8'));
}

function writeJsonFile(path, content) {
  fs.writeFileSync(path, JSON.stringify(content, null, 2) + "\n");
}
