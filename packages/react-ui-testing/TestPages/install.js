const path = require('path');
const fs = require('fs');
const versions = require('./versions');
const exec = require('child_process').exec;
const currentVersion = "9.9.9";
const reactVersions = require('./reactVersions.json');

const package = function (name, version) {
    return `${name}@${version}`;
};

const install = function (reactVersion, retailUiVersion, dependencies) {
    return new Promise(resolve => {
        console.log(`installing packages for react ${reactVersion} and retail-ui ${retailUiVersion} ...`);
        const targetDir = `${reactVersion}_${retailUiVersion}`;
        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir);
        }
        fs.createReadStream('./test-page-template/index.js')
            .pipe(fs.createWriteStream(`./${targetDir}/index.js`));
        fs.createReadStream('./test-page-template/package.json')
            .pipe(fs.createWriteStream(`./${targetDir}/package.json`));
        fs.appendFileSync(`./${targetDir}/.gitignore`, '*');

        const libs = [
            package('react', reactVersion),
            ...Object.keys(dependencies).map(name => package(name, dependencies[name]))
        ];
        if (retailUiVersion!=currentVersion){
            libs.push(package('retail-ui', retailUiVersion));
        }

        const child = exec(
            `npm install ${libs.join(' ')}`,
            {cwd: path.join(__dirname, targetDir)},
            function (error, stdout, stderr) {
                stdout && console.log(`stdout:\n${stdout}`);
                stderr && console.log(`stderr:\n${stderr}`);
                error && console.log(`exec error:\n${error}`);
                console.log('installed\n');
                resolve();
            });
    })
};

const versionPairs = versions
.map(version => version['retail-ui'].map(retailUIVersion => [version.react, retailUIVersion,version.dependencies]))
.reduce((x, y) => x.concat(y), [])
.concat(reactVersions.map(version => [version.react, currentVersion, version.dependencies]));

const installAll = async function () {
    console.log(versionPairs)
    for (const version of versionPairs) {
        const reactVersion = version[0];
        const retailUiVersion = version[1];
        const dependencies = version[2];
        await install(reactVersion, retailUiVersion, dependencies);
    }
};

installAll();
