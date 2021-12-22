const fs = require('fs');
const path = require('path');
const semver = require('semver');
const { version: packageVersion } = require('../package.json');
const { version: styleguidistVersion } = require('react-styleguidist/package.json');
const { getPackageInfo } = require('../scripts/package');

const ROOT_DIR = path.join(__dirname, 'build');
const DEPLOY_DIR = path.join(__dirname, 'deploy');
const VERSION_DIR = path.join(ROOT_DIR, packageVersion);
const COMPONENTS_DIR = path.resolve(__dirname, '../components');

const { npmVersions, npmTags, publishVersion } = getPackageInfo();

const excludedComponents = [
  'ThemeProvider',
  'ThemeShowcase',
  'Locale',
  'Playground',
  'ModalContext',
  'ModalClose',
  'SidePageContext',
];

const sectionComponents = ['Modal', 'SidePage'];

const findComponentsInSection = (dirPath, name) => {
  const reg = new RegExp(`${name}[a-zA-Z]*\.tsx`);
  const components = fs
    .readdirSync(dirPath)
    .filter((item) => reg.test(item) && !excludedComponents.includes(path.basename(item, '.tsx')))
    .map((item) => path.join(dirPath, item));
  return {
    name,
    components,
  };
};

const findComponent = (dirPath) => {
  const name = path.basename(dirPath);
  const ts = path.join(dirPath, `${name}.tsx`);
  const js = path.join(dirPath, `${name}.js`);
  const readme = path.join(dirPath, `${name}.md`);
  if (!fs.existsSync(readme) || excludedComponents.includes(name)) {
    return null;
  }
  return fs.existsSync(ts) ? ts : fs.existsSync(js) ? js : null;
};

const findComponentsRecursively = (dirPath) => {
  if (!fs.statSync(dirPath).isDirectory()) {
    return [];
  }
  const components = [findComponent(dirPath)];
  fs.readdirSync(dirPath).forEach((name) => {
    components.push(...findComponentsRecursively(path.join(dirPath, name)));
  });
  return components.filter(Boolean);
};

const findInComponents = (dir) => {
  const sections = [];
  const components = [];
  fs.readdirSync(dir).forEach((name) => {
    const dirPath = path.join(dir, name);
    if (sectionComponents.includes(name)) {
      sections.push(findComponentsInSection(dirPath, name));
    } else {
      components.push(...findComponentsRecursively(dirPath));
    }
  });
  return { components, sections };
};

const { sections, components } = findInComponents(COMPONENTS_DIR);

const getCommonSections = () => {
  return [
    { name: 'Readme', content: path.join(__dirname, '../README.md'), exampleMode: 'expand' },
    { name: 'Ecosystem', content: path.join(__dirname, '../../../README.md') },
    { name: 'Changelog', content: path.join(__dirname, '../CHANGELOG.md') },
    { name: 'Roadmap', content: path.join(__dirname, '../ROADMAP.md') },
    { name: 'Migration', content: path.join(__dirname, '../MIGRATION.md'), exampleMode: 'expand' },
    { name: 'LocaleContext', content: path.join(__dirname, '../lib/locale/LOCALECONTEXT.md') },
    { name: 'SSR', content: path.join(__dirname, '../SSR.md') },
    {
      name: 'Customization',
      sectionDepth: 1,
      sections: [
        { name: 'ThemeContext', content: path.join(__dirname, '../lib/theming/ThemeContext.md') },
        { name: 'ThemeShowcase', content: path.join(__dirname, '../internal/ThemeShowcase/ThemeShowcase.md') },
        {
          name: 'ThemePlayground',
          content: path.join(__dirname, '../internal/ThemePlayground/Playground.md'),
        },
      ],
    },
    { name: 'ResponsiveLayout', content: path.join(__dirname, '../components/ResponsiveLayout/ResponsiveLayout.md') },
    { name: 'Components', components, sectionDepth: 2, sections },
  ].filter((section) => !section.content || fs.existsSync(section.content));
};

const getVersionsSection = () => {
  const excludeVersions = ['0.8.8', '0.18.16', '0.18.17', '0.42.2'];
  const stableVersions = npmVersions
    .reverse()
    .filter((version) => !version.includes('-'))
    .filter((version) => !excludeVersions.includes(version));
  const sections = [];

  if (npmTags.lts) {
    sections.push({
      name: 'lts',
      content: path.join(__dirname, '../README.md'),
      href: '//tech.skbkontur.ru/react-ui/lts',
    });
  }

  sections.push(
    ...stableVersions.map((version) => {
      return {
        name: version,
        content: path.join(__dirname, '../README.md'),
        href: `//tech.skbkontur.ru/react-ui/${version}`,
      };
    }),
  );

  return {
    name: 'Versions',
    sections,
  };
};

const removeProps = (obj, props) => {
  props.forEach((prop) => delete obj[prop]);
  return obj;
};

const removeUnsupportedConfigOptions = (config) => {
  // @see https://github.com/styleguidist/react-styleguidist/releases/tag/v7.1.0
  if (semver.lt(styleguidistVersion, '7.1.0')) {
    const { sections } = config;
    if (sections && sections.length) {
      config.sections = sections.map((section) => removeProps(section, ['exampleMode', 'sectionDepth', 'usageMode']));
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
  DEPLOY_DIR,
};
