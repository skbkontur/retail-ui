const shell = require("shelljs");
const semver = require("semver");
// current changes in retail-ui called v9.9.9
const currentVersion = "9.9.9";

const versionsInfo = [
    {
        "react": "16.4.2",
        'retail-ui': [currentVersion],
        "dependencies": {
            "react-dom": "16.4.2"
        }
    },
    {
        "react": "15.4.2",
        'retail-ui': [currentVersion],
        "dependencies": {
            "react-dom": "15.4.2",
            "react-addons-css-transition-group": "15.4.2"
        }
    },
    {
        'react': '16.4.2',
        'retail-ui-compatibility': '>=0.20.2',
        'retail-ui': ['0.20.2'],
        'dependencies': {
            'react-dom': '16.4.2',
        }
    },
    // закомментировала все кроме одной конкретных версий, поскольку у travis есть ограничение на прогон в 50 минут.
    // для большего кол-ва версий (тестов) надо думать о распаралеливании, но это уже отдельная тема
    /*   {
           'react': '16.0.0',
           'retail-ui-compatibility': '0.9.9 || >=0.11.0',
           'retail-ui': ['0.9.7'],
           'dependencies': {
               'react-dom': '16.0.0',
               'react-addons-css-transition-group': '15.6.2',
           }
       },
       {
           'react': '15.3.0',
           'retail-ui-compatibility': '0.6.18 || 0.8.15 || 0.9.9 || >=0.11.0',
           'retail-ui': [],
           'dependencies': {
               'react-dom': '15.3.0',
               'react-addons-css-transition-group': '15.3.0',
           }
       },
       {
           'react': '15.4.2',
           'retail-ui-compatibility': '0.6.18 || 0.8.15 || 0.9.9 || >=0.11.0',
           'retail-ui': ['0.11.0'],
           'dependencies': {
               'react-dom': '15.4.2',
               'react-addons-css-transition-group': '15.4.2',
           }
       },
       {
           'react': '0.14.3',
           'retail-ui-compatibility': '0.6.18 || 0.8.15 || 0.9.9 || >=0.11.0',
           'retail-ui': [],
           'dependencies': {
               'react-dom': '0.14.3',
               'react-addons-css-transition-group': '0.14.3',
           }
       },*/
];

const readRetailUiVersions = function () {
    const versionsOutput = shell.exec("npm show retail-ui versions --json", { silent: true });
    const retailUiVersions = eval(versionsOutput.stdout);
    return retailUiVersions;
};

const getTeamCityVersions = function () {
    const retailUiVersions = readRetailUiVersions();

    return versionsInfo
        .map(x => {
            return {
                'react': x.react,
                'retail-ui': retailUiVersions.filter(v => semver.satisfies(v, x['retail-ui-compatibility'])),
                'dependencies': x.dependencies
            };
        })
};

const getDefaultVersions = function () {
    return versionsInfo
        .map(x => {
            return {
                'react': x.react,
                'retail-ui': x['retail-ui'],
                'dependencies': x.dependencies
            };
        })
};

const versions = process.env["TEAMCITY_VERSION"]
    ? getTeamCityVersions()
    : getDefaultVersions();

const versionPairs = versions
    .filter(x => x["retail-ui"].length)
    .map(version =>
        version['retail-ui'].map(retailUIVersion => {
            return {
                'react': version.react,
                'retail-ui': retailUIVersion,
                'dependencies': version.dependencies
            };
        }))
    .reduce((x, y) => x.concat(y), []);

module.exports = versionPairs;
console.log(versionPairs);
module.exports.currentVersion = currentVersion;

