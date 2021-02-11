const path = require('path');
const fs = require('fs');
const exec = require('child_process').exec;

const { versions, reactUiLocalVersionStub } = require('./versions');

const package = function(name, version) {
  return `${name}@${version}`;
};

const install = function(version) {
  const reactVersion = version['react'];
  const reactUiVersion = version['@skbkontur/react-ui'];
  const dependencies = version['dependencies'];
  return new Promise(resolve => {
    console.log(`installing packages for react ${reactVersion} and @skbkontur/react-ui ${reactUiVersion} ...`);
    const targetDir = `${reactVersion}_${reactUiVersion}`;
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir);
    }
    fs.createReadStream('./test-page-template/index.js').pipe(fs.createWriteStream(`./${targetDir}/index.js`));
    fs.createReadStream('./test-page-template/package.json').pipe(fs.createWriteStream(`./${targetDir}/package.json`));
    fs.appendFileSync(`./${targetDir}/.gitignore`, '*');

    const libs = [
      package('react', reactVersion),
      ...(reactUiVersion !== reactUiLocalVersionStub ? [package('@skbkontur/react-ui', reactUiVersion)] : []),
      ...Object.keys(dependencies).map(name => package(name, dependencies[name])),
    ];

    const child = exec(`npm install ${libs.join(' ')}`, { cwd: path.join(__dirname, targetDir) }, function(
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
