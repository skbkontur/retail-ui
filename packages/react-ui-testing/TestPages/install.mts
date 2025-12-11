import { join } from 'path';
import { existsSync, mkdirSync, createReadStream, createWriteStream, appendFileSync } from 'fs';
import { exec } from 'child_process';

import { versions, reactUiLocalVersionStub } from './versions.mts';

const getPackageNameAndVersion = function(name: string, version: string) {
  return `${name}@${version}`;
};

const install = function(version: typeof versions[0]) {
  const reactVersion = version['react'];
  const reactUiVersion = version['@skbkontur/react-ui'];
  const dependencies = version['dependencies'];
  return new Promise<void>((resolve) => {
    console.log(`installing packages for react ${reactVersion} and @skbkontur/react-ui ${reactUiVersion} ...`);
    const targetDir = `${reactVersion}_${reactUiVersion}`;
    if (!existsSync(targetDir)) {
      mkdirSync(targetDir);
    }
    createReadStream('./test-page-template/index.js').pipe(createWriteStream(`./${targetDir}/index.js`));
    createReadStream('./test-page-template/package.json').pipe(createWriteStream(`./${targetDir}/package.json`));
    appendFileSync(`./${targetDir}/.gitignore`, '*');

    const libs = [
      getPackageNameAndVersion('react', reactVersion),
      ...(reactUiVersion !== reactUiLocalVersionStub ? [getPackageNameAndVersion('@skbkontur/react-ui', reactUiVersion)] : []),
      ...Object.keys(dependencies).map(name => getPackageNameAndVersion(name, dependencies[name])),
    ];

    exec(`npm install ${libs.join(' ')}`, { cwd: join(__dirname, targetDir) }, function(
      error,
      stdout,
      stderr,
    ) {
      stdout && console.log(`stdout:\n${stdout}`);
      stderr && console.log(`stderr:\n${stderr}`);
      error && console.log(`exec error:\n${error}`);
      console.log('installed\n');
      resolve();
    });
  });
};

const installAll = async function() {
  for (const version of versions) {
    await install(version);
  }
};

installAll();
