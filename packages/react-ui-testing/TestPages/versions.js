const shell = require('shelljs');
const semver = require('semver');
const reactUiLocalVersionStub = '9.9.9';
const reactVersion = process?.env?.REACT_VERSION == "16" ? "16.9.0" : process?.env?.REACT_VERSION == "17" ? "17.0.2" : process?.env?.REACT_VERSION == "18" ? "18.3.1" : "17.0.2"; //пока так. позже доделаю

const versionsInfo = [
  {
    react: reactVersion,
    '@skbkontur/react-ui': [reactUiLocalVersionStub],
    dependencies: {
      'react-dom': reactVersion,
    },
  },
];

const getDefaultVersions = function () {
  return versionsInfo.map((x) => {
    return {
      react: x.react,
      '@skbkontur/react-ui': x['@skbkontur/react-ui'],
      dependencies: x.dependencies,
    };
  });
};

const versionSource = getDefaultVersions();

const versions = versionSource
  .filter((x) => x['@skbkontur/react-ui'].length)
  .map((version) =>
    version['@skbkontur/react-ui'].map((reactUIVersion) => {
      return {
        react: version.react,
        '@skbkontur/react-ui': reactUIVersion,
        dependencies: version.dependencies,
      };
    }),
  )
  .reduce((x, y) => x.concat(y), []);

module.exports = { versions, reactUiLocalVersionStub };
