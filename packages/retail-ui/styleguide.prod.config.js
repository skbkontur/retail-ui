const { renameSync } = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const config = require('./styleguide.config.js');

const { error, stdout } = spawnSync('npm', ['show', 'retail-ui', '--json']);

if (error) {
  console.log(error);
  process.exit(-1);
}

const { versions, 'dist-tags': tags } = JSON.parse(stdout.toString());
const isStable = config.version == tags.latest;

if (!isStable) {
  renameSync(
    config.styleguideDir,
    path.join(config.styleguideDir, '..', 'next')
  );
  process.exit(0);
}

const stableVersions = versions
  .reverse()
  .filter(version => !version.includes('-'));

const versionSection = { name: 'Versions', sections: [] };

// NOTE For some reason styleguidist need content field with valid file
versionSection.sections.push({
  name: 'next',
  content: 'README.md',
  href: 'http://tech.skbkontur.ru/react-ui/next'
});

stableVersions.forEach(version => {
  versionSection.sections.push({
    name: version,
    content: 'README.md',
    href: `http://tech.skbkontur.ru/react-ui/${version}`
  });
});

config.sections.push(versionSection);
config.styleguideDir = path.join(config.styleguideDir, '..');

module.exports = config;
