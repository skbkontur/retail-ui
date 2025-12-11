const reactUiLocalVersionStub = '9.9.9';
const reactVersion = process.env.REACT_VERSION ?? '17.0.2';

const versionsInfo: Array< { react: string, '@skbkontur/react-ui': [string], dependencies: { [key: string]: string, 'react-dom': string }}> = [
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

export  { versions, reactUiLocalVersionStub };
