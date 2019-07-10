const fs = require('fs');
const path = require('path');
const semver = require('semver');
const { version: packageVersion } = require('../package.json');
const { version: styleguidistVersion } = require('react-styleguidist/package.json');
const { getPackageInfo } = require('../scripts/package');

const ROOT_DIR = path.join(__dirname, 'build');
const VERSION_DIR = path.join(ROOT_DIR, packageVersion);
const COMPONENTS_DIR = path.resolve(__dirname, '../components');

const { npmVersions, npmTags, publishVersion } = getPackageInfo();

const excludeComponents = ['ThemeProvider', 'ThemeConsumer', 'ThemeShowcase', 'LocaleProvider', 'Playground'];

const findComponent = dir => {
  const name = path.basename(dir);
  const ts = path.join(dir, `${name}.tsx`);
  const js = path.join(dir, `${name}.js`);
  const readme = path.join(dir, `README.md`);
  if (!fs.existsSync(readme) || excludeComponents.includes(name)) {
    return null;
  }
  return fs.existsSync(ts) ? ts : fs.existsSync(js) ? js : null;
};

const findComponentsRecursively = dir => {
  if (!fs.statSync(dir).isDirectory()) {
    return [];
  }
  const components = [findComponent(dir)];
  fs.readdirSync(dir).forEach(name => {
    components.push(...findComponentsRecursively(path.join(dir, name)));
  });
  return components.filter(Boolean);
};

const components = findComponentsRecursively(COMPONENTS_DIR);

const getCommonSections = () => {
  return [
    { name: 'Readme', content: path.join(__dirname, '../README.md'), exampleMode: 'expand' },
    { name: 'Changelog', content: path.join(__dirname, '../CHANGELOG.md') },
    { name: 'Roadmap', content: path.join(__dirname, '../ROADMAP.md') },
    { name: 'Icons', content: path.join(__dirname, '../components/Icon/README.md') },
    { name: 'LocaleProvider', content: path.join(__dirname, '../LOCALEPROVIDER.md') },
    {
      content: path.join(__dirname, '../CUSTOMIZATION.md'),
      name: 'Customization',
      sectionDepth: 1,
      sections: [
        { name: 'ThemeProvider', content: path.join(__dirname, '../components/ThemeProvider/README.md') },
        { name: 'ThemeShowcase', content: path.join(__dirname, '../components/ThemeShowcase/README.md') },
        { name: 'ThemePlayground', content: path.join(__dirname, '../components/ThemeProvider/Playground/README.md') },
      ],
    },
    { name: 'Components', components, sectionDepth: 1 },
  ].filter(section => !section.content || fs.existsSync(section.content));
};

const getVersionsSection = () => {
  const excludeVersions = ['0.8.8', '0.18.16', '0.18.17', '0.42.2'];
  const stableVersions = npmVersions
    .reverse()
    .filter(version => !version.includes('-'))
    .filter(version => !excludeVersions.includes(version));
  const sections = [];

  if (npmTags.lts) {
    sections.push({
      name: 'lts',
      content: path.join(__dirname, '../README.md'),
      href: 'http://tech.skbkontur.ru/react-ui/lts',
    });
  }

  sections.push(
    ...stableVersions.map(version => {
      return {
        name: version,
        content: path.join(__dirname, '../README.md'),
        href: `http://tech.skbkontur.ru/react-ui/${version}`,
      };
    }),
  );

  return {
    name: 'Versions',
    sections,
  };
};

const removeProps = (obj, props) => {
  props.forEach(prop => delete obj[prop]);
  return obj;
};

const removeUnsupportedConfigOptions = config => {
  // @see https://github.com/styleguidist/react-styleguidist/releases/tag/v7.1.0
  if (semver.lt(styleguidistVersion, '7.1.0')) {
    const { sections } = config;
    if (sections && sections.length) {
      config.sections = sections.map(section => removeProps(section, ['exampleMode', 'sectionDepth', 'usageMode']));
    }

    delete config.version;
  }

  return config;
};

module.exports = {
  components,
  commonSections: getCommonSections(),
  versionsSection: getVersionsSection(),
  publishVersion,
  removeUnsupportedConfigOptions,
  ROOT_DIR,
  VERSION_DIR,
};
