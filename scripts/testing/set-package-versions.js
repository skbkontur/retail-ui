const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const reactVersion = process?.env?.REACT_VERSION;
const tsVersion = process?.env?.TYPESCRIPT_VERSION;

if (!(reactVersion && tsVersion)) {
  return;
}

const registry = process.env.PACKAGE_REGISTRY ?? "https://nexus.kontur.host/repository/kontur-npm-group";
const packagesPath = path.resolve(__dirname, "..", "..", "packages");
const {react, typescript} = JSON.parse(fs.readFileSync(path.resolve(__dirname, "package-versions.json"), 'utf8'));

const packagesForReact = react[reactVersion];
const packagesForTypescript = typescript[tsVersion];

const allPackages = convertPackagesToString({...packagesForReact, ...packagesForTypescript});

const pathToReactUi = path.resolve(packagesPath, "react-ui");
const pathToReactUiValidation = path.resolve(packagesPath, "react-ui-validations");

try {
  patchSmokeTestPackage();
  patchSeleniumTestsPackage();
  [pathToReactUi, pathToReactUiValidation].forEach(packagePath => {
    execSync(`yarn add -D ${allPackages} --registry ${registry}`, { stdio: 'inherit', cwd: packagePath });
  })
} catch (e) {
  //log
}

function convertPackagesToString(packages) {
  return Object.entries(packages).reduce((acc, [name, version]) => acc.concat(`${name}@${version} `), "");
}

function patchSeleniumTestsPackage() {
  const pathToConfig = path.resolve(packagesPath, "react-ui-testing", "TestPages", "versions.js");
  console.log(pathToConfig, "has been patched");
  //noop
}

function patchSmokeTestPackage() {
  const pathToConfig = path.resolve(packagesPath, "react-ui-smoke-test", "cra-template-react-ui", "template.json");
  const package = JSON.parse(fs.readFileSync(pathToConfig, 'utf8'));
  package.package.dependencies = {...package.package.dependencies, ...packagesForReact};
  fs.writeFileSync(pathToConfig, JSON.stringify(package));
  console.log(pathToConfig, "has been patched");
}
