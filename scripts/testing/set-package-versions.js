const { execSync } = require('child_process');
const path = require('path');

const fs = require('fs-extra');

const reactVersion = process.env.REACT_VERSION;
const tsVersion = process.env.TYPESCRIPT_VERSION;
const registry = process.env.PACKAGE_REGISTRY ?? "https://nexus.kontur.host/repository/kontur-npm-group";
const packagesPath = path.resolve(__dirname, "..", "..", "packages");
const {react, typescript} = fs.readJsonSync(path.resolve(__dirname, "package-versions.json"));

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
  const package = fs.readJsonSync(pathToConfig);
  package.package.dependencies = {...package.package.dependencies, ...packagesForReact};
  fs.writeJSONSync(pathToConfig, package);
  console.log(pathToConfig, "has been patched");
}
