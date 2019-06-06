const fs = require('fs');
const path = require('path');
const { version } = require('../package.json');
const { getPackageInfo } = require('../scripts/package');

const ROOT_DIR = path.join(__dirname, 'build');
const VERSION_DIR = path.join(ROOT_DIR, version);
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

module.exports = {
  components,
  commonSections: getCommonSections(),
  versionsSection: getVersionsSection(),
  version,
  ROOT_DIR,
  VERSION_DIR,
};
