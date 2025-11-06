const fs = require('fs');

const shell = require('shelljs');
shell.cd(__dirname);
shell.cd('..');

const sourcePackageJson = fs.readFileSync('./package.json', 'utf8');
const reactUIpackageConfig = JSON.parse(sourcePackageJson);
delete reactUIpackageConfig.devDependencies;
delete reactUIpackageConfig.scripts;
fs.writeFileSync('build/react-ui-dist/package.json', JSON.stringify(reactUIpackageConfig, null, '  '));

function prepareCommonFiles(targetDir) {
  shell.cp('README.md', targetDir);
  shell.cp('CHANGELOG.md', targetDir);
}

prepareCommonFiles('build/react-ui-dist');
