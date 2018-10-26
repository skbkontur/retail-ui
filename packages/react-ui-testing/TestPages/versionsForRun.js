const currentVersion = "9.9.9";
const versionsReactInfo = require('./reactVersions.json');
const versions = require('./versions');

const getVersions = function () {
    return versionPairs
        .map(version => {
            return {
                'react': version[0],
                'retail-ui': version[1]
            };
        })
};

const versionPairs = versions
    .map(version => version['retail-ui'].map(retailUIVersion => [version.react, retailUIVersion]))
    .reduce((x, y) => x.concat(y), [])
    .concat(versionsReactInfo.map(version => [version.react, currentVersion]));

const allVersions = getVersions();
console.log(allVersions);