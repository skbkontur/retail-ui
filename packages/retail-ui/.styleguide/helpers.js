const fs = require('fs');
const path = require('path');
const semver = require('semver');
const { version: packageVersion } = require('../package.json');
const { version: styleguidistVersion } = require('react-styleguidist/package.json');
const { getPackageInfo } = require('../scripts/package');

const ROOT_DIR = path.join(__dirname, 'build');
const VERSION_DIR = path.join(ROOT_DIR, packageVersion);
const COMPONENTS_DIR = path.resolve(__dirname, '../components');

const components = fs
  .readdirSync(COMPONENTS_DIR)
  .map(x => [path.join(COMPONENTS_DIR, x, `${x}.tsx`), path.join(COMPONENTS_DIR, x, `${x}.js`)])
  .map(([ts, js]) => (fs.existsSync(ts) ? ts : fs.existsSync(js) ? js : null))
  .filter(Boolean);

const getCommonSections = () => {
  return [
    { name: 'Readme', content: path.join(__dirname, '../README.md'), exampleMode: 'expand' },
    { name: 'Changelog', content: path.join(__dirname, '../CHANGELOG.md') },
    { name: 'Roadmap', content: path.join(__dirname, '../ROADMAP.md') },
    { name: 'Icons', content: path.join(__dirname, '../components/Icon/README.md') },
    { name: 'LocaleProvider', content: path.join(__dirname, '../LOCALEPROVIDER.md') },
    { name: 'Components', components, sectionDepth: 1 },
  ].filter(section => !section.content || fs.existsSync(section.content));
};

const getVersionsSection = () => {
  const { npmVersions } = getPackageInfo();
  const excludeVersions = ['0.8.8'];
  const stableVersions = npmVersions
    .reverse()
    .filter(version => !version.includes('-'))
    .filter(version => !excludeVersions.includes(version));

  return {
    name: 'Versions',
    sections: [
      {
        name: 'lts',
        content: path.join(__dirname, '../README.md'),
        href: 'http://tech.skbkontur.ru/react-ui/lts',
      },
      ...stableVersions.map(version => {
        return {
          name: version,
          content: path.join(__dirname, '../README.md'),
          href: `http://tech.skbkontur.ru/react-ui/${version}`,
        };
      }),
    ],
  };
};

const removeOptions = (obj, props) => {
  for (const key in obj) {
    if (props.includes(key)) {
      delete obj[key];
    }
  }
  return obj;
};

const removeUnsupportedConfigOptions = config => {
  // @see https://github.com/styleguidist/react-styleguidist/releases/tag/v7.1.0
  if (semver.lt(styleguidistVersion, '7.1.0')) {
    const { sections } = config;
    if (sections && sections.length) {
      config.sections = sections.map(section => removeOptions(section, ['exampleMode', 'sectionDepth', 'usageMode']));
    }

    delete config.version;
  }

  return config;
};

module.exports = {
  components,
  commonSections: getCommonSections(),
  versionsSection: getVersionsSection(),
  packageVersion,
  removeUnsupportedConfigOptions,
  ROOT_DIR,
  VERSION_DIR,
};
