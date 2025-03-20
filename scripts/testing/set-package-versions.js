const { execSync } = require('child_process');
const path = require('path');

const fs = require('fs-extra');

const reactVersion = process.env.REACT_VERSION;
const tsVersion = process.env.TYPESCRIPT_VERSION;
const {react, typescript} = fs.readJsonSync(path.resolve(__dirname, "package-versions.json"))

const packagesForReact = react[reactVersion];
const packagesForTypescript = typescript[tsVersion];

const allPackages = convertPackagesToString({...packagesForReact, ...packagesForTypescript});

const pathToReactUi = path.resolve(__dirname, "packages", "react-ui");
const pathToReactUiValidation = path.resolve(__dirname, "packages", "react-ui-validations");

try {
  [pathToReactUi, pathToReactUiValidation].forEach(p => {
    execSync(`yarn add ${allPackages} `, { cwd: p });
  })
} catch (e) {
  // error message will be forwarded to stdio anyway
}

console.log("r");

function convertPackagesToString(packages) {
  return Object.entries(packages).reduce((acc, [name, version]) => acc.concat(`${name}@${version} `), "");
}
